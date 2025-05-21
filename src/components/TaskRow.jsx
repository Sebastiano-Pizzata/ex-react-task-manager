import { Link } from 'react-router-dom'
import { memo } from 'react'

const TaskRow = memo(({ task }) => {
    const rowClass =
        task.status === "To do" ? "table-danger" :
            task.status === "Doing" ? "table-warning" :
                "table-success";
    return (
        <tr className={rowClass}>
            <td><Link to={`task/${task.id}`}>{task.title}</Link></td>
            <td>{task.status}</td>
            <td>{task.createdAt}</td>
        </tr>
    )
})

export default TaskRow;