import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#555',
    alignItems: 'center',
  },

  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.8)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  
  listItem: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#cecece',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#f00',
    borderWidth: 1
  },
  
  item1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  quebra: {
    overflow: 'hidden',
    width: 140,
    textAlign: 'center'
  },
  
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3
  },
  
  listData: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  
  listData2: {
    fontSize: 18,
    color: '#000',
    marginHorizontal: 5,
    fontWeight: 'bold'
  },
  
  label: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  
  label2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5
  },

  btn: {
    width: '90%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f00'
  },

  textBtn: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
  },

  alert: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50%'
  },

  modal: {
    width: '80%',
    height: '25%',
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
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 2
  },

  titulo: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5
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

  filter: {
    flexDirection: 'column' ,
    padding: 2,
    backgroundColor: '#aaa',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  filterInput: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    width: '90%',
    backgroundColor: '#ddd'
  },

  filterText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textShadowColor: '#fff',
    textShadowRadius: 10,
    marginVertical: 5,
  },

  filterItem: {
    backgroundColor: '#eee'
  },
  
  filterItemTitle: {
    backgroundColor: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  
  filterItems: {
    flexDirection: 'row',
    width: '100%'
  }
})

export default estilos;