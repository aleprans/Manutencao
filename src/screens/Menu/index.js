import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import estilos from './style';
import logo from '../../assets/logo.png';

export default () => {

    const navigation = useNavigation();

    function screenServ() {
        navigation.navigate('listServ')
    }

    function screenHrExtra() {
        navigation.navigate('listHr')
    }

    function screenRel() {
        navigation.navigate('Relatorios')
    }

    function screenBck() {
        navigation.navigate('Backup')
    }

    return(
        <View style={estilos.container}>
            <Image source={logo} style={estilos.imagem} />
            <TouchableOpacity
                style={estilos.item}
                onPress={screenHrExtra}
            >
                <Text style={estilos.textItem}>Horas Extras</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilos.item}
                onPress={screenServ}
            >
                <Text style={estilos.textItem}>Serviços</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilos.item}
                onPress={screenRel}
            >
                <Text style={estilos.textItem}>Relatórios</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={estilos.item}
                onPress={screenBck}
            >
                <Text style={estilos.textItem}>Bakup</Text>
            </TouchableOpacity>
        </View>
    )
}