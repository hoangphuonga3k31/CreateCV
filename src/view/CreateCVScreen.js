import * as React from 'react'
import { FAB } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
  } from "react-native";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { List } from 'react-native-paper';

import SelectList from 'react-native-dropdown-select-list';

function CreateCVScreen({ navigation }) {
  const [apliedJobsJist, setApliedJobsList] = useState([])
  const userId = useSelector((state) => state.info.id);


  const handleCreateCV = () => {
    navigation.navigate('Create CV')
  }
    
  async function fetchData() {
    await fetch(`https://createcvserver.vercel.app/cvinfo/${userId}`, {
      method: 'GET', 
      mode: 'cors', 
      headers: {
          'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // console.log(apliedJobsJist.length)
        setApliedJobsList(data)
        console.log(apliedJobsJist)

      })
  }

  useEffect(() => {
    fetchData();
  }, []);



    return (
      
      <View style={styles.noResumeContainer}>
        {apliedJobsJist.length == 0 ? 
          <Text style={styles.noResumeText}>
          You have not created any CV.
          To create one click one plus (+) button
          </Text>
          :
          <View>
            <Text>abcd</Text>
            <Text>id: {apliedJobsJist.id}</Text>
            <Text>address: {apliedJobsJist.address}</Text>
            <Text>userhash: {apliedJobsJist.userhash}</Text>
            
          </View>
        }

        <FAB
                    style={styles.fab}
                    icon="plus"
                    color="#ffffff"
                    onPress={()=> handleCreateCV()}
                />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        margin: 20,
        display: "flex",
        justifyContent: 'center',
        // alignItems: "center"
    },
    item: {
        width: 200,
        minWidth: 200
    },
    noResumeContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
  },
  noResumeText:{
      textAlign:'center',
      fontSize: 16,
      fontWeight: '600',
      color: '#444444',
      margin: 40,
  },
  fab: {
    position: 'absolute',
    margin: 25,
    right: 0,
    bottom: 0,
    backgroundColor: '#92B2FD',
    zIndex: 1
  },
})

export default CreateCVScreen