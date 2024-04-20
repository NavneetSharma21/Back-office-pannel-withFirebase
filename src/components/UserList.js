import React, { useEffect, useState } from "react";
import { useFirebase } from "./context/firebase";
const UserList = () => {

    const userHeader = ["Email ID","Password","Signup Time","IP"]
    const [UserList, setUserList] = useState([]);
    const Firebase = useFirebase();

    useEffect(() => {
        const getUsers = async () => {
          try {
            const users = await Firebase.getUsersFromFireStore();
            setUserList(users);    
            console.log("Users retrieved:", users);
          } catch (error) {
            console.error("Error fetching users:", error.message);
          }
        };    
        getUsers();
      }, [Firebase]);

    return (
            <table>
                <thead>
                    <tr>
                        {userHeader.map((head,index)=>(
                            <th key={index}>{head}</th>
                        ))}                      
                    </tr>
                </thead>
                <tbody>
                {UserList.map((user,index)=>(
                    <tr key={index}>                       
                            <td>{user.email}</td> 
                            <td>{user.password}</td> 
                            <td>{user.createdAt}</td> 
                            <td>{user.ip}</td>                                             
                    </tr>
                     ))}
                </tbody>
            </table>        
    )
}

export default UserList;