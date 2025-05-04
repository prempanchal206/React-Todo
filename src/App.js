import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header title="My Todo App" isSearchBarVisible={false} />
      <Todos />
      <Footer />
    </div>
  );
}

export default App;
