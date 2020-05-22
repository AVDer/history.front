import React, {useState} from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

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

const GET_LEADERS = gql`
    query {
        leaders {
        nameLatin
        land
        start {y}
        end {y}
        }
    }
`;

const TimelineField = (props) => {

    const [dateData, setDateData] = useState({startDate: 800, endDate: 1000, redlineDate: 870});
    props.updateDateSetter(setDateData);
    // query hook
    const { data, loading, error, fetchMore } = useQuery(GET_LEADERS);

    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    let leader_data = data['leaders'];

    const lands = Array.from(new Set(leader_data.map(record => record.land).flat()));
    const timeStart = dateData.startDate;
    const timeEnd = dateData.endDate;
    const redlinePos = (dateData.redlineDate - timeStart) / (timeEnd - timeStart) * 90 + 5;

    return (
        <TimelineFieldStyle>
            {Array.from(lands.keys()).map(x => (
                <Timeline key={x} color={kColors[x]} land={lands[x]} timeStart={timeStart} timeEnd={timeEnd}
                data={leader_data.filter(
                    v => v.land.includes(lands[x]) && v.end.y > timeStart && v.start.y < timeEnd
                )}/>
            ))}
            <RedlineStyle pos={redlinePos}/>
            <DateLabelStyle Pos='Left'> {timeStart} </DateLabelStyle>
            <DateLabelStyle Pos='Redline' rl={redlinePos + '%'}> {dateData.redlineDate} </DateLabelStyle>
            <DateLabelStyle Pos='Right'>{timeEnd} </DateLabelStyle>
        </TimelineFieldStyle>
    )
}

export default TimelineField;

// v => v.land.includes(lands[x] && v.end.y > tstart