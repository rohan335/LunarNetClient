import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import { useState } from 'react';
import { emailSignUp } from '../components/AuthFunctions'
import * as Colors from '../components/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp({ navigation }) {

    const[emailColor, setEmailColor] = useState(Colors.gray)
    const[email, setEmail] = useState("")

    const[passColor, setPassColor] = useState(Colors.gray)
    const[password, setPassword] = useState("")

    const[confirmPassColor, setConfirmPassColor] = useState(Colors.gray)
    const[confirmPass, setConfirmPass] = useState("")

    const [loaded] = useFonts({
        UbuntuM: require('../assets/fonts/UbuntuM.ttf'),
        UbuntuR: require('../assets/fonts/UbuntuR.ttf'),
        UbuntuB: require('../assets/fonts/UbuntuB.ttf')
    });

    if(!loaded) {
        return null;
    }

    async function signingIn() {
        console.log("bruhu")
        if(password == confirmPass) {
          let registerResponse = await emailSignUp(email, password)
          console.log(registerResponse)
          if(registerResponse.success == true) {
            
            const onboardingModel = {
              email: email,
              uid: registerResponse.info.user.uid
            }
            await AsyncStorage.setItem('@onboardingModel', JSON.stringify(onboardingModel))
            
            navigation.push("CreateProfile")
          }
          else {
            setEmailColor(Colors.red)
            let toast = Toast.show(registerResponse.errorMessage, {
              duration: Toast.durations.SHORT,
              position: -170,
              backgroundColor: Colors.red,
              opacity: 1,
              shadow: false
            });
          }
        } else {
          setPassColor(Colors.red)
          setConfirmPassColor(Colors.red)
          let toast = Toast.show('Passwords do not match', {
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

            <Text style={styles.title}>Register</Text>
            <Text style={styles.subheader}>Adventures await!</Text>

            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput style={[styles.authInput, {marginTop: '15%', borderColor: emailColor}]} placeholder="Email" placeholderTextColor={Colors.gray} onFocus={() => setEmailColor(Colors.purplePrimary)} onBlur={() => setEmailColor(Colors.gray)} onChangeText={email => setEmail(email)} ></TextInput>
                <TextInput style={[styles.authInput, {marginTop: '7%', borderColor: passColor}]} placeholder="Password" placeholderTextColor={Colors.gray} onFocus={() => setPassColor(Colors.purplePrimary)} onBlur={() => setPassColor(Colors.gray)} onChangeText={password => setPassword(password)} secureTextEntry={true}></TextInput>
                <TextInput style={[styles.authInput, {marginTop: '7%', borderColor: confirmPassColor}]} placeholder="Confirm Password" placeholderTextColor={Colors.gray} onFocus={() => setConfirmPassColor(Colors.purplePrimary)} onBlur={() => setConfirmPassColor(Colors.gray)} onChangeText={confirmPass => setConfirmPass(confirmPass)} secureTextEntry={true}></TextInput>
            </View>

            <Text style={{alignSelf: 'center', color: Colors.white, fontFamily: 'UbuntuR', fontSize: 20, marginTop: '45%', marginBottom: '7%'}}>Have an account? <Text style={{color: Colors.purplePrimary}}>Login</Text></Text>
            <AppButton title="Next" onPress={() => signingIn()} backgroundColor={email && password && confirmPass ? Colors.white : 'rgba(255, 255, 255, 0.2)'} width="80%" height={50} color={email && password && confirmPass ? Colors.black : Colors.lightGray}></AppButton>
            
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