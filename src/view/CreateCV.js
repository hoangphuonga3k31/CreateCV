import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
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

    return(
        <View>
            <View>
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
                   
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleSubmit()
                }}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    },


    textContent: {
        marginLeft: 10
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