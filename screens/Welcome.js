import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import * as Colors from '../components/Colors'

export default function Welcome({ navigation }) {

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
                
                <Image source={require('../assets/welcomeSplash.png')}></Image>
                
                <Text style={styles.title}>LunarNet</Text>
                <Text style={styles.subheader}>Logging your adventures</Text>

                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', backgroundColor: Colors.black, borderRadius: 14, marginTop: '40%'}}>
                    <AppButton width="50%" onPress={() => navigation.push("SignUp")} title="Sign up" backgroundColor={Colors.white} color={Colors.black} height={60}></AppButton>
                    <AppButton width="50%" onPress={() => navigation.push("LogIn")} title="Log in" backgroundColor={Colors.black} color={Colors.white} height={60} borderTopLeftRadius="0%" borderBottomLeftRadius="0%" borderRadius={10}></AppButton>
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
        fontSize: 40,
        color: Colors.white,
        fontFamily: 'UbuntuR',
        marginTop: '25%'
    },
    subheader: {
        fontSize: 20,
        color: Colors.white,
        fontFamily: 'UbuntuR',
        marginTop: '5%'
    }
});