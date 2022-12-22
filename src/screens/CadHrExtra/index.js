import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  ScrollView, 
  Image,
  Alert,
  ToastAndroid,
}from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import { useNavigation} from '@react-navigation/native';

import estilos from './style';
import logo from '../../assets/logo.png';
import ExecuteQuery from '../../sql';

export default ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState('');
  const [hrInicial, setHrInicial] = useState('');
  const [hrFinal, setHrFinal] = useState('');
  const [hrTotal, setHrTotal] = useState('');
  const dataRef = useRef(null);
  const id = route.params.id;

  useEffect(() => {
    let total = duracao(hrInicial, hrFinal);
    if(total > 0) {
      let horas = Math.floor(total / 60);
      let minutos = total - (horas * 60);
      setHrTotal(`${horas}:${minutos}`)
    }
  }, [hrInicial, hrFinal]);

  useEffect(() => {
    if(id > 0){
      selectQuery(id)
    }
  },[])

  async function selectQuery(id) {
    let SelectQuery = await ExecuteQuery("SELECT * FROM hrextras WHERE id = ?", [id])
    setData(SelectQuery.rows.item(0).data)
    setHrInicial(SelectQuery.rows.item(0).hrinicial)
    setHrFinal(SelectQuery.rows.item(0).hrfinal)
    setHrTotal(SelectQuery.rows.item(0).hrtotal)
  }
  
  function convTime(horario){
      let [hora, minuto] = horario.split(':').map(v => parseInt(v));
      if (!minuto) { // para o caso de não ter os minutos
          minuto = 0;
      }
      return minuto + (hora * 60);
  }

  function duracao(hrI, hrF) {
    return (convTime(hrF) - convTime(hrI));
  }


  async function salvar(){

    const dateValid = dataRef?.current.isValid();

    if (!dateValid){
      Alert.alert('Data inválida!');
    }else if (hrInicial === '') {
      Alert.alert('Hora inicial inválida!');
    }else if (hrFinal === '') {
      Alert.alert('Hora Final inválida!');
    } else {
      if (id > 0){
        EditQuery(id);
      } else {
        insertService([ data, hrInicial, hrFinal, hrTotal ]);
      }
      limpar();
      navigation.goBack();
    }
  }
  
  async function EditQuery() {
    let result = await ExecuteQuery("UPDATE hrextras SET data = ?, hrinicial = ?, hrfinal = ?, hrtotal = ? WHERE ID = ?", [data, hrInicial, hrFinal, hrTotal, id]);
    if(result.rowsAffected > 0) {
      ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
    }else{
      ToastAndroid.show('Erro ao salvar dados!', ToastAndroid.LONG)

    }
    
  }
  
  async function insertService(dados) {
    let result = await ExecuteQuery("INSERT INTO hrextras (data, hrinicial, hrfinal, hrtotal) VALUES (?, ?, ?, ?)", dados);
    if(result.rowsAffected > 0){
      ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG);
    }else {
      ToastAndroid.show('Erro ao salvar Dados!', ToastAndroid.LONG);
    }
  }

  function limpar() {
    setData('')
    setHrInicial('')
    setHrFinal('')
    setHrTotal('')
  }

  return (

    <ScrollView>
      <KeyboardAvoidingView
        style ={estilos.Container}
        behavior="padding">
        <Image source={logo} style={estilos.imagem} />
        <Text style={estilos.Label}>
          Cadastro de horas extras
        </Text>

        <TextInputMask
        style={estilos.Input}
        type="datetime"
        options={{
          format: 'DD/MM/YY',
        }}
        placeholder="DATA DA EXECUÇÃO"
        value={data}
        onChangeText={text => setData(text)}
        ref={dataRef}
        />
        
        <TextInputMask
        style={estilos.Input}
        type="datetime"
        options={{
          format: 'HH:MM',
        }}
        placeholder="HORA DE INICIO"
        value={hrInicial}
        onChangeText={text => setHrInicial(text)}
        />
        
        <TextInputMask
        style={estilos.Input}
        type="datetime"
        options={{
          format: 'HH:MM',
        }}
        placeholder="HORA DE TERMINO"
        value={hrFinal}
        onChangeText={text => setHrFinal(text)}
        />

        <View pointerEvents="none" style={estilos.inpView}>
          <Text style={estilos.Label3}>Total de horas</Text>

          <TextInput
            style={estilos.Input2}
            value={hrTotal}
            onChangeText={setHrTotal}
            // editable={false}
            // selectTextOnFocus={false}
          />

        </View>

        <TouchableOpacity
          style={estilos.Button}
          onPress={salvar}
        >

        <Text style={estilos.textButton}>Salvar</Text>

      </TouchableOpacity>

      </KeyboardAvoidingView>
      
    </ScrollView>
  )
}