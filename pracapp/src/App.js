import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
import AddEmp from "./pages/AddEmp";
import AllEmp from "./pages/AllEmp";
import Home from "./pages/Home";
import Emp from "./pages/Emp";
import './App.scss'
import { UserContext } from './UserContext';
import { useState } from "react";
function App() {
  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUserId: null,
    currentUserRole: null,
    currentUserName: null
  })
  return (
    <UserContext.Provider value={{user,setUser}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-emp" element={<AddEmp />} />
          <Route path="all-emp" element={<AllEmp />} />
          <Route path="emp/:id" element={<Emp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
