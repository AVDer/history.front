import React, {useState} from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import Timeline from './Timeline';
import {kDefaultDate} from '../constants';

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

const kColors = ["blue", "red", "green", "yellow", "magenta", "cyan"];

const TimelineField = (props) => {

    const [dateData, setDateData] = useState(kDefaultDate);
    const [landData, setLandData] = useState([]);
    props.updateDateSetter(setDateData, setLandData);

    //const lands = Array.from(new Set(leader_data.map(record => record.land).flat()));
    const timeStart = dateData.startDate;
    const timeEnd = dateData.endDate;
    const redlinePos = (dateData.redlineDate - timeStart) / (timeEnd - timeStart) * 90 + 5;

    const GET_LEADERS = gql`
        query {
            leadersRange(start: ${parseInt(timeStart)}, end: ${parseInt(timeEnd)}) {
            nameLatin
            land
            start {y}
            end {y}
            url
            }
        }
    `;

    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_LEADERS);

    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    let leader_data = data['leadersRange'];

    return (
        <TimelineFieldStyle>
            {Array.from(landData.keys()).map(x => (
                <Timeline key={x} color={kColors[x]} land={landData[x]} timeStart={timeStart} timeEnd={timeEnd}
                data={leader_data.filter(
                    v => v.land.includes(landData[x]) && v.end.y > timeStart && v.start.y < timeEnd
                )}
                itemSelectFn={props.itemSelectFn}
                />
            ))}
            <RedlineStyle pos={redlinePos}/>
            <DateLabelStyle Pos='Left'> {timeStart} </DateLabelStyle>
            <DateLabelStyle Pos='Redline' rl={redlinePos + '%'}> {dateData.redlineDate} </DateLabelStyle>
            <DateLabelStyle Pos='Right'>{timeEnd} </DateLabelStyle>
        </TimelineFieldStyle>
    )
}

export default TimelineField;
