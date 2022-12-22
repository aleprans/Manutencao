import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Modal,
    ToastAndroid,
    TextInput,
    Keyboard
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { TextInputMask } from 'react-native-masked-text';
import estilo from './style';
import ExecuteQuery from '../../sql';

export default () => {

    const navigation = useNavigation()
    const [dados, setDados] = useState([])
    const [visivel, setVisivel] = useState(false)
    const [dataini, setDataini] = useState('')
    const [datafim, setDatafim] = useState('')
    const [filtro, setFiltro] = useState('')
    const [lancha, setLancha] = useState('')
    const [equipamento, setEquipamento] = useState('')
    const [clearFiltro, setClearFiltro] = useState(false)
    const dateRef = useRef(null);
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          await createTable();
          await SelectQuery();
        })
        return unsubscribe;
    }, [navigation]);

    async function createTable() {
    await ExecuteQuery("CREATE TABLE IF NOT EXISTS servicos"
        +" (ID INTEGER PRIMARY KEY AUTOINCREMENT,"
        +" embarcacao TEXT,"
        +" equipamento TEXT,"
        +" descricao TEXT,"
        +" horimetro REAL,"
        +" data TEXT)");
    }
    
    async function SelectQuery(){
    let selectQuery = await ExecuteQuery("SELECT * FROM servicos");
    var temp = [];
    for (let i = 0; i < selectQuery.rows.length; ++i)
        temp.push(selectQuery.rows.item(i));
    setDados([...dados,...temp])
    }

    function convertData(data){
    var dataarray = data.split('/')
    return dataarray[2]+'-'+dataarray[1]+'-'+dataarray[0]
    }

    async function Filtrar(iten1, iten2){
    Keyboard.dismiss()
    let selectQuery = await ExecuteQuery("SELECT * FROM servicos");
    var temp = []
    for (let i = 0; i < selectQuery.rows.length; ++i)
        temp.push(selectQuery.rows.item(i))
    
        if(iten1 != null) setClearFiltro(true)

        if(filtro == 'pd') {
        
        if(iten1 == ""){
            iten1 = '01/01/01'
        }

        if(iten2 == ""){
            let data = new Date();
            let dia = String(data.getDate()).padStart(2, '0');
            let mes = String(data.getMonth() + 1).padStart(2, '0');
            let ano = data.getFullYear();
            let dataAtual = dia + '/' + mes + '/' + ano % 100;

            iten2 = dataAtual
        }

        setDados(
            temp.filter(function (item) {
            return convertData(item.data) >= convertData(iten1) && convertData(item.data) <= convertData(iten2)})
        )

        }else if (filtro == 'eb') {
        setDados(
            temp.filter(function (item) {
            return item.embarcacao == iten1 })
        )
        }else if (filtro == 'eq') {
        setDados(
            temp.filter(function (item) {
            return item.equipamento == iten1 })
        )
        }else if(filtro == 'all') {
        setDados([...temp])
        setClearFiltro(false)
        }
        setLancha('')
        setDataini('')
        setDatafim('')
        setEquipamento('')   
    }

    function servico(){
    navigation.navigate('CadServ', {id: 0});
    }

    async function deleteItem(id) {
    const confirm = await ExecuteQuery("DELETE FROM servicos WHERE ID = ?", [id.ID])
    if(confirm.rowsAffected > 0){
        ToastAndroid.show("Serviço Deletado com sucesso!", ToastAndroid.LONG)
    }else {
        ToastAndroid.show("Erro ao Deletar Serviço!", ToastAndroid.LONG)
    }
    setVisivel(false)
    }
    
    function editItem(data) {
    navigation.navigate('CadServ', {id: data.ID})
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
              transparent={true}
              visible={visivel}
            >
              <View style={estilo.containerModal}>
                <View style={estilo.modal}>
                  <Text style={estilo.titulo}>Confirmação</Text>
                  <Text style={estilo.conteudo}>Confirma exclusão do serviço?</Text>
                  <View style={estilo.viewBtnModal}>
                    <TouchableOpacity
                      style={estilo.btnModal}
                      onPress={()=>{
                        deleteItem(data)
                      }}
                    >
                      <Text style={estilo.textBtn}>OK</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                      style={estilo.btnModal}
                      onPress={()=>{
                        setVisivel(false)
                      }}
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
                <Text style={estilo.label}>Emb.</Text>
                <Text style={estilo.listData}>{data.embarcacao}</Text>
              </View>
              <View>
                <Text style={estilo.label}>Equip.</Text>
                <Text style={estilo.quebra}>{data.equipamento}</Text>
              </View>
              <View>
                <Text style={estilo.label}>Horim.</Text>
                <Text style={estilo.listData}>{data.horimetro}</Text>
              </View>
            </View>
            <View style={estilo.item2}>
              <View>
                <Text style={estilo.label2}>Descrição</Text>
                <Text style={estilo.listData2}>{data.descricao}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    }
    
    function renderFilter() {
        if(filtro == 'pd') {
          return(
          <View style={estilo.filterItems}>
              <TextInputMask
                style={estilo.InputFilter}
                type="datetime"
                options={{
                  format: 'YY/MM/DD',
                }}
                placeholder="DATA INICIO"
                value={dataini}
                onChangeText={text => setDataini(text)}
                ref={dateRef}
              />  
              <TextInputMask
                style={estilo.InputFilter}
                type="datetime"
                options={{
                  format: 'YY/MM/DD',
                }}
                placeholder="DATA FINAL"
                value={datafim}
                onChangeText={text => setDatafim(text)}
                ref={dateRef}
              />
              <TouchableOpacity
                style={estilo.btnFilter}
                onPress={() => {Filtrar(dataini, datafim)}}>
                <Text style={estilo.textBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          )
        }else if (filtro == 'eb') {
          return (
            <View style={estilo.filterItems}>
              <TextInput
                style={estilo.InputFilterText}
                placeholder="EMBARCAÇÃO"
                value={lancha}
                onChangeText={setLancha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={estilo.btnFilter}
                onPress={() => {Filtrar(lancha, null)}}>
                <Text style={estilo.textBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          )
        }else if (filtro == 'eq') {
          return (
            <View style={estilo.filterItems}>
              <TextInput
                style={estilo.InputFilterText}
                placeholder="EQUIPAMENTO"
                value={equipamento}
                onChangeText={setEquipamento}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={estilo.btnFilter}
                onPress={() => {Filtrar(equipamento, null)}}>
                <Text style={estilo.textBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          )
        }else if (filtro == 'all') {
          return (
            <View style={estilo.filterItems}>
              {clearFiltro &&
                <TouchableOpacity
                  style={estilo.btnClearFilter}
                  onPress={() => {Filtrar(null, null)}}
                >
                  <Text style={estilo.textBtn}>Limpar filtro</Text>
                </TouchableOpacity>
              }
            </View>
          )
        }
    }
    
    return (
        <View style={estilo.container}>
          <View style={estilo.filter}>
            <View style={estilo.picker}>
              <Text style={estilo.filterText}>Selecione um filtro</Text>
              <Picker 
                style={estilo.filterPicker}
                selectedValue={filtro}
                onValueChange={
                  (itemValor, itemIndex) => setFiltro(itemValor)
                }
                mode='dropdown'
              >
                <Picker.Item style={estilo.filterItemTitle } label='Escolha o filtro' value='all'  />
                <Picker.Item style={estilo.filterItem} label='Periodo' value='pd'/>
                <Picker.Item style={estilo.filterItem} label='Embarcação' value='eb'/>
                <Picker.Item style={estilo.filterItem} label='Equipamento' value='eq'/>
              </Picker>
            </View>
            {renderFilter()}
          </View>
          <FlatList 
            maxToRenderPerBatch = {10}
            removeClippedSubviews={true}
            extraData={dados}
            style={{marginTop: 20, width: '100%'}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginHorizontal: 20}}
            data={dados.reverse()}
            keyExtractor={ item => String(item.ID)}
            renderItem={({ item }) => <ListItem data={item}/>}
            ListEmptyComponent={<Text style={estilo.alert}>Nenhum Serviço Encontrado</Text>}
          />
          <TouchableOpacity
            style={estilo.btn}
            onPress={servico}
          >
            <Text style={estilo.textBtn}>Adicionar Serviço</Text>
          </TouchableOpacity>
        </View>
    )
}