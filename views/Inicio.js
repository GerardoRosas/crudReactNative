import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper'
import axios from 'axios';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {

    const [ clientes, guardarClientes ] = useState([]);
    const [ consultarAPI, guardarConsultarAPI ] = useState(true);

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const resultado = await axios.get('http://localhost:3000/clientes');
                guardarClientes(resultado.data);
                guardarConsultarAPI(false);
            } catch (error) {
                console.log(error)
            }
        }
        if(consultarAPI){
            obtenerClientesAPI()
        }
        
    }, [consultarAPI])

    return (  
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress={() => navigation.navigate('NuevoCliente', {guardarConsultarAPI})}>
                Nuevo Cliente
            </Button>
            
            <Headline style={globalStyles.titulo}>
                {clientes.length > 0 ? "Clientes" : 'Aún no hay clientes'}
            </Headline>

            <FlatList
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item}) => (
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        //Al dar click se pasan los datos como segundo argumento de la funcion
                        onPress={() => navigation.navigate('DetallesCliente', {item, guardarConsultarAPI})}
                    />
                )}
            />

            <FAB 
                icon='plus'
                style={globalStyles.fab}
                //Se le pasa el objeto completo de cada usuario a la vista
                onPress={() => navigation.navigate('NuevoCliente', {guardarConsultarAPI})}
                color="black"
            />
        </View>
    );
}

export default Inicio;