import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import './styles.scss';

const DayOfBirthSelector = forwardRef(({ value, onChange }, ref) => {
    const currentYear = new Date().getFullYear();
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(currentYear);
    const [dayInMonth, setDayInMonth] = useState([]);

    console.log(value);

    useEffect(() => {
        if (value && typeof value === 'string') {
            const [yearValue, monthValue, dayValue] = value ? value.split('-') : [];
            setDay(Number(dayValue));
            setMonth(Number(monthValue));
            setYear(Number(yearValue));
        }
    }, [value]);

    useEffect(() => {
        const updateDayInMoth = () => {
            const days = new Date(year, month, 0).getDate();
            const daysArray = Array.from({ length: days }, (_, i) => i + 1);
            setDayInMonth(daysArray);
            
            if (day > days) {
                setDay(days);
            }
        };

        updateDayInMoth();
    }, [month, year]);

    useEffect(() => {
        if (onChange) {
            onChange(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
    }, [day, month, year, onChange]);

    return (
        <div className='dob-box' ref={ref}>
            <div className="day">
                <select name="" id="day" value={day} onChange={(e) => setDay(Number(e.target.value))}>
                    { dayInMonth.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    )) }
                </select>
            </div>

            <div className="month">
                <select name="" id="month" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Tháng { i + 1 }
                        </option>
                    ))}
                </select>
            </div>

            <div className="year">
                <select name="" id="year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
                    {Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (
                        <option key={currentYear - i} value={currentYear - i}>
                            { currentYear - i }
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
})

export default DayOfBirthSelector;