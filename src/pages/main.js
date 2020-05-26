import React from 'react';
import styled from 'styled-components';

import Field from '../components/Field'
import Settings from '../components/Settings'

import TimelineField from '../components/TimelineField'

const Header = styled.p`
    background-color: cornsilk;
    font-family: 'Kurale';
    font-size: 24px;
    
    padding: 20px;
    margin: 20px;

    text-align: center;

    &::first-letter {
        font-size: 28px;
        font-weight: bold;
        color: crimson;
    }
`;


const MainPage = () => {

  let displayDate = {startDate: 800, endDate: 1000, redlineDate: 860};
  let dateUpdateFn;

  function updateDate(dateSettings) {
    displayDate = dateSettings;
    dateUpdateFn(displayDate);
  }

  function updateDateSetter(setDateFn) {
    dateUpdateFn = setDateFn;
  }

  return (
    <Field>
      <Header>
        Timeline
      </Header>
      <Settings updateTime={updateDate}/>
      <TimelineField updateDateSetter={updateDateSetter} />
    </Field>
  )
}

export default MainPage;