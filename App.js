import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScrenn';
import AddOcorrenciaScrenn from './screens/AddOcorrenciaScreen';
import MapScreen from './screens/MapScreen';
import { PaperProvider, Provider as PeperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack name="Home" component={HomeScreen}/>
          <Stack name="Add Ocorrência" component={AddOcorrenciaScrenn} />
          <Stack name="Mapa" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}