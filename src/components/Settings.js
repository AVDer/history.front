import React, {useState} from 'react';
import { useQuery, gql } from '@apollo/client';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Chapter from './Chapter';

import {kDefaultDate} from '../constants';

const Settings = (props) => {

    const [values, setValues] = useState(kDefaultDate);
    const [rlValue, rlSetValue] = useState(kDefaultDate.redlineDate);
    const [landsValue, landsSetValue] = useState(["Loading..."]);

    let selectedLands = [];

    const onChange = event => {

        if (event.target.name === 'landSelector') {
            //event.persist();
            selectedLands = [];
            for (let i = 0; i < event.target.options.length; ++i) {
                if (event.target.options[i].selected) selectedLands.push(event.target.options[i].innerHTML);
            }
        }
        else {
            setValues({
                ...values,
                [event.target.name]: parseInt(event.target.value)
            });
        }
    };

    const redlineChange = event => {
        rlSetValue(event.target.value);
        onChange(event);
    };

    let GET_LANDS = gql`
        query {
            lands(start: ${parseInt(values.startDate)}, end: ${parseInt(values.endDate)})
        }
    `;

    const { data, loading, error, fetchMore } = useQuery(GET_LANDS);
    if (loading) console.log("Loading...");
    else if (error) console.log("Error!");
    else {
        if (data.lands !== landsValue)
            landsSetValue(data.lands);
    }

    return (
        <Chapter>
                <Form onSubmit={event => {
                    event.preventDefault();
                    props.updateTime(values, selectedLands);
                }}>

                    <Form.Row>

                        <Col sm="8">

                            <Form.Group as={Row} controlId="startDate">
                                <Form.Label column sm="2">Start date:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" name="startDate" placeholder="Date: YYYY" defaultValue={kDefaultDate.startDate} onChange={onChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="endDate">
                                <Form.Label column sm="2">End date:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" name="endDate" placeholder="Date: YYYY" defaultValue={kDefaultDate.endDate} onChange={onChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="redlineDate">
                                <Form.Label column sm="2">Red line:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="range" min={values.startDate} max={values.endDate} defaultValue={kDefaultDate.redlineDate}  name="redlineDate" onChange={redlineChange} />
                                </Col>                            
                            </Form.Group>

                            <Form.Group controlId="redlineLabel" >
                                <Col sm={{span: 2, offset: 6}} >
                                    <Form.Control type="input" name="redlineLabel" value={rlValue} readOnly={true} style={{textAlign: "center"}}/>
                                </Col>                            
                            </Form.Group>

                        </Col>

                        

                        <Col>

                            <Form.Group controlId="landSelector">
                                <Form.Label>Lands:</Form.Label>
                                <Form.Control as="select" multiple name="landSelector" onChange={onChange} >
                                    {landsValue.map((land) => <option key={land}>{land}</option>)}
                                </Form.Control>
                            </Form.Group>

                        </Col>

                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        </Chapter>
    )
}

export default Settings;