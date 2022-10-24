import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native";
import { List } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import JobDetail from "./JobDetail";

// import { jobs } from "../Models/Jobs";

function HomeScreen({ navigation }) {
const [searchString, setSearchString] = useState("")
const [jobs, setJobs] = useState([])
const userId = useSelector((state) => state.info.id);
const [isNewAccount, setIsNewAccount] = useState(false);
const [modalVisible, setModalVisible] = useState(false);

async function fetchData() {
  await fetch('https://createcvserver.vercel.app/jobs', {
      method: 'GET', 
      mode: 'cors', 
      headers: {
          'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then(data => {
        setJobs(data)
      })
}

async function checkNewAccount() {
  const requestLink = `https://createcvserver.vercel.app/userpersonalinfo/${userId}`;
  console.log("request link: " + requestLink);
  await fetch(requestLink, {
      method: 'GET', 
      mode: 'cors', 
      headers: {
          'Content-type': 'application/json'
      }
    })
      .then((res) => res.json() )
      .then(data => {
        setIsNewAccount(false)
        console.log(data)
      })
      .catch(error => setIsNewAccount(true))
}

useEffect(() => {
  fetchData();
  checkNewAccount();
  console.log("isnewaccount: " + isNewAccount)
}, []);

useEffect(() => {
  if(isNewAccount == true){
    setModalVisible(true)
  }
}, [isNewAccount])


const handleSelected = id => {
  console.log(id);
  navigation.navigate( 'Job Detail', {
    id: id,
    otherParams: "send successful"
  } )
}

const handleSetInfomation = () => {
  navigation.navigate('Set Personal Information')
}

const handleSearch = () => {
  useEffect(() => {
    setSearchString(searchString)
  }, [])
}

  return (
    <View >
      {/* <Text style={{  }}>CreateCV</Text> */}
      <View>
      <SearchBar
          style={styles.searchBar}
          placeholder="Type Here..."
          onChangeText={handleSearch}
          value={searchString}
        />
        <Text style={styles.header}>List of Job</Text>
          {jobs.map(job => (
            <TouchableOpacity
                key={job.id}
                onPress={() => {
                  handleSelected(job.id)
                }}
                >
                <List.Item 
                  style={styles.item}
                  title={job.title}
                  description={`Salary: ${job.minSalary} VNĐ - ${job.maxSalary} VNĐ`}
                  
                  left={props => <List.Icon {...props} icon="checkbox-marked-outline" />}
                />
            </TouchableOpacity>
            
          ))}
        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text>Set your information!</Text>
              <TouchableOpacity 
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                handleSetInfomation();
                // signIn({ username, password })
              }}>
                <Text>OK!</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
header: {
  fontSize: 20,
  textAlign: "left",
  padding: 10,
  borderBottomColor: 'black',
  borderBottomWidth: StyleSheet.hairlineWidth,
  marginBottom: 15,
  marginTop: 70
},

searchBar: {
  backgroundColor: "#ccc",
  color: "#ccc"
},

item: {
  marginLeft: 10,
  width: 350,
  borderTopColor: "black",
  borderTopWidth: 2,
  borderStyle: "solid"
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},

modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
buttonContainer: {
  height:30,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin:20,
  width:150,
  borderRadius:30,
},
loginButton: {
  backgroundColor: "#00b5ec",
},


})

export default HomeScreen