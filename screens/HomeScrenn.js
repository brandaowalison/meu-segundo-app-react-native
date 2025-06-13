import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://meu-segundo-app-react-native-backend.onrender.com';

export default function HomeScreen() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const navigation = useNavigation();

    const fetchData = async () => {
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
            <FAB icon="plus" style={styles.fab}
                onPress={() => navigation.navigate('Add Ocorrência')}/>
            <FAB icon="map" style={styles.mapButton}
                onPress={() => navigation.navigate('Mapa')}/>
        </View>
    );
}