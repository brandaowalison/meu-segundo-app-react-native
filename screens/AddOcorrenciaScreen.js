import React, { useEffect, useState } from 'react';
import { View, Image, Button } from 'react-native';
import { TextInput, Button } from 'expo-image-picker';
import * as Location from  'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/styles';

const API_URL = 'https://meu-segundo-app-react-native-backend.onrender.com'

export default function  AddOcorrenciaScrenn({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [image, setImage] = useState(null);
    const [lacation, setLocation] = useState(null);

    useEffect(() => {
        ( async () => {
            const { status }= await Location.requestForegroundPermissionsAsync();
            if ( status === 'granted') {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation(loc.coords);
            } else {
                Alert.alert('Permissão de localização negada');
            }
        })();
    }, [])

    const pickImage = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão para acessar a Câmera foi negada!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descricao', descricao);

        if (image) {
            formData.append('photo', {
                uri: image.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
        }

        if (location) {
            formData.append('latitude', location.latitude.toString());
            formData.append('longitude', location.longitude.toString());
        }

        try {
            await fetch(`${API_URL}/ocrrencia/`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multpart/form-data',
                },
            });
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erro ao salvar ocorrência', error.message)
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Título da ocorrência"
                value={titulo}
                onChangeText={setTitulo}
                styles={styles.input}
                mode="outlined"
            />
            <TextInput
                label="Descrição da ocorrência"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
                mode="outlined"
                multiline
            />
            <Button
                mode="outlined"
                onPress={pickImage}
                style={styles.input}
                icon="camera"
            >
                Tirar Foto
            </Button>

            {image && (
                <Image
                    source={{ uri: image.uri }}
                    style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 8}}
                />
            )}

            <Button mode="contained" onPress={handleSubmit}>
                Salvar
            </Button>
        </View>
    );
}