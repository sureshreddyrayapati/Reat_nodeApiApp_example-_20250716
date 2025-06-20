import GetDetails from "./componets/api_get";
import AddUser from "./componets/api_post";
import Users from "./componets/api_delete_edit";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
 
function App(){
  return(
    <BrowserRouter>
    <nav>
        <NavLink to="get" className={({ isActive }) => (isActive ? "active" : "")}>All Users</NavLink>
        <NavLink to="Post" className={({ isActive }) => (isActive ? "active" : "")}>Add User</NavLink>
        <NavLink to="Update" className={({ isActive }) => (isActive ? "active" : "")}>Edit & Delete</NavLink>
    </nav>
    <main style={{ marginLeft: "200px", padding: "20px" }}>
    <Routes>
        <Route path="get" element={<GetDetails/>}/>
        <Route path="Post" element={<AddUser/>}/>
        < Route path="Update" element={<Users/>}/>
    </Routes>
    </main>
    <ToastContainer />
    </BrowserRouter>
   
    // <>
    // <h1>React + Node API (GET Example)</h1>
    // <br />
    //  <GetDetails/>
    //  <br />
    //  <AddUser/>
    //  <Users/>
    //  
    // </>
  )
}
 
export default App;