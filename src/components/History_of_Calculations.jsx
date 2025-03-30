import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  deleteCalculations,
  deleteSelectedItem,
  getCalculations,
} from '../Databases/firebaseCRUD';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box';
import {useFocusEffect} from '@react-navigation/native';

export const History_of_Calculations = ({navigation}) => {
  const [history, setHistory] = useState([]);
  const [isChecked, setIsChecked] = useState({});
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [optionsMenu, setOptionsMenu] = useState({
    selectAll: false,
    delete: false,
    deleteAll: false,
  });

  // ✅ Fetch data from database
  const fetchData = async () => {
    const use_data = await getCalculations();
    setHistory(use_data);
  };

  // ✅ Toggle checkbox for specific item
  const toggleCheckbox = docId => {
    setIsChecked(prevState => {
      const updatedState = {...prevState, [docId]: !prevState[docId]};

      // ✅ Check if at least one checkbox is checked
      const anyChecked = Object.values(updatedState).some(value => value);
      setShowCheckboxes(anyChecked);

      setOptionsMenu({
        selectAll: anyChecked, // Enable if at least one is checked
        delete: anyChecked,
        deleteAll: anyChecked,
      });

      return updatedState;
    });
  };

  // ✅ Handle long press to show checkboxes
  const handleLongPress = () => {
    setShowCheckboxes(true);
    // setOptionsMenu({
    //   selectAll: true,
    //   delete: true,
    //   deleteAll: true,
    // });
  };

  // ✅ Reset everything when leaving the screen
  useFocusEffect(
    useCallback(() => {
      console.log('History component is opened');
      fetchData();
      return () => {
        console.log('History Component is unmounted');
        setShowCheckboxes(false);
        setIsChecked({});
        setOptionsMenu({
          selectAll: false,
          delete: false,
          deleteAll: false,
        });
      };
    }, [navigation]),
  );

  useEffect(() => {
    console.log(isChecked);
  }, [isChecked]);

  const select_all_checkboxes = () => {
    setIsChecked(prevState => {
      const updatedState = {};

      // ✅ Select all checkboxes
      history.forEach((_, index) => {
        updatedState[index] = true;
      });

      return updatedState; //This returns the updatedState object,
      // which will now be used to update isChecked.
      // setIsChecked takes this returned object and updates the state.
    });
    setShowCheckboxes(true);
  };

  const delete_all_checkboxes = async () => {
    try {
      Alert.alert('Deleted Successfully');
      await deleteCalculations();
      fetchData();
      setOptionsMenu({
        selectAll: false,
        delete: false,
        deleteAll: false,
      });
    } catch (error) {
      console.log('ERROR WHILE DELETING IS : ', error);
    }
  };

  const delete_selected_item = async () => {
    try {
      const selectedDocIds = Object.keys(isChecked)
      .filter(key => isChecked[key]) // Get checked indexes
      .map(index => history[index].id); // ✅ Convert index to document ID
      await deleteSelectedItem(selectedDocIds);
      fetchData();
      setIsChecked({});
      setShowCheckboxes(false)
    } catch (error) {
      console.log('Error while deleting a single item is : ', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* ✅ Drawer Menu Button */}
      <TouchableOpacity
        style={styles.menu}
        onPress={() => navigation.openDrawer()}>
        <Icon name="format-list-bulleted" size={30} color="orange" />
      </TouchableOpacity>

      {/* ✅ Options Menu - Only Shows if Checkboxes Are Active */}
      {showCheckboxes && (
        <View style={styles.optionsMenu}>
          {optionsMenu.selectAll && (
            <TouchableOpacity onPress={select_all_checkboxes}>
              <Text style={styles.optionText}>Select All</Text>
            </TouchableOpacity>
          )}
          {optionsMenu.delete && (
            <TouchableOpacity onPress={delete_selected_item}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
          )}
          {optionsMenu.deleteAll && (
            <TouchableOpacity onPress={delete_all_checkboxes}>
              <Text style={styles.optionText}>Delete All</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* ✅ History List */}
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        extraData={{isChecked, showCheckboxes}}
        renderItem={({item, index}) => (
          <TouchableOpacity onLongPress={handleLongPress} activeOpacity={0.7}>
            <View style={styles.historyRow}>
              {showCheckboxes && (
                <CheckBox
                  isChecked={isChecked[index] || false}
                  onClick={() => toggleCheckbox(index)}
                  checkBoxColor="green"
                />
              )}
              <Text style={styles.input}>{item.user_input}</Text>
              <Text style={styles.historyText}>=</Text>
              <Text style={styles.historyResult}>{item.result}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  menu: {
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 15,
  },
  optionsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  optionText: {
    color: '#999',
    fontSize: 18,
  },
  historyRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    color: 'gray',
    fontSize: 18,
  },
  historyText: {
    fontSize: 18,
    color: 'white',
  },
  historyResult: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default History_of_Calculations;
