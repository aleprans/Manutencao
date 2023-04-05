import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import ExecuteQuery from '../../sql';
import estilos from './style';

export default () => {

    const [dados, setDados] = useState('')
    
    async function SelectQuery() {
        let selectQuery = await ExecuteQuery('select * from servicos')
        var temp = [];
        for (let i = 0; i < selectQuery.rows.length; ++i)
            temp.push(selectQuery.rows.item(i));
        setDados([...dados,...temp])
        console.log(dados)
    }

    return(
        <View style={estilos.container}>
            <TouchableOpacity
                style={estilos.buttom}
                onPress={() => {
                    SelectQuery()
                    }
                }
            >
                <Text>Teste</Text>
            </TouchableOpacity>
        </View>
    )
}