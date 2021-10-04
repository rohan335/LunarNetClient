import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import * as Colors from '../components/Colors'

export default function Success({ navigation }) {

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
            <View style={{alignItems: 'center', width: '100%'}}>
                
                <Image source={require('../assets/successSplash.png')} style={{marginTop: '45%'}}></Image>
                
                <Text style={styles.title}>Registered</Text>
                <Text style={styles.subheader}>Blast off successful!</Text>

                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', borderRadius: 14, marginTop: '55%'}}>
                    <AppButton width="100%" onPress={() => navigation.push("Home")} title="Get going" backgroundColor={Colors.white} color={Colors.black} height={60}></AppButton>
                </View>

            </View>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundMain,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: Colors.white,
        fontFamily: 'UbuntuM',
        marginTop: '7%'
    },
    subheader: {
        fontSize: 25,
        color: Colors.white,
        fontFamily: 'UbuntuR',
        marginTop: '3%'
    }
});