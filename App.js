import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

export default function App() {
    const [cep, setCep] = useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    async function buscar() {
        if (cep === '') {
            alert('Digite um CEP válido');
            setCep('');
            return;
        }

        try {
            const response = await api.get(`/${cep}/json`);
            console.log(response.data);
            setCepUser(response.data);
            Keyboard.dismiss(); // Fecha o teclado
        } catch (error) {
            console.log('ERROR: ' + error);
        }
    }

    function limpar() {
        setCep('');
        inputRef.current.focus();
        setCepUser(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>Digite o CEP desejado</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: 79003241"
                    value={cep}
                    onChangeText={(texto) => setCep(texto)}
                    keyboardType="numeric"
                    ref={inputRef}
                />
            </View>

            <View style={styles.areaBtn}>
                <TouchableOpacity
                    style={[styles.botao, { backgroundColor: '#1d75cd' }]}
                    onPress={buscar}
                >
                    <Text style={styles.botaoText}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
                    onPress={limpar}
                >
                    <Text style={styles.botaoText}>Limpar</Text>
                </TouchableOpacity>
            </View>

            {cepUser && (
                <View style={styles.card}>
                    <Text style={styles.cardText}><Text style={styles.label}>📍 CEP:</Text> {cepUser.cep}</Text>
                    <Text style={styles.cardText}><Text style={styles.label}>🏠 Logradouro:</Text> {cepUser.logradouro}</Text>
                    <Text style={styles.cardText}><Text style={styles.label}>🏘️ Bairro:</Text> {cepUser.bairro}</Text>
                    <Text style={styles.cardText}><Text style={styles.label}>🌆 Cidade:</Text> {cepUser.localidade}</Text>
                    <Text style={styles.cardText}><Text style={styles.label}>🗺️ Estado:</Text> {cepUser.uf}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    text: {
        marginTop: 25,
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        width: '90%',
        padding: 10,
        fontSize: 18,
    },
    areaBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
    },
    botao: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
    },
    botaoText: {
        fontSize: 22,
        color: '#FFF',
    },
    card: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-start', // Alinha os itens à esquerda
    },
    cardText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
    },
});
