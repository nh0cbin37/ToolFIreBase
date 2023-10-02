// import { firestore } from '@react-native-firebase/firestore';
// import React, { useEffect, useState } from 'react'
// import { FlatList, View } from 'react-native'
// import { Text, TextInput } from 'react-native-paper'
// import '@react-native-firebase/database'
// // const database = firebase.firestore();
// // const myRef = database.collection('Product');


// const ThemXoaSua = () => {
//     const [dataUp, setdataUp] = useState("")
//     useEffect(() => {
//         firestore()   
//         ('value', snapshot => {
//           const data = snapshot.val();
//           // Update your component state with the data
//           setdataUp(data);
//         });
//       }, []);
//   return (
//     <View>
//         <Text>Connect to firebase</Text>
//         <TextInput placeholder='Moi ban nhap du lieu'/>
        
//         <FlatList data={dataUp}   
//             renderItem={({ item }) => (
//                 <TouchableOpacity >
                   
//                         <Text>{item.name}</Text>
                   
//                 </TouchableOpacity>
//             )}
//             keyExtractor={(item, index) => index.toString()}/>
//     </View>
//   )
// }

// export default ThemXoaSua

import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button, TextInput } from 'react-native-paper';



  
const ThemXoaSua = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const[id,setID] = useState(null);
  const [countID, setIdCount] = useState(0)

  useEffect(() => {
    const subscriber = firestore()
      .collection('Product')
      .onSnapshot(querySnapshot => {
        const items = []; 
        querySnapshot.forEach(documentSnapshot => {
          items.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      setData(items)
      });
      return () => subscriber();
  }, []);
  const addDataToFirestore = () => {
      firestore()
        .collection('Product') // Replace with your actual collection name
        .add({
          ID:countID+1,
          name: text, 
        })
        .then(() => {
          console.log('Data added!');
          setIdCount(countID+1);
        })
        .catch(error => {
          console.error('Error adding data: ', error);
        });
    };
  

    const deleteItem = (itemId) => {
      firestore()
        .collection('Product')
        .doc(itemId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });
    }

    const updateItem =  (itemId) => {
      firestore()
      .collection('Product')
      .doc(itemId)
      .update({ name: text})
      .then(() => {
        console.log('Item updated successfully');
      })
      .catch((error) => {
        console.error('Error updating item: ', error);
      });
    }; 

  return (
    <View style={styles.container} >
      <Text style={{alignSelf:'center',marginTop:'20%',fontSize:24,fontWeight:'bold',color:'black'}}>Database FireBase</Text>
      <TextInput style={{marginTop:'70%'}} value={text} onChangeText={setText}/>
      <ScrollView horizontal={true} style={{flexDirection:'row', margin:10}}>
        {/* <Button style={{width:100,height:50,backgroundColor:'aqua', margin:5}}  onPress={()=>{}}>Load</Button> */}
        <Button style={{width:100,height:50,backgroundColor:'aqua', margin:5}}  onPress={addDataToFirestore}>Add</Button>
        <Button style={{width:100,height:50,backgroundColor:'aqua', margin:5}}  onPress={()=> deleteItem(id)}>Delete</Button>
        <Button style={{width:100,height:50,backgroundColor:'aqua', margin:5}}  onPress={()=> {updateItem(id)}}>Update</Button>
      </ScrollView>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:24,marginRight:30}}>ID</Text>
                  <Text style={styles.text}>Name</Text>
            </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <TouchableOpacity onPress={() => {setID(item.id),setText(item.name)}}>
            
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.text}>{item.ID}</Text>
                  <Text style={styles.text}>{item.name}</Text>
            </View>
              </TouchableOpacity>}
        />
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
   justifyContent:'center',
  },
  text:{
    fontSize:24,
    marginRight:30
  }
})
export default ThemXoaSua;
