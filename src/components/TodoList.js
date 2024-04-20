import React, { useEffect, useState } from "react";
import { useFirebase } from "./context/firebase";

const TodoList =()=>{
    const todoHeader = ["Task List Title", "Create By(email)","No of tasks","Creation Time","Last updated"];
    const [todoList, setTodoList] = useState([]);
    const Firebase = useFirebase();

    useEffect(() => {
        const getTodo = async () => {
          try {
            const todo = await Firebase.getTodoListFromStore();
            setTodoList(todo);    
            console.log("Todo retrieved:", todo);
          } catch (error) {
            console.error("Error fetching users:", error.message);
          }
        };    
        getTodo();
      }, [Firebase]);
   
    return(
        <table>
                <thead>
                    <tr>
                       {todoHeader.map((head, index)=>(
                        <th key={index}>{head}</th>
                       ))}
                    </tr>
                </thead>
                <tbody>
                {todoList.map((todo,index)=>(
                    <tr key={index}>                       
                            <td>{todo.todoTitle}</td> 
                            <td>{todo.userEmail}</td> 
                            <td>{todo.totalTasks}</td> 
                            <td>{todo.createdAt}</td> 
                            <td>{todo.updatedAt}</td>                                           
                    </tr>
                     ))}
                </tbody>
            </table>        
    )
}
export default TodoList;