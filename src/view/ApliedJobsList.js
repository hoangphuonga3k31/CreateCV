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
  
  function ApliedJobsList({ navigation }) {
  const [jobs, setJobs] = useState([])
  const [apliedJob, setApliedJob] = useState([])
  const [apliedJobId, setApliedJobId] = useState([])
  const userId = useSelector((state) => state.info.id);
  
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
          // console.log(data)
        })
  }

  async function fetchDataApliedJob() {
    await fetch(`https://createcvserver.vercel.app/apliedjobslist/${userId}`, {
        method: 'GET', 
        mode: 'cors', 
        headers: {
            'Content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then(data => {
          setApliedJob(data)
          // console.log(data)
        })
  }
  
  useEffect(() => {
    fetchData();
    fetchDataApliedJob();
    apliedJob.forEach(job => {
      apliedJobId.push(job.jobId)
    })
  }, []);
  
  
  
  const handleSelected = id => {
    console.log(id);
    navigation.navigate( 'Job Detail', {
      id: id,
      otherParams: "send successful"
    } )
  }
  

    return (
      <View >
        {/* <Text style={{  }}>CreateCV</Text> */}
        <View>
          <Text style={styles.header}>Aplied Jobs</Text>
            {jobs.map(job => apliedJobId.some(id => id == job.id)&& (
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
  
  export default ApliedJobsList