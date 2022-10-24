import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { updateUserId } from '../redux/userIdSlice'
import { useDispatch, useSelector } from "react-redux";

 
//import { CheckLogin } from "../Authentic/AuthenticLogin";
import AuthContext from "../../AuthContext";
 
export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info.id)

  const { signIn } = React.useContext(AuthContext);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  }

  useEffect(() => {
    console.log("info: " + info)
  }, [])

  async function CheckLogin1(username, password) {
    // console.log("userId: " + userId)
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({account: username, hash: password})
    };
    await fetch('https://cvnl.me/uuid/v1/user/hash', options)
        .then((res) => res.json())
        .then(data => {
          switch(data.message) {
            case 'success':
              // return signIn({ username, password });
              // console.log(data.data.userInfo._id);
              // dispatch(SetUserIdAction(data.data.userInfo._id));
              SetUserId(data.data.userInfo._id);
              signIn({ username, password });
              break;
            case 'UserNotFoundOrInvalidPassword':
              return showToast("UserNotFoundOrInvalidPassword, login failed!");
          }
        }) 
}
  async function handleLogin() {

    await CheckLogin1( username, password )
  }

  const SetUserId = id => {
    console.log("data: "+ id);
    dispatch(updateUserId(id));
  }
 
  return (
    <View style={styles.container}>
 
      <StatusBar style="auto" />

      <Text style={{fontSize: 35, fontStyle: "italic"}}>CreateCV</Text>

      <Image style={styles.image}
        source={require('../../assets/favicon.png')} 
      />
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          style={styles.inputs}
          placeholder="User Name"
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
 
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
        handleLogin();
        // signIn({ username, password })
      }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        navigation.navigate('Signup')
      }}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
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