import firestore from '@react-native-firebase/firestore';

// for CREATE Data
export const addCalculations = async (user_Input, result) => {
  try {
    await firestore().collection('users').add(user_Input, result);
    console.log('Data added is:', user_Input);
  } catch (error) {
    console.log('Error on adding : ', error);
  }
};

export const getCalculations = async () => {
  try {
    const querySnapshot = await firestore().collection('users').get();
    let calculations = [];
    // WE USE querrySnapshot because it is a object that behaves like an array so we can use
    // .forEach to store the doc data in it we cant use direct getCaclculations cz it is a func
    querySnapshot.forEach(doc => {
      //.push is giving random unique id to the data
      calculations.push({ id: doc.id, ...doc.data() }); // Loop through each document
    });
    console.log('Data from Database is :', calculations);
    return calculations;
  } catch (error) {
    console.log('Error while fetching is ', error);
  }
};

export const deleteCalculations = async () => {
  try {
    const querrySnapshot = await firestore().collection('users').get();
    const batch = firestore().batch();
    querrySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log('All the calculations are deleted');
  } catch (error) {
    console.log('Error is : ', error);
  }
};
// we use batch for performing many operations in a single step transact
// If u use only delete then it will be not good for optimization as if u have 1000+ data it
// will delete it one by one
// .ref is a reference property for teh documents & .commit is used for execution of batch

export const deleteSelectedItem = async selectedDocIds => {
  try {
    const batch = firestore().batch();

    selectedDocIds.forEach(docId => {
      const docRef = firestore().collection('users').doc(docId);
      batch.delete(docRef);
    });
    await batch.commit();
    console.log('The element deleted on index is ', selectedIndex);
  } catch (error) {
    console.log('Error while deleting the single data is : ', error);
  }
};
