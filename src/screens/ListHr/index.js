import React, { useState, useEffect } from 'react';
import { useNavigation} from '@react-navigation/native';
import { FlatList, View, Text, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import estilo from './style'
import ExecuteQuery from '../../sql'

export default () => {
  
    const navigation = useNavigation()
    const [dados, setDados] = useState([])
    const [visivel, setVisivel] = useState(false)
    const [mes, setMes] = useState('')
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await createTable();
      await SelectQuery();
    })
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    Filtrar(mes)
  },[mes])

  async function createTable() {
    await ExecuteQuery("CREATE TABLE IF NOT EXISTS hrextras"
      +" (ID INTEGER PRIMARY KEY AUTOINCREMENT,"
      +" hrinicial TEXT,"
      +" hrfinal TEXT,"
      +" hrtotal TEXT,"
      +" data TEXT)");
  }

  async function SelectQuery(){
    // setDados([])
    let selectQuery = await ExecuteQuery("SELECT * FROM hrextras");
    let temp = [];
    for (let i = 0; i < selectQuery.rows.length; ++i)
      temp.push(selectQuery.rows.item(i));
    setDados([...dados,...temp])
  }

  function horas(){
    navigation.navigate('CadHrExtra', {id: 0});
  }

  async function deleteItem(id) {
    const confirm = await ExecuteQuery("DELETE FROM hrextras WHERE ID = ?", [id.ID])
    if(confirm.rowsAffected > 0){
      ToastAndroid.show("Horas Deletadas com sucesso!", ToastAndroid.LONG)
    }else {
      ToastAndroid.show("Erro ao Deletar Horas!", ToastAndroid.LONG)
    }
    navigation.goBack();
  }
  
  function editItem(data) {
    navigation.navigate('CadHrExtra', {id: data.ID})
  }

  function filterMes(data){
    var dataArray = data.split('/')
    return dataArray[1]
  }

  async function Filtrar(mes){
    if(mes == ""){
      SelectQuery()
    }else {
      let selectQuery = await ExecuteQuery("SELECT * FROM hrextras");
      let temp = [];
      for (let i = 0; i < selectQuery.rows.length; ++i)
        temp.push(selectQuery.rows.item(i));
        setDados(
          temp.filter((item) => {
            if(filterMes(item.data) == mes){
              return true
            }else {
              return false
            }  
          })
        )
    }
  }

  function ListItem({ data }){
    return(
      <TouchableOpacity
        style={estilo.listItem}
        onPress={()=>{editItem(data)}}
        onLongPress={()=>{setVisivel(true)}}
      >
      
        <Modal
          animationType="fade"
          transparent={false}
          visible={visivel}
        >
          <View style={estilo.containerModal}>
            <View style={estilo.modal}>
              <Text style={estilo.titulo}>Confirmação</Text>
              <Text style={estilo.conteudo}>Confirma exclusão das Horas?</Text>
              <View style={estilo.viewBtnModal}>
                <TouchableOpacity
                  style={estilo.btnModal}
                  onPress={()=>{deleteItem(data)}}
                >
                  <Text style={estilo.textBtn}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={estilo.btnModal}
                  onPress={()=>{setVisivel(false)}}
                >
                  <Text style={estilo.textBtn}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={estilo.item1}>
          <View>
            <Text style={estilo.label}>DATA</Text>
            <Text style={estilo.listData}>{data.data}</Text>
          </View>
          <View>
            <Text style={estilo.label}>Hora inicial.</Text>
            <Text style={estilo.listData}>{data.hrinicial}</Text>
          </View>
          <View>
            <Text style={estilo.label}>Hora final.</Text>
            <Text style={estilo.listData}>{data.hrfinal}</Text>
          </View>
        </View>
        <View style={estilo.item2}>
          <Text style={estilo.label2}>Total Horas.</Text>
          <Text style={estilo.listData2}>{data.hrtotal}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={estilo.container}>
      <View style={estilo.filter}>
        <Text style={estilo.filterText}>Filtrar por MÊS</Text>
          <Picker 
            style={estilo.filterInput}
            selectedValue={mes}
            onValueChange={
              (itemValor, itemIndex) => setMes(itemValor)
            }
            mode='dropdown'
          >
            <Picker.Item style={estilo.filterItemTitle } label='Escolha o mês' value=''  />
            <Picker.Item style={estilo.filterItem} label='Janeiro' value='01'  />
            <Picker.Item style={estilo.filterItem} label='Fevereiro' value='02'  />
            <Picker.Item style={estilo.filterItem} label='Março' value='03'  />
            <Picker.Item style={estilo.filterItem} label='Abril' value='04'  />
            <Picker.Item style={estilo.filterItem} label='Maio' value='05'  />
            <Picker.Item style={estilo.filterItem} label='Junho' value='06'  />
            <Picker.Item style={estilo.filterItem} label='Julho' value='07'  />
            <Picker.Item style={estilo.filterItem} label='Agosto' value='08'  />
            <Picker.Item style={estilo.filterItem} label='Setembro' value='09'  />
            <Picker.Item style={estilo.filterItem} label='Outubro' value='10'  />
            <Picker.Item style={estilo.filterItem} label='Novembro' value='11'  />
            <Picker.Item style={estilo.filterItem} label='Dezembro' value='12'  />
          </Picker>
        </View>
      <FlatList 
        maxToRenderPerBatch = {10}
        removeClippedSubviews={true}
        extraData={dados}
        style={{marginTop: 35, width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: 20}}
        data={dados.reverse()}
        keyExtractor={ item => String(item.ID)}
        renderItem={({ item }) => <ListItem data={item}/>}
        ListEmptyComponent={<Text style={estilo.alert}>Nenhuma Hora Encontrada</Text>}
      />
      
      <TouchableOpacity
        style={estilo.btn}
        onPress={horas}
      >
        <Text style={estilo.textBtn}>Adicionar Horas</Text>
      </TouchableOpacity>
    </View>
  )
};