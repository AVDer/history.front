import React from 'react';
import styled from 'styled-components';

import Timeline from './Timeline';

const TimelineFieldStyle = styled.div`
    position: relative;
    border-style: solid;
    border-width: 2px;
    border-color: black;

    font-family: 'Kurale';
    font-size: 16px;

    padding-bottom: 50px;
`;

const RedlineStyle = styled.div`
    position: absolute;
    background-color: red;
    width: 2px;
    top: 0;
    height: 80%;
    left: ${props => props.pos}%;
`;

const DateLabelStyle = styled.p`
    position: absolute;
    color: brown;
    left: ${props => props.Pos === 'Left' ? '5%' : 'Redline' ? props.rl : 'auto'};
    right: ${props => props.Pos === 'Right' ? '5%' : 'auto'};
    bottom: 0;
`;

const kColors = ["blue", "red"];

const TimelineField = (props) => {
    const lands = Array.from(new Set(props.data.map(record => record.land).flat()));
    const [timeStart, timeEnd] = props.range.split('-');
    const redlinePos = (props.redline - timeStart) / (timeEnd - timeStart) * 90 + 5;

    return (
        <TimelineFieldStyle>
            {Array.from(lands.keys()).map(x => (
                <Timeline key={x} color={kColors[x]} land={lands[x]} timeStart={timeStart} timeEnd={timeEnd}
                data={props.data.filter(
                    v => v.land.includes(lands[x]) && v.end.y > timeStart && v.start.y < timeEnd
                )}/>
            ))}
            <RedlineStyle pos={redlinePos}/>
            <DateLabelStyle Pos='Left'> {timeStart} </DateLabelStyle>
            <DateLabelStyle Pos='Redline' rl={redlinePos + '%'}> {props.redline} </DateLabelStyle>
            <DateLabelStyle Pos='Right'>{timeEnd} </DateLabelStyle>
        </TimelineFieldStyle>
    )
}

export default TimelineField;

// v => v.land.includes(lands[x] && v.end.y > tstart