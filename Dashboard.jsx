import './Dashboard.css';
import CompactCalendar from './CompactCalendar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './Layout';

function Dashboard() {

    const [time, setTime] = useState(new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }));

    function updateTime() {

        const now = new Date();
        const formatted = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // change to false for 24-hour format
        });
        setTime(formatted);
    }

    setInterval(updateTime, 1000); // call the function every one second

    return (

        <>
            <Layout>
                <div className='dashboard'>
                    <h2>Dashboard Activity</h2>

                    <img src='/backdrop.jpg'></img>
                </div>

                <div className='clock'>
                    <h1> {time} </h1>
                </div>

                <div className='calendar'>
                    <CompactCalendar />
                </div>
        
            </Layout>
        </>
    )
}

export default Dashboard