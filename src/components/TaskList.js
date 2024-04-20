import React, { useEffect, useState } from "react";
import { useFirebase } from "./context/firebase";

const TaskList =()=>{
    const taskHeader = ["Task Title","Task Description","Task List Title","Create By(email)","Creation Time"]
    const [taskList, setTaskList] = useState([]);
    const Firebase = useFirebase();

    useEffect(() => {
        const getTasks = async () => {
          try {
            const tasks = await Firebase.getTasksFromStore();
            setTaskList(tasks);    
            console.log("Todo retrieved:", tasks);
          } catch (error) {
            console.error("Error fetching users:", error.message);
          }
        };    
        getTasks();
      }, [Firebase]);

    return(
        <table>
                <thead>
                    <tr>
                        {taskHeader.map((head,index)=>(
                            <th key={index}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {taskList.map((task, index)=>(
                         <tr key={index}>
                         <td>{task.taskTitle}</td>
                         <td>{task.taskDesc}</td>
                         <td>{task.taskListTitle}</td>
                         <td>{task.createdBy}</td>
                         <td>{task.createdAt}</td>                       
                     </tr>
                    ))}
                   
                </tbody>
            </table>        
    )
}
export default TaskList;