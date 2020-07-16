import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
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
                        onPress={() => navigation.navigate('DetallesCliente', {item})}
                    />
                )}
            />

            <FAB 
                icon='plus'
                style={styles.fab}
                onPress={() => navigation.navigate('NuevoCliente', {guardarConsultarAPI})}
                color="black"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 18
    }
})
 
export default Inicio;