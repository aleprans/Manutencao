import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import ExecuteQuery from '../../sql';
import estilos from './style';
import logo from '../../assets/logo.png';

export default () => {

    const [data, setData] = useState(new Date())
    const [length, setLength] = useState()
    const [dados, setDados] = useState('')
    const [tpRel, setTpRel] = useState('')
    const [tpDt, setTpDt] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] =useState(false)
    const [visivel, setVisivel] = useState(false)
    const [dtInicio, setDtInicio] = useState('')
    const [dtFim, setDtFim] = useState('')
    const onChange = (event, selectedDate)=>{
        const currentDate = selectedDate || data
            setShow(false)
            setData(currentDate)
            if(tpDt == 'ini'){
                var dia = currentDate.getDate().toString().padStart(2,'0')
                let mesNumber = currentDate.getMonth() + 1
                var mes = mesNumber.toString().padStart(2,'0')
                var ano = currentDate.getFullYear().toString().padStart(2,'0')
                setDtInicio(dia+'/'+mes+'/'+ano)
            }
            if(tpDt == 'fim'){
                var dia = currentDate.getDate().toString().padStart(2,'0')
                let mesNumber = currentDate.getMonth() + 1
                var mes = mesNumber.toString().padStart(2,'0')
                var ano = currentDate.getFullYear().toString().padStart(2,'0')
                setDtFim(dia+'/'+mes+'/'+ano)
            }
    }


    // useEffect(() => {
    //     selectRel()
    // },[tpRel])

    async function selectServ() {
    
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
    }   
    
    async function selectHr() {
        let tr = ''
        let selectQuery = await ExecuteQuery("SELECT * FROM hrextras");
        let temp = [];
        for (let i = 0; i < selectQuery.rows.length; ++i){
            temp.push(selectQuery.rows.item(i));
        }

        if(dtInicio === "") {
            setDtInicio('01/01/01')
        }

        if(dtFim === ""){
            let data = new Date();
            let dia = String(data.getDate()).padStart(2, '0');
            let mes = String(data.getMonth() + 1).padStart(2, '0');
            let ano = data.getFullYear();
            let dataAtual = dia + '/' + mes + '/' + ano;
            
            setDtFim(dataAtual)
        }
        let itFiltrado = temp.filter(function (item) {
            return (item.data) >= dtInicio && (item.data) <= dtFim})

        itFiltrado.forEach((el)=>{
            tr += '<tr>'+
            '<td>'+el.data+'</td>'+
            '<td>'+el.hrinicial+'</td>'+
            '<td>'+el.hrfinal+'</td>'+
            '<td>'+el.hrtotal+'</td>'+
            '</tr>'
        })
        console.log(`tr: ${tr}`)
        setDados(tr)
        let somaHr = 0
        for(let i=0; i < temp.length; i++){
            let rep = temp[i].hrtotal
            somaHr += parseFloat(rep.replace(':', '.'))
        }
        setLength(somaHr)
        console.log(`dados: ${dados}`)
        relHr()
       
    }

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
                <span>Total de Horas Extras: ${length}</span>
            </footer>
        </body>
    </html>
    `    
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
    async function relServ() {
        let options = {
          html: htmlServ,
          fileName: 'Serviços',
          directory: 'Downloads',
        };
        setLoading(true)
        let file = await PDF.convert(options)
        // Alert.alert('PDF gerado com sucesso!', 'Local:' + file.filePath, [
        //     {text: 'Ok'},
        //     {text: 'Visualizar', onPress: () => openFile(file.filePath)}
        // ], {cancelable: true })
        openFile(file.filePath)
        setDtInicio('')
        setDtFim('')
    }

    async function relHr() {
        let options = {
          html: htmlHr,
          fileName: 'HorasExtras',
          directory: 'Downloads',
        };
        setLoading(true)
        let file = await PDF.convert(options)
        openFile(file.filePath)
        setDtInicio('')
        setDtFim('')
    }

    function selectRel (){
        if(tpRel == "Serv"){
            selectServ()
        }
        if(tpRel == "Hr"){
            selectHr()
        }
    }

    const openFile = (filepath) => {
        const path = FileViewer.open(filepath)
            .then(() => {
                setLoading(false)
                setTpRel('')
            })
            .catch(() => {
                setLoading(false)
                Alert.alert('ERRO','Falha ao gerar PDF')
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
                    <View style={estilos.dtsContainer}>
                        <TouchableOpacity
                            style={estilos.dts}
                            onPress={()=>{
                                setShow(true)
                                setTpDt('ini')
                            }}
                        >
                            <Text style={estilos.dtsText}>{dtInicio || 'Data inicio'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={estilos.dts}
                            onPress={()=>{
                                setShow(true)
                                setTpDt('fim')
                            }}
                        >
                            <Text style={estilos.dtsText}>{dtFim || 'Data final'}</Text>
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="DateTimePicker"
                            value={data}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <View style={estilos.viewBtnModal}>
                        <TouchableOpacity
                        style={estilos.btnModal}
                        onPress={()=>{
                            setVisivel(false)
                            selectRel()
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
                onPress={()=>{
                    setTpRel('Serv')
                    setVisivel(true)
                }}
            >
                <Text style={estilos.textItem}>Relatório de serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilos.item}
                onPress={()=>{
                    setTpRel('Hr')
                    setVisivel(true)
                }}
            >
                <Text style={estilos.textItem}>Relatório de Hr Extras</Text>
            </TouchableOpacity>
            {loading && <View 
                style={{
                    position:"absolute", 
                    width:"100%", 
                    height:"100%", 
                    backgroundColor:"rgba(240,240,240,0.8)",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                <Text style={{fontSize:20, color:"#000"}}>Gerando Relatório</Text>
                <Text style={{fontSize:18, color:"#000", marginBottom:15, textAlign:"center"}}>Aguarde ...</Text>
                <ActivityIndicator 
                    size={100}
                    color={"#555"}
                    animating={true}
                    style={{
                        alignSelf:"center",
                        justifyContent:"center"
                    }}
                />
            </View>}
            
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
   
