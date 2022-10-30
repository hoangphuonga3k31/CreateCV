import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal
} from "react-native";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const JobDetail = ({route, navigation}) => {

    const { id, otherParams } = route.params;
    const [job, setJob] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const userId = useSelector((state) => state.userId);

    // console.log(id)
    // console.log("userinfo: " + userId)

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
                // console.log(data)
                setJob(data)
              })
        }
        
        useEffect(() => {
          fetchData()
          console.log(job)
        }, [])

        async function handleApplyJob() {
            await applyJob();
        }

        async function applyJob() {
            setModalVisible(true)
            
        }

    return(
        <View>

            <View style={styles.container}>
                <View style={styles.header}>
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
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={() => {
                            handleApplyJob()
                        }}>
                        <Text>Apply now!</Text>
                    </TouchableOpacity>
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
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text>Set your information!</Text>
                      <TouchableOpacity 
                          style={[styles.buttonContainer, styles.loginButton]}
                          onPress={() => {
                            console.log("clicked!")
                            setModalVisible(false)
                          }}>
                        <Text>OK!</Text>
                      </TouchableOpacity>
                  </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },

    header: {
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
})

export default JobDetail