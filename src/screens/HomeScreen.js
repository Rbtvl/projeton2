//Componente Tela HomeScreen.js (ScrollView)
import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import CardAtleta from '../components/CardAtleta';
import PainelFavorito from '../components/PainelFavorito';
import { StyleSheet } from 'react-native';
import axios from 'axios'; //Importe o axios

const HomeScreen = ({ navigation }) => {
    const [atletas, setAtletas] = useState([]); //Para armazenar os atletas da API
    const [nomeAtleta, setNomeAtleta] = useState(''); //Para armazenar o nome do atleta a ser pesquisado
    const [favoritos, setFavoritos] = useState([]); //Para armazenar os atletas favotitos
    const [erro, setErro] = useState(null); //Estado de controle para jogador não encotrado
    const [temperatura, setTemperatura] = useState(null); // Estado para armazenar a temperatura
    const [umidade, setUmidade] = useState(null); // Estado para armazenar a umidade

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

      // Função para buscar os dados do ThingSpeak
      const fetchThingSpeakData = async () => {
        try {
            const channelID = `2372384`;
            const apiKey = `SPT09OG9BCNK4GYR`;
            const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${apiKey}&results=2`;
            

            //inclusão ajuste
            const response = await axios.get(url);
            console.log('Resposta do ThingSpeak:', response.data);
            
            if (!response.data || !response.data.feeds || response.data.feeds.length === 0) {
                throw new Error('Dados inválidos ou ausentes do ThingSpeak.');
            }
            const latestEntry = response.data.feeds[0];
            const field1 = latestEntry.field1; //Temperatura
            const field2 = latestEntry.field2; //Umidade

            console.log('Temperature:', field1);
            console.log('Umidade:', field2);

            setTemperatura(field1);
            setUmidade(field2);
        } catch (error) {
            console.error('Erro ao buscar dados do ThingSpeak:', error.message);
            setTemperatura(null);
            setUmidade(null);
        }
      }
            //const response = 
            //const response = await fetch(url);
            //const data = await response.json();

            //console.log('Dados do ThingSpeak:', data);

            /*if (!response.ok || !data || !data.field1 || !data.field2) {
                throw new Error('Dados inválidos ou ausentes do ThingSpeak.');
            }

        if (data && data.field1 && data.field2) {
            //Definir os estados de Temperatura e Umidade
            setTemperatura(data.field1);
            setUmidade(data.field2);
            }       
        } catch (error) {
            console.error('Erro ao buscar dados do ThingSpeak:', error.message);
            setTemperatura(null);
            setUmidade(null);
            }
        };
      
    //Executa a busca de dados do sensor quando o componente é montado
    useEffect(() => {
        fetchThingSpeakData();
        const interval = setInterval(fetchThingSpeakData, 5000);
        return () => clearInterval(interval)
}, []);*/



      // Função para adicionar atletas aos favoritos
      const adicionarAosFavoritos = (atleta) => {
        setFavoritos([...favoritos, atleta]);
      };

      return (
        <View style={styles.container}> 
            <Text> Pesquisa de Atleta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do atleta"
                value={nomeAtleta}
                onChangeText={(text) => setNomeAtleta(text)}
            />
            <Button title="Pesquisar" onPress={buscarAtleta} />

            <View style={styles.sensorData}>
                <Text> Dados do Sensor:</Text>
                <Text>Temperatura: {temperatura} ºC</Text>
                <Text>Umidade: {umidade} %</Text>
            </View>

            <FlatList
                data={atletas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                    <CardAtleta
                        key={index}
                        atleta={item}
                        onAddToFavorites={adicionarAosFavoritos}
                    />
                )}
                contentContainerStyle={styles.flatListConstainer}
            />
            
            <PainelFavorito favoritos={favoritos} />

            <Button
                title="Ir para a tela principal"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    sensorData: {
        marginBottom: 20,
    },
    flatListContainer: {
        paddingBottom: 100,
    },
});

export default HomeScreen;