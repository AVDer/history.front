import React, {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Chapter from './Chapter';


const Settings = (props) => {

    const [values, setValues] = useState();

    const onChange = event => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });

        if (event.target.name === 'landSelector') {
            //event.persist();
            let selectedLands = [];
            for (let i = 0; i < event.target.options.length; ++i) {
                if (event.target.options[i].selected) selectedLands.push(event.target.options[i].innerHTML);
            }
            setValues({
                ...values,
                [event.target.name]: selectedLands
            });
        }

      };

    return (
        <Chapter>
                <Form onSubmit={event => {
                    event.preventDefault();
                    props.updateTime(values);
                }}>

                    <Form.Row>

                        <Col sm="8">

                            <Form.Group as={Row} controlId="startDate">
                                <Form.Label column sm="2">Start date:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" name="startDate" placeholder="Date: YYYY" onChange={onChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="endDate">
                                <Form.Label column sm="2">End date:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" name="endDate" placeholder="Date: YYYY" onChange={onChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="redlineDate">
                                <Form.Label column sm="2">Red line:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="number" name="redlineDate" placeholder="Date: YYYY" onChange={onChange} />
                                </Col>                            
                            </Form.Group>

                        </Col>

                        

                        <Col>

                            <Form.Group controlId="landSelector">
                                <Form.Label>Lands:</Form.Label>
                                <Form.Control as="select" multiple name="landSelector" onChange={onChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                            <Button>
                                Refresh
                            </Button>

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