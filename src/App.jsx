import React from "react";
import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreateResources from "./pages/CreateResources";
import Resources from "./pages/Resources";
import ResourcePage from "./pages/ResourcePage";
import ContactAdmin from "./pages/ContactAdmin";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <UserContextProvider>
      <div className="screen-container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/createresource" element={<CreateResources />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:id" element={<ResourcePage />} />
            <Route path="/contactadmin" element={<ContactAdmin />} />
          </Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;
