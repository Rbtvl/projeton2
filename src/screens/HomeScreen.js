//Componente Tela HomeScreen.js
import React, { useState} from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import CardAtleta from '../components/CardAtleta';
import PainelFavorito from '../components/PainelFavorito';
import axios from 'axios'; //Importe o axios

const HomeScreen = ({ navigation }) => {
    const [atletas, setAtletas] = useState([]); //Para armazenar os atletas da API
    const [nomeAtleta, setNomeAtleta] = useState(''); //Para armazenar o nome do atleta a ser pesquisado
    const [favoritos, setFavoritos] = useState([]); //Para armazenar os atletas favotitos
    const [erro, setErro] = useState(null); //Estado de controle para jogador não encotrado

    //Função para buscar atletas na API
    const buscarAtleta = async () => {
        const options = {
            method: 'GET',
            url: 'https://thesportsdb.p.rapidapi.com/searchplayers.php',
            params: { p: nomeAtleta }, //Uso da variável 'name' passada como parâmetro
            headers: {
              'X-RapidAPI-Key': '9cf0d562f6msh6a08948e7986c12p1a96e1jsna49397603e05',
              'X-RapidAPI-Host': 'thesportsdb.p.rapidapi.com',
        },
    };
    try {
        const response = await axios.request(options);
        
        if (response.data.player === null) {
          setErro('Nenhum atleta encontrado. Verifique o nome e tente novamente.');
          setAtletas([]); // Limpa os atletas em caso de erro
          return; //Retorna imediatamente em caso de erro
        }
        
        console.log(response.data); // Imptime a resposta da API no console
      
        setAtletas(response.data.player); //Atualiza o estado 'atleta' com os resultados
        setErro(null); //Limpa o erro em caso de sucesso
      } catch (error) {
        console.error(error);
        setErro('Ocorreu um erro ao buscar atletas. Tente novamente mais tarde.');
        }
      };

      // Função para adicionar atletas aos favoritos
      const adicionarAosFavoritos = (atleta) => {
        setFavoritos([...favoritos, atleta]);
      };

      return (
        <ScrollView>
            <Text> Pesquisa de Atleta</Text>
            <TextInput
                placeholder="Nome do atleta"
                value={nomeAtleta}
                onChangeText={(text) => setNomeAtleta(text)}
            />
            <Button title="Pesquisar" onPress={buscarAtleta} />

            <View>
                {atletas.map((atleta, index) => (
                    <CardAtleta
                        key={index}
                        atleta={atleta}
                        onAddToFavorites={adicionarAosFavoritos}
                    />
                ))}

            </View>
            <PainelFavorito favoritos={favoritos} />

            <Button
                title="Ir para a tela principal"
                onPress={() => navigation.navigate('Home')}
            />
        </ScrollView>
    );

};

export default HomeScreen;



//{erro && <Text style={{ color: 'red' }}>{erro}</Text>}