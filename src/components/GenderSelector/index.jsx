import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const GenderSelector = forwardRef(({ onChange, value }, ref) => {
    const [gender, setGender] = useState(null); 

    useEffect(()=> {
        if (value === 'male') setGender(0);
        else if (value === 'female') setGender(1);
        else if (value === 'other') setGender(2);
    }, [value]);

    useEffect(() => {
        if (onChange) {
            onChange(gender === 0 ? 'male' : gender === 1 ? 'female' : 'other');
        }
    }, [gender, onChange]);

    return (
        <div ref={ref} className='gender-selector'>
            <input 
                type="checkbox" 
                name="" 
                id="sex_0" 
                value={0} 
                checked={gender === 0} 
                onChange={(e) => setGender(Number(e.target.value))} 
                style={{
                    backgroundImage: gender === 0 && 'url(/images/bg_checkbox_checked.png)'
                }}
            />
            <label htmlFor="">Nam</label>

            <input 
                type="checkbox" 
                name="" 
                id="sex_1" 
                value={1} 
                checked={gender === 1} 
                onChange={(e) => setGender(Number(e.target.value))} 
                style={{
                    backgroundImage: gender === 1 && 'url(/images/bg_checkbox_checked.png)'
                }}
            />
            <label htmlFor="">Nữ</label>

            <input 
                type="checkbox" 
                name="" 
                id="sex_2" 
                value={2} 
                checked={gender === 2} 
                onChange={(e) => setGender(Number(e.target.value))} 
                style={{
                    backgroundImage: gender === 2 && 'url(/images/bg_checkbox_checked.png)'
                }}
            />
            <label htmlFor="">Khác</label>
        </div>
    );
});

export default GenderSelector;