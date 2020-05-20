import React from 'react';
import styled from 'styled-components';

import Field from '../components/Field'
import Settings from '../components/Settings'
import Chapter from '../components/Chapter'

import TimelineField from '../components/TimelineField'



const MainPage = (props) => {

  let startTime = 800;
  let EndTime = 1000;
  let redlineTime = 860;

  function updateTime(timeSettings) {
    console.log(timeSettings);
    startTime = timeSettings.startTime;
  }

  return (
    <Field>
      <Chapter>
        Some Text
      </Chapter>
      <Settings updateTime={updateTime}/>
      <TimelineField range={startTime + ' - ' + EndTime} redline={redlineTime} />
    </Field>
  )
}

export default MainPage;