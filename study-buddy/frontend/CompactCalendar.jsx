import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CompactCalendar.css'; 

const CompactCalendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h3 style={{ color: '#fff' }}>Calendar</h3>
            <Calendar
                onChange={setDate}
                value={date}
                calendarType="iso8601"
                tileClassName={({ date }) => {
                    const today = new Date();
                    return date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear()
                        ? 'highlight' : null;
                }}
            />
        </div>
    );
};

export default CompactCalendar;
