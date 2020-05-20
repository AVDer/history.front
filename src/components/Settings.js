import React, {useState} from 'react';

import Chapter from './Chapter'

const Settings = (props) => {

    const [values, setValues] = useState();

    const onChange = event => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };

    return (
        <Chapter>
                <form onSubmit={event => {
                    event.preventDefault();
                    props.updateTime(values);
                }}>
                    <label htmlFor="startDate">Start date:</label>
                    <input
                        required
                        type="number"
                        id="startDate"
                        name="startDate"
                        placeholder="Date: YYYY"
                        onChange={onChange}

                        //value='800'
                    />
                    <br/>
                    <label htmlFor="endDate">End date:</label>
                    <input
                        required
                        type="number"
                        id="endDate"
                        name="endDate"
                        placeholder="Date: YYYY"
                        onChange={onChange}

                        //value='1000'
                    />
                    <br/>
                    <label htmlFor="redlineDate">Red line:</label>
                    <input
                        required
                        type="number"
                        id="redlineDate"
                        name="redlineDate"
                        placeholder="Date: YYYY"
                        onChange={onChange}

                        //value='850'
                    />
                    <br/>
                    <button type="submit">Submit</button>
                </form>
        </Chapter>
    )
}

export default Settings;