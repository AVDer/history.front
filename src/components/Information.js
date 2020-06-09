import React, {useState} from 'react';

import Chapter from './Chapter';

import logo from '../images/logo512.png';

const dateToString = (dateStruct) => {
    let annoDomino = true;
    if (dateStruct.y < 0) {
        annoDomino = false;
        dateStruct.y *= -1;
    }
    let dateString = '';
    if (dateStruct.d < 10) dateString += '0';
    dateString += (dateStruct.d + '/');
    if (dateStruct.m < 10) dateString += '0';
    dateString += (dateStruct.m + '/' + dateStruct.y + ' ');
    dateString += (annoDomino ? 'AD' : 'BC');
    return dateString;
}

const Information = (props) => {

    const [values, setValues] = useState({name: 'N/A', start: {d: 1, m: 1, y: 1000}, end: {d: 2, m: 2, y: 2000}, url: ''});

    const startDateString = dateToString(values.start);
    const endDateString = dateToString(values.end);

    return (
        <Chapter>
            <div style={{textAlign: "center"}}>
                <img src={logo} width='50%' alt=''></img>
                <p className="sizeBig">{values.name}</p>
                <p className="sizeNormal">{startDateString + ' - ' + endDateString}</p>
            </div>
        </Chapter>
    )
}

export default Information;