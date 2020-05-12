import React from 'react';
import styled from 'styled-components';


const FieldBody = styled.div`
    background-color: cornsilk;
    padding: 20px;
    border-radius: 10px;
`;


const Field = (props) => {
    return (
        <FieldBody>
            {props.children}
        </FieldBody>
    )
}

export default Field;