import React from 'react';
import {Text} from 'react-native';

const DetallesCliente = ({route}) => {

    console.log(route.params)

    return (  
        <Text>Desde detalles Cliente</Text>
    );
}
 
export default DetallesCliente;