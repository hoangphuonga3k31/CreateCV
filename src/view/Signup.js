import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import { CreateAccount } from "../Authentic/AuthenticLogin";
 
export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  async function CreateAccount1(username, password) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: username, hash: password})
    };
    await fetch('https://cvnl.me/uuid/v1/user/create', options)
        .then((res) => res.json())
        .then(data => {
          switch(data.message) {
            case "success" :
              return showToast("sign up successful!")
            case "UserExisted":
              return showToast("User existed!")
            case "FieldHashRequired":
              return showToast("sign up successful!")
            default:
              showToast("Sign up failed because of error api!");
              break;
          }
        });
}
 
  return (
    <SafeAreaView style={styles.container}>     
 
      <StatusBar style="auto" />

      <Text style={{fontSize: 35, fontStyle: "italic"}}>CreateCV</Text>

      <Image style={styles.image}
        source={require('../../assets/favicon.png')} 
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="User Name."
          autoCapitalize="none"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
 
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Confirm Password."
          secureTextEntry={true}
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        />
      </View>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
          switch (password === confirmPassword) {
            case true:
              const checkSignup = CreateAccount1( username, password );
              break;
            case false:
              showToast("Confirm password is not matched!");
              break;
            default:
              showToast("Sign up failed because of confirm password!");
          }
          
      }}>
                <Text style={styles.loginText}>SIGNUP</Text>
            </TouchableOpacity>
          
      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  image: {
    width: 90,
    height: 150,
    resizeMode: 'contain',
  },

  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});