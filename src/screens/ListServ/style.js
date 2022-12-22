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
    width: '90%'
  },
  
  quebra: {
    overflow: 'hidden',
    width: 140,
    
    textAlign: 'center'
  },
  
  item2: {
    flexDirection: 'row',
  },
  
  listData: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  
  listData2: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
  },
  
  label: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  
  label2: {
    fontSize: 16,
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

  btnExcluir: {
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderWidth: 1,
    borderRadius: 10,
    height:30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  
  btnEditar: {
    backgroundColor: '#fff',
    borderColor: '#00f',
    borderWidth: 1,
    borderRadius: 10,
    height:30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    width: '90%',
    padding: 2,
    backgroundColor: '#aaa',
    textAlign: 'center',
    justifyContent: 'center',
  },

  picker: {
    flexDirection: 'column' ,
    padding: 2,
    backgroundColor: '#aaa',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  Input: {
    backgroundColor: '#eee',
    margin: 10,
    width: '35%',
    fontSize: 14,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F00',
    borderStyle: 'solid'
  },

  filterItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5
  },

  filterText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    textShadowColor: '#fff',
    textShadowRadius: 10
  },

  btnFilter: {
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderWidth: 1,
    borderRadius: 10,
    height:40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

  btnClearFilter: {
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderWidth: 1,
    borderRadius: 10,
    height:40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '10%',
    marginVertical: 5
  },

  InputFilter: {
    backgroundColor: '#fff',
    margin: 5,
    width: '35%',
    fontSize: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F00',
    borderStyle: 'solid'
  },
  
  InputFilterText: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: '3%',
    width: '70%',
    fontSize: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F00',
    borderStyle: 'solid'
  },

  filterPicker: {
    backgroundColor: '#fff',
    margin: 5,
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F00',
    borderStyle: 'solid'
  },

  filterItemTitle: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },

  filterItem: {
    backgroundColor: '#eee'
  },
})

export default estilos;