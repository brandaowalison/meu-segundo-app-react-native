import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, ActivityIndicator } from 'react-native';

const API_URL = 'https://meu-segundo-app-react-native-backend.onrender.com'

export default function MapScreen() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API_URL}/api/ocorrencia/`);
            const data = await res.json();
            setOcorrencias(data);

            if (data.length > 0) {
                const avgLat =
                    data.reduce((sum, p) => sum + Number(p.latitude), 0) / data.length;
                const avgLng =
                    data.reduce((sum, p) => sum + Number(p.longitude), 0) / data.length;

                setRegion({
                    latitude: avgLat,
                    longitude: avgLng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            }
        };

        fetchData();
    }, []);

    if (!region) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} initialRegion={region}>
                {ocorrencias.map((p) => (
                <Marker
                    key={p._id}
                    coordinate={{
                    latitude: Number(p.latitude),
                    longitude: Number(p.longitude),
                    }}
                    title={p.titulo}
                    description={p.descricao}
                    pinColor="green"
                />
                ))}
            </MapView>
        </View>
    );
}