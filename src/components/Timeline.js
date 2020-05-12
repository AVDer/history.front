import React from 'react';
import styled from 'styled-components';

import Period from './Period';

const kLineWidth = 5;

const Line = styled.div`
    
    position: relative;
    top: ${kLineWidth}px;
    width: 90%;
    height: ${kLineWidth}px;
    background-color: ${props => props.color || "black"};
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    margin-bottom: ${4 * kLineWidth}px;
`;

const ArrowRight = styled.div`
    position: absolute;
    right: ${-1.5 * kLineWidth}px;
    top: ${-1.5 * kLineWidth}px;
    width: 0; 
    height: 0; 
    border-top: ${2 * kLineWidth}px solid transparent;
    border-bottom: ${2 * kLineWidth}px solid transparent;
    
    border-left: ${2 * kLineWidth}px solid ${props => props.color || "black"};;
`;

const Caption = styled.p`
    position: absolute;
    left: -5%;
    top: ${-6 * kLineWidth}px;
    color: ${props => props.color || "black"};
`;

const Timeline = (props) => {
    //console.log(props.data);
    let id = 0;
    return (
        <React.Fragment>
            <Line color={props.color}>
                <ArrowRight color={props.color}/>
                <Caption color={props.color}>
                    {props.land}
                </Caption>
                {     
                    props.data.map(x => (<Period color={props.color} timeStart={props.timeStart} timeEnd={props.timeEnd} value={x} key={id++}/>))
                }
            </Line>
        </React.Fragment>
    )
}

export default Timeline;