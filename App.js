import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import MainStack from './src/Stacks';


global.db = SQLite.openDatabase(
  {
    name: 'Praticagem',
    location: 'default'
  },
  () => {},
  error => {
    console.log('ERROR: ' + error)
  }
)

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    
  )
}