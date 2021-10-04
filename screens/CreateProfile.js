import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ImageBackground, Platform } from 'react-native';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import { useState } from 'react';
import { emailSignUp } from '../components/AuthFunctions'
import firebase from '../components/FirebaseInstance'
import * as ImagePicker from 'expo-image-picker';
import * as Colors from '../components/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreateProfile({ navigation }) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Astronaut', value: 'Astronaut'},
        {label: 'Mission Control', value: 'Mission Control'},
        {label: 'Public', value: 'public'}
        ]);

    const[pfp, setPfp] = useState(null)

    const[nameColor, setNameColor] = useState(Colors.gray)
    const[name, setName] = useState("")

    const[cityColor, setCityColor] = useState(Colors.gray)
    const[city, setCity] = useState("")

    const[bioColor, setBioColor] = useState(Colors.gray)
    const[bio, setBio] = useState("")

    const [loaded] = useFonts({
        UbuntuM: require('../assets/fonts/UbuntuM.ttf'),
        UbuntuR: require('../assets/fonts/UbuntuR.ttf'),
        UbuntuB: require('../assets/fonts/UbuntuB.ttf')
    });

    if(!loaded) {
        return null;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setPfp(result);
        }
    };

    function renderPfp() {
        if(!pfp) {
            return(
                <View>
                    <ImageBackground source={require('../assets/pfpPlaceholder.png')} style={styles.pfpPicStyle} imageStyle={{borderRadius: 150}}>
                    </ImageBackground>
                </View>
                
            )
        } else {
            return(<Image source={{uri: pfp.uri}} style={styles.pfpPicStyle}/>)
        }
    }

    async function registerComplete() {

        
        /*let reference = storage().ref("profilePicture.jpg")
        let task = reference.putFile(pfp.uri);
        
        task.then(() => {
            console.log('Image uploaded to the bucket!');
        }).catch((e) => console.log('uploading image error => ', e));
        */
        /*
        const firestore = getStorage(firebase)

        await setDoc(doc())
        */

        const pastModel = await AsyncStorage.getItem('@onboardingModel')

        const uri = pfp.uri;
        const response = await fetch(uri);
        const blob = await response.blob()

        const bruh = await firebase.default.storage().ref("pfp" + JSON.parse(pastModel).uid + ".jpg").put(blob).then((snapshot) => {
            //You can check the image is now uploaded in the storage bucket
            console.log(`SussyBoys has been successfully uploaded.`);
          })
          .catch((e) => console.log('uploading image error => ', e));

        const imageURI = await firebase.default.storage().ref('pfp' + JSON.parse(pastModel).uid + ".jpg").getDownloadURL()

        console.log(imageURI)

        const current = {
            "name": name,
            "city": city,
            "bio": bio,
            "role": value,
            "organization": "none",
            "pfp": imageURI
        }
        const merged = {
            ...JSON.parse(pastModel),
            ...current
        }

        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(merged),
            headers: {
                'Content-Type': 'application/json',
                }, 
            redirect: 'follow'
            };

        const res = await fetch("https://us-central1-lunarnetclients.cloudfunctions.net/users/createUser", requestOptions)

        await AsyncStorage.setItem('@userModel', JSON.stringify(merged))

        navigation.push("Success")
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

            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subheader}>Your</Text>

            <View style={{marginTop: '7%', width: '100%', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => pickImage()}>
                    {renderPfp()}
                </TouchableOpacity>
            </View>

            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput style={[styles.authInput, {marginTop: '7%', borderColor: nameColor}]} placeholder="Name" placeholderTextColor={Colors.gray} onFocus={() => setNameColor(Colors.purplePrimary)} onBlur={() => setNameColor(Colors.gray)} onChangeText={name => setName(name)} ></TextInput>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput style={[styles.authInput, {marginTop: '4%', borderColor: cityColor}]} placeholder="City" placeholderTextColor={Colors.gray} onFocus={() => setCityColor(Colors.purplePrimary)} onBlur={() => setCityColor(Colors.gray)} onChangeText={city => setCity(city)} ></TextInput>
            </View>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{width: '80%', borderColor: Colors.gray, marginLeft: '10%', marginTop: '4%', backgroundColor: Colors.backgroundMain, color: Colors.gray}}
                textStyle={{fontFamily: 'UbuntuR', color: Colors.gray, fontSize: 15}}
                dropDownContainerStyle={{width: '77.5%', marginLeft: '10%', marginTop: '4%', backgroundColor: Colors.backgroundMain, borderColor: Colors.gray}}
                placeholder="What best describes you?"
                placeholderStyle={{color: Colors.gray}}
                />
            
            <View style={{width: '100%', alignItems: 'center', height: '17%', marginTop: '4%'}}>
                <TextInput style={[styles.bioInput, {borderColor: bioColor, height: '100%', padding: 15}]} placeholder="Bio" multiline={true} placeholderTextColor={Colors.gray} onFocus={() => setBioColor(Colors.purplePrimary)} onBlur={() => setBioColor(Colors.gray)} onChangeText={bio => setBio(bio)}></TextInput>
            </View>

            <View style={{marginTop: '15%', width: '100%'}}>
                <AppButton title="Next" onPress={() => registerComplete()} backgroundColor={Colors.white} width="80%" height={50} color={Colors.black}></AppButton>
            </View>
            
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
        fontSize: 15,
        fontFamily: 'UbuntuR'
    },
    pfpPicStyle: {
        height: 100,
        width: 100,
        borderRadius: 150,
    },
    bioInput: {
        borderColor: Colors.gray,
        borderWidth: 1,
        justifyContent: 'flex-end',
        borderRadius: 10,
        height: '15%',
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        width: '80%',
        paddingTop: 10,
        fontSize: 17,
        color: Colors.white
    },
});