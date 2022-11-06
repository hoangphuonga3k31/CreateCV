import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4());
}


function CreateCV({ navigation }) {
const userId = useSelector((state) => state.info.id);
const [info, setInfo] = useState([]);
const [yearofbirth, setYearofbirth] = useState("")
const [address, setAddress] = useState("")
const [projectInfoViews, setProjectInfoViews] = useState([])
const [oldJobInfoViews, setoldJobInfoViews] = useState([])
const [schools, setSchools] = useState([])



    async function fetchData() {
        await fetch(`https://createcvserver.vercel.app/userpersonalinfo/${userId}`, {
            method: 'GET', 
            mode: 'cors', 
            headers: {
                'Content-type': 'application/json'
            },
            

            })
      .then((res) => res.json())
      .then(data => {
        setInfo(data)
        // setYearofbirth(data.yearofbirth.toString())
      })
    }

    async function fetchCreateCV() {
        await fetch('https://createcvserver.vercel.app/cvinfo', {
            method: 'POST', 
            mode: 'cors', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: guidGenerator(),
                address: address,
                userhash: userId
            })
            
            })
      .then((res) => res.json())
      .then(data => {
        setInfo(data)
        // setYearofbirth(data.yearofbirth.toString())
      })
    }



    useEffect(() => {
        fetchData()
        console.log(guidGenerator())
        
    }, [])

    const handleSubmit = () => {
        console.log("address: " + address)
        fetchCreateCV();
        navigation.goBack()
    }

    const ProjectInfoView = () => {
        return (
          <View>
            <Text style={styles.textContent}>Project name:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Description:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Your works:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>Technology:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>Link:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            <TouchableOpacity style={styles.buttonAddProject} onPress={() => removeProject(this.key)}>
                <Text>Remove</Text>
            </TouchableOpacity> 
          </View>
        );
      };

      const OldJobView = () => {
        return (
          <View>
            <Text style={styles.textContent}>Company name:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Start date:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>End date:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>Position:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>Your works:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            <TouchableOpacity style={styles.buttonAddProject} onPress={() => removeOldJob(this.key)}>
                <Text>Remove</Text>
            </TouchableOpacity> 
          </View>
        );
      };

      const SchoolsView = () => {
        return (
          <View>
            <Text style={styles.textContent}>School name:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Start date:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>End date:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>majors:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.textContent}>Your gpa:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            <TouchableOpacity style={styles.buttonAddProject} onPress={() => removeSchool(this.key)}>
                <Text>Remove</Text>
            </TouchableOpacity> 
          </View>
        );
      };

      const addSchool = () => {
        const arr = [...schools];
        arr.push(<SchoolsView />);
    
        setSchools(arr);
      };

      const removeSchool = (index) => {
        const arr = [...schools];
        delete arr[index];
        setSchools(arr)
      }

      const addOldJob = () => {
        const arr = [...oldJobInfoViews];
        arr.push(<OldJobView />);
        setoldJobInfoViews(arr);
      };

      const removeOldJob = (index) => {
        const arr = [...oldJobInfoViews];
        delete arr[index];
        setoldJobInfoViews(arr)
      }

      const addProjects = () => {
        const arr = [...projectInfoViews];
        arr.push(<ProjectInfoView />);
    
        setProjectInfoViews(arr);
      };

      const removeProject = (index) => {
        const arr = [...projectInfoViews];
        delete arr[index];
        setProjectInfoViews(arr)
      }
      

    return(
        <ScrollView>
            <View>
            <Text style={styles.catalogContent}>General informations:</Text>
            <Text style={styles.textContent}>Name:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    defaultValue={info.name}
                />
            {/* <Text style={styles.textContent}>Year of Birth:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    defaultValue={yearofbirth}
                /> */}
            <Text style={styles.textContent}>Gender:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    defaultValue={info.gender}
                />

            <Text style={styles.textContent}>Address:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Email:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Phone:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />
            
            <Text style={styles.catalogContent}>Skills and Experience:</Text>
            
            <Text style={styles.textContent}>Skills:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress(address)}
                    defaultValue={info.address}
                />

            <Text style={styles.textContent}>Experience:</Text>
                <TextInput 
                    style={styles.input}
                    // value={n}
                    onChangeText={(address) => setAddress (year(s))(address)}
                    defaultValue={info.address}
                />
            <View>
                {schools.map((school, index) => {
                    return(
                        <View key={index}>
                            {school}
                                    
                        </View>
                    )
                })}
                <Text style={[styles.textContent, styles.projectsText]}>Graduated a school?</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAddProject} onPress={() => addSchool()}>
                        <Text>Add a school</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {oldJobInfoViews.map((oldjob, index) => {
                    return(
                        <View key={index}>
                            {oldjob}
                                    
                        </View>
                    )
                })}
                <Text style={[styles.textContent, styles.projectsText]}>Has old job?</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonAddProject} onPress={() => addOldJob()}>
                        <Text>Add an old job</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                {projectInfoViews.map((project, index) => {
                        return(
                            <View key={index}>
                                {project}
                                        
                            </View>
                        )
                    })}
                    <Text style={[styles.textContent, styles.projectsText]}>Has project?</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAddProject} onPress={() => addProjects()}>
                            <Text>Add a project</Text>
                        </TouchableOpacity>
                    </View>
            </View>
                
            
            </View>
                
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleSubmit()
                }}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )   
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },

    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20
    },
    catalogContent: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10
    },

    textContent: {
        marginLeft: 10
    },

    projectsText: {
        opacity: 0.5,
        marginTop: 20
    },

    buttonAddProject: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#8eb1c2"
    },

    buttonContainer: {
        display: "flex",
        alignItems: "center",

    },
    
    button: {
        height: 40,
        width: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#8eb1c2"
    },
    radioBtn: {
        // display: 'flex',
        // width: 150,
        // marginLeft: 50
    }
    
  });

export default CreateCV