import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/detail/:id/:slug" element={<h1>Detail</h1>} />
    </Routes>
  );
}

export default App;
