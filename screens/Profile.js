import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { AppButton, AppTextButton } from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper'
import * as Colors from '../components/Colors'
import { useRef } from 'react';
import exampleImage from '../assets/pfpPlaceholder.png'
import { useEffect } from 'react';

export default function Profile({ navigation }) {

    const [userModel, setUserModel] = useState({
        name: "Loading User",
        pfp: Image.resolveAssetSource(exampleImage).uri,
        city: "Loading Location",
        role: "loading",
        organization: "loading",
        bio: "loading",
    })

    const readUser = async () => {
        const pastModel = await AsyncStorage.getItem('@userModel').then(response => JSON.parse(response))
        setUserModel(JSON.parse(pastModel))
    }

    useEffect(() => {
        readUser()
    }, [])

    const [search, setSearch] = useState('')

    const [loaded] = useFonts({
        UbuntuM: require('../assets/fonts/UbuntuM.ttf'),
        UbuntuR: require('../assets/fonts/UbuntuR.ttf'),
        UbuntuB: require('../assets/fonts/UbuntuB.ttf')
    });

    if(!loaded) {
        return null;
    }

    return (
      <View style={styles.container}>
            <StatusBar style="auto" />
            
            <View style={{width: '100%', flexDirection: 'row', marginTop: '25%', justifyContent: 'flex-start', marginLeft: '10%'}}>
                <Image source={{uri: userModel.pfp}}
                style={{height: 100, width: 100, borderRadius: 100}}
                ></Image>
                <View style={{alignSelf: 'center', marginLeft: '7%'}}>
                    <Text style={styles.header}>
                        {userModel.name}
                    </Text>
                    <Text style={[styles.header, {color: '#a5a5a5', fontSize: 20}]}>
                            {userModel.role}
                    </Text>
                </View>  
            </View>

            <View style={{flexDirection: 'row', marginTop: '4%', marginLeft: '10%'}}>
                <Ionicons name="location" size={30} color={Colors.white}></Ionicons>
                <Text style={{color: Colors.white, fontSize: 20, fontFamily: 'UbuntuR', alignSelf: 'center', marginLeft: '2%'}}>{userModel.city}</Text>
            </View>

            <Text style={{ width: '80%', marginLeft: '10%', marginTop: '5%', color: Colors.white, fontFamily: 'UbuntuR', fontSize: 17}}>
            {userModel.bio}
            </Text>

      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundMain,
        alignItems: 'flex-start',
    },
    header: {
        fontFamily: 'UbuntuM',
        fontSize: 28,
        color: Colors.white,
        alignSelf: 'center'
    }
});