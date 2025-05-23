import React, { useState , useEffect} from "react";
import {Text,StyleSheet,TouchableOpacity,SafeAreaView,StatusBar,View,Image,Switch,Modal,ScrollView,} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useTheme } from "../../theme/useTheme";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASEPATH } from '../config';
const ProfileScreen = ({ navigation }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { theme, themeName, toggleTheme } = useTheme();
  const [profileImage, setProfileImage] = useState("");
const [empId, setEmpId] = useState('');


  const handleEditProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setProfileImage(uri);
      }
    });
  };
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    navigation.navigate("Login");
  };

  const openLogoutModal = () => setLogoutModalVisible(true);
  const closeLogoutModal = () => setLogoutModalVisible(false);

//   const fetchData = async ()=> {
//     try{
// const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');
//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );
//     }catch (error) {
//           console.error('Axios Error:', error);
//           Alert.alert('Error', 'Failed to fetch approval data');
//         }
//   }
useEffect(() => {
  const fetchData = async () => {
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');
      
      if (emp_id) setEmpId(emp_id); // Store emp_id to show on screen
      
      await axios.get(
        `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
      );
    } catch (error) {
      console.error('Axios Error:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  fetchData();
}, []);

  return (
    <SafeAreaView style={[Styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={Styles.scrollContainer}>
        <StatusBar barStyle={themeName === "dark" ? "light-content" : "dark-content"} />
        <View style={Styles.header}>
          <Text style={[Styles.headertitle, { color: theme.text }]}>My Profile</Text>
        </View>

        <View
          style={[
            Styles.profileCard,
            { backgroundColor: themeName === "dark" ? "#333" : "#fffde7" },
          ]}
        >
          <View style={Styles.avatarContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={Styles.avatar}
            />
            <TouchableOpacity style={Styles.editButton} onPress={handleEditProfileImage}>
              <Icon name="edit" size={16} color="blue" />
            </TouchableOpacity>
          </View>
{empId !== '' && (
  <Text style={[Styles.profileName, { color: theme.text }]}>
    {empId}
  </Text>
)}

          {/* <Text style={[Styles.profileName, { color: theme.text }]}>Name</Text> */}
          <Text style={[Styles.profileEmail, { color: theme.text }]}>Email id</Text>
          <Text style={[Styles.phoneNumber, { color: theme.text }]}>Phone Number</Text>
        </View>

        <View style={Styles.sectionHeader}>
          <Text style={[Styles.sectionTitle, { color: theme.text }]}>APP INFO</Text>
        </View>

        <View style={Styles.menuCard}>
          <View style={Styles.menuItem}>
            <View style={Styles.iconContainer}>
              <Ionicons name= "moon"  size={24} color="#fff" />
            </View>
            <Text style={[Styles.menuText, { color: theme.text }]}>Dark Mode</Text>
            <Switch
              style={Styles.switch}
              value={themeName === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={themeName === "dark" ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          {/* <TouchableOpacity style={Styles.menuItem}>
            <FontAwesome name="bank" size={24} color="#fc7303" />
            <Text style={[Styles.menuText, { color: theme.text }]}>Bank & Cards</Text>
            <Entypo name="chevron-right" size={22} color={theme.text} />
          </TouchableOpacity> */}

          <TouchableOpacity style={Styles.menuItem}>
            <Fontisto name="player-settings" size={24} color="#2e18f2" />
            <Text style={[Styles.menuText, { color: theme.text }]}>Settings</Text>
            <Entypo name="chevron-right" size={22} color={theme.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={Styles.logoutButton} onPress={openLogoutModal}>
          <Text style={Styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={logoutModalVisible}
          onRequestClose={closeLogoutModal}
        >
          <View style={[Styles.modal,]}>
            <View style={[Styles.modalContent,{ color: theme.text },{ backgroundColor: theme.background }]}>
              <Text style={[Styles.modalTitle,{ color: theme.text }]}>Log out</Text>
              <Text style={[Styles.modalMessage,{ color: theme.text }]}>
                Are you sure you want to log out? You'll need to log in again to use the app.
              </Text>
              <View style={Styles.buttonContainer}>
                <TouchableOpacity style={[Styles.cancelButton,{ borderColor: theme.borderColor},{ backgroundColor: theme.background }]} onPress={closeLogoutModal}>
                  <Text style={[Styles.cancelText, { color: theme.text }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.logoutConfirmButton} onPress={handleLogoutConfirm}>
                  <Text style={Styles.logoutConfirmText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    padding: 16,
  },
  headertitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: "5%",
  },
  profileCard: {
    alignItems: "center",
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: "absolute",
    right: 5,
    top: 5,
    padding: 10,
  },
  profileName: {
    fontWeight: "bold",
  },
  profileEmail: {
    marginTop: 4,
  },
  phoneNumber: {
    marginTop: 2,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  menuCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#bdbbbb",
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  logoutButton: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "red",
    marginTop: "60%",
    height: "5%",
    marginLeft: 20,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    padding: 9,
    fontWeight: "bold",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "gray",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
    borderColor: "#7E8356",
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 16,
    color: "#333",
  },
  logoutConfirmButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#7E8356",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutConfirmText: {
    fontSize: 16,
    color: "white",
  },
});

export default ProfileScreen;
