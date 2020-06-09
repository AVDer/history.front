import React from 'react';
import styled from 'styled-components';


const Test = styled.div` 

    border-right-width: 1px;
    border-left-width: 1px;
    border-top-width: 0;
    border-bottom-width: 0;
    border-style: solid;

    color: lightgrey;
    border-color: ${props => props.color};

    position: absolute;
    left: ${props => props.left}%;
    height: 20px;
    width: ${props => props.width}%;

    &:hover {
        color: ${props => props.color};
        background-color: ${props => props.color};
        font-size: 18px;
        font-weight: bold;
        z-index: 1;
    }  
`;

const PeriodLabel = styled.p`   
    text-align: left;
    transform: rotate(-15deg);
    padding: 0;
    position: absolute;
    
    top: -70px;
    left: 0;

    color: inherit;
    
    width: 200px;
`;

const Period = (props) => {
    const start = Math.max(props.value.start.y, props.timeStart) - props.timeStart;
    const end = Math.min(props.value.end.y, props.timeEnd) - props.timeStart;
    const left = (start) * 100 / (props.timeEnd - props.timeStart);
    const width = (end - start) * 100 / (props.timeEnd - props.timeStart);
    return (
        <Test color={props.color} left={left} width={width}
            onMouseEnter={() => props.itemSelectFn({name: props.value.nameLatin, start: props.value.start, end: props.value.end})}
            onMouseLeave={() => {}}>
            <PeriodLabel color={props.color} start={start} end={end}>
                {props.value.nameLatin}
            </PeriodLabel>
            
        </Test>
    )
}

export default Period;

//<PeriodMark color={props.color} start={start} end={end}/>