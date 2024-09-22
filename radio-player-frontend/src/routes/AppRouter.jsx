import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
}

export default AppRouter;
