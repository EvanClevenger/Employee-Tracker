import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
    // <Login />
  );
}

export default App;
