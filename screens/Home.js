import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useState } from 'react';
import { AppButton, AppTextButton } from '../components/CustomButton'
import { useFonts } from 'expo-font'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper'
import * as Colors from '../components/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useEffect } from 'react';

export default function Home({ navigation }) {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const [chosen, setChosen] = useState(0)

    const [logs, setLogs] = useState(
        [
            {
                "ref": {
                    "@ref": {
                        "id": "311463035345568324",
                        "collection": {
                            "@ref": {
                                "id": "Logs",
                                "collection": {
                                    "@ref": {
                                        "id": "collections"
                                    }
                                }
                            }
                        }
                    }
                },
                "ts": 1633298469590000,
                "data": {
                    "access": "public",
                    "publishStatus": "published",
                    "timestamp": "2021-10-03T19:37:41+0000",
                    "authors": "John Smith",
                    "title": "ISS Refueling Mission",
                    "flairs": "International Space Station, Refueling, Cargo",
                    "thumbnails": "https://cdn.mos.cms.futurecdn.net/fKZ2vtNGzTxa93C7KfaeRh.jpg",
                    "entries": [
                        {
                            "timestamp": "2021-10-03T14:37:41+0000",
                            "text": "The Antares Rocket blasted off from Cape Canaveral with a payload of 7890kg worth of supplies. The launch sequence and flight into orbit was routine with no unexpected events. The velocity of the rocket peaked and 4.9 m/s during entry.",
                            "image": "https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2019/04/47580652972_1972fbdf07_k.jpg"
                        },
                        {
                            "timestamp": "2021-10-03T14:52:41+0000",
                            "text": "The rocket has crossed the Kármán Line at 100km above sea level, and has officially entered space. The trajectory in en route to perfectly dock onto the International Space Station"
                        },
                        {
                            "timestamp": "2021-10-03T15:06:41+0000",
                            "text": "The Cygnus spacecraft successfully docked to the International Space Station. The Crew is currently unloading the cargo and supplies.",
                            "image": "https://s3.amazonaws.com/cms.ipressroom.com/295/files/20186/5b4b4f702cfac260cb3a105b_Northrop+Grummans+Cygnus+Spacecraft+Begins+Secondary+Mission+in+Space/Northrop+Grummans+Cygnus+Spacecraft+Begins+Secondary+Mission+in+Space_a1ad41f3-5002-4fd5-a91a-2b6903f47f07-prv.jpg"
                        },
                        {
                            "timestamp": "2021-10-03T16:03:24+0000",
                            "text": "The crew completed unloading all of the cargo and supplied. There were no damaged to any cargo during the journey, and all cargo is accounted for. The spacecraft is being released from the ISS."
                        }
                    ]
                }
            }
        ]
    )

    const getLogs = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "bruh": "bruh"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const poggers = await fetch("https://us-central1-lunarnetclients.cloudfunctions.net/logs/getAllLogs", requestOptions).then(response => response.text())
        
        console.log(poggers)

        setLogs(JSON.parse(poggers).data)
    }

    useEffect(
        () => {
            getLogs()
        }, []
    )

    const [search, setSearch] = useState('')

    const [loaded] = useFonts({
        UbuntuM: require('../assets/fonts/UbuntuM.ttf'),
        UbuntuR: require('../assets/fonts/UbuntuR.ttf'),
        UbuntuB: require('../assets/fonts/UbuntuB.ttf')
    });

    if(!loaded) {
        return null;
    }

    const handler = async (bruh) => {
        
        setSearch(bruh.toLowerCase())

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "term": search
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let longRes = await fetch("https://us-central1-lunarnetclients.cloudfunctions.net/logs/searchLogs", requestOptions)
        .then(result => result.text())
        .then(response => JSON.parse(response))

        let filtered = []

        filtered = longRes[0].concat(longRes[1])
        filtered = filtered.concat(longRes[2])
        filtered = filtered.concat(longRes[3])

        //console.log(JSON.parse(longRes)[1])

        setLogs(filtered)

    }

    return (
      <View style={styles.container}>
            <StatusBar style="auto" />
            
            <View style={{width: '80%', alignSelf: 'center', flexDirection: 'row'}}>
                <Text style={styles.header}>Feed</Text>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Ionicons name="menu" size={30} color={Colors.white}></Ionicons>
                </View>
            </View>

            <View style={{width: '80%', alignSelf: 'center', marginTop: '5%'}}>
                <Searchbar
                placeholder="Search"
                value={search}
                onChangeText={(text) => {
                    handler(text)
                }}
                style={{
                    backgroundColor: Colors.backgroundMain,
                    borderColor: Colors.white
                }}
                inputStyle={{
                    color: Colors.white
                }}
                iconColor={search ? Colors.white : Colors.gray}
                placeholderTextColor={Colors.gray}
                />
            </View>

            <ScrollView style={{width: '100%', height: '100%'}}>

                {
                    logs.map((logdata, index) => (
                        <TouchableOpacity onPress={() => {
                            setChosen(index)
                            setIsModalVisible(true)
                        }}>
                            <ImageBackground source={{uri: logdata.data.thumbnails}} style={{width: '100%', height: 300, marginTop: '5%'}}>
                            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']} style={{height:'100%', width:'100%', justifyContent: 'flex-end'}} start={[0.5, 0]} end={[0.5, 1]}>
                                <View style={{marginLeft: '5%', marginBottom: '5%'}}>
                                    <Text style={{color: Colors.white, fontFamily: 'UbuntuM', fontSize: 19, }}>{logdata.data.title}</Text>
                                    <Text style={{color: Colors.white, fontFamily: 'UbuntuM', fontSize: 17, marginTop: '3%'}}>{moment(logs[chosen].data.timestamp).format("MMM DD, hh:mm a")}</Text>
                                </View>
                            </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))  
                }

            </ScrollView>

            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                <View style={{width: '90%', height: '85%', backgroundColor: Colors.backgroundMain, alignSelf: 'center', borderRadius: 20}}>
                <ScrollView>

                    
                    <ImageBackground source={{uri: logs[chosen].data.thumbnails}} style={{width: '100%', height: 250}} imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                        <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']} style={{height:'100%', width:'100%', justifyContent: 'flex-end', borderTopLeftRadius: 20, borderTopRightRadius: 20}} start={[0.5, 0]} end={[0.5, 1]}>
                            <View style={{marginLeft: '5%', marginBottom: '5%'}}>
                                <Text style={{color: Colors.white, fontFamily: 'UbuntuM', fontSize: 19, }}>{logs[chosen].data.title}</Text>
                                <Text style={{color: Colors.white, fontFamily: 'UbuntuM', fontSize: 17, marginTop: '3%'}}>{moment(logs[chosen].data.timestamp).format("MMM DD, hh:mm a")}</Text>
                                <Text style={{color: Colors.white, fontFamily: 'UbuntuM', fontSize: 17, marginTop: '3%'}}>{logs[chosen].data.authors}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                        {
                            logs[chosen].data.entries.map((logdata, index) => (
                                <View key={index}>
                                <Text style={{fontFamily: 'UbuntuM', fontSize: 17, color: Colors.white, marginLeft: '5%', marginTop: '10%'}}>{moment(logdata.timestamp).format("dddd, MMM DD, hh:mm a")}</Text>
                                <Text style={{fontFamily: 'UbuntuR', fontSize: 15, color: Colors.white, marginLeft: '5%', marginTop: '3%'}}>{logdata.text}</Text>
                                {logdata.image
                                    ? <Image source={{uri: logdata.image}} style={{width: '100%', height: 125, marginTop: '5%'}}></Image>
                                    : <Image source={{uri: logdata.image}} style={{width: '100%', height: 0, marginTop: '5%'}}></Image>
                                }
                                
                                </View>
                            ))
                        }
                    </ScrollView>

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
    }
});