import { useEffect, useState, useMemo } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks, fetchTasks } = useGlobalContext();

    useEffect(() => {
        fetchTasks()
    }, []);

    console.log(tasks)

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? '↓' : '⭡'

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }


    const sortedTask = useMemo(() => {
        return [...tasks].sort((a, b) => {
            let comparison;
            if (sortBy === "title") {
                comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            } else if (sortBy === "status") {
                const statusOpt = ["To do", "Doing", "Done"];
                const indexA = statusOpt.indexOf(a.status);
                const indexB = statusOpt.indexOf(b.status);
                comparison = indexA - indexB;
            } else if (sortBy === "createdAt") {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB;
            }


            return comparison * sortOrder
        })
    }, [tasks, sortBy, sortOrder])


    return (
        <>
            <section className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('title')}
                                scope="col">Nome {sortBy === "title" && sortIcon}</th>
                            <th onClick={() => handleSort('status')}
                                scope="col">Stato{sortBy === "status" && sortIcon}</th>
                            <th onClick={() => handleSort('createdAt')}
                                scope="col">Data di Creazione{sortBy === "createdAt" && sortIcon}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedTask.map((task) => {
                                return <TaskRow key={task.id} task={task} />
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    )
}