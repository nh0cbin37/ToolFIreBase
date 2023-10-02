import React from 'react'
import {Text} from 'react-native-paper'
import { View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import ThemXoaSua from './ThemXoaSua'

const App = () => {
  // firestore().collection("Product").add({name:'nuocsuoi',price:'2000'}).then(()=>console.log("add new product"));
  return (

        <ThemXoaSua/>
    )
}

export default App