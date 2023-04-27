import "./App.css";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <>
     
<Header/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="search" element={<Search />} />
        <Route path="viewall" element={<ViewAll />} />
      </Routes>
    </>
  );
}

export default App;
