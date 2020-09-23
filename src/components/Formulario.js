import React, { useEffect, useState } from 'react';
import Error from './Error';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import PropTypes from 'prop-types';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color 

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // State del listado de Criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);
    // State para validar si existen errores 
    const [ error, guardarError ] = useState(false);

    // Arreglo de monedas
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar Americano' },
        { codigo: 'ARS', nombre: 'Peso Argentino' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda( 'Elije tu Moneda: ', '', MONEDAS );

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elije tu Criptomoneda: ', '', listacripto);

    // Ejecutamos llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace submit 
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos 
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        // Pasar los datos al componente principal 
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Debe seleccionar una opción en ambos campos'/> : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton
            type="submit"
            value="CALCULAR"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
}
 
export default Formulario;