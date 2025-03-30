import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {addCalculations} from '../Databases/firebaseCRUD';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const Main_Screen = () => {
  const [input, setinput] = useState('');
  const [result, setresult] = useState('0');
  
  useFocusEffect(
    useCallback(() => {
      return () => {
        setresult('0'); 
      };
    }, [])
  );
  const handleInput = num => {
    // setinput(prevInput => prevInput + num);
    //I USED THIS INSTEAD OF THIS setinput(input + num) directly referenced input,
    //causing React to repeatedly re-render and update state, leading to an infinite loop.

    setinput(prevInput => {
      // If the previous input was a result, replace it with the new calculation
      if (prevInput === String(result)) {
        return String(result) + num; // Continue from result
      }
      return prevInput + num;
    });
  };

  const displayResult = async () => {
    try {
      let evaluatedResult = eval(input);
      let result_string = String(evaluatedResult);
      setresult(result_string);
      setinput('');
      await addCalculations({
        user_input: input,
        result: result_string,
      });
    } catch (error) {
      console.log(error);
      setresult('Heheheehhe');
    }
  };
  const handleFields = () => {
    setinput('');
    setresult('');
  };


  return (
    <View style={styles.container}>
      {/* INPUT VALUES */}
      <View style={styles.box}>
        <TextInput
          style={styles.calculation_box}
          value={input}
          onChangeText={text => setinput(text)}
        />
      </View>
      {/* result */}
      <View style={styles.result_box}>
        {/* <TextInput style={styles.result_text} value={result} /> */}
        <Text
          style={styles.result_text}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5} // Shrinks text down to 50% of its original size
        >
          {result}
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.All_Buttons}>
        <View style={styles.Buttons_Grid}>
          <TouchableOpacity
            style={styles.first_three_buttons}
            onPress={handleFields}>
            <Text style={styles.first_three_buttons_Text}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.first_three_buttons}
            onPress={() => {
              handleInput('±');
            }}>
            <Text style={styles.first_three_buttons_Text}>±</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.first_three_buttons}
            onPress={() => {
              handleInput('%');
            }}>
            <Text style={styles.first_three_buttons_Text}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_right}
            onPress={() => {
              handleInput('/');
            }}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        {/* Next four buttons */}
        <View style={styles.Buttons_Grid}>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('7');
            }}>
            <Text style={styles.remaining_buttons_Text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('8');
            }}>
            <Text style={styles.remaining_buttons_Text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('9');
            }}>
            <Text style={styles.remaining_buttons_Text}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_right}
            onPress={() => {
              handleInput('*');
            }}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>
        {/* Next four buttons */}
        <View style={styles.Buttons_Grid}>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('4');
            }}>
            <Text style={styles.remaining_buttons_Text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('5');
            }}>
            <Text style={styles.remaining_buttons_Text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('6');
            }}>
            <Text style={styles.remaining_buttons_Text}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_right}
            onPress={() => {
              handleInput('-');
            }}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        {/* Next Four Buttons */}
        <View style={styles.Buttons_Grid}>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('1');
            }}>
            <Text style={styles.remaining_buttons_Text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('2');
            }}>
            <Text style={styles.remaining_buttons_Text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('3');
            }}>
            <Text style={styles.remaining_buttons_Text}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_right}
            onPress={() => {
              handleInput('+');
            }}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Next four buttons */}
        <View style={styles.Buttons_Grid}>
          <TouchableOpacity style={styles.remaining_buttons}>
            <Icon name="calculator" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('0');
            }}>
            <Text style={styles.remaining_buttons_Text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remaining_buttons}
            onPress={() => {
              handleInput('.');
            }}>
            <Text style={styles.remaining_buttons_Text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_right} onPress={displayResult}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginHorizontal: 13,
  },
  box: {
    width: '100%',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000',
    // borderRadius: 10,
    padding: 10,
    marginTop: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  calculation_box: {
    color: '#A0A0A0',
    fontSize: 28,
    fontWeight: '300',
    fontFamily: 'sans-serif-light',
    letterSpacing: 1, // Slightly spaced-out letters
    opacity: 0.9, // Slight transparency
  },
  result_box: {
    backgroundColor: '#000',
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  result_text: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  All_Buttons: {
    flex: 1,
    margin: 5,
    marginTop: 10,
  },
  Buttons_Grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  button_right: {
    width: 70, // Adjust size
    height: 70,
    borderRadius: 35, // Makes it circular
    backgroundColor: 'orange', // Orange background
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 38, // Adjust symbol size
    color: 'white', // White text color
    fontWeight: 'bold',
  },
  first_three_buttons: {
    width: 70, // Button size
    height: 70,
    borderRadius: 35, // Circular shape
    backgroundColor: '#4D4D4D', // Dark gray color
    justifyContent: 'center',
    alignItems: 'center',
  },
  first_three_buttons_Text: {
    fontSize: 31, // Text size
    color: 'white', // White text
    fontWeight: 'bold',
  },
  remaining_buttons: {
    width: 70, // Button size
    height: 70,
    borderRadius: 35, // Circular shape
    backgroundColor: '#333333', // Dark gray color
    justifyContent: 'center',
    alignItems: 'center',
  },
  remaining_buttons_Text: {
    fontSize: 34, // Text size
    color: 'white', // White text
    fontWeight: 'bold',
  },
});
export default Main_Screen;
