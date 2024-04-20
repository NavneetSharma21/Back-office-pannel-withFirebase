import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import UserList from "./UserList";
import TaskList from "./TaskList";
const DashBoard = (props) => {
  
  return (
    <>
      <div className="Dashboard">
        <ul className="navLink">
          <li className="logo">
            Admin Panel
          </li>
          <li>
            <NavLink className="link" to="/Dashboard/users">Users</NavLink>
          </li>
          <li>
            <NavLink className="link" to="/Dashboard/Task-Lists">Task Lists</NavLink>
          </li>
          <li>
            <NavLink className="link" to="/Dashboard/Tasks">Tasks</NavLink>
          </li>
          <li>
            <button onClick={props.onLogout}>Log-out</button>
          </li>
        </ul>
      </div>
      <div className="tableContent">
        <Routes>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/Task-Lists" element={<TodoList />}></Route>
          <Route path="/Tasks" element={<TaskList />}></Route>
        </Routes>
      </div>

    </>
  )
}

export default DashBoard;