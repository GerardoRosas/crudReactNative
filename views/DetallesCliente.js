import React from 'react';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'
import { View, StyleSheet, Alert } from 'react-native';
import globalStyles from '../styles/global';
import axios from 'axios'

const DetallesCliente = ({route, navigation}) => {

    const { guardarConsultarAPI } = route.params;
    const { nombre, correo, empresa, telefono, id } = route.params.item; 

    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Estas seguro de eliminar?',
            '',
            [
                {text: 'Confirmar', onPress: () => eliminarContacto() },
                {text: 'Cancelar', style: 'cancel'}
            ]
        )
    };

    const eliminarContacto = async () => {
        const url = `http://localhost:3000/clientes/${id}`;

        try {
            await axios.delete(url);
        } catch (error) {
            console.log(error)
        }

        //Redireccionar 
        navigation.navigate('Inicio')

        //volver a consultar API
        guardarConsultarAPI(true);

    }

    return (  
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Teléfono: <Subheading>{telefono}</Subheading></Text>

            <Button mode="contained" icon="cancel" style={styles.boton}
                onPress={() => mostrarConfirmacion()}
            >
                Eliminar Cliente
            </Button>

            <FAB 
                icon='pencil'
                style={globalStyles.fab}
                //Se le pasa el objeto completo de cada usuario a la vista
                onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item, guardarConsultarAPI})}
                color="black"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    texto:{
        marginBottom: 20,
        fontSize: 18
    },
    boton:{
        marginTop: 180,
        backgroundColor: 'red'
    }
    
})
 
export default DetallesCliente;