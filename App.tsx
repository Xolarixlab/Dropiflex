
import { SafeAreaView, Text, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import
{
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import LoadScreen from "./src/screens/LoadScreen";
import Home from "./src/screens/Home";
import CompleteOrder from "./src/screens/CompleteOrder";
import Settings from "./src/screens/Settings";
import OrderDetail from "./src/screens/OrderDetail";
import QrReader from "./src/screens/QrReader";
import Route from "./src/screens/Route";
import OnRoute from "./src/screens/OnRoute";
import HistoryNovelty from "./src/screens/HistoryNovelty";
import { saveToken, readToken, readPassword, savePassword } from './src/storage/storage'


import { useFonts } from 'expo-font';


const barIos = Platform.OS === "ios" ? 61 : 50;
const Tab = createBottomTabNavigator();



export default function App()
{

  const URL_BASE = process.env.REACT_APP_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("");
  const [pass, setPass] = useState("");



  ////Renderiza lectura de token 
  useEffect(() =>
  {

    (async () =>
    {

      passwordUser();
      setTimeout(() =>
      {
        verifyOperation();
      }, 3000);
    })();
  }, [])


  // /// Metodo para leer el token del usuario logueado , desde el local-storage
  async function passwordUser()
  {

    const data: any = readPassword();

    data.then((value: any) =>
    {
      setPass(value);

    }).catch((error: any) =>
    {
      console.log(error);

    });
    //return () => { setToken("") };
  }



  ////Comprobar si usuario ya esta logueado

  async function verifyOperation()
  {
    console.log('password', pass);
    console.log('password', typeof (pass));


    if (pass != "")
    {
      setIsLoggedIn(true);
      console.log('Lleno');

    } else if (pass == "")
    {
      setIsLoggedIn(false)
      console.log(isLoggedIn);
      console.log('Vacio');
    }

  }

  //fonts
  const [fontsLoadedBold] = useFonts({
    SoraBold: require("./src/appTheme/fonts/Sora-Bold.ttf"),
  });

  const [fontsLoadedLight] = useFonts({
    SoraLight: require("./src/appTheme/fonts/Sora-Light.ttf"),
  });

  const [fontsLoadedMedium] = useFonts({
    SoraMedium: require("./src/appTheme/fonts/Sora-Medium.ttf"),
  });


  const [fontsLoadedRegular] = useFonts({
    SoraRegular: require("./src/appTheme/fonts/Sora-Regular.ttf"),
  });

  const [fontsLoadedSemiBold] = useFonts({
    SoraSemiBold: require("./src/appTheme/fonts/Sora-SemiBold.ttf"),
  });


  if (!fontsLoadedBold || !fontsLoadedLight || !fontsLoadedMedium || !fontsLoadedRegular || !fontsLoadedSemiBold)
  {
    return null;
  };

  const fontBold = () => ({ fontFamily: 'SoraBold' });
  const fontLight = () => ({ fontFamily: 'SoraLight' });
  const fontMedium = () => ({ fontFamily: 'SoraMedium' });
  const fontRegular = () => ({ fontFamily: 'SoraRegular' });
  const fontSemiBold = () => ({ fontFamily: 'SoraSemiBold' });

  function HomeStackMenu()
  {
    const HomeStack = createStackNavigator();

    return (
      <HomeStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <HomeStack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="HistoryNovelty"
          component={HistoryNovelty}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Route"
          component={Route}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="OnRoute"
          component={OnRoute}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    );
  }



  function NavigationMenu()
  {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,


          tabBarStyle: {
            height: RFValue(barIos),
            backgroundColor: "#e4e7e9",
            borderTopColor: "#e4e7e9",
            elevation: 0,
          },

          tabBarIcon: ({ focused }) =>
          {
            let imagenes;
            if (route.name === "HomeStackMenu")
            {
              imagenes = require("./assets/img/home.png");
            } else if (route.name === "CompleteOrder")
            {
              imagenes = require("./assets/img/orders.png");
            } else if (route.name === "Settings")
            {
              imagenes = require("./assets/img/settings.png");
            }
            return (
              <Image
                source={imagenes}
                style={{
                  height: RFValue(34.4),
                  width: RFValue(33.3),
                  resizeMode: "contain",
                  opacity: (imagenes = focused ? 5 : 0.3),
                }}
              />
            );
          },
          tabBarHideOnKeyboard: true
        })}
      >
        <Tab.Screen name="HomeStackMenu" component={HomeStackMenu} options={{ unmountOnBlur: true }}
          listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })} />
        <Tab.Screen name="CompleteOrder" component={CompleteOrder} options={{ unmountOnBlur: true }}
          listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  }


  const Stack = createStackNavigator();
  if (isLoggedIn == true)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        >
          <Stack.Screen
            name="NavigationMenu"
            component={NavigationMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoadScreen"
            component={LoadScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QrReader"
            component={QrReader}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );


  } else if (isLoggedIn == false)
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QrReader"
            component={QrReader}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoadScreen"
            component={LoadScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NavigationMenu"
            component={NavigationMenu}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  {

  }
}


