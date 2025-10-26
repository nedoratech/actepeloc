import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages";
import { Signup } from "./pages";
import { Dashboard } from "./pages";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Home</div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
