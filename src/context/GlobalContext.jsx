import { createContext, useContext } from "react";
import useTasks from "../components/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {


    const taskHook = useTasks();

    const value = {
        tasks: taskHook.tasks,
        fetchTasks: taskHook.getTasks,
        addTask: taskHook.addTask,
        removeTask: taskHook.removeTask
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