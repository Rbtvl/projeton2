//Componente PainelFavorito.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';

const PainelFavorito = ({ favoritos }) => {
    return (
        <View>
            <Text>Atletas Favoritos</Text>
            <FlatList
                data={favoritos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text>{item.strPlayer}</Text>}
            />
        </View>
    );
};

export default PainelFavorito;

