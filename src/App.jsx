import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import AppPage from "./pages/AppPage";
import YachtGame from "./components/offline/YachtGame";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppPage />} />
        <Route path="/offline" element={<YachtGame />} />
      </Routes>
    </BrowserRouter>
  );
}
