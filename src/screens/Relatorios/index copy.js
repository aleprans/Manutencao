import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import PDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import ExecuteQuery from '../../sql';
import estilos from './style';
import logo from '../../assets/logo.png';

export default () => {

    const data = Date()
    const [length, setLength] = useState()
    const [dados, setDados] = useState('')
    const [tpRel, setTpRel] = useState('')

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
            </header>
            <body>
                <p>${data}</p>
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
            <Image source={logo} style={estilos.imagem} />
            <TouchableOpacity
                style={estilos.item}
                onPress={selectServ}
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
`
   
