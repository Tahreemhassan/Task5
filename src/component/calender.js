import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [startDay, setStartDay] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const days = [];
        while (firstDay.getMonth() === month) {
            days.push(new Date(firstDay));
            firstDay.setDate(firstDay.getDate() + 1);
        }
        setDaysInMonth(days);
        setStartDay(new Date(year, month, 1).getDay());
    }, [currentDate]);

    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day.getDate() === today.getDate() &&
               day.getMonth() === today.getMonth() &&
               day.getFullYear() === today.getFullYear();
    };

    const isSelected = (day) => {
        return selectedDate &&
               day.getDate() === selectedDate.getDate() &&
               day.getMonth() === selectedDate.getMonth() &&
               day.getFullYear() === selectedDate.getFullYear();
    };

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={prevMonth}>&lt;</button>
                <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div className="day-names">
                {dayNames.map((day, index) => (
                    <div key={index} className="day-name">{day}</div>
                ))}
            </div>
            <div className="days">
                {[...Array(startDay)].map((_, index) => (
                    <div key={index} className="empty-day"></div>
                ))}
                {daysInMonth.map((day) => (
                    <div
                        key={day}
                        className={`day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(day)}
                    >
                        {day.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
