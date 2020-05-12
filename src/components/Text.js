import React from 'react';
import styled from 'styled-components';


const TextParagraph = styled.p`
    background-color: cornsilk;
    font-family: 'Kurale';
    font-size: 16px;
    

    padding: 20px;

    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0,0,0,.5);

    &::first-letter {
        font-size: 18pz;
        font-weight: bold;
        color: crimson;
    }
`;


const Text = (props) => {
    return (
        <TextParagraph>
            {props.children}
        </TextParagraph>
    )
}

export default Text;