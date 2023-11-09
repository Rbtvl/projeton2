//Componente Tela LoginScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Button
            title="Ir para a tela principal"
            onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default LoginScreen;
