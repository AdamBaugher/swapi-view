import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResourcePage from "./pages/ResourcePage.tsx";
import ResourceDetailPage from "./pages/ResourceDetailPage.tsx";

function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<ResourcePage />} />
          <Route path="/:resourceType" element={<ResourcePage />} />
          <Route path="/:resourceType/:resourceId" element={<ResourceDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
