import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PCOSForm from "./components/PCOSForm";
import Result from "./components/Result";
// import Chatbot from "./components/Chatbot"; // ✅ Import the Chatbot



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PCOSForm />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {/* <Chatbot /> */}
    </>

  );
};

export default App;
