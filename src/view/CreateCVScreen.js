import * as React from 'react'
import { FAB } from 'react-native-paper';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { List } from 'react-native-paper';

import SelectList from 'react-native-dropdown-select-list';

function CreateCVScreen({ navigation }) {
  const [apliedJobsJist, setApliedJobsList] = useState([]);
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
      .then(data => {
        setApliedJobsList(data)
      })
  }

  const handleSelected = id => {
  console.log(id);
  navigation.navigate( 'Create CV', {
    id: id,
    otherParams: "send successful"
  } )
}

  useEffect(() => {
    
    fetchData();
    // const focusHandler = navigation.addListener('focus', () => {
    //   console.log('Refreshed');
    // });
    // return focusHandler;
    
  }, []);

    return (
      
      <View style={styles.noResumeContainer}>
        {apliedJobsJist.length == 0 ? 
          <Text style={styles.noResumeText}>
          You have not created any CV.
          To create one click one plus (+) button
          </Text>
          :
          <View style={styles.cvinfoContainer}>
            <Text style={styles.header}>Yours CVs</Text>
            {apliedJobsJist.map(cv => (
              <View key={cv.id} >
                <TouchableOpacity 
                  style={styles.centeredView}
                  onPress={() => {
                  handleSelected(cv.id)
                  }}>
                  <List.Item 
                    style={styles.item}
                    title={cv.id}
                    description={cv.address}
                    
                    left={props => <List.Icon {...props} icon="checkbox-marked-outline" />}
                  />
                </TouchableOpacity> 
              </View>
              
              )
            )}
            
            
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
        marginLeft: 10,
        width: 350,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderStyle: "solid"
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

  cvinfoContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    alignItems: "center"
  },

  header: {
    fontSize: 20,
    textAlign: "left",
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 70
  },

  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginTop: 22
  },
})

export default CreateCVScreen