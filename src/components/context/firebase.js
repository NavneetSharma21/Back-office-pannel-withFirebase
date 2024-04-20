import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { createContext, useContext } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCLh4M5iQ1WmwCToGnXW0pyEJcu1wfgAUc",
    authDomain: "to-dolist-dff44.firebaseapp.com",
    projectId: "to-dolist-dff44",
    storageBucket: "to-dolist-dff44.appspot.com",
    messagingSenderId: "837573270730",
    appId: "1:837573270730:web:7894f53ed82f2468356833",
    measurementId: "G-7PP75GNHJ4",
};

const FirebaseApp = initializeApp(firebaseConfig)
const DbStore = getFirestore(FirebaseApp);

const firebaseContext = createContext(null)

export const useFirebase = () => {
    return useContext(firebaseContext);
}

export const FirebaseProvider = (props) => {

    const getUsersFromFireStore = async() => {
        try{
            const database = collection(DbStore, "users");
            const query = await getDocs(database)
            const users = query.docs.map((doc)=>{
                const userData = doc.data();
                return{
                    id: doc.id,
                    email: userData.email || "",
                    password: userData.password || "",
                    createdAt: userData.createdAt
                    ? userData.createdAt.toDate().toLocaleString()
                    : "",
                    ip: userData.ip || "",
                }
            });
            return users;
        }catch(error){
            console.log(error.message)
        }
    }

   const getTodoListFromStore = async()=>{
    try{
        const database = collection(DbStore, "TodoLists");
        const getQuery = await getDocs(database)
        const todoList = getQuery.docs.map(async(doc)=>{
            const todoData = doc.data();
            const todoId = doc.id;

            const tasksRef = collection(DbStore, "Tasks");
            const taskQuery = query(tasksRef, where("todoId", "==", todoId));
            const taskQuerySnapshot = await getDocs(taskQuery);
            const totalTasks = taskQuerySnapshot.size;

            return{
                todoTitle: todoData.title || "",
                totalTasks,
                userEmail: todoData.userEmail || "",
                createdAt: todoData.createdAt
                  ? todoData.createdAt.toDate().toLocaleDateString()
                  : "",
                updatedAt: todoData.updateAt
                  ? todoData.updateAt.toDate().toLocaleDateString()
                  : todoData.createdAt.toDate().toLocaleDateString(),
              };
        })
        return Promise.all(todoList);
        }
    catch(error){
            console.log(error.message)
        }

   }

   const getTasksFromStore = async()=>{
    try{
        const database = collection(DbStore, "Tasks")
        const taskQuery =  await getDocs(database)
        const Tasks = taskQuery.docs.map((doc)=>{
            const TaskData = doc.data();
            return{
                taskTitle : TaskData.title || "",
                taskDesc : TaskData.description || "",
                taskListTitle : TaskData.todoList || "",
                createdBy : TaskData.userEmail || "",
                createdAt : TaskData.createdAt
                ? TaskData.createdAt.toDate().toLocaleDateString() : "",
            }
        })
        return Tasks;
    }  catch(error){
        console.log(error.message)
    }


   }
    return (
        <firebaseContext.Provider value={{
            getUsersFromFireStore,
            getTodoListFromStore,
            getTasksFromStore,
        }}>
            {props.children}
        </firebaseContext.Provider>
    )
}