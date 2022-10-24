import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Block,
  View
} from "react-native";

const UpdateInfoScreen = () => {
    const [name, setName] = useState("");
    
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
       <Block style={styles.inputs}>
           <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
               <Block>
                   <Text gray2 style={{ marginBottom: 10 }}>Username</Text>
                   <Text bold>kriss</Text>
               </Block>
               <Text medium secondary>
                   Edit
               </Text>
           </Block>
           <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
               <Block>
                   <Text gray2 style={{ marginBottom: 10 }}>Location</Text>
                   <Text bold>Thailand</Text>
               </Block>
               <Text medium secondary>
                   Edit
               </Text>
           </Block>
           <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
               <Block>
                   <Text gray2 style={{ marginBottom: 10 }}>E-mail</Text>
                   <Text bold>contact@kriss.com</Text>
               </Block>
               <Text medium secondary>
                   Edit
               </Text>
           </Block>
       </Block>
   </ScrollView>
      </View>
    );
} 

const styles = StyleSheet.create({
    inputs: {
        marginTop: 0.7,
        paddingHorizontal: 2,
      },
    inputRow: {
        alignItems: 'flex-end'
      },
  });

export default UpdateInfoScreen