import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="h-[100vh] w-full font-montserrat flex flex-col justify-between">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
