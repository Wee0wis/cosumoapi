import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const App = () => {
  // Definir estados para almacenar los datos y controlar la carga
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results); 
      setLoading(false); 
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect para hacer la petición cuando el componente se monta
  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) {
    // Mostrar un indicador de carga mientras se obtiene la información
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Cargando personajes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes de Rick and Morty</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.character}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Estilos para la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  character: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
