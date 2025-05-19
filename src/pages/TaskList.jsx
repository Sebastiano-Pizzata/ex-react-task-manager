import { useEffect } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function TaskList() {
    const { tasks, fetchTasks } = useGlobalContext();

    useEffect(() => {
        fetchTasks()
    }, [])

    console.log(tasks)

    return (
        <>
            <section>
                <div>
                    <ul>
                        {
                            tasks.map((t) => {
                                return (
                                    <li key={t.id}>
                                        <h3>{t.title}</h3>
                                        <p>{t.description}</p>
                                        <p>{t.status}</p>
                                        <p>{t.createdAt}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}