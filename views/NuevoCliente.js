import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios'

const NuevoCliente = ({navigation, route}) => {

    const { guardarConsultarAPI } = route.params;

    //Campos Formulario
    const [nombre, guardarNombre ] = useState('');
    const [telefono, guardarTelefono ] = useState('')
    const [correo, guardarCorreo ] = useState('')
    const [empresa, guardarEmpresa ] = useState('');
    const [ alerta, guardarAlerta ] = useState(false);

    //Funcion del boton
    const guardarCliente = async () => {
        //Validar
        if(nombre === '' || telefono === '' || correo === '' || empresa === ''){
            guardarAlerta(true);
            return;
        }

        //Generar cliente
        const cliente = {nombre, telefono, empresa, correo};
        console.log(cliente);

        //Guardar el cliente en la API
        try {
            await axios.post('http://localhost:3000/clientes', cliente)
        } catch (error) {
            console.log(error)
        }

        //Redireccionar
        navigation.navigate('Inicio');

        //limpiar el formulario
        guardarNombre('');
        guardarCorreo('');
        guardarEmpresa('');
        guardarTelefono('');

        //Traer nuevo cliente a pagina de inicio
        guardarConsultarAPI(true);

    }

    return (  
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>
                Añadir Nuevo Cliente
            </Headline>

            <TextInput
                style={styles.input}
                label='Nombre'
                placeholder="e.g Gerardo"
                onChangeText={texto => guardarNombre(texto)}
                value={nombre}
            />
            <TextInput
                style={styles.input}
                label='Telefono'
                placeholder="55 1234 5678"
                onChangeText={texto => guardarTelefono(texto)}
                value={telefono}
            />
            <TextInput
                style={styles.input}
                label='Correo'
                placeholder="mail@mail.com"
                onChangeText={texto => guardarCorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input}
                label='Empresa'
                placeholder="Nombre empresa"
                onChangeText={texto => guardarEmpresa(texto)}
                value={empresa}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={() => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => guardarAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})
 
export default NuevoCliente;