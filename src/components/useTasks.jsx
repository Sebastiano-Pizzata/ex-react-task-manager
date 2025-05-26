import { useState, useEffect } from 'react'

export default function useTasks() {

    const url = import.meta.env.VITE_ENDPOINT_URL;

    const [tasks, setTasks] = useState([]);

    async function getTasks() {
        try {
            const res = await fetch(`${url}/tasks`);
            if (!res.ok) {
                throw new Error('Errore nel server');
            }
            const data = await res.json();
            setTasks(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async function addTask(task) {
        try {
            const response = await fetch(`${url}/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Errore nel server');
            }

            const data = await response.json();

            if (data.success === true) {
                await getTasks();
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Errore nell'aggiunta della task:", error);
            throw error;
        }
    }





    async function removeTask(taskId) {
        try {
            const response = await fetch(`${url}/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Errore nel server');
            }

            const data = await response.json();

            if (data.success === true) {
                await getTasks();
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Errore nella rimozione della task:', error);
            throw error;
        }
    }



    async function updateTask(taskId, updatedData) {
        try {
            const response = await fetch(`${url}/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Errore nel server');
            }

            const data = await response.json();

            if (data.success === true) {
                await getTasks();
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Errore nella modifica della task:', error);
            throw error;
        }
    }





    return {
        tasks,
        getTasks,
        addTask,
        removeTask,
        updateTask
    }


}