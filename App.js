import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import api from './services/api'
//const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude={part}&appid=${API_KEY}&units=metric`);
//199bdc2f065edbb48b1d203a64a0c4bf
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import axios from "axios";
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tempo, setTempo] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (location){
        try { 
          const response = await api.get(`onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude={part}&lang=pt_br&units=metric&appid=199bdc2f065edbb48b1d203a64a0c4bf`)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
      }
    })();
    
  }, []);

  

  return (
    <View style={styles.container}>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
