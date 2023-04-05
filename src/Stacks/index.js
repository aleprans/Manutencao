import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from '../screens/Menu';
import ListServ from '../screens/ListServ';
import ListHrExtra from '../screens/ListHr';
import CadServ from '../screens/CadServ';
import CadHrExtra from '../screens/CadHrExtra';
import Relat from '../screens/Relatorios';
import Backup from '../screens/backup';
// import RelHrExtra from '../screens/Relatorios/HrExtra';
// import RelServ from '../screens/Relatorios/Serv';

const Stack = createNativeStackNavigator();

export default () => (
    <Stack.Navigator 
        initialRouteName='menu'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='menu' component={Menu}/>
        <Stack.Screen name='listServ' component={ListServ}/>
        <Stack.Screen name='listHr' component={ListHrExtra}/>
        <Stack.Screen name='CadServ' component={CadServ}/>
        <Stack.Screen name='CadHrExtra' component={CadHrExtra}/>
        <Stack.Screen name='Relatorios' component={Relat}/>
        <Stack.Screen name='Backup' component={Backup}/>
        {/* <Stack.Screen name='RelHrExtra' component={RelHrExtra}/> */}
        {/* <Stack.Screen name='RelServ' component={RelServ}/> */}
    </Stack.Navigator>
)