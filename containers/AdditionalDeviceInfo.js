import React, { useState, useEffect } from 'react';
import GetLocation from 'react-native-get-location';
import publicIP from 'react-native-public-ip';


import {
    getApiLevel,
    isEmulator as getEmulator,
    getIpAddress,
} from 'react-native-device-info';

import {Text, View} from "react-native";

const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 10
    }
}

export const AdditionalDeviceInfo = () => {

    const [state, setState] = useState({});

    useEffect(async ()=> {
        const apiLevel = await getApiLevel();
        const isEmulator = await getEmulator();
        const ip = await publicIP();
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then((location) => {
            console.log('Location', location)
            setState({location})
        } ).catch(console.log);





        setState({apiLevel, isEmulator, ip})
    }, [])

    return (
        <View>
        <Text style={{paddingTop:10, paddingBottom: 10}}>Additional info</Text>
        <View style={styles.row}>
        <Text>Api Level:</Text>
        <Text >{state.apiLevel}</Text>
        </View>

            {state.isEmulator !== undefined ? <View style={styles.row}>
            <Text>is this an emulator:</Text>
            <Text >{state.isEmulator + ''}</Text>
        </View>: null}

            {state.ip !== undefined ? <View style={styles.row}>
                <Text>Public IP:</Text>
                <Text >{state.ip}</Text>
            </View>: null}

            {state.location !== undefined ? <View style={styles.row}>
                <Text>location:</Text>
                <Text >ltd: {state.location.latitude} lng: {state.location.latitude}</Text>
            </View>: <View style={styles.row}>
                <Text>location: unknown</Text>
            </View>}

        </View>)
}
