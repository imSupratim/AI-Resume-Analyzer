import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResumeDetail from "./pages/ResumeDetail";
import Compare from "./pages/Compare";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import ResumeHistory from "./pages/ResumeHistory"
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast"

function App() {
  
  
  return (
    <>
      <Toaster />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resume/:id" element={<ResumeDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/analyze" element={<Upload />} />
        <Route path="/history" element={<ResumeHistory/>} />
      </Routes>
    </>
  );
}

export default App;
