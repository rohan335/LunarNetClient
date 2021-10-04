import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emailLogin } from '../components/AuthFunctions'
import Toast from 'react-native-root-toast';
import * as Colors from '../components/Colors'

export default function LogIn({ navigation }) {

    const[emailColor, setEmailColor] = useState(Colors.gray)
    const[email, setEmail] = useState("")

    const[passColor, setPassColor] = useState(Colors.gray)
    const[password, setPassword] = useState("")

    const [loaded] = useFonts({
        UbuntuM: require('../assets/fonts/UbuntuM.ttf'),
        UbuntuR: require('../assets/fonts/UbuntuR.ttf'),
        UbuntuB: require('../assets/fonts/UbuntuB.ttf')
    });

    if(!loaded) {
        return null;
    }

    async function signIn() {
        let loginResponse = await emailLogin(email, password)
        console.log(loginResponse)
        if(loginResponse.success == true) {
          console.log(loginResponse.info.user.uid)

          let merged = {
            "firebaseToken": loginResponse.info.user.uid
          }

          var requestOptions = {
            method: 'POST',
            body: JSON.stringify(merged),
            headers: {
                'Content-Type': 'application/json',
                }, 
            redirect: 'follow'
            };

          const res = await fetch("https://us-central1-lunarnetclients.cloudfunctions.net/users/getUserByFirebaseID", requestOptions).then(response => response.text())

          console.log(res)

          await AsyncStorage.setItem('@userModel', JSON.stringify(res))
          navigation.push("Home")
        }
        else {
          setEmailColor(Colors.red)
          setPassColor(Colors.red)
          let toast = Toast.show('Invalid Username/Password', {
            duration: Toast.durations.SHORT,
            position: -170,
            backgroundColor: Colors.red,
            opacity: 1,
            shadow: false
          });
        }
      }

    return (
      <View style={styles.container}>
            <StatusBar style="auto" />
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" color={Colors.white} size={35} style={{
                    marginTop: '17%',
                    marginLeft: '10%'
                }}></Ionicons>
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subheader}>Let's get back into orbit!</Text>

            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput style={[styles.authInput, {marginTop: '15%', borderColor: emailColor}]} placeholder="Email" placeholderTextColor={Colors.gray} onFocus={() => setEmailColor(Colors.purplePrimary)} onBlur={() => setEmailColor(Colors.gray)} onChangeText={email => setEmail(email)} ></TextInput>
                <TextInput style={[styles.authInput, {marginTop: '7%', borderColor: passColor}]} placeholder="Password" placeholderTextColor={Colors.gray} onFocus={() => setPassColor(Colors.purplePrimary)} onBlur={() => setPassColor(Colors.gray)} onChangeText={password => setPassword(password)} secureTextEntry={true}></TextInput>
            </View>

            <Text style={{alignSelf: 'center', color: Colors.white, fontFamily: 'UbuntuR', fontSize: 20, marginTop: '65%', marginBottom: '7%'}}>Have an account? <Text style={{color: Colors.purplePrimary}}>Login</Text></Text>
            <AppButton title="Next" onPress={() => signIn()} backgroundColor={email && password ? Colors.white : 'rgba(255, 255, 255, 0.2)'} width="80%" height={50} color={email && password ? Colors.black : Colors.lightGray}></AppButton>

      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundMain,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 30,
        color: Colors.white,
        fontFamily: 'UbuntuM',
        marginTop: '10%',
        marginLeft: '10%',
    },
    subheader: {
        fontSize: 25,
        color: Colors.white,
        fontFamily: 'UbuntuR',
        marginLeft: '10%',
        marginTop: '2%',
    },
    authInput: {
        borderWidth: 1,
        padding: 20,
        color: '#fff',
        borderRadius: 14,
        width: '80%',
        fontSize: 19,
        fontFamily: 'UbuntuR'
    },
});