import React from 'react';
import Welcome from "./screens/Welcome";
import SignUp from './screens/SignUp'
import CreateProfile from './screens/CreateProfile'
import LogIn from './screens/LogIn'
import Home from './screens/Home'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Create from './screens/Create'
import Profile from './screens/Profile'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as Colors from './components/Colors'
import Success from './screens/Success';

const AuthStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

function MainAppTabs() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.backgroundMain,
    },
  };
  return(
    <MainTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSrc;
          
          if(route.name == "Home") {
            iconSrc = focused ? 'home' : 'home'
            color = focused ? Colors.purplePrimary : Colors.lightGray
            size = focused ? 36 : 32
          } else if (route.name == 'Create') {
            iconSrc = focused ? 'compass' : 'compass'
            color = focused ? Colors.purplePrimary : Colors.lightGray
            size = focused ? 36 : 32
          } else if (route.name == 'Profile') {
            iconSrc = focused ? 'person' : 'person'
            color = focused ? Colors.purplePrimary : Colors.lightGray
            size = focused ? 36 : 32
          }

          return <Ionicons size={size} name={iconSrc} color={color}></Ionicons>;
        },
        tabBarStyle: {
          height: 90,
          backgroundColor: Colors.backgroundMain
        },
        headerBackgroundContainerStyle: Colors.backgroundMain,
        tabBarInactiveBackgroundColor: Colors.backgroundMain,
        tabBarActiveTintColor: Colors.backgroundMain,
        tabBarShowLabel: false,
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.backgroundMain
        }
      })
      
    }
    >
      <MainTabs.Screen name="Home" component={Home}/>
      <MainTabs.Screen name="Create" component={Create}/>
      <MainTabs.Screen name="Profile" component={Profile}/>
    </MainTabs.Navigator>
  )
}

export default () => (
  <NavigationContainer>
    <AuthStack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: Colors.backgroundMain}}} sceneC>
      <AuthStack.Screen name="Welcome" component={Welcome}/>
      <AuthStack.Screen name="SignUp" component={SignUp}/>
      <AuthStack.Screen name="LogIn" component={LogIn}/>
      <AuthStack.Screen name="CreateProfile" component={CreateProfile}/>
      <AuthStack.Screen name="Success" component={Success}/>
      <AuthStack.Screen name="Home" component={MainAppTabs}/>
    </AuthStack.Navigator>
  </NavigationContainer>
)