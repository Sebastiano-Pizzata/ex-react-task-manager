import { NavLink, Link } from "react-router-dom"

export default function Header() {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand bg-body-tertiary">
                    <div className="nav navbar-nav">
                        <NavLink className="nav-item nav-link" to="/">
                            TaskPage
                        </NavLink>
                        <NavLink className="nav-item nav-link" to='/addTask'>
                            AddTask
                        </NavLink>
                    </div>
                </nav>
            </header>
        </>
    )
}