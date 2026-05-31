import { Navigate, Route, Routes } from "react-router-dom";
import { Credits } from "./Credits";
import { MainPage } from "./MainPage";
import { Test } from "./Test";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
