import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Searchbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Colors from '../components/Colors'
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import exampleImage from '../assets/pfpPlaceholder.png'
import { ceil } from 'react-native-reanimated';

export default function Create({ navigation }) {

    const[titleColor, setTitleColor] = useState(Colors.gray)
    const[title, setTitle] = useState("")

    const[entryColor, setEntryColor] = useState(Colors.gray)
    const[entry, setEntry] = useState("")

    const[thumbnail, setThumbnail] = useState(null)

    const[attachment, setAttachment] = useState(null)


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setThumbnail(result);
        }
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setAttachment(result);
        }
    };

    function renderPfp() {
        if(!thumbnail) {
            return(
                <View>
                    <Image source={require('../assets/thumbnailHolder.png')} style={{height: 250, width: '100%'}}>
                    </Image>
                </View>
            )
        } else {
            return(<Image source={{uri: thumbnail.uri}} style={{height: 250, width: '100%'}}/>)
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false)

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
            
            <View style={{width: '80%', alignSelf: 'center', flexDirection: 'row'}}>
                <Text style={styles.header}>Your Space</Text>
            </View>

            <Text style={{marginTop: '8.5%', fontSize: 17, color: Colors.white, marginLeft: '10%', fontFamily: 'UbuntuM'}}>Your Organizations</Text>

            <View style={{width: '80%', marginLeft: '10%', height: '10%', backgroundColor: '#3D2D49', marginTop: '4%', borderRadius: 14, justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={require('../assets/orgPic.png')} style={{marginLeft: '3%', alignSelf: 'center'}}></Image>
                
                <View style={{alignSelf: 'center', marginLeft: '5%'}}>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 20, color: Colors.white}}>NASA</Text>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 17, color: Colors.white}}><Text style={{color: Colors.purplePrimary}}>104</Text> members · <Text style={{color: Colors.purplePrimary}}>102</Text> logs</Text>
                </View>
            </View>
            <View style={{width: '80%', marginLeft: '10%', height: '10%', backgroundColor: '#3D2D49', marginTop: '2%', borderRadius: 14,  justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={require('../assets/Jeffery.jpeg')} style={{marginLeft: '3%', alignSelf: 'center', height: 65, width: 65, borderRadius: 10}}></Image>
                
                <View style={{alignSelf: 'center', marginLeft: '5%'}}>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 20, color: Colors.white}}>Blue Horizon</Text>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 17, color: Colors.white}}><Text style={{color: Colors.purplePrimary}}>87</Text> members · <Text style={{color: Colors.purplePrimary}}>79</Text> logs</Text>
                </View>
            </View>

            <Text style={{marginTop: '8.5%', fontSize: 17, color: Colors.white, marginLeft: '10%', fontFamily: 'UbuntuM'}}>Your Logs</Text>

            <View style={{width: '80%', marginLeft: '10%', height: '10%', backgroundColor: '#3D2D49', marginTop: '2%', borderRadius: 14,  justifyContent: 'flex-start', flexDirection: 'row'}}>
                <Image source={require('../assets/iss.jpeg')} style={{marginLeft: '3%', alignSelf: 'center', height: 65, width: 65, borderRadius: 10}}></Image>
                
                <View style={{alignSelf: 'center', marginLeft: '5%'}}>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 20, color: Colors.white}}>ISS Restock Mission</Text>
                    <Text style={{fontFamily: 'UbuntuM', fontSize: 17, color: Colors.white}}>Last updated 10 hrs ago</Text>
                </View>
            </View>

            <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => setIsModalVisible(true)}>
                <View style={{width: '80%', marginLeft: '10%', height: '10%', backgroundColor: '#3D2D49', marginTop: '2%', borderRadius: 14,  justifyContent: 'flex-start', flexDirection: 'row'}}>
                    <Image source={require('../assets/create.png')} style={{marginLeft: '3%', alignSelf: 'center', height: 65, width: 65, borderRadius: 10}}></Image>
                    
                    <View style={{alignSelf: 'center', marginLeft: '5%'}}>
                        <Text style={{fontFamily: 'UbuntuM', fontSize: 20, color: Colors.white}}>New Log</Text>
                        <Text style={{fontFamily: 'UbuntuM', fontSize: 17, color: Colors.white}}>Let's write down memories</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                <View style={{width: '90%', height: '90%', backgroundColor: Colors.backgroundMain, alignSelf: 'center', borderRadius: 20}}>
                    <TouchableOpacity onPress={() => pickImage()}>
                    {
                        renderPfp()
                    }
                    </TouchableOpacity>
                    <TextInput style={[styles.authInput, {marginTop: '7%', borderColor: titleColor}]} placeholder="Title" placeholderTextColor={Colors.gray} onFocus={() => setTitleColor(Colors.purplePrimary)} onBlur={() => setTitleColor(Colors.gray)} onChangeText={password => setTitle(password)} secureTextEntry={false}></TextInput>
                    <TextInput style={[styles.bioInput, {borderColor: entryColor, height: '40%', padding: 15}]} multiline placeholder="Entry Text" placeholderTextColor={Colors.gray} onFocus={() => setEntryColor(Colors.purplePrimary)} onBlur={() => setEntryColor(Colors.gray)} onChangeText={password => setEntry(password)} secureTextEntry={false}></TextInput>

                    <AppButton backgroundColor={Colors.white} title="Add Image" width="80%" height={40} marginTop="7%" color={Colors.black} onPress={() => {
                        pickImage2()
                    }}></AppButton>
                    <AppButton backgroundColor={Colors.white} title="Upload" width="80%" height={40} marginTop="7%" color={Colors.black} onPress={() => {
                        setIsModalVisible(false)
                    }}></AppButton>

                </View>
            </Modal>

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
        marginTop: '20%',
        fontFamily: 'UbuntuM',
        fontSize: 28,
        color: Colors.white
    },
    authInput: {
        borderBottomWidth: 2,
        paddingBottom: 5,
        width: '80%',
        fontFamily: 'UbuntuR',
        color: '#fff',
        fontSize: 19,
        alignSelf: 'center'
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
        color: Colors.white,
        marginLeft: '10%',
        marginTop: '7%'
    },
});