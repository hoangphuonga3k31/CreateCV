import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
} from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { FAB, List } from 'react-native-paper';


const JobDetail = ({route, navigation}) => {

    const { id, otherParams } = route.params;
    const [job, setJob] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const userId = useSelector((state) => state.info.id);
    const [apliedJobsJist, setApliedJobsList] = useState([]);
    const [isAplied, setIsAplied] = useState();

    async function fetchApliedJobsList() {
        const fetchLink = `https://createcvserver.vercel.app/apliedjobslist/${userId}`
        
        await fetch(fetchLink, {
          method: 'GET', 
          mode: 'cors', 
          headers: {
              'Content-type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then(data => {
            // setApliedJobsList(data)
            console.log(data.some(job => job.jobId==id))
            setIsAplied(data.some(apliedJob => apliedJob.jobId==id))
          })
      }
    
      async function fetchDataCVList() {

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

      async function RequestApplyJob() {

        await fetch('https://createcvserver.vercel.app/apliedjobslist', {
          method: 'POST', 
          mode: 'cors', 
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            jobId: id
          })
        })
          .then((res) => res.json())
          .then(data => {
            console.log("success")
          })
      }

    async function fetchData() {
          await fetch(`https://createcvserver.vercel.app/jobs/${id}`, {
              method: 'GET', 
              mode: 'cors', 
              headers: {
                  'Content-type': 'application/json'
              }
            })
              .then((res) => res.json())
              .then(data => {
                setJob(data)
              })
        }
        
        useEffect(() => {
            console.log(userId)
          fetchData()
          fetchApliedJobsList()
          fetchDataCVList()
        //   setIsAplied(apliedJobsJist.some(job => job.jobId == id))
        //   console.log(isAplied)
        }, [])

        async function handleApplyJob() {
            await applyJob();
        }

        async function handleCancelJob() {
            setIsAplied(false)
        }

        const handleSelected = id => {
            RequestApplyJob()

            setIsAplied(true)
            setModalVisible(false)
          }

        async function applyJob() {
            setModalVisible(true)
            
        }

    return(
        <View>

            <View style={styles.container}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={{opacity: 0.5, right: "-55%"}}>Expired Day: {job.untilDate}</Text>
                </View>
                <ScrollView style={styles.content}>

                    <View style={styles.tag}>
                        <Text style={styles.tagText}>General information:</Text>
                        <View style={styles.info}>
                            <Text style={styles.generalInfoTextLine}>- Salary: {job.minSalary} to {job.maxSalary}</Text>
                            <Text style={styles.generalInfoTextLine}>- {job.FulltimeOrParttime}</Text>
                            <Text style={styles.generalInfoTextLine}>- Number of recruitment: {job.numberOfRecruiment}</Text>
                            <Text style={styles.generalInfoTextLine}>- Experience: {job.experience} year(s)</Text>
                            <Text style={styles.generalInfoTextLine}>- Address: {job.address}</Text>
                        </View>
                    </View>

                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Job description:</Text>
                        <Text style={styles.info}>{job.jobDescription}</Text>
                    </View>

                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Recruitment:</Text>
                        <Text style={styles.info}>{job.recruitment}</Text>
                    </View>
                
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>Treatment:</Text>
                        <Text style={styles.info}>{job.treatment}</Text>
                    </View>
                
            </ScrollView>
                <View style={styles.buttonParentContainer}>
                    {isAplied ? (
                        <TouchableOpacity 
                        style={styles.buttonCancelContainer}
                        onPress={() => {
                            handleCancelJob()
                        }}>
                        <Text>Applied! Want to cancel?</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={() => {
                            handleApplyJob()
                        }}>
                        <Text>Apply now!</Text>
                    </TouchableOpacity>
                    )}
                    
                </View>
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
        <ScrollView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 20, marginBottom: 10}}>List CVs</Text>
          {apliedJobsJist.length && apliedJobsJist.map(cv => (
              <View key={cv.id} >
                <TouchableOpacity 
                  onPress={() => {
                  handleSelected(cv.id)
                  }}>
                  <List.Item 
                    style={styles.item}
                    title={cv.title}
                    description={cv.job}
                    
                    left={props => <List.Icon {...props} icon="checkbox-marked-outline" />}
                  />
                </TouchableOpacity> 
              </View>
              
              )
            )}
            <View style={styles.buttonCloseContainer}>
                <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
            
          </View>
        </ScrollView>
      </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },

    headerContent: {
        padding: 10
        // height: "50%",
        // minHeight: 100
    },

    title: {
        fontSize: 24
    },

    tag: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: "#EEEEEE",
        padding: 5
    },

    tagText: {
        fontSize: 20,
        fontWeight: "bold"
    },

    generalInfoTextLine: {

    },
    item: {
        marginLeft: 35,
        width: 250,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderStyle: "solid"
    },

    info: {
        marginLeft: 35
    },

    content: {
        // display: "flex"
        marginBottom: 55,
        // height: "80%"
    },

    buttonParentContainer: {
        display: "flex",
        flex: 1,
        position: "absolute",
        bottom: 0,
        left: '50%',
        right: '50%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 5,
        
        
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
    noResumeContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    header: {
        fontSize: 20,
        textAlign: "left",
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 70
      },

    buttonContainer: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00b5ec",
        // width: 200,
        // textAlign: "center",
      },

      buttonCancelContainer: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#FF0099",
      },

      centeredView: {
        // position: 'relative',
        // bot: 0,
        // height: 400,
        // width: 400
      },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      height: 400,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "relative",
      bottom: 0,
      zIndex: 1,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        position: "relative",
        bottom: 10,
      },
      buttonCloseContainer: {
        marginTop: 20,
      }
})

export default JobDetail