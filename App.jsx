import React, { useEffect} from 'react';
import Drawer_Navigation from './src/components/Drawer_Navigation';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// import CheckBox from 'react-native-check-box';


const App = () => {
  useEffect(() => {
    setTimeout (()=>{
      SplashScreen.hide();
    },1000)
  }, []);
  
  return (
    <NavigationContainer>
      <Drawer_Navigation />
    </NavigationContainer>
  );
};

export default App;
