import { Navigate, Route, Routes } from "react-router-dom";
import { Credits } from "@pages/Credits";
import { MainPage } from "@pages/MainPage";

import { MRUSimulator } from "@mru/MRUSimulator";
import { MUVSimulator } from "@muv/MUVSimulator";
import { Test } from "@muv/Test";
import { QLSimulator } from "@ql/QLSimulator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/mru" element={<MRUSimulator />} />
      <Route path="/muv" element={<MUVSimulator />} />
      <Route path="/ql" element={<QLSimulator />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
