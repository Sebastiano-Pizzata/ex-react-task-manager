import Modal from "./Modal";
import { useRef, useState, useEffect } from 'react'

export default function EditTaskModal({
    show = false,
    onClose = () => { },
    task = {},
    onSave = () => { }
}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('')

    const formRef = useRef();

    function formSubmit() {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }

    useEffect(() => {
        setTitle(task.title || '');
        setDescription(task.description || '');
        setStatus(task.status || '');
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, description, status });
        onClose();
    }

    return (
        <Modal
            title={"Modifica Task"}
            content={
                <section className='container row col-12 p-5'>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className='input-group mb-3'>
                            <label className="form-label">
                                Titolo
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="form-control"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)} />
                            </label>
                        </div>
                        <div className='input-group mb-3'>
                            <label className="form-label">
                                Descrizione
                                <textarea
                                    rows={5}
                                    placeholder="Description"
                                    className="form-control"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)} />
                            </label>
                        </div>
                        <div className='input-group mb-3'>
                            <label className="form-label">
                                Stato
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}>
                                    <option value="">Seleziona</option>
                                    <option value="To do">To do</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                </select>
                            </label>
                        </div>
                    </form>
                </section>
            }
            confirmText={"Salva"}
            onConfirm={formSubmit}
            onClose={onClose}
            show={show}
        />
    )
}