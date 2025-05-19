import { useEffect } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks, fetchTasks } = useGlobalContext();

    useEffect(() => {
        fetchTasks()
    }, [])

    console.log(tasks)

    return (
        <>
            <section>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Stato</th>
                            <th scope="col">Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task) => {
                                return <TaskRow key={task.id} task={task} />
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}