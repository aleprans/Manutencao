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
  },

  cabecalho: {
    fontSize: 30,
  },

  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.8)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  modal: {
    width: '80%',
    padding: 10,
    marginTop: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 15,
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 10,
  },

  btnModal: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 2
  },

  
  titulo: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 2
  },

  conteudo: {
    marginHorizontal: 10,
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  viewBtnModal: {
    flexDirection: 'row',
  },

  dtsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },

  dts: {
    width: '40%',
    backgroundColor: '#fff',
    color: '#000',
    padding: 10,
    borderRadius: 10,
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 2
  },

  dtsText: {
    textAlign: 'center'
  },

  textBtn: {
    color: '#000'
  }

})

export default estilos;