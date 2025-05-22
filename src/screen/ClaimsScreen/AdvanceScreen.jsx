import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const AdvanceScreen = ({navigation}) =>{
    return(
       <SafeAreaView style={styles.container}>  
        <Text style={styles.header}> Create Advance</Text>
       </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center'
    }
});
export default AdvanceScreen;