import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";


const EditInfoScreen = () => {
    const [name, setName] = useState("")
    const [yearOfBirth, setyearOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const userId = useSelector((state) => state.info.id);


    const data = [
        {label: 'male', value: 'male' },
        {label: 'female', value: 'female' }
      ];



async function setInfoRequest(name, yearOfBirth, gender) {
    const requestLink = `https://createcvserver.vercel.app/userpersonalinfo/${userId}`;
    console.log("request link: " + requestLink);
        await fetch(requestLink, {
            method: 'PUT', 
            mode: 'cors', 
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                yearofbirth: yearOfBirth,
                gender: gender,
            })
          })
            .then((res) => res.json() )
            .then(data => {
              console.log(data)
            })

      }
    const handleSubmit = () => {
        console.log("name: " + name)
        console.log("yearofbirth: " + yearOfBirth)
        console.log("gender: " + gender)
    }

    return(
        <ScrollView style={styles.container}>
            <View>
            <Text style={[styles.textContent, styles.catalog]}>General informations</Text>
                <Text style={styles.textContent}>Name:</Text>
                <TextInput 
                    style={styles.input}
                    value={name}
                    placeholder="Name..."
                    onChangeText={(name) => setName(name)}
                />

                <Text style={styles.textContent}>Year Of Birth:</Text>
                <TextInput 
                    style={styles.input}
                    value={yearOfBirth}
                    placeholder="Year Of Birth..."
                    onChangeText={(yearOfBirth) => setyearOfBirth(yearOfBirth)}

                />

                <Text style={styles.textContent}>Gender:</Text>
                <View style={styles.radioBtn}>
                    <RadioButtonRN
                        data={data}
                        selectedBtn={(e) => setGender(e.value)}
                    />
                </View>

                
                
                
            </View>

            <View>
            <Text style={[styles.textContent, styles.catalog]}>Contact</Text>

                <Text style={styles.textContent}>Address:</Text>
                <TextInput 
                    style={styles.input}
                    value={address}
                    placeholder="Address..."
                    onChangeText={(address) => setAddress(address)}
                />

                <Text style={styles.textContent}>Email:</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    placeholder="Email..."
                    onChangeText={(email) => setEmail(email)}
                />

                <Text style={styles.textContent}>Phone:</Text>
                <TextInput 
                    style={styles.input}
                    value={phone}
                    placeholder="Phone..."
                    onChangeText={(phone) => setPhone(phone)}
                />
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
    },

    catalogView: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingBottom: 20
    },

    catalog: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20
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
  

export default EditInfoScreen