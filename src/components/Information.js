import React, {useState} from 'react';

import Chapter from './Chapter';

//import logo from '../images/logo512.png';

const dateToString = (dateStruct) => {
    if (dateStruct.y === 2100) {
        return 'Now';
    }
    let annoDomino = true;
    let year = dateStruct.y;
    if (year < 0) {
        annoDomino = false;
        year *= -1;
    }
    let dateString = '';
    /*
    if (dateStruct.d < 10) dateString += '0';
    dateString += (dateStruct.d + '/');
    if (dateStruct.m < 10) dateString += '0';
    dateString += (dateStruct.m + '/' + year + ' ');
    */
    dateString += year + ' ';
    dateString += (annoDomino ? 'AD' : 'BC');
    return dateString;
}


const Information = (props) => {

    const [values, setValues] = useState({name: 'N/A', start: {d: 1, m: 1, y: 1000}, end: {d: 2, m: 2, y: 2000}, url: '/wiki/Augustus'});
    const [logo, setLogo] = useState('');

    props.updateInfoSetter(setValues);

    const startDateString = dateToString(values.start);
    const endDateString = dateToString(values.end);


    const pageThumbnail = (title) => {
    
        let url = "https://en.wikipedia.org/w/api.php"; 
    
        var params = {
            action: "query",
            prop: "pageimages",
            titles: title,
            format: "json",
            pilimit: 1,
            pithumbsize: 200
        };
    
        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    
        fetch(url)
            .then(function(response){return response.json();})
            .then(function(response) {
                const pages = response.query.pages;
                for (let page in pages) {
                    const logoSrc = pages[page].thumbnail.source;
                    if (logo !== logoSrc) setLogo(logoSrc);
                }
            })
            .catch(function(error){console.log(error);});
    }

    if (values.url) pageThumbnail(values.url.substring(6));

    return (
        <Chapter>
            <div style={{textAlign: "center"}}>
                <img src={logo} height='200px' alt=''></img>
                <p className="sizeBig">{values.name}</p>
                <p className="sizeNormal">{startDateString + ' - ' + endDateString}</p>
            </div>
        </Chapter>
    )
}

export default Information;