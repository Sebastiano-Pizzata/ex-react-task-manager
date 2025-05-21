import { useGlobalContext } from "../context/GlobalContext";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from "./Modal";

export default function TaskDetail() {

    const { tasks, removeTask } = useGlobalContext();

    const [singleTask, setSingleTask] = useState(null)

    const { id } = useParams();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);



    useEffect(() => {
        const taskS = tasks.find((t) => t.id.toString() === id);
        setSingleTask(taskS)
    }, [id, tasks])

    if (!singleTask) {
        return <div>Caricamento task O task non trovata.</div>;
    }


    function deleteTask() {
        removeTask(singleTask.id)
            .then(() => {
                alert('Eliminazione avvenuta con successo');
                navigate('/');
            })
            .catch(error => alert(`Errore: ${error.message}`))
    }

    function handleClick() {
        setShow(true)
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
                        <button onClick={handleClick}
                            className="btn btn-danger"
                            disabled={show}>Elimina Task</button>
                    </div>
                </div>

            </div>
            {show && (
                <Modal
                    title="Eliminazione Task"
                    content={singleTask}
                    show={show}
                    onClose={() => setShow(false)}
                    onConfirm={deleteTask}
                />
            )}
        </section>
    )
}