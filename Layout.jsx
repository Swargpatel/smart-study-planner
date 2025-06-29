import { Link, useLocation } from 'react-router-dom';
import './Layout.css'

function Layout({ children, whiteBoxClass = '', whiteBoxStyle = {} }) {

    const location = useLocation();

    return (

        <div className="backdrop">
            <div className={`white-box ${whiteBoxClass}`} style={whiteBoxStyle}>

                <nav className='sidebar'>
                    <ul>
                        <li id='logo'>
                            <Link to='/'>
                                <img src="/logo.svg"></img>
                                <h5>StudyBuddy</h5>
                            </Link>
                        </li>

                        <div className='page-names'>
                            <li id='dashboard'>
                                <Link to='/'
                                    className={location.pathname === '/' ? 'active-link' : ''}>

                                    <img src="/dashboard.svg"></img>
                                    Dashboard
                                </Link>
                            </li>

                            <li id='subject'>
                                <Link to='/subject'
                                    className={location.pathname === '/subject' ? 'active-link' : ''}>

                                    <img src='/subject.svg'></img>
                                    Subjects
                                </Link>
                            </li>

                            <li id='task'>
                                <Link to='/tasks'
                                    className={location.pathname === '/tasks' ? 'active-link' : ''}>

                                    <img src='/task.svg'></img>
                                    Tasks
                                </Link>
                            </li>

                            <li id='calendar'>
                                <Link to='/calendar'
                                    className={location.pathname === '/calendar' ? 'active-link' : ''}>

                                    <img src='/calendar.svg'></img>
                                    Calendar
                                </Link>
                            </li>

                            <li>
                                <img src='/log-out.svg'></img>
                                Log-out
                            </li>
                        </div>
                    </ul>
                </nav>

                {children}

            </div>
        </div>
    );
}

export default Layout