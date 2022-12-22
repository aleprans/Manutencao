import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#f00',
    margin: 10,
  },

  textItem: {
    color: '#555',
    fontSize: 20,
    fontWeight: 'bold',
  },

  imagem: {
    width: 70,
    height: 70,
    marginBottom: 40,
    marginTop: -40
  }  
})

export default estilos;