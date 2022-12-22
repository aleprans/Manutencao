import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  Label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  Input: {
    backgroundColor: '#eee',
    margin: 10,
    width: '90%',
    fontSize: 14,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F00',
    borderStyle: 'solid'
  },
  Button: {
    marginTop: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#F00',
    borderStyle: 'solid'
  },
  textButton: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  imagem: {
    width:70,
    height:70,
    marginTop: 40
  }
})

export default estilo;