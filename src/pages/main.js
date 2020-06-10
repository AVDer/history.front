import React from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Field from '../components/Field'
import Settings from '../components/Settings'
import Information from '../components/Information'

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
  let infoUpdateFn;

  function updateSettings(dateSettings, landsSettings) {
    displayDate = dateSettings;
    displayLands = landsSettings;
    //console.log(displayLands);
    dateUpdateFn(displayDate);
    landUpdateFn(displayLands);
  }

  function updateDateSetter(setDateFn, setLandFn) {
    dateUpdateFn = setDateFn;
    landUpdateFn = setLandFn;
  }

  function newItemSelected(item) {
    console.log(item);
    infoUpdateFn(item);
  }

  function updateInfoSetter(setInfoFn) {
    infoUpdateFn = setInfoFn;
  }

  return (
    <Field>
      <Header>
        Timeline
      </Header>
      <Container fluid>
        <Row>
          <Col sm="8">
            <Settings updateTime={updateSettings}/>
          </Col>
          <Col sm="4">
            <Information updateInfoSetter={updateInfoSetter}/>
          </Col>
        </Row>
      </Container>
      
      <TimelineField updateDateSetter={updateDateSetter} itemSelectFn={newItemSelected}/>
    </Field>
  )
}

export default MainPage;