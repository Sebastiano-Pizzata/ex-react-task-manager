import { useState, useEffect } from 'react'

export default function useTasks() {

    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [tasks, setTasks] = useState([]);


    function getTasks() {
        return fetch(`${url}/tasks`)
            .then(res => {
                if (!res.ok) throw new Error('Errore nel server');
                return res.json();
            })
            .then(data => {
                setTasks(data);
                return data;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }

    function addTask(task) {
        return fetch(`${url}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
            .then(res => {
                if (!res.ok) throw new Error('Errore nel server');
                return res.json();
            })
            .then(data => {
                if (data.success === true) {
                    return getTasks().then(() => data);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error("Errore nell' aggiunta della task :", error);
                throw error;
            });
    }




    function removeTask(taskId) {
        return fetch(`${url}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if (!res.ok) throw new Error('Errore nel server');
                return res.json();
            })
            .then(data => {
                if (data.success === true) {
                    return getTasks().then(() => data);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Errore nella rimozione della task:', error);
                throw error;
            });
    }


    function updateTask(taskId, updatedData) {
        return fetch(`${url}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        })
            .then(res => {
                if (!res.ok) throw new Error('Errore nel server');
                return res.json();
            })
            .then(data => {
                if (data.success === true) {
                    return getTasks().then(() => data);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error('Errore nella modifica della task:', error);
                throw error;
            });
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