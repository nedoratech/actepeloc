import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Home</div>} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
