import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import todos from "../assets/todosData";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function TodoItem() {
  const [todosState, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : todos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosState));
  }, [todosState]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [validatedDesc, setValidatedDesc] = useState(false);
  const [validatedDueDate, setValidatedDueDate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Open modal for add or edit todo
  const handleAddEditClick = (todo = null) => {
    if (todo) {
      setSelectedTodoId(todo.id);
      setNewTodoTitle(todo.title);
      setNewTodoDescription(todo.description);
      setNewTodoDueDate(todo.dueDate);
      setIsEditing(true);
    } else {
      setNewTodoTitle("");
      setNewTodoDescription("");
      setNewTodoDueDate("");
      setIsEditing(false);
    }
    setShowEditModal(true);
  };

  // Close Edit Todo Modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTodoId(null);
    setNewTodoTitle("");
    setNewTodoDescription("");
    setNewTodoDueDate("");
    setValidated(false);
    setValidatedDesc(false);
    setValidatedDueDate(false);
  };

  // Handle form submission for add and edit
  const handleSaveTodo = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !newTodoDescription ||
      !newTodoDueDate
    ) {
      e.stopPropagation();
      setValidated(true);
      setValidatedDesc(true);
      setValidatedDueDate(true);
      return null;
    }

    const newTodo = {
      id: newId,
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      dueDate: newTodoDueDate,
    };

    if (isEditing) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === selectedTodoId ? { ...todo, ...newTodo } : todo
        )
      );
    } else {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
    handleCloseEditModal();
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (id) => {
    setSelectedTodoId(id);
    setShowDeleteModal(true);
  };

  // Confirm the deletion of the todo
  const handleConfirmDelete = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== selectedTodoId)
    );
    setShowDeleteModal(false);
  };

  const sortedTodos = todosState.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });

  // Format the date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const newId =
    todosState.length > 0
      ? Math.max(...todosState.map((todo) => todo.id)) + 1
      : 1;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => handleAddEditClick()}>
          Add Todo
        </Button>
      </div>

      {/* Todo List */}
      {sortedTodos.map((todo) => (
        <div key={todo.id} className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text mb-1">
                  <strong>Description:</strong> {todo.description}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  {todo.completed ? "Completed" : "Not Completed"}
                </p>
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center gap-3">
                <FontAwesomeIcon
                  icon={faEdit}
                  size="lg"
                  className="text-secondary cursor-pointer"
                  onClick={() => handleAddEditClick(todo)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  className="text-danger cursor-pointer"
                  onClick={() => handleDeleteClick(todo.id)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <p className="card-text">
                  <strong>Due Date:</strong> {formatDate(todo.dueDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add/Edit Todo Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Form onSubmit={handleSaveTodo} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Todo" : "Add New Todo"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Todo Title</Form.Label>
              <Form.Control
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                required
                isInvalid={validated && !newTodoTitle}
                className={
                  validated && !newTodoTitle
                    ? "is-invalid"
                    : validated && newTodoTitle
                    ? "is-valid"
                    : ""
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDesc">
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                as="textarea"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                required
                isInvalid={validatedDesc && !newTodoDescription}
                className={
                  validatedDesc && !newTodoDescription
                    ? "is-invalid"
                    : validatedDesc && newTodoDescription
                    ? "is-valid"
                    : ""
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                required
                isInvalid={validatedDueDate && !newTodoDueDate}
                className={
                  validatedDueDate && !newTodoDueDate
                    ? "is-invalid"
                    : validatedDueDate && newTodoDueDate
                    ? "is-valid"
                    : ""
                }
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? "Save Changes" : "Add Todo"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Todo Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this todo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TodoItem;
