import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

const API_URL = 'https://meu-segundo-app-react-native-backend.onrender.com';

export default function HomeScreen() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const navigation = useNavigation();

    const fatchData = async () => {
        const res = await fetch(`${API_URL}/api/ocorrencia/`);
        const data = await res.json();
        setOcorrencias(data);
    };

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={ocorrencias}
                keyExtractor={(item) => item._id} 
                renderItem={({item}) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title>{item.titulo}</Title>
                            <Paragraph>{item.descricao}</Paragraph>
                        </Card.Content>
                        {item.photo && (
                            <Card.Cover source={{ uri: `${API_URL}/${item.photo}`}} style={styles.image}/>
                        )}
                    </Card>
                )}
            />
            <FAB icon="plus" styles={styles.fab}
                onPress={() => navigation.navigate('Add Ocorrência')}/>
            <FAB icon="map" style={styles.mapButton}
                onPress={() => navigation.navigate('Mapa')}/>
        </View>
    );
}