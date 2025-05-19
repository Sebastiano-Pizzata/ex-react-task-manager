import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [tasks, setTasks] = useState([]);


    function fetchTasks() {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }


    const value = {
        tasks,
        fetchTasks
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext);

export {
    GlobalProvider,
    useGlobalContext
}