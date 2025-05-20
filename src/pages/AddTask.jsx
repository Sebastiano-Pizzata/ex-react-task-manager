import { useState, useRef, useMemo } from 'react';


export default function AddTask() {

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const [taskTitle, setTaskTitle] = useState('');
    const descriptionRef = useRef();
    const statusRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        const refDesc = descriptionRef.current.value;
        const status = statusRef.current.value;

        if (taskTitle.trim() === '') {
            alert('Il campo non può essere vuoto');
            return;
        }
        for (let i = 0; i < taskTitle.length; i++) {
            if (symbols.includes(taskTitle[i])) {
                alert('Il titolo non può contenere simboli speciali');
                return;
            }
        }

        console.log(`Nuova Task: ${taskTitle}, ${refDesc}, ${status}`)

    }

    return (
        <>
            <section className='container row col-3 p-5'>
                <form onSubmit={handleSubmit}>
                    <div className='input-group mb-3'>
                        <label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='title'
                                value={taskTitle}
                                onChange={e => setTaskTitle(e.target.value)} />
                        </label>
                    </div>
                    <div className='input-group mb-3'>
                        <label>
                            <textarea
                                rows={5}
                                className="form-control"
                                placeholder='description'
                                ref={descriptionRef} />
                        </label>
                    </div>
                    <div className='input-group mb-3'>
                        <label>
                            <select className="form-select"
                                ref={statusRef}>
                                <option value="">Seleziona</option>
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary'>Aggiungi Task</button>
                    </div>
                </form>
            </section>

        </>
    )
}