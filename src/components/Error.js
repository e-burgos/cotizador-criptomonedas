import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const MensajeError = styled.p`
    background-color: #B7322C;
    padding: 1rem;
    color: #FFF;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
    border-radius: 10px;
`;

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>
            {mensaje}
        </MensajeError>
     );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;