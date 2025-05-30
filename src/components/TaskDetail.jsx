import { useGlobalContext } from "../context/GlobalContext";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from "./Modal";
import EditTaskModal from "./EditTaskModal";

export default function TaskDetail() {

    const { tasks, removeTask, updateTask } = useGlobalContext();

    const [singleTask, setSingleTask] = useState(null)

    const { id } = useParams();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)



    useEffect(() => {
        const taskS = tasks.find((t) => t.id === parseInt(id));
        setSingleTask(taskS)
    }, [id, tasks])

    if (!singleTask) {
        return <div>Caricamento task O task non trovata.</div>;
    }


    async function deleteTask() {
        try {
            await removeTask(singleTask.id);
            alert('Eliminazione avvenuta con successo');
            navigate('/');
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    }

    async function saveUpdatedTask(updateData) {
        try {
            await updateTask(singleTask.id, updateData);
            alert('Modifica avvenuta con successo');
            setShowUpdate(false);
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
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
                    <div className="d-flex gap-3">
                        <div>
                            <button
                                onClick={() => setShowUpdate(true)}
                                className="btn btn-warning">Modifica Task</button>
                        </div>
                        <div>
                            <button
                                onClick={handleClick}
                                className="btn btn-danger"
                                disabled={show}>Elimina Task</button>
                        </div>

                    </div>
                </div>

            </div>
            {show && (
                <Modal
                    title="Eliminazione Task"
                    content={<div>
                        <p>Sei sicuro di voler eliminare il task <strong>{singleTask.title}</strong>?</p>
                        <p><strong>Descrizione:</strong> {singleTask.description}</p>
                        <p><strong>Status:</strong> {singleTask.status}</p>
                        <p><strong>Creato il:</strong> {singleTask.createdAt}</p>
                    </div>}
                    show={show}
                    onClose={() => setShow(false)}
                    onConfirm={deleteTask}
                />
            )}
            {
                showUpdate && (
                    <EditTaskModal
                        show={showUpdate}
                        onClose={() => setShowUpdate(false)}
                        task={singleTask}
                        onSave={saveUpdatedTask} />
                )
            }
        </section>
    )
}