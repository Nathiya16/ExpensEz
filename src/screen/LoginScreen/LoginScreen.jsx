import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from "../../theme/useTheme";
import { BASEPATH } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUserNameChange = (text) => setUsername(text);
  const handleCompanyNameChange = (text) => setCompanyname(text);
  const handlePasswordChange = (text) => setPassword(text);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };
  // const handleLogin = () => {
  //   if (username && companyname && password) {
  //     navigation.replace('MainTabs');
  //   } else {
  //     Alert.alert("Please enter all credentials");
  //   }
  // };
  // const handleLogin = async () => {
  //   if (!username || !companyname || !password) {
  //     Alert.alert("Please enter all credentials");
  //     return;
  //   }

  //   try {
  //     const formData = {
  //       company_id: companyname,
  //       emp_id: username,
  //       password: password,
  //     };

  //     const response = await axios.post(`${BASEPATH}v1/expensez/login/`, formData, {
  //       headers: { 'Content-Type': 'application/json' },
        
  //     });

  //     if (response.status === 200) {
  //       await AsyncStorage.setItem('companyname', companyname);
  //       await AsyncStorage.setItem('username', username);
  //       await AsyncStorage.setItem('password', password);
  //       await AsyncStorage.setItem('loginResponse', JSON.stringify(response.data));

  //       navigation.navigate('MainTabs');
  //     } else {
  //       Alert.alert("Login failed", "Invalid credentials.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     Alert.alert("Error", "Something went wrong during login.");
  //   }
  // };
// const handleLogin = async () => {
//   if (!username || !companyname || !password) {
//     Alert.alert("Please enter all credentials");
//     return;
//   }

//   try {
//     const formData = {
//       company_id: companyname,
//       emp_id: username,
//       password: password,
//     };

//     const response = await axios.post(`${BASEPATH}v1/expensez/login/`, formData, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.status === 200) {
//       const token = response.data.token;
//       const decoded = jwt_decode(response.data.token);
// console.log('Decoded token:', decoded);


//       if (gradeId) {
//         await AsyncStorage.setItem('grade_id', gradeId.toString());
//         console.log('📦 Saved grade_id:', gradeId);
//       } else {
//         console.warn('⚠️ grade_id not found in token');
//       }

//       await AsyncStorage.setItem('companyname', companyname);
//       await AsyncStorage.setItem('username', username);
//       await AsyncStorage.setItem('password', password);
//       await AsyncStorage.setItem('loginResponse', JSON.stringify(response.data));

//       navigation.navigate('MainTabs');
//     } else {
//       Alert.alert("Login failed", "Invalid credentials.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     Alert.alert("Error", "Something went wrong during login.");
//   }
// };
const handleLogin = async () => {
  if (!username || !companyname || !password) {
    Alert.alert("Please enter all credentials");
    return;
  }

  try {
    const formData = {
      company_id: companyname,
      emp_id: username,
      password: password,
    };

    const response = await axios.post(`${BASEPATH}v1/expensez/login/`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      const token = response.data.token;

      // ✅ Decode JWT manually
      const decodeJWT = (token) => {
        try {
          const base64Url = token.split('.')[1]; // get payload
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('Failed to decode JWT:', e);
          return null;
        }
      };

      const decoded = decodeJWT(token);
      console.log('✅ Decoded token:', decoded);

      const gradeId = decoded?.user_id?.grade_id;
      if (gradeId) {
        await AsyncStorage.setItem('grade_id', gradeId.toString());
      }

      // Save other details
      await AsyncStorage.setItem('companyname', companyname);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('loginResponse', JSON.stringify(response.data));

      navigation.navigate('MainTabs');
    } else {
      Alert.alert("Login failed", "Invalid credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    Alert.alert("Error", "Something went wrong during login.");
  }
};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Welcome!</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={username}
        onChangeText={handleUserNameChange}
      />
       <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyname}
        onChangeText={handleCompanyNameChange}
      />

      

      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.link}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBg }]} onPress={handleLogin}>
        <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: '#FDFFEC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  passwordContainer: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  link: {
    color: '#7E8356',
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
