import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import ExecuteQuery from '../../sql';
import estilos from './style';
import logo from '../../assets/logo.png';

export default () => {
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Dezembro'
    ]
    const [data, setData] = useState(new Date())
    const [onChange, setOnChange] = useState()
    const dia = data.getDate()
    const mes = months[data.getMonth() - 1]
    const ano = data.getFullYear()
    const [length, setLength] = useState()
    const [dados, setDados] = useState('')
    const [tpRel, setTpRel] = useState('')
    const [visivel, setVisivel] = useState(false)
    const [show, setShow] = useState(false)
    const [dtInicio, setDtInicio] = useState('Dt inicio')

    var tr = ''

    useEffect(() => {
        
        if(tpRel === 'Serv'){
            console.log('serv')
                relServ()
        }

        if(tpRel === 'Hr'){
            console.log('hr')
                relHr()
        }
    },[tpRel])

    async function selectServ() {
        if(tpRel === 'Serv'){
            relServ()
        }else {
            tr = ''
            let selectQuery = await ExecuteQuery("SELECT * FROM servicos");
            let temp = [];
            for (let i = 0; i < selectQuery.rows.length; ++i){
                temp.push(selectQuery.rows.item(i));
            }
            temp.forEach((el)=>{
                tr += '<tr>'+
                '<td>'+el.data+'</td>'+
                '<td>'+el.embarcacao+'</td>'+
                '<td>'+el.equipamento+'</td>'+
                '<td>'+el.horimetro+'</td>'+
                '<td>'+el.descricao+'</td>'+
                '</tr>'
            })
            setLength(selectQuery.rows.length)
            setDados(tr)
            setTpRel('Serv')
        }
    }   
   
    async function selectHr() {
        if(tpRel === 'Hr'){
            relHr()
        }else {
            tr = ''
            let selectQuery = await ExecuteQuery("SELECT * FROM hrextras");
            let temp = [];
            for (let i = 0; i < selectQuery.rows.length; ++i){
                temp.push(selectQuery.rows.item(i));
            }
            temp.forEach((el)=>{
                tr += '<tr>'+
                '<td>'+el.data+'</td>'+
                '<td>'+el.hrinicial+'</td>'+
                '<td>'+el.hrfinal+'</td>'+
                '<td>'+el.hrtotal+'</td>'+
                '</tr>'
            })
            setLength(selectQuery.rows.length)
            setDados(tr)
            setTpRel('Hr')
        }
    }   
    
    const htmlServ = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    ${htmlStyle}
                </style>
            </head>
            <header>
                <h1>Servicos</h1>
                <p>São Sebastião, ${dia} de ${mes} de ${ano}.</p>
            </header>
            <body>
                <p class="filtro">Periodo selecionado: </p>
                <table>
                    <thead>
                        <tr>
                            <th class="cabecalho">Data</th>
                            <th class="cabecalho">Embarcação</th>
                            <th class="cabecalho">Equipamento</th>
                            <th class="cabecalho">Horimetro</th>
                            <th class="cabecalho desc">Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dados}
                    </tbody>
                </table>
                <footer>
                    <span>Total de Serviços: ${length}</span>
                </footer>
            </body>
        </html>
    `
    const htmlHr = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    ${htmlStyle}
                </style>
            </head>
            <header>
                <h1>Horas Extras</h1>
            </header>
            <body>
                <table>
                    <thead>
                        <tr>
                            <th class="cabecalho">Data</th>
                            <th class="cabecalho">Hora inicial</th>
                            <th class="cabecalho">Hora final</th>
                            <th class="cabecalho">Total de horas</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dados}
                    </tbody>
                </table>
                <footer>
                    <span>Total de Serviços: ${length}</span>
                </footer>
            </body>
        </html>
    `    

    async function relServ() {
        let options = {
          html: htmlServ,
          fileName: 'Serviços',
          directory: 'Downloads',
        };
    
        let file = await PDF.convert(options)
        Alert.alert('PDF gerado com sucesso!', 'Local:' + file.filePath, [
            {text: 'Ok'},
            {text: 'Visualizar', onPress: () => openFile(file.filePath)}
        ], {cancelable: true })
    }

    async function relHr() {
        let options = {
          html: htmlHr,
          fileName: 'HrExtras',
          directory: 'Downloads',
        };
    
        let file = await PDF.convert(options)
        Alert.alert('PDF gerado com sucesso!', 'Local:' + file.filePath, [
            {text: 'Ok'},
            {text: 'Visualizar', onPress: () => openFile(file.filePath)}
        ], {cancelable: true })
    }

    const openFile = (filepath) => {
        const path = FileViewer.open(filepath)
            .then(() => {

            })
            .catch(() => {
                
            })
    }

    return(
        <View style={estilos.container}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={visivel}
                
            >
                <View style={estilos.containerModal}>
                <View style={estilos.modal}>
                    <Text style={estilos.titulo}>Relatório</Text>
                    <Text style={estilos.conteudo}>Insira o periodo ...</Text>
                    <TouchableOpacity
                        onPress={()=>{setShow(true)}}
                    >
                        <Text>{dtInicio}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="DateTimePicker"
                            value={data}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={(el)=>{setDtInicio(el)}}
                        />
                    )}
                    <View style={estilos.viewBtnModal}>
                        <TouchableOpacity
                        style={estilos.btnModal}
                        onPress={()=>{
                            setVisivel(false)
                        }}
                        >
                        <Text style={estilos.textBtn}>OK</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                        style={estilos.btnModal}
                        onPress={()=>{
                            setVisivel(false)
                        }}
                        >
                        <Text style={estilos.textBtn}>Cancelar</Text>
                        </TouchableOpacity>
        
                    </View>
                </View>
              </View>
            </Modal>
            <Image source={logo} style={estilos.imagem} />
            <TouchableOpacity
                style={estilos.item}
                onPress={()=>{setVisivel(true)}}
            >
                <Text style={estilos.textItem}>Relatório de serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilos.item}
                onPress={selectHr}
            >
                <Text style={estilos.textItem}>Relatório de Hr Extras</Text>
            </TouchableOpacity>
        </View>
    )
}

const htmlStyle = `
    *{
        borde: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-content: center;
    }

    table{
        border: solid 2px #000;
        width: 95%;
        padding: 0;
        margin: auto;
    }

    td{
        border-top: solid 1px #ccc;
        border-left: solid 1px #ccc;
    }
    
    .cabecalho{
        border-left: solid 1px #ccc;
        padding: 3px 3px;
        background-color: #fcfcfc;
    }

    .desc{
        width-max: 30%;
    }

    footer{
        margin: 10px;
    }

    .filtro{
        text-align: left;
        width: 95%;
        margin: 5px auto;
    }
`
   
