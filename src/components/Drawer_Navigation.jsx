import React, { useCallback } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import Main_Screen from './Main_Screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import History_of_Calculations from './History_of_Calculations';
const Drawer = createDrawerNavigator();
// COMPONENTS FOR DRAWER NAVIGATION OF CALCULATOR
const HomeScreen = ({navigation}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
    <Icon name="format-list-bulleted" size={30} color="orange" />
    </TouchableOpacity>
    <Main_Screen />
  </View>
);

// export const Inbox = ({navigation}) => (
  //   <View style={styles.container}>
  //     <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
  //     <Icon name="format-list-bulleted" size={30} color="orange" />
  //     </TouchableOpacity>
  //   <Text style ={styles.text}>Inbox </Text>
  //   </View>
  // );
  // export const Trash = ({navigation}) => (
    //   <View style={styles.container}>
    //     <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
    //     <Icon name="format-list-bulleted" size={30} color="orange" />
    //     </TouchableOpacity>
    //     <Text style={styles.text}>Trash</Text>
    //   </View>
    // );
    
    const Drawer_Navigation = () => {
      return (
        <Drawer.Navigator
        screenOptions={{
          sceneContainerStyle: styles.container,
          headerShown: false, // Removes the header
          drawerStyle: {backgroundColor: '#000'}, // Black drawer
          drawerActiveTintColor: 'orange', // Active item color
          drawerInactiveTintColor: 'gray',
        }}>
        
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="History" component={History_of_Calculations} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures it takes full screen
    backgroundColor: '#000', // Sets background color to black
  },
  text: {
    color: '#fff', // Makes text white so it's visible on black background
    fontSize: 20,
  },
  menu : {
    marginTop : 25,
    marginLeft : 10
  }
});

export default Drawer_Navigation;
