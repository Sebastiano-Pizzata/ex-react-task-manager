import { useEffect, useState, useMemo, useCallback } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { tasks, fetchTasks } = useGlobalContext();


    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }



    useEffect(() => {
        fetchTasks()
    }, []);

    console.log(tasks)

    const [searchQuery, setSearchQuery] = useState('');

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const debounceSearch = useCallback(
        debounce(setSearchQuery, 500),
        []);

    const sortIcon = sortOrder === 1 ? '↓' : '⭡'

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }


    const sortedAndFilteredTask = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder, searchQuery])


    return (
        <>
            <section className="container mt-5">
                <h1 className="mb-4 text-center">Lista delle Task</h1>
                <div className="input-group mb-4">
                    <label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cerca una Task..."
                            onChange={e => debounceSearch(e.target.value)} />
                    </label>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-primary">
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
                                sortedAndFilteredTask.map((task) => {
                                    return <TaskRow key={task.id} task={task} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}