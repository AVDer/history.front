import React from 'react';
import styled from 'styled-components';

import Field from '../components/Field'
import Settings from '../components/Settings'

import TimelineField from '../components/TimelineField'

import {kDefaultDate} from '../constants';

const Header = styled.p`
    background-color: cornsilk;
    font-family: 'Kurale';
    font-size: 24px;
    
    margin-bottom: 20px;

    text-align: center;

    &::first-letter {
        font-size: 28px;
        font-weight: bold;
        color: crimson;
    }
`;


const MainPage = () => {

  let displayDate = kDefaultDate;
  let displayLands = [];
  let dateUpdateFn;
  let landUpdateFn;

  function updateSettings(dateSettings, landsSettings) {
    displayDate = dateSettings;
    displayLands = landsSettings;
    console.log(displayLands);
    dateUpdateFn(displayDate);
    landUpdateFn(displayLands);
  }

  function updateDateSetter(setDateFn, setLandFn) {
    dateUpdateFn = setDateFn;
    landUpdateFn = setLandFn;
  }

  return (
    <Field>
      <Header>
        Timeline
      </Header>
      <Settings updateTime={updateSettings}/>
      <TimelineField updateDateSetter={updateDateSetter} />
    </Field>
  )
}

export default MainPage;