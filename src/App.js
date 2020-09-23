import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 40Nico%;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  // Creamos 2 states para poder leer la informacion del formulario y enviar los props hacia el resultado 
  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');

  // Creamos state para guardar el resultado
  const [ resultado, guardarResultado ] = useState({});

  // Creamos state para mostrar el sinner de carga
  const [ cargando, guardarCargando ] = useState(false);


  useEffect( () => {

    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if (moneda === '') return;

      // consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      // Mostrar el spinner
      guardarCargando(true);

      // Ocultar spinner y mostrar el resultado 
      setTimeout(() => {
        // Ocultar spinner
        guardarCargando(false);
        // Mostrar Resultado
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen Crypto"
        />
      </div>
      <div>
        <Heading>
          Cotiza criptomonedas al instante
        </Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
