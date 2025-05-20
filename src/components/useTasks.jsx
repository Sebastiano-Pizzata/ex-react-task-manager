import { useState, useEffect } from 'react'

export default function useTasks() {

    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [tasks, setTasks] = useState([]);


    function getTasks() {
        fetch(`${url}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(error => console.error(error))
    }

    function addTask(task) {

    }

    function removeTask(taskId) {

    }


    function updateTask(taskId) {

    }


    useEffect(() => {
        getTasks()
    }, [])


    return {
        tasks,
        getTasks,
        addTask,
        removeTask,
        updateTask
    }


}