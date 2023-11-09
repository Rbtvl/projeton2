//Componente CardAtleta.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const CardAtleta = ({ atleta, onAddToFavorites }) => {
    const {
        strThumb,
        strPlayer,
        strPosition,
        strHeight,
        strWeight,
        strDescriptionEN,
    } = atleta;

    return (
        <View>
            <Image source={{ uri: strThumb}} style={{ maxWidth: 300, height: 200 }} />
            <Text>{strPlayer}</Text>
            <Text>Posição: {strPosition}</Text>
            <Text>Altura: {strHeight}</Text>
            <Text>Peso: {strWeight}</Text>
            <Text>Descrição: {strDescriptionEN}</Text>
            <Button title="Adicionar aos favoritos" onPress={() => onAddToFavorites(atleta)} />
        </View>
    );
};

export default CardAtleta;