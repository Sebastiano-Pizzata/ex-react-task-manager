import { useGlobalContext } from "../context/GlobalContext";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function TaskDetail() {

    const { tasks, removeTask } = useGlobalContext();

    const [singleTask, setSingleTask] = useState(null)

    const { id } = useParams();

    const navigate = useNavigate();



    useEffect(() => {
        const taskS = tasks.find((t) => t.id.toString() === id);
        setSingleTask(taskS || null)
    }, [id, tasks])

    if (!singleTask) {
        return <div>Caricamento task O task non trovata.</div>;
    }

    function handleClick() {
        removeTask(singleTask.id)
            .then(() => {
                alert('Eliminazione avvenuta con successo');
                navigate('/');
            })
            .catch(error => alert(`Errore: ${error.message}`))
    }

    const rowClass =
        singleTask.status === "To do" ? "text-danger" :
            singleTask.status === "Doing" ? "text-warning" :
                "text-success";

    return (
        <section className="container col-3 mt-3">
            <div className="card">
                <div className="card-body">
                    <p className="card-title">{singleTask.title}</p>
                    <p className="card-text">{singleTask.description}</p>
                    <p className={`card-text ${rowClass}`}>{singleTask.status}</p>
                    <p className="card-text ">{singleTask.createdAt}</p>
                    <div>
                        <button onClick={handleClick} className="btn btn-danger">Elimina Task</button>
                    </div>
                </div>

            </div>
        </section>
    )
}