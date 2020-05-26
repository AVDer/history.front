import React from 'react';

import Field from '../components/Field'
import Settings from '../components/Settings'
import Chapter from '../components/Chapter'

import TimelineField from '../components/TimelineField'



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
      <Chapter>
        Some Text
      </Chapter>
      <Settings updateTime={updateDate}/>
      <TimelineField updateDateSetter={updateDateSetter} />
    </Field>
  )
}

export default MainPage;