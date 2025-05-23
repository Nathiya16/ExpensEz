

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { useTheme } from '../../theme/useTheme';
// import { BASEPATH } from '../config';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { PermissionsAndroid, Platform, Linking } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const NewClaimRequestScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [mainCategory, setMainCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [amount, setAmount] = useState(null);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [mainCategories, setMainCategories] = useState([]);
//   const [policyMap, setPolicyMap] = useState({});
//   const [showPolicyDetails, setShowPolicyDetails] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null); 
//   const [loading, setLoading] = useState(false); 
//   const [entity, setEntity] = useState(null);
//   const [companyId, setCompanyId] = useState('');
// const [empId, setEmpId] = useState('');

// // const [editedDate, setEditedDate] = useState(entity?.date);
// // useEffect(() => {
// //   if (entity?.date) {
// //     setEditedDate(entity.date);
// //   }
// // }, [entity?.date]);

// //   const [editedTotal, setEditedTotal] = useState(entity?.total);
// //   useEffect(() => {
// //     if (entity?.total) {
// //       setEditedTotal(entity.total);
// //     }
// //   }, [entity?.total]);

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const [apiData, setApiData] = useState({
//     amount: '',
//     policyMap: {},
//     expense_head: '',  
//     subexpense_head: '',  
//     date: '', 
    
//   });
  

//   const handleCancel = () => {
//     navigation.navigate('Claims');
//   };
  
  
  
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
//         const apiData = response?.data?.data || [];
  
//         const categories = apiData.map(item => ({
//           id: item.main_expense_head,
//           name: item.main_expense_name,
//         }));
  
//         const map = {};
//         apiData.forEach(item => {
//           map[item.main_expense_name] = item.policy_details;
//         });
  
//         setMainCategories(categories);
//         setPolicyMap(map);
//       } catch (error) {
//         Alert.alert('Something went wrong');
//       }
//     };
  
//     fetchPolicies();
//   }, []);
  
  
  
//   const handleChooseImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: true,
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('Image Picker Error:', response.errorMessage);
//           Alert.alert('Error', 'Failed to pick image');
//         } else {
//           const base64Image = response.assets?.[0]?.base64;
//           if (base64Image) {
//             setSelectedImage({
//               uri: response.assets[0].uri,
//               base64: base64Image,
//             });
//           }
//         }
//       }
//     );
//   };
  
//    const handleUploadBill = async () => {
//     if (!selectedImage) {
//       Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//       return;
//     }
  
//     setLoading(true); 
//     try {
//       //const permissionGranted = await requestGalleryPermission();
  
//       // if (!permissionGranted) {
//       //   Alert.alert(
//       //     'Permission Denied',
//       //     'Please enable photo access in settings to upload the bill.',
//       //     [
//       //       { text: 'Cancel', style: 'cancel' },
//       //       { text: 'Open Settings', onPress: () => Linking.openSettings() },
//       //     ]
//       //   );
//       //   setLoading(false);
//       //   return;
//       // }
  
//       const payload = {
//         company_id: "CompanyID", 
//         expense_head: "MainExpense",             
//         subexpense_head: "SubExpense", 
//         document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//       };
  
//       const apiResponse = await axios.post(
//         `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator/`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json', 
//           },
//         }
//       );
//       setEntity(apiResponse.data.entities?.[0]);
//       const data = apiResponse.data;
//       console.log(data);
//       setApiData({
//         amount: data.amount,
//         expense_head: data.expense_head,
//         subexpense_head: data.subexpense_head,
//         date: data.date,
//       });
  
//       Alert.alert('Success', 'Image uploaded and data populated!');
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Upload failed', 'Please try again later.');
//     } finally {
//       setLoading(false); 
//     }
//   };
  
// // const requestGalleryPermission = async () => {
// //   if (Platform.OS === 'android') {
// //     const permission = Platform.Version >= 33
// //       ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
// //       : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

// //     const alreadyGranted = await PermissionsAndroid.check(permission);
// //     if (alreadyGranted) return true;

// //     const granted = await PermissionsAndroid.request(permission, {
// //       title: 'Photo Access Needed',
// //       message: 'We need access to your gallery to upload the bill.',
// //       buttonPositive: 'OK',
// //     });

// //     return granted === PermissionsAndroid.RESULTS.GRANTED;
// //   }
// //   return true; 
// // };
// useEffect(() => {
//   const loadData = async () => {
//     try {
//       const storedCompanyId = await AsyncStorage.getItem('companyname');
//       const storedEmpId = await AsyncStorage.getItem('username');

//       if (storedCompanyId) setCompanyId(storedCompanyId);
//       if (storedEmpId) setEmpId(storedEmpId);
//     } catch (error) {
//       console.error("Failed to load user data", error);
//     }
//   };

//   loadData();
// }, []);
// const handleSubmit = async()=> {

//   const mainCategoryData = mainCategories.find(item => item.name === mainCategory);

// const selectedPolicy = policyMap[mainCategory]?.find(
//   policy => policy.sub_expense_name === subCategory
// );


// if (!selectedPolicy) {
//   return Alert.alert("Error", "Could not find matching policy details.");
// }


// const policyId = selectedPolicy.policy_detail_id; 
 
// const mainExpenseHeadId = mainCategoryData?.id;

// const subExpenseHeadId = selectedPolicy.sub_expense_head;  



//  const payload = 

// //  {
// //   employee_claim_data: [
// //     {
// //       company_id: companyId.toString(),
// //       policy_id: policyId,
// //       expense_head: mainExpenseHeadId,
// //       subexpense_head: subExpenseHeadId,
// //       claim_status: "normal",
// //       claim_type: "regular",
// //       emp_id: empId.toString(),
// //       year: "2025",
// //       advance_id: 71,
// //       descriptions: "hello",
// //       document: [
// //         {
// //           ocr_amount: Number(entity?.total),
// //           ocr_date: entity?.date,
// //           booking_id: entity?.bill_no || "",
// //           ride_id: entity?.bill_no || "",
// //           from_address: entity?.from_address || "",
// //           to_address: entity?.to_address || "",
// //           doc_name: entity?.org || "",
// //           distance: entity?.distance || "",
// //           gst_no: entity?.gstno || "",
// //           times: entity?.time || "",
// //           invoice_no: entity?.invoiceno || "",
// //           page1: `data:image/jpeg;base64,${selectedImage.base64}`,
// //           type: "image",
// //           amount: Number(entity?.total),
// //           date: entity?.date,
// //         },
// //       ],
// //     },
// //   ],
// // };
// {
//   "employee_claim_data": [
//       {
// "company_id":"durr",
//           "policy_id": 474,
//           "expense_head": 116,
//           "subexpense_head": 100,
//           "claim_status":"normal",
//           "claim_type":"regular",
//           "emp_id": "Admin",
//           "year":"2025",
//           "advance_id":88,
//          "descriptions":"hello",
//           "document": [
//               {
//                   "ocr_amount": "500",
//                   "ocr_date": "2021-01-22",
//                   "booking_id":"abc123",
//                   "ride_id":"abc123",
//                   "from_address":"abc123",
//                   "to_address":"abc123",
//                   "doc_name":"abc123",
//                   "distance":"abc123",
//                   "gst_no":"abc123",
//                   "times":"abc123",
//                   "invoice_no":"abc123",
//                   "page1":`data:image/jpeg;base64,${selectedImage.base64}` ,
// "type": "image",
//                   "amount": 1000.00,
//                   "date": "2021-01-22"
//               }
//           ]
//       }
//   ]
// }
//   console.log("Payload", payload);
//     try {

//     const response = await axios.post(
//       `${BASEPATH}v1/client/ocr_inserts/ocr_inserting/`, 
//       payload,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );
//     if (response?.data?.status === 200){
//       console.log("Full response from API:", response.data);
//       navigation.navigate('SubmitClaim'); 
//       } else {
//       Alert.alert('Error', 'Failed to submit claim.');
//     }
  
   
//   } catch (error) {
//     console.error(error);
//     Alert.alert('Error', 'Something went wrong while submitting the claim.');
//   } 
  
  
// };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.borderColor }]}>
//           <Text style={[styles.headerTitle, { color: theme.text }]}>New Claim Request</Text>
//         </View>

//             <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={[styles.label, { color: theme.text }]}>Main Expense Category</Text>
//             <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//               <Picker
//                 selectedValue={mainCategory}
//                 style={[styles.picker, { color: theme.text }]}
//                 dropdownIconColor={theme.text}
//                 onValueChange={(value) => {
//                   setMainCategory(value);
//                   setSubCategory(null);
//                 }}>
//                 <Picker.Item label="Select Main Category" value="" enabled={false} />
//                 {mainCategories.map(item => (
//                   <Picker.Item key={item.id} label={item.name} value={item.name} />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           {mainCategory && (
//             <View style={styles.inputGroup}>
//               <Text style={[styles.label, { color: theme.text }]}>Sub Expense Category</Text>
//               <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//                 {/* <Picker
//                   selectedValue={subCategory}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}
//                   onValueChange={setSubCategory}>
//                   <Picker.Item label="Select Subcategory" value={null} />
//                   {policyMap[mainCategory]?.map((item, index) => (
//                     <Picker.Item key={index} label={item.sub_expense_name} value={item.sub_expense_name} />
//                   ))}
//                 </Picker> */}
//                 <Picker
//   selectedValue={subCategory}
//   style={[styles.picker, { color: theme.text }]}
//   dropdownIconColor={theme.text}
//   onValueChange={setSubCategory}
// >
//   <Picker.Item label="Select Subcategory" value="" enabled={false} />
//   {(policyMap[mainCategory] || []).map((item, index) => (
//     <Picker.Item
//       key={index}
//       label={item.sub_expense_name}
//       value={item.sub_expense_name}
//     />
//   ))}
// </Picker>

//               </View>
//             </View>
//           )}
          

//           {subCategory && (
//             <View style={[styles.inputGroup, { paddingTop: 10 }]}>
//               <View style={styles.policyHeader}>

//   <Text style={[styles.label, { color: theme.text }]}>View Policy</Text>
//   <TouchableOpacity onPress={() => setShowPolicyDetails(!showPolicyDetails)}>
//     <Icon
//       name={showPolicyDetails ? "eye-off-outline" : "eye-outline"}
//       size={20}
//       color={theme.text}
//     />
//   </TouchableOpacity>
// </View>

//               {showPolicyDetails && (() => {
//                 const selectedPolicy = policyMap[mainCategory]?.find(
//                   (item) => item.sub_expense_name === subCategory
//                 );
//                 if (!selectedPolicy) return null;
//                 return (
//                   <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Amount Limit: ₹{selectedPolicy.policy_amount}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Frequency: {selectedPolicy.frequency}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Max Claims: {selectedPolicy.no_of_times_claim}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid From: {selectedPolicy.effective_from}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid To: {selectedPolicy.effective_end}</Text>
//                     {selectedPolicy.descriptions && selectedPolicy.descriptions !== 'null' && (
//                       <Text style={[styles.policyItem, { color: theme.text }]}>Description: {selectedPolicy.descriptions}</Text>
//                     )}
//                   </View>
//                 );
//               })()}
//             </View>
//           )}
//         {/* <View style={styles.row}>
//           <View style={[styles.inputGroup,styles.halfInput]}>
//             <Text style={[styles.label, { color: theme.text }]}>Amount</Text>
//             <View style={[styles.amountContainer, { borderColor: theme.borderColor }]}>
//               <TextInput
//                 style={[styles.amountInput, { color: theme.text }]}
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//                 placeholder="0"
//                 placeholderTextColor={theme.secondaryColor}
//               />
//               <Text style={[styles.currencyText, { color: theme.text }]}>INR</Text>
//             </View>
//           </View>

//            <View style={[styles.inputGroup,styles.halfInput]}>
//             <Text style={[styles.label, { color: theme.text }]}>Date</Text>
//             <TouchableOpacity
//               style={[styles.datePickerButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={[styles.dateText, { color: theme.text }]}>{formatDate(date)}</Text>
//               <Icon name="calendar-outline" size={20} color={theme.text} />
//             </TouchableOpacity>
//             {showDatePicker && (
//               <DateTimePicker
//                 value={date}
//                 mode="date"
//                 display="default"
//                 onChange={onDateChange}
//               />
//             )}
//           </View> 
//           </View> */}
          
// <View style={styles.inputGroup}>
 
// // Image Picker Button (Before Upload)
// <TouchableOpacity 
//   style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//   onPress={() => handleChooseImage()}>
//   <Icon name="image-outline" size={24} color={theme.text} />
//   <Text style={[styles.uploadText, { color: theme.text }]}>Choose Image</Text>
// </TouchableOpacity>

// // If an image is selected, show it
// {selectedImage && (
//   <View style={styles.selectedImageContainer}>
//     <Image 
//       source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}` }} 
//       style={styles.selectedImage} 
//     />
//     <Text style={[styles.imageInfo, { color: theme.text }]}>Image Selected</Text>
//   </View>
// )}

// // Upload Button
// {selectedImage && !loading && (
//   <TouchableOpacity
//     style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//     onPress={handleUploadBill}
//   >
//     <Icon name="cloud-upload-outline" size={24} color={theme.text} />
//     <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bill</Text>
//   </TouchableOpacity>
// )}


// {loading && (
//   <View style={styles.loadingContainer}>
//     <ActivityIndicator size="large" color={theme.text} />
//     <Text style={[styles.loadingText, { color: theme.text }]}>Uploading...</Text>
//   </View>
// )}


// </View>
// {/*{entity?.date && (
//   <View style={{ marginBottom: 10 }}>
//     <Text>Date</Text>
//     <TextInput
//       value={ editedDate} // Bind to editableDate state
//       onChangeText={setEditedDate} // Handle date changes
//       editable={true} // Make it editable
//       style={{ borderWidth: 1, padding: 8 }}
//     />
//     <Text style={styles.note}>*Change the date if it is incorrect.</Text>
//   </View>
// )}

// {entity?.total && (
//   <View style={{ marginBottom: 10 }}>
//     <Text>Total</Text>
//     <TextInput
//       value={editedTotal } // Bind to editableTotal state
//       onChangeText={setEditedTotal} // Handle amount changes
//       keyboardType="numeric" // Ensures numeric input
//       editable={true} // Make it editable
//       style={{ borderWidth: 1, padding: 8 }}
//     />
//     <Text style={styles.note}>*Change the total if it is incorrect.</Text>
//   </View>
// )}*/}


//   {entity?.date && (
//     <View style={{ marginBottom: 10 }}>
//        <Text>Date</Text>
//       <TextInput
//         value={entity.date}
//         editable={true}
//         style={{ borderWidth: 1, padding: 8 }}
//       /> 
//       <Text style={styles.note}>*Change the date if it is incorrect.</Text>
//     </View>
//   )}

// {entity?.total && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Total</Text>
//       <TextInput
//         value={entity.total}
//         editable={true}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//       <Text style={styles.note}>*Change the total if it is incorrect.</Text>
//     </View>
//   )} 
// <View>
  
//   {entity?.bill_no && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Bill No</Text>
//       <TextInput
//         value={entity.bill_no}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//   {entity?.time && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Time</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//    {entity?.distance && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Distance</Text>
//       <TextInput
//         value={entity.distance}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//   {entity?.from_address && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>From Address</Text>
//       <TextInput
//         value={entity.from_address}
//         editable={false}
//         multiline
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.to_address && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>To Address</Text>
//       <TextInput
//         value={entity.to_address}
//         editable={false}
//         multiline
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.name && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Name</Text>
//       <TextInput
//         value={entity.name}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.org && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Organization</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
 
//   {entity?.gstno && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>GST NO</Text>
//       <TextInput
//         value={entity.gstno}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
  
//   {entity?.invoice && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Invoice No</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

  
// </View>


//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.cancelButton, { borderColor: theme.borderColor}]}
//               onPress={handleCancel}
//             >
//               <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.submitButton, { backgroundColor: theme.buttonBg }]}
//               onPress={(e)=>handleSubmit(e)}
//             >
//               <Text style={[styles.submitButtonText, { color: theme.buttonTextColor }]}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//      flex: 1, 
//      backgroundColor: '#fff' 
//     },
//   scrollContainer: { 
//     paddingBottom: 80
//    },
//   header: {
//     padding: 30,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: { 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     color: '#000' 
//   },
//   formContainer: { 
//     padding: 15 
//   },
 
//   inputGroup: {
//      marginBottom: 10,
//      },
//   label: { 
//     fontSize: 14, 
//     color: '#333', 
//     marginBottom: 5 
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: { 
//     flex: 1,
//     height: 55 
//   },
//   policyContainer:{
//     flexDirection:'row',
//     justifyContent:'space-around'
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//     },
//   halfInput: {
//     flex: 1,
//   },
  
//   amountInput: { flex: 1, height: 45 },
//   currencyText: { color: '#666', fontWeight: '500' },
//   datePickerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//   },
//   dateText: { color: '#333' },
//   selectedImageContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   selectedImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   imageInfo: {
//     fontSize: 14,
//     color: '#555',
//   },

//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   loadingText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   uploadText: { marginLeft: 8, color: '#333' },
//   note:{
//       color:'red',
//       fontSize:12,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '40%',
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#b5b5b1',
//   },
//   cancelButtonText: {
//      color: '#333', 
//      fontWeight: '500'
//      },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   submitButtonText: { color: '#fff', fontWeight: '500' },
//   policyContainer: {
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   policyItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 4,
//   },
// });

// export default NewClaimRequestScreen;






// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { useTheme } from '../../theme/useTheme';
// import { BASEPATH } from '../config';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { PermissionsAndroid, Platform, Linking } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const NewClaimRequestScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [mainCategory, setMainCategory] = useState(null);
//   const [subCategory, setSubCategory] = useState(null);
//   const [amount, setAmount] = useState(null);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [mainCategories, setMainCategories] = useState([]);
//   const [policyMap, setPolicyMap] = useState({});
//   const [showPolicyDetails, setShowPolicyDetails] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null); 
//   const [loading, setLoading] = useState(false); 
//   const [entity, setEntity] = useState(null);
//   const [companyId, setCompanyId] = useState('');
// const [empId, setEmpId] = useState('');


//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const [apiData, setApiData] = useState({
//     amount: '',
//     policyMap: {},
//     expense_head: '',  
//     subexpense_head: '',  
//     date: '', 
    
//   });
  

//   const handleCancel = () => {
//     navigation.navigate('Claims');
//   };
  
  
  
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
//         const apiData = response?.data?.data || [];
  
//         const categories = apiData.map(item => ({
//           id: item.main_expense_head,
//           name: item.main_expense_name,
//         }));
  
//         const map = {};
//         apiData.forEach(item => {
//           map[item.main_expense_name] = item.policy_details;
//         });
  
//         setMainCategories(categories);
//         setPolicyMap(map);
//       } catch (error) {
//         Alert.alert('Something went wrong');
//       }
//     };
  
//     fetchPolicies();
//   }, []);
  
  
  
//   const handleChooseImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: true,
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('Image Picker Error:', response.errorMessage);
//           Alert.alert('Error', 'Failed to pick image');
//         } else {
//           const base64Image = response.assets?.[0]?.base64;
//           if (base64Image) {
//             setSelectedImage({
//               uri: response.assets[0].uri,
//               base64: base64Image,
//             });
//           }
//         }
//       }
//     );
//   };
  
//    const handleUploadBill = async () => {
//     if (!selectedImage) {
//       Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//       return;
//     }
  
//     setLoading(true); 
//     try {
//       //const permissionGranted = await requestGalleryPermission();
  
//       // if (!permissionGranted) {
//       //   Alert.alert(
//       //     'Permission Denied',
//       //     'Please enable photo access in settings to upload the bill.',
//       //     [
//       //       { text: 'Cancel', style: 'cancel' },
//       //       { text: 'Open Settings', onPress: () => Linking.openSettings() },
//       //     ]
//       //   );
//       //   setLoading(false);
//       //   return;
//       // }
  
//       const payload = {
//         company_id: "CompanyID", 
//         expense_head: "MainExpense",             
//         subexpense_head: "SubExpense", 
//         document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//       };
  
//       const apiResponse = await axios.post(
//         `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator/`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json', 
//           },
//         }
//       );
//       setEntity(apiResponse.data.entities?.[0]);
//       const data = apiResponse.data;
//       console.log(data);
//       setApiData({
//         amount: data.amount,
//         expense_head: data.expense_head,
//         subexpense_head: data.subexpense_head,
//         date: data.date,
//       });
  
//       Alert.alert('Success', 'Image uploaded and data populated!');
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Upload failed', 'Please try again later.');
//     } finally {
//       setLoading(false); 
//     }
//   };
  
// // const requestGalleryPermission = async () => {
// //   if (Platform.OS === 'android') {
// //     const permission = Platform.Version >= 33
// //       ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
// //       : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

// //     const alreadyGranted = await PermissionsAndroid.check(permission);
// //     if (alreadyGranted) return true;

// //     const granted = await PermissionsAndroid.request(permission, {
// //       title: 'Photo Access Needed',
// //       message: 'We need access to your gallery to upload the bill.',
// //       buttonPositive: 'OK',
// //     });

// //     return granted === PermissionsAndroid.RESULTS.GRANTED;
// //   }
// //   return true; 
// // };
// useEffect(() => {
//   const loadData = async () => {
//     try {
//       const storedCompanyId = await AsyncStorage.getItem('companyname');
//       const storedEmpId = await AsyncStorage.getItem('username');

//       if (storedCompanyId) setCompanyId(storedCompanyId);
//       if (storedEmpId) setEmpId(storedEmpId);
//     } catch (error) {
//       console.error("Failed to load user data", error);
//     }
//   };

//   loadData();
// }, []);
// const handleSubmit = async()=> {

//   const mainCategoryData = mainCategories.find(item => item.name === mainCategory);

// const selectedPolicy = policyMap[mainCategory]?.find(
//   policy => policy.sub_expense_name === subCategory
// );


// if (!selectedPolicy) {
//   return Alert.alert("Error", "Could not find matching policy details.");
// }


// const policyId = selectedPolicy.policy_detail_id; 
 
// const mainExpenseHeadId = mainCategoryData?.id;

// const subExpenseHeadId = selectedPolicy.sub_expense_head;  



// //  const payload = 

// //  {
// //   employee_claim_data: [
// //     {
// //       company_id: companyId.toString(),
// //       policy_id: policyId,
// //       expense_head: mainExpenseHeadId,
// //       subexpense_head: subExpenseHeadId,
// //       claim_status: "normal",
// //       claim_type: "regular",
// //       emp_id: empId.toString(),
// //       year: "2025",
// //       advance_id: 71,
// //       descriptions: "hello",
// //       document: [
// //         {
// //           ocr_amount: Number(entity?.total),
// //           ocr_date: entity?.date,
// //           booking_id: entity?.bill_no || "",
// //           ride_id: entity?.bill_no || "",
// //           from_address: entity?.from_address || "",
// //           to_address: entity?.to_address || "",
// //           doc_name: entity?.org || "",
// //           distance: entity?.distance || "",
// //           gst_no: entity?.gstno || "",
// //           times: entity?.time || "",
// //           invoice_no: entity?.invoiceno || "",
// //           page1: `data:image/jpeg;base64,${selectedImage.base64}`,
// //           type: "image",
// //           amount: Number(entity?.total),
// //           date: entity?.date,
// //         },
// //       ],
// //     },
// //   ],
// // };
// // const payload = {
// //   "employee_claim_data": [
// //     {
// //       "company_id": companyId.toString(),
// //       "policy_id": policyId,
// //       "expense_head": mainExpenseHeadId,
// //       "subexpense_head": subExpenseHeadId,
// //       "claim_status": "normal",
// //       "claim_type": "regular",
// //       "emp_id": empId.toString(),
// //       "year": "2025",
// //       "advance_id": 71,
// //       "descriptions": "hello",
// //       "document": [
// //         {
// //           "ocr_amount": Number(entity?.total ),
// //           "ocr_date": entity?.date || null,
// //           "booking_id": entity?.bill_no || null,
// //           "ride_id": entity?.bill_no || null,
// //           "from_address": entity?.from_address || null,
// //           "to_address": entity?.to_address || null,
// //           "doc_name": entity?.org || null,
// //           "distance": entity?.distance || null,
// //           "gst_no": entity?.gstno || null,
// //           "times": entity?.time || null,
// //           "invoice_no": entity?.invoiceno || null,
// //           "page1": `data:image/jpeg;base64,${selectedImage?.base64 }`,
// //           "type": "image",
// //           "amount": Number(entity?.total ),
// //           "date": entity?.date || null
// //         }
// //       ]
// //     }
// //   ]
// // };
// // {
// //     "employee_claim_data": [
// //         {
// //             "company_id":"durr",
// //             "policy_id": 474,
// //             "expense_head": 116,
// //             "subexpense_head": 100,
// //             "claim_status":"normal",
// //             "claim_type":"regular",
// //             "emp_id": "emptest567",
// //             "year":"2025",
// //             "advance_id":88,
// //             "claim_amount":300,
// //             "advance_amount":200,
// //            "descriptions":"hello",
// //             "document": [
// //                 {
// //                     "ocr_amount": "500",
// //                     "ocr_date": "2021-01-22",
// //                     "booking_id":"abc123",
// //                     "ride_id":"abc123",
// //                     "from_address":"abc123",
// //                     "to_address":"abc123",
// //                     "doc_name":"abc123",
// //                     "distance":"abc123",
// //                     "gst_no":"abc123",
// //                     "times":"abc123",
// //                     "invoice_no":"abc123",
// //                     "page1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3wAAATvC...","type": "image",
// //                     "amount": 1000.00,
// //                     "date": "2021-01-22"
// //                 }]
// //       }
// //   ]
// // }
// const payload = {
//   employee_claim_data: [
//     {
//       company_id: companyId.toString(),
//       policy_id: policyId,
//       expense_head: mainExpenseHeadId,
//       subexpense_head: subExpenseHeadId,
//       claim_status: "normal",
//       claim_type: "regular",
//       emp_id: empId.toString(),
//       year: "2025",
//       advance_id: 71,
//       claim_amount: Number(entity?.total || 0),
//       advance_amount: 0,
//       descriptions: "hello",
//       document: [
//         {
          
//            ocr_amount: Number(entity.ocr_amount),
          
//            ocr_date: entity.ocr_date,
//           booking_id: entity?.bill_no || "",
//           ride_id: entity?.bill_no || "",
//           from_address: entity?.from_address || "",
//           to_address: entity?.to_address || "",
//           doc_name: entity?.org || "",
//           distance: entity?.distance || "",
//           gst_no: entity?.gstno || "",
//           times: entity?.time || "",
//           invoice_no: entity?.invoiceno || "",
//           page1: `data:image/jpeg;base64,${selectedImage?.base64 || ""}`,
//           type: "image",
          
//            amount:  Number(entity.ocr_amount),
          
//            date: entity.ocr_date,
//         }
//       ]
//     }
//   ]
// };


//   console.log("Payload", payload);
//     try {

//     const response = await axios.post(
//       `${BASEPATH}v1/client/ocr_inserts/ocr_inserting/`, 
//       payload,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );
//     if (response?.data?.status === 200){
//       console.log("Full response from API:", response.data);
//       navigation.navigate('SubmitClaim'); 
//       } else {
//       Alert.alert('Error', 'Failed to submit claim.');
//     }
  
   
//   } catch (error) {
//     console.error(error);
//     Alert.alert('Error', 'Something went wrong while submitting the claim.');
//   } 
  
  
// };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.borderColor }]}>
//           <Text style={[styles.headerTitle, { color: theme.text }]}>New Claim Request</Text>
//         </View>

//             <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={[styles.label, { color: theme.text }]}>Main Expense Category</Text>
//             <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//               <Picker
//                 selectedValue={mainCategory}
//                 style={[styles.picker, { color: theme.text }]}
//                 dropdownIconColor={theme.text}
//                 onValueChange={(value) => {
//                   setMainCategory(value);
//                   setSubCategory(null);
//                 }}>
//                 <Picker.Item label="Select Main Category" value="" enabled={false} />
//                 {mainCategories.map(item => (
//                   <Picker.Item key={item.id} label={item.name} value={item.name} />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           {mainCategory && (
//             <View style={styles.inputGroup}>
//               <Text style={[styles.label, { color: theme.text }]}>Sub Expense Category</Text>
//               <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//                 {/* <Picker
//                   selectedValue={subCategory}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}
//                   onValueChange={setSubCategory}>
//                   <Picker.Item label="Select Subcategory" value={null} />
//                   {policyMap[mainCategory]?.map((item, index) => (
//                     <Picker.Item key={index} label={item.sub_expense_name} value={item.sub_expense_name} />
//                   ))}
//                 </Picker> */}
//                 <Picker
//   selectedValue={subCategory}
//   style={[styles.picker, { color: theme.text }]}
//   dropdownIconColor={theme.text}
//   onValueChange={setSubCategory}
// >
//   <Picker.Item label="Select Subcategory" value="" enabled={false} />
//   {(policyMap[mainCategory] || []).map((item, index) => (
//     <Picker.Item
//       key={index}
//       label={item.sub_expense_name}
//       value={item.sub_expense_name}
//     />
//   ))}
// </Picker>

//               </View>
//             </View>
//           )}
          

//           {subCategory && (
//             <View style={[styles.inputGroup, { paddingTop: 10 }]}>
//               <View style={styles.policyHeader}>

//   <Text style={[styles.label, { color: theme.text }]}>View Policy</Text>
//   <TouchableOpacity onPress={() => setShowPolicyDetails(!showPolicyDetails)}>
//     <Icon
//       name={showPolicyDetails ? "eye-off-outline" : "eye-outline"}
//       size={20}
//       color={theme.text}
//     />
//   </TouchableOpacity>
// </View>

//               {showPolicyDetails && (() => {
//                 const selectedPolicy = policyMap[mainCategory]?.find(
//                   (item) => item.sub_expense_name === subCategory
//                 );
//                 if (!selectedPolicy) return null;
//                 return (
//                   <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Amount Limit: ₹{selectedPolicy.policy_amount}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Frequency: {selectedPolicy.frequency}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Max Claims: {selectedPolicy.no_of_times_claim}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid From: {selectedPolicy.effective_from}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid To: {selectedPolicy.effective_end}</Text>
//                     {selectedPolicy.descriptions && selectedPolicy.descriptions !== 'null' && (
//                       <Text style={[styles.policyItem, { color: theme.text }]}>Description: {selectedPolicy.descriptions}</Text>
//                     )}
//                   </View>
//                 );
//               })()}
//             </View>
//           )}
//         {/* <View style={styles.row}>
//           <View style={[styles.inputGroup,styles.halfInput]}>
//             <Text style={[styles.label, { color: theme.text }]}>Amount</Text>
//             <View style={[styles.amountContainer, { borderColor: theme.borderColor }]}>
//               <TextInput
//                 style={[styles.amountInput, { color: theme.text }]}
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//                 placeholder="0"
//                 placeholderTextColor={theme.secondaryColor}
//               />
//               <Text style={[styles.currencyText, { color: theme.text }]}>INR</Text>
//             </View>
//           </View>

//            <View style={[styles.inputGroup,styles.halfInput]}>
//             <Text style={[styles.label, { color: theme.text }]}>Date</Text>
//             <TouchableOpacity
//               style={[styles.datePickerButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={[styles.dateText, { color: theme.text }]}>{formatDate(date)}</Text>
//               <Icon name="calendar-outline" size={20} color={theme.text} />
//             </TouchableOpacity>
//             {showDatePicker && (
//               <DateTimePicker
//                 value={date}
//                 mode="date"
//                 display="default"
//                 onChange={onDateChange}
//               />
//             )}
//           </View> 
//           </View> */}
          
// <View style={styles.inputGroup}>
 
// // Image Picker Button (Before Upload)
// <TouchableOpacity 
//   style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//   onPress={() => handleChooseImage()}>
//   <Icon name="image-outline" size={24} color={theme.text} />
//   <Text style={[styles.uploadText, { color: theme.text }]}>Choose Image</Text>
// </TouchableOpacity>

// // If an image is selected, show it
// {selectedImage && (
//   <View style={styles.selectedImageContainer}>
//     <Image 
//       source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}` }} 
//       style={styles.selectedImage} 
//     />
//     <Text style={[styles.imageInfo, { color: theme.text }]}>Image Selected</Text>
//   </View>
// )}

// // Upload Button
// {selectedImage && !loading && (
//   <TouchableOpacity
//     style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//     onPress={handleUploadBill}
//   >
//     <Icon name="cloud-upload-outline" size={24} color={theme.text} />
//     <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bill</Text>
//   </TouchableOpacity>
// )}


// {loading && (
//   <View style={styles.loadingContainer}>
//     <ActivityIndicator size="large" color={theme.text} />
//     <Text style={[styles.loadingText, { color: theme.text }]}>Uploading...</Text>
//   </View>
// )}


// </View>

// <View>
//   {/* {entity?.date && (
//     <View style={{ marginBottom: 10 }}>
//        <Text>Date</Text>
//       <TextInput
//         value={entity.date}
//         editable={true}
//         style={{ borderWidth: 1, padding: 8 }}
//       />      
//       <Text style={styles.note}>*Change the date if it is incorrect.</Text>
//     </View>
//   )}

// {entity?.total && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Total</Text>
//       <TextInput
//         value={entity.total}
//         editable={true}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//       <Text style={styles.note}>*Change the total if it is incorrect.</Text>
//     </View>
//   )} */}

// {/* {entity && (
//   <>
    
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>
//       Date{entity.ocr_date}
//       </Text>
//       <TextInput
//         value={entity.date}
//         editable={true}
//         onChangeText={text => setEntity(prev => ({ ...prev, date: text }))}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//       <Text style={styles.note}>*Change the date if OCR is incorrect.</Text>
//     </View>
// {entity?.total && (
//     <View style={{ marginBottom: 10 }}>
//       <Text>Total</Text>
//       <TextInput
//         value={entity.total}
//         editable={true}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//       <Text style={styles.note}>*Change the total if it is incorrect.</Text>
//     </View>
//   )}
//   </>
// )} */}

// {entity && (
//   <View style={{ marginBottom: 10 }}>
//     <Text style={{ fontWeight: 'bold' }}>
//       OCR Date: {entity.ocr_date || 'N/A'}
//     </Text>
//     <TextInput
//       value={entity.date || ''}
//       editable={true}
//       onChangeText={text => setEntity(prev => ({ ...prev, date: text }))}
//       style={{ borderWidth: 1, padding: 8 }}
//     />
//     <Text style={styles.note}>*Change the date if OCR is incorrect.</Text>
//   </View>
// )}

// {entity && (
//   <View style={{ marginBottom: 10 }}>
//     <Text style={{ fontWeight: 'bold' }}>
//       OCR Amount: {entity.ocr_amount || 'N/A'}
//     </Text>
//     <TextInput
//       value={entity.amount || ''}
//       editable={true}
//       keyboardType="numeric"
//       onChangeText={text => setEntity(prev => ({ ...prev, amount: text }))}
//       style={{ borderWidth: 1, padding: 8 }}
//     />
//     <Text style={styles.note}>*Change the amount if OCR is incorrect.</Text>
//   </View>
// )}

//   {entity?.bill_no && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Bill No</Text>
//       <TextInput
//         value={entity.bill_no}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//   {entity?.time && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Time</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//    {entity?.distance && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Distance</Text>
//       <TextInput
//         value={entity.distance}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
//   {entity?.from_address && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>From Address</Text>
//       <TextInput
//         value={entity.from_address}
//         editable={false}
//         multiline
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.to_address && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>To Address</Text>
//       <TextInput
//         value={entity.to_address}
//         editable={false}
//         multiline
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.name && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Name</Text>
//       <TextInput
//         value={entity.name}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

//   {entity?.org && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Organization</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
 
//   {entity?.gstno && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>GST NO</Text>
//       <TextInput
//         value={entity.gstno}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}
  
//   {entity?.invoice && (
//     <View style={{ marginBottom: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>Invoice No</Text>
//       <TextInput
//         value={entity.org}
//         editable={false}
//         style={{ borderWidth: 1, padding: 8 }}
//       />
//     </View>
//   )}

  
// </View>


//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.cancelButton, { borderColor: theme.borderColor}]}
//               onPress={handleCancel}
//             >
//               <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.submitButton, { backgroundColor: theme.buttonBg }]}
//               onPress={(e)=>handleSubmit(e)}
//             >
//               <Text style={[styles.submitButtonText]}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//      flex: 1, 
//      backgroundColor: '#fff' 
//     },
//   scrollContainer: { 
//     paddingBottom: 80
//    },
//   header: {
//     padding: 30,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: { 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     color: '#000' 
//   },
//   formContainer: { 
//     padding: 15 
//   },
 
//   inputGroup: {
//      marginBottom: 10,
//      },
//   label: { 
//     fontSize: 14, 
//     color: '#333', 
//     marginBottom: 5 
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: { 
//     flex: 1,
//     height: 55 
//   },
//   policyContainer:{
//     flexDirection:'row',
//     justifyContent:'space-around'
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//     },
//   halfInput: {
//     flex: 1,
//   },
  
//   amountInput: { flex: 1, height: 45 },
//   currencyText: { color: '#666', fontWeight: '500' },
//   datePickerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//   },
//   dateText: { color: '#333' },
//   selectedImageContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   selectedImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   imageInfo: {
//     fontSize: 14,
//     color: '#555',
//   },
//   note:{
//       color:'#FF0000',
//       fontSize:12,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   loadingText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//   },
//   uploadText: { marginLeft: 8, color: '#333' },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: '40%',
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#b5b5b1',
//   },
//   cancelButtonText: {
//      color: '#333', 
//      fontWeight: '500'
//      },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   submitButtonText: { color: '#FFFFFF', fontWeight: '500' },
//   policyContainer: {
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   policyItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 4,
//   },
// });

// export default NewClaimRequestScreen;


{/* {entity?.date && (
    <View style={{ marginBottom: 10 }}>
       <Text>Date</Text>
      <TextInput
        value={entity.date}
        editable={true}
        style={{ borderWidth: 1, padding: 8 }}
      />
     <Text style={styles.note}>*Change the date if it is incorrect.</Text>
    </View>
  )}

{entity?.total && (
    <View style={{ marginBottom: 10 }}>
      <Text>Total</Text>
      <TextInput
        value={entity.total}
        editable={true}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Text style={styles.note}>*Change the total if it is incorrect.</Text>
    </View>
  )} */}
{/* {entity?.date && (
        <View style={{ marginBottom: 10 }}>
          <Text>Date</Text>
          <TextInput
            value={editedDate} 
            onChangeText={(text) => setEditedDate(text)} 
            editable={true}
            style={{ borderWidth: 1, padding: 8 }}
          />
          <Text style={styles.note}>*Change the date if it is incorrect.</Text>
        </View>
      )}

      {entity?.total && (
        <View style={{ marginBottom: 10 }}>
          <Text>Total</Text>
          <TextInput
            value={editedTotal} // Use the state value here
            onChangeText={(text) => setEditedTotal(text)} // Update state on edit
            editable={true}
            style={{ borderWidth: 1, padding: 8 }}
          />
          <Text style={styles.note}>*Change the total if it is incorrect.</Text>
        </View>
      )} */}
       // useEffect(() => {
  //   const fetchPolicies = async () => {
  //     try {
  //       const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
  //       const apiData = response?.data?.data || [];
  
  //       const categories = apiData.map(item => ({
  //         id: item.main_expense_head,
  //         name: item.main_expense_name,
  //       }));
  
  //       const map = {};
  //       apiData.forEach(item => {
  //         map[item.main_expense_name] = item.policy_details;
  //       });
  
  //       setMainCategories(categories);
  //       setPolicyMap(map);
  //     } catch (error) {
  //       Alert.alert('Something went wrong');
  //     }
  //   };
  
  //   fetchPolicies();
  // }, []);
  
//   useEffect(() => {
//   const fetchPolicies = async () => {
//     try {
//       const response = await axios.get(`http://192.168.0.23:8081/v1/client/policy_claims/claim_policy_employee_grade/`);
//       const apiData = response?.data?.data || [];

//       const currentGrade = employeeGrade; // e.g., 'Grade A'

//       const mainCategories = [];
//       const subCategories = [];

//       apiData.forEach(item => {
//         const mainExpenseName = item.main_expense_name;
//         const mainExpenseHead = item.main_expense_head;

//         // Collect relevant sub-expenses for this main category based on grade
//         const matchingPolicyDetails = item.policy_details.filter(detail =>
//           detail.employee_grades.some(grade => grade.grade_name === currentGrade)
//         );

//         if (matchingPolicyDetails.length > 0) {
//           // Add main expense only if it has matching policies
//           if (!mainCategories.find(cat => cat.id === mainExpenseHead)) {
//             mainCategories.push({
//               id: mainExpenseHead,
//               name: mainExpenseName,
//             });
//           }

//           matchingPolicyDetails.forEach(detail => {
//             subCategories.push({
//               id: detail.sub_expense_head,
//               name: `${detail.sub_expense_name} (${detail.limit_name})`,
//               mainId: mainExpenseHead, // For filtering based on selected main category
//             });
//           });
//         }
//       });

//       // Update your state
//       setMainCategories(mainCategories);   // for Main Expense dropdown
//       setSubCategories(subCategories);     // for Sub Expense dropdown (filtered as needed)

//     } catch (error) {
//       Alert.alert('Something went wrong');
//     }
//   };

//   fetchPolicies();
// }, [employeeGrade]);

// const formData = new FormData();
  // formData.append("file", selectedImage, selectedImage.name);

  // const payload = {
  //   company_id: "CompanyID",
  //   expense_head: "MainExpense",
  //   subexpense_head: "SubExpense",
  //   document: [`data:image/jpeg;base64,${selectedImage.base64}`] 
  //   };

  
  // formData.append("payload", JSON.stringify(payload));

  // const apiResponse = await axios.post(
  //   `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_third/`,
  //   formData,
  //   {
  //     headers: {
  //       'Content-Type': 'multipart/form-data', 
  //     },
  //   }
  // );
  //     setEntity(apiResponse.data.entities?.[0]);
  //     const data = apiResponse.data;
  //     console.log(data);
  //     setApiData({
  //       expense_head: data.expense_head,
  //       subexpense_head: data.subexpense_head,
  //      });
  
  //     Alert.alert('Success', 'Image uploaded and data populated!');
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert('Upload failed', 'Please try again later.');
  //   } finally {
  //     setLoading(false); 
  //   }
  // };
  
// const handleUploadBill = async () => {
//   if (!selectedImage) {
//     Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const formData = new FormData();
//     formData.append('file', {
//       uri: selectedImage.uri,
//       type: selectedImage.type || 'image/jpeg',
//       name: selectedImage.fileName || 'upload.jpg',
//     });

//     const payload = {
//       company_id: 'CompanyID',
//       expense_head: 'MainExpense',
//       subexpense_head: 'SubExpense',
//       document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//     };

//     formData.append('payload', JSON.stringify(payload));

//     const apiResponse = await axios.post(
//       `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_third/`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     const data = apiResponse.data;
//     setEntity(data.entities?.[0]);
//     setApiData({
//       expense_head: data.expense_head,
//       subexpense_head: data.subexpense_head,
//     });

//     Alert.alert('Success', 'Image uploaded and data populated!');
//   } catch (err) {
//     console.error(err);
//     Alert.alert('Upload failed', 'Please try again later.');
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUploadBill = async () => {
//   if (!selectedImage) {
//     Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const formData = new FormData();

//     // Append the file - this part is crucial
//     // formData.append('file', {
//     //   uri: selectedImage.uri,
//     //   type: selectedImage.type || 'image/jpeg',
//     //   name: selectedImage.fileName || 'upload.jpg',
//     // });

//     // // Append the payload as a JSON string
//     // const payload = {
//     //   company_id: 'CompanyID', // ensure it's valid
//     //   expense_head: 'MainExpense',
//     //   subexpense_head: 'SubExpense',
//     //   document: [`data:image/jpeg;base64,${selectedImage.base64}`], // confirm if array is required
//     // };
// formData.append('file', {
//   uri: selectedImage.uri,
//   type: selectedImage.type || 'image/jpeg',
//   name: selectedImage.fileName || 'upload.jpg',
// });

// formData.append('data', JSON.stringify({
//   company_id: 'CompanyID',
//   expense_head: 'MainExpense',
//   subexpense_head: 'SubExpense',
//   document: [`data:image/jpeg;base64,${selectedImage.base64}`],
// }));

//     //formData.append('payload', JSON.stringify(payload));
//     formData.append('data', JSON.stringify(payload));

//     const response = await axios.post(
//       `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_third/`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     const data = response.data;

//     setEntity(data.entities?.[0]);
//     setApiData({
//       expense_head: data.expense_head,
//       subexpense_head: data.subexpense_head,
//     });

//     Alert.alert('Success', 'Image uploaded and data populated!');
  
// //   }catch (err) {
// //     console.error('Error Response:', err.response?.data || err.message);
// //     Alert.alert('Upload failed', err.response?.data?.detail || 'Please try again later.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// } catch (err) {
//   console.error('Upload error:', err.response?.data || err.message);

//   let errorMessage = 'Please try again later.';
//   const detail = err.response?.data?.detail;

//   if (Array.isArray(detail)) {
//     errorMessage = detail.join('\n');
//   } else if (typeof detail === 'string') {
//     errorMessage = detail;
//   }

//   Alert.alert('Upload failed', errorMessage);
// }finally {
//      setLoading(false);
//    }
// };
// const handleUploadBill = async () => {
//   if (!selectedImage) {
//     Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//     return;
//   }

//   // Optional: Confirm base64 exists
//   if (!selectedImage.base64) {
//     Alert.alert('Image Error', 'Selected image is missing base64 data.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const formData = new FormData();

//     // Append file
//     formData.append('file', {
//       uri: selectedImage.uri,
//       type: selectedImage.type || 'image/jpeg',
//       name: selectedImage.fileName || 'upload.jpg',
//     });

//     // Append JSON payload under 'data'
//     const payload = {
//       company_id: 'CompanyID',
//       expense_head: 'MainExpense',
//       subexpense_head: 'SubExpense',
//       document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//     };

//     formData.append('data', JSON.stringify(payload));

//     // Optional: Debug form data structure
//     // for (const [key, value] of formData._parts) {
//     //   console.log(`${key}:`, value);
//     // }

//     const response = await axios.post(
//       `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_third/`,
//       formData
//       // Do not set 'Content-Type' manually – Axios will set the correct multipart/form-data boundary
//     );

//     const data = response.data;

//     // Safely update state
//     setEntity(data.entities?.[0]);

//     setApiData({
//       expense_head: data.expense_head,
//       subexpense_head: data.subexpense_head,
//     });

//     Alert.alert('Success', 'Image uploaded and data populated!');
//   } catch (err) {
//     console.error('Upload error:', err.response?.data || err.message);

//     // Handle backend validation error formatting
//     let errorMessage = 'Please try again later.';
//     const detail = err.response?.data?.detail;

//     if (Array.isArray(detail)) {
//       errorMessage = detail.map((e) => e.msg || JSON.stringify(e)).join('\n');
//     } else if (typeof detail === 'string') {
//       errorMessage = detail;
//     }

//     Alert.alert('Upload failed', errorMessage);
//   } finally {
//     setLoading(false);
//   }
// };
// const handleUploadBill = async () => {
//   if (!selectedImage) {
//     Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//     return;
//   }

//   if (!selectedImage.base64 || !selectedImage.uri) {
//     Alert.alert('Image Error', 'Image is missing base64 or URI data.');
//     return;
//   }

//   setLoading(true);

//   try {
//     const formData = new FormData();

//     // Append the image file
//     formData.append('file', {
//       uri: selectedImage.uri,
//       type: selectedImage.type || 'image/jpeg',
//       name: selectedImage.fileName || 'upload.jpg',
//     });

//     // Append the payload as a string under the "data" field
//     const payload = {
//       company_id: 'CompanyID',
//       expense_head: 'MainExpense',
//       subexpense_head: 'SubExpense',
//       document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//     };

//     formData.append('data', JSON.stringify(payload));

    
//     //console.log("UPLOAD TO:", `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_four/`);

//     const response = await axios.post(
//       `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_four/`,
//       formData
//     );

//     const data = response.data;

//     // Update UI with returned data
//     setEntity(data.entities?.[0]);
//     setApiData({
//       expense_head: data.expense_head,
//       subexpense_head: data.subexpense_head,
//     });

//     Alert.alert('Success', 'Image uploaded and data populated!');
//   } catch (err) {
//     console.error('Upload error:', err.response?.data || err.message);

//     let errorMessage = 'Something went wrong. Please try again later.';
//     const detail = err.response?.data?.detail;

//     if (Array.isArray(detail)) {
//       errorMessage = detail.map((e) => e.msg || JSON.stringify(e)).join('\n');
//     } else if (typeof detail === 'string') {
//       errorMessage = detail;
//     }

//     Alert.alert('Upload failed', errorMessage);
//   } finally {
//     setLoading(false);
//   }
// };
// const payload = {
//   employee_claim_data: [
//     {
//       company_id: companyId.toString(),
//       policy_id: policyId,
//       expense_head: mainExpenseHeadId,
//       subexpense_head: subExpenseHeadId,
//       claim_status: "normal",
//       claim_type: "regular",
//       emp_id: empId.toString(),
//       year: "2025",
//       advance_id: 71,
//       claim_amount: Number(entity?.total || 0),
//       advance_amount: 0,
//       descriptions: "hello",
//       document: [
//         {
//           ocr_amount: Number(entity?.total || 0),
//           ocr_date: entity?.date || " ",
//           booking_id: entity?.bill_no || "",
//           ride_id: entity?.bill_no || "",
//           from_address: entity?.from_address || "",
//           to_address: entity?.to_address || "",
//           doc_name: entity?.org || "",
//           distance: entity?.distance || "",
//           gst_no: entity?.gstno || "",
//           times: entity?.time || "",
//           invoice_no: entity?.invoiceno || "",
//           page1: `data:image/jpeg;base64,${selectedImage?.base64 || ""}`,
//           type: "image",
//           amount: Number(entity?.total || 0),
//           date: entity?.date || "",
//         }
//       ]
//     }
//   ]
// };

// const payload = {
//     employee_claim_data: [
//       {
//         company_id: companyId.toString(),
//         policy_id: policyId,
//         expense_head: mainExpenseHeadId,
//         subexpense_head: subExpenseHeadId,
//         claim_status: "normal",
//         claim_type: "regular",
//         emp_id: empId.toString(),
//         year: "2025",
//         advance_id: 71,
//         claim_amount: Number(finalAmount), // Use the final (edited or OCR) amount
//         advance_amount: 0,
//         descriptions: "hello",
//         document: [
//           {
//             //ocr_amount: Number(ocrAmount), // Always use the OCR extracted amount
//             ocr_amount: Number(entity?.total || 0),
//             //ocr_date: ocrDate, // Always use the OCR extracted date
//              ocr_date: entity?.date || " ",
//             booking_id: entity?.bill_no || "",
//             ride_id: entity?.bill_no || "",
//             from_address: entity?.from_address || "",
//             to_address: entity?.to_address || "",
//             doc_name: entity?.org || "",
//             distance: entity?.distance || "",
//             gst_no: entity?.gstno || "",
//             times: entity?.time || "",
//             invoice_no: entity?.invoiceno || "",
//             page1: `data:image/jpeg;base64,${selectedImage?.base64 || ""}`,
//             type: "image",
//             amount: Number(finalAmount), // Use the final (edited or OCR) amount
//             date: finalDate, // Use the final (edited or OCR) date
//           }
//         ]
//       }
//     ]
//   };


// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { useTheme } from '../../theme/useTheme';
// import { BASEPATH } from '../config';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { PermissionsAndroid, Platform, Linking } from 'react-native';
// import { ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const NewClaimRequestScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [mainCategory, setMainCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');
//   const [amount, setAmount] = useState(null);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [mainCategories, setMainCategories] = useState([]);
//   const [policyMap, setPolicyMap] = useState({});
//   const [showPolicyDetails, setShowPolicyDetails] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null); 
//   const [loading, setLoading] = useState(false); 
//   const [entity, setEntity] = useState(null);
//   const [companyId, setCompanyId] = useState('');
//   const [empId, setEmpId] = useState('');
//   const [description, setDescription] = useState('');

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(false);
//     setDate(currentDate);
//   };

//   const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const [apiData, setApiData] = useState({
//     amount: '',
//     policyMap: {},
//     expense_head: '',  
//     subexpense_head: '',  
//     date: '', 
//   });
  
//   const [editedDate, setEditedDate] = useState('');
//   const [editedTotal, setEditedTotal] = useState('');

//   const handleCancel = () => {
//     navigation.navigate('Claims');
//   };
  
//   useEffect(() => {
//     const fetchPolicies = async () => {
//       try {
//         const response = await axios.get(`${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`);
//         const apiData = response?.data?.data || [];

//         // Create categories using the ID as key
//         const categories = apiData.map(item => ({
//           id: item.main_expense_head,
//           name: item.main_expense_name,
//         }));

//         // Create policy map using the main expense head ID as key
//         const map = {};
//         apiData.forEach(item => {
//           map[item.main_expense_head] = item.policy_details;
//         });

//         console.log('Categories:', categories);
//         console.log('Policy Map:', map);

//         setMainCategories(categories);
//         setPolicyMap(map);
//       } catch (error) {
//         console.error('Policy fetch error:', error);
//         Alert.alert('Error', 'Failed to fetch policies');
//       }
//     };

//     fetchPolicies();
//   }, []);
  
//   useEffect(() => {
//     if (entity) {
//       setEditedDate(entity?.date || '');
//       setEditedTotal(entity?.total?.toString() || '');
//     }
//   }, [entity]);

//   const handleChooseImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: true,
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           console.log('Image Picker Error:', response.errorMessage);
//           Alert.alert('Error', 'Failed to pick image');
//         } else {
//           const base64Image = response.assets?.[0]?.base64;
//           if (base64Image) {
//             setSelectedImage({
//               uri: response.assets[0].uri,
//               base64: base64Image,
//               type: response.assets[0].type,
//               fileName: response.assets[0].fileName,
//             });
//           }
//         }
//       }
//     );
//   };

//   const handleUploadBill = async () => {
//     if (!selectedImage) {
//       Alert.alert('No Image Selected', 'Please choose an image before uploading.');
//       return;
//     }

//     if (!selectedImage.base64 || !selectedImage.uri) {
//       Alert.alert('Image Error', 'Image is missing base64 or URI data.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // Append the image file
//       formData.append('file', {
//         uri: selectedImage.uri,
//         type: selectedImage.type || 'image/jpeg',
//         name: selectedImage.fileName || 'upload.jpg',
//       });

//       // Append the payload with the base64 string as 'document'
//       const payload = {
//         company_id: companyId || 'CompanyID',
//         expense_head: 'MainExpense',
//         subexpense_head: 'SubExpense',
//         document: [`data:image/jpeg;base64,${selectedImage.base64}`],
//       };

//       formData.append('data', JSON.stringify(payload));

//       // Upload the image and data
//       const response = await axios.post(
//         `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_four/`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const data = response.data;

//       // Update UI with returned data
//       setEntity(data.entities?.[0]);
//       setApiData({
//         expense_head: data.expense_head,
//         subexpense_head: data.subexpense_head,
//       });

//       Alert.alert('Success', 'Image uploaded and data populated!');
//     } catch (err) {
//       console.error('Upload error:', err.response?.data || err.message);

//       let errorMessage = 'Something went wrong. Please try again later.';
//       const detail = err.response?.data?.detail;

//       if (Array.isArray(detail)) {
//         errorMessage = detail.map((e) => e.msg || JSON.stringify(e)).join('\n');
//       } else if (typeof detail === 'string') {
//         errorMessage = detail;
//       }

//       Alert.alert('Upload failed', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedCompanyId = await AsyncStorage.getItem('companyname');
//         const storedEmpId = await AsyncStorage.getItem('username');

//         if (storedCompanyId) setCompanyId(storedCompanyId);
//         if (storedEmpId) setEmpId(storedEmpId);
//       } catch (error) {
//         console.error("Failed to load user data", error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleSubmit = async () => {
//     console.log("DEBUGGING VALUES:");
//     console.log("mainCategory:", mainCategory, "type:", typeof mainCategory);
//     console.log("subCategory:", subCategory, "type:", typeof subCategory);
//     console.log("mainCategories:", mainCategories);
//     console.log("policyMap keys:", Object.keys(policyMap));
    
//     // Validation
//     if (!mainCategory || mainCategory === '') {
//       Alert.alert("Error", "Main category is required");
//       return;
//     }
    
//     if (!subCategory || subCategory === '') {
//       Alert.alert("Error", "Sub category is required");
//       return;
//     }

//     if (!selectedImage) {
//       Alert.alert("Error", "Please upload a bill image");
//       return;
//     }

//     // Find the selected policy using the main category ID
//     const selectedPolicy = policyMap[mainCategory]?.find(
//       (item) => item.sub_expense_head === subCategory
//     );
    
//     console.log("Selected policy:", selectedPolicy);

//     if (!selectedPolicy) {
//       Alert.alert("Error", "Could not find matching policy details.");
//       return;
//     }

//     const policyId = selectedPolicy.policy_detail_id.toString();
    
//     // Use the IDs directly as they are already the correct values
//     const mainExpenseHeadId = String(mainCategory);
//     const subExpenseHeadId = String(subCategory);

//     console.log("Values for payload:");
//     console.log("mainExpenseHeadId:", mainExpenseHeadId);
//     console.log("subExpenseHeadId:", subExpenseHeadId);
//     console.log("policyId:", policyId);

//     const isDateEdited = editedDate && editedDate !== entity?.date;
//     const isAmountEdited = editedTotal && editedTotal !== entity?.total?.toString();

//     const finalDate = isDateEdited ? editedDate : entity?.date || "";
//     const finalAmount = isAmountEdited ? editedTotal : entity?.total || "0";

//     const cleanedFinalAmount = Number(finalAmount);
//     if (isNaN(cleanedFinalAmount)) {
//       Alert.alert("Invalid amount", "The amount must be a number.");
//       return;
//     }

//     const payload = {
//       employee_claim_data: [
//         {
//           company_id: companyId.toString(),
//           policy_id: policyId,
//           expense_head: mainExpenseHeadId,
//           subexpense_head: subExpenseHeadId,
//           claim_status: "normal",
//           claim_type: "regular",
//           emp_id: empId.toString(),
//           year: "2025",
//           advance_id: 71,
//           claim_amount: cleanedFinalAmount,
//           advance_amount: 0,
//           descriptions: description || "No description",
//           document: [
//             {
//               ocr_amount: Number(entity?.total || 0),
//               ocr_date: entity?.date || "",
//               booking_id: entity?.bill_no || "",
//               ride_id: entity?.bill_no || "",
//               from_address: entity?.from_address || "",
//               to_address: entity?.to_address || "",
//               doc_name: entity?.org || "",
//               distance: entity?.distance || "",
//               gst_no: entity?.gstno || "",
//               times: entity?.time || "",
//               invoice_no: entity?.invoiceno || "",
//               page1: `data:image/jpeg;base64,${selectedImage?.base64 || ""}`,
//               type: "image",
//               ...(isAmountEdited && { amount: cleanedFinalAmount }),
//               ...(isDateEdited && { date: finalDate }),
//             },
//           ],
//         },
//       ],
//     };

//     console.log("Final payload:", JSON.stringify(payload, null, 2));

//     try {
//       const response = await axios.post(
//         `${BASEPATH}v1/client/ocr_inserts/ocr_inserting/`,
//         payload,
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response?.data?.status === 200) {
//         console.log("API response:", response.data);
//         navigation.navigate('SubmitClaim');
//       } else {
//         Alert.alert('Error', 'Failed to submit claim.');
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Alert.alert('Error', 'Something went wrong while submitting the claim.');
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.borderColor }]}>
//           <Text style={[styles.headerTitle, { color: theme.text }]}>New Claim Request</Text>
//         </View>

//         <View style={styles.formContainer}>
//           <View style={styles.inputGroup}>
//             <Text style={[styles.label, { color: theme.text }]}>Main Expense Category</Text>
//             <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//               <Picker
//                 selectedValue={mainCategory}
//                 style={[styles.picker, { color: theme.text }]}
//                 dropdownIconColor={theme.text}
//                 onValueChange={(value) => {
//                   console.log("Main category selected:", value);
//                   setMainCategory(value);
//                   setSubCategory('');
//                 }}>
//                 <Picker.Item label="Select Main Category" value="" />
//                 {mainCategories.map(item => (
//                   <Picker.Item key={item.id} label={item.name} value={item.id} />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           {mainCategory && mainCategory !== '' && (
//             <View style={styles.inputGroup}>
//               <Text style={[styles.label, { color: theme.text }]}>Sub Expense Category</Text>
//               <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
//                 <Picker
//                   selectedValue={subCategory}
//                   style={[styles.picker, { color: theme.text }]}
//                   dropdownIconColor={theme.text}
//                   onValueChange={(value) => {
//                     console.log("Sub category selected:", value);
//                     setSubCategory(value);
//                   }}
//                 >
//                   <Picker.Item label="Select Subcategory" value="" />
//                   {(policyMap[mainCategory] || []).map((item, index) => (
//                     <Picker.Item
//                       key={index}
//                       label={item.sub_expense_name}
//                       value={item.sub_expense_head}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//           )}

//           {subCategory && subCategory !== '' && (
//             <View style={[styles.inputGroup, { paddingTop: 10 }]}>
//               <View style={styles.policyHeader}>
//                 <Text style={[styles.label, { color: theme.text }]}>View Policy</Text>
//                 <TouchableOpacity onPress={() => setShowPolicyDetails(!showPolicyDetails)}>
//                   <Icon
//                     name={showPolicyDetails ? "eye-off-outline" : "eye-outline"}
//                     size={20}
//                     color={theme.text}
//                   />
//                 </TouchableOpacity>
//               </View>

//               {showPolicyDetails && (() => {
//                 const selectedPolicy = policyMap[mainCategory]?.find(
//                   (item) => item.sub_expense_head === subCategory
//                 );
                
//                 if (!selectedPolicy) {
//                   return (
//                     <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
//                       <Text style={[styles.policyItem, { color: theme.text }]}>No policy details found</Text>
//                     </View>
//                   );
//                 }
                
//                 return (
//                   <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Amount Limit: ₹{selectedPolicy.policy_amount}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Frequency: {selectedPolicy.frequency}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Max Claims: {selectedPolicy.no_of_times_claim}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid From: {selectedPolicy.effective_from}</Text>
//                     <Text style={[styles.policyItem, { color: theme.text }]}>Valid To: {selectedPolicy.effective_end}</Text>
//                   </View>
//                 );
//               })()}
//             </View>
//           )}
        

//           <View style={styles.inputGroup}>
//             {/* Image Picker Button */}
//             <TouchableOpacity 
//               style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//               onPress={handleChooseImage}>
//               <Icon name="image-outline" size={24} color={theme.text} />
//               <Text style={[styles.uploadText, { color: theme.text }]}>Choose Image</Text>
//             </TouchableOpacity>

//             {/* Selected Image Display */}
//             {selectedImage && (
//               <View style={styles.selectedImageContainer}>
//                 <Image 
//                   source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}` }} 
//                   style={styles.selectedImage} 
//                 />
//                 <Text style={[styles.imageInfo, { color: theme.text }]}>Image Selected</Text>
//               </View>
//             )}

//             {/* Upload Button */}
//             {selectedImage && !loading && (
//               <TouchableOpacity
//                 style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
//                 onPress={handleUploadBill}
//               >
//                 <Icon name="cloud-upload-outline" size={24} color={theme.text} />
//                 <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bill</Text>
//               </TouchableOpacity>
//             )}

//             {/* Loading Indicator */}
//             {loading && (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={theme.text} />
//                 <Text style={[styles.loadingText, { color: theme.text }]}>Uploading...</Text>
//               </View>
//             )}
//           </View>

//           {/* Entity Data Display */}
//           <View>
//             {entity?.date && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Date</Text>
//                 <TextInput
//                   value={editedDate}
//                   onChangeText={setEditedDate}
//                   editable={true}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text }]}
//                 />
//                 <Text style={styles.note}>*Change the date if it is incorrect.</Text>
//               </View>
//             )}

//             {entity?.total && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Total</Text>
//                 <TextInput
//                   value={editedTotal}
//                   onChangeText={setEditedTotal}
//                   keyboardType="numeric"
//                   editable={true}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text }]}
//                 />
//                 <Text style={styles.note}>*Change the total if it is incorrect.</Text>
//               </View>
//             )}

//             {entity?.bill_no && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Bill No</Text>
//                 <TextInput
//                   value={entity.bill_no}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.time && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Time</Text>
//                 <TextInput
//                   value={entity.time}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.distance && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Distance</Text>
//                 <TextInput
//                   value={entity.distance}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.from_address && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>From Address</Text>
//                 <TextInput
//                   value={entity.from_address}
//                   editable={false}
//                   multiline
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.to_address && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>To Address</Text>
//                 <TextInput
//                   value={entity.to_address}
//                   editable={false}
//                   multiline
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.name && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Name</Text>
//                 <TextInput
//                   value={entity.name}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.org && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Organization</Text>
//                 <TextInput
//                   value={entity.org}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.gstno && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>GST NO</Text>
//                 <TextInput
//                   value={entity.gstno}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}

//             {entity?.invoiceno && (
//               <View style={{ marginBottom: 10 }}>
//                 <Text style={[styles.label, { color: theme.text }]}>Invoice No</Text>
//                 <TextInput
//                   value={entity.invoiceno}
//                   editable={false}
//                   style={[styles.textInput, { borderColor: theme.borderColor, color: theme.text, backgroundColor: '#f5f5f5' }]}
//                 />
//               </View>
//             )}
//           </View>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.cancelButton, { borderColor: theme.borderColor}]}
//               onPress={handleCancel}
//             >
//               <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.submitButton, { backgroundColor: theme.buttonBg }]}
//               onPress={handleSubmit}
//             >
//               <Text style={[styles.submitButtonText, { color: theme.buttonTextColor }]}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#fff' 
//   },
//   scrollContainer: { 
//     paddingBottom: 80
//   },
//   header: {
//     padding: 30,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: { 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     color: '#000' 
//   },
//   formContainer: { 
//     padding: 15 
//   },
//   inputGroup: {
//     marginBottom: 10,
//   },
//   label: { 
//     fontSize: 14, 
//     color: '#333', 
//     marginBottom: 5 
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   picker: { 
//     flex: 1,
//     height: 55 
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   policyHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   policyContainer: {
//     backgroundColor: '#f1f1f1',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   policyItem: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 4,
//   },
//   selectedImageContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   selectedImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   imageInfo: {
//     fontSize: 14,
//     color: '#555',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   loadingText: {
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     marginVertical: 5,
//   },
//   uploadText: { 
//     marginLeft: 8, 
//     color: '#333' 
//   },
//   note: {
//     color: '#FF0000',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 40,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#b5b5b1',
//   },
//   cancelButtonText: {
//     color: '#333', 
//     fontWeight: '500'
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#7E8356',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   submitButtonText: { 
//     color: '#fff', 
//     fontWeight: '500' 
//   },
// });

// export default NewClaimRequestScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';
import { BASEPATH } from '../config';
import {launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewClaimRequestScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [mainCategory, setMainCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  //const [mainCategories, setMainCategories] = useState([]);
  //const [subCategories, setSubCategories] = useState([]);
  const [policyMap, setPolicyMap] = useState({});
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [entity, setEntity] = useState(null);
  const [companyId, setCompanyId] = useState('');
const [empId, setEmpId] = useState('');
const [mainCategories, setMainCategories] = useState([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [apiData, setApiData] = useState({
    amount: '',
    policyMap: {},
    expense_head: '',  
    subexpense_head: '',  
    date: '', 
    
  });
  
const [editedDate, setEditedDate] = useState(entity?.date || '');
const [editedTotal, setEditedTotal] = useState(entity?.total?.toString() || '');


  const handleCancel = () => {
    navigation.navigate('Claims');
  };
  

  useEffect(() => {
    fetchPolicies();
  }, []);

  useEffect(() => {
    if (selectedMainCategory && subCategoriesMap[selectedMainCategory]) {
      const subList = subCategoriesMap[selectedMainCategory];
      if (subList.length > 0) {
        setSelectedSubCategory(subList[0].id);
      } else {
        setSelectedSubCategory(null);
      }
    }
  }, [selectedMainCategory, subCategoriesMap]);

//   const fetchPolicies = async () => {
//   try {
//     const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');
//     const grade_id_string = await AsyncStorage.getItem('grade_id');

//     console.log("📦 Fetched grade_id from storage:", grade_id_string);

//     if (!grade_id_string) {
//       console.warn("⚠️ No grade_id found in storage.");
//       return;
//     }

//     const response = await axios.post(
//       'http://192.168.0.23:8081/v1/client/policy_claims/claim_policy_employee_grade/',
//       {
//         company_id: company_id,
//         operation: 'read',
//         grade_id: parseInt(grade_id_string), // make sure it's sent as a number
//       }
//     );

//     const apiData = response?.data?.data ?? [];

//     const mains = apiData.map(item => ({
//       id: item.main_expense_head,
//       name: item.main_expense_name,
//     }));

//     const subsMap = {};
//     apiData.forEach(item => {
//       const subList = item.policy_details.map(detail => ({
//         id: detail.sub_expense_head,
//         name: `${detail.sub_expense_name} (${detail.limit_name})`,
//       }));
//       subsMap[item.main_expense_head] = subList;
//     });

//     console.log('✅ Main Categories:', mains);
//     console.log('✅ Sub Categories Map:', subsMap);

//     setMainCategories(mains);
//     setSubCategoriesMap(subsMap);

//     if (mains.length > 0) {
//       setSelectedMainCategory(mains[0].id);
//     }

//   } catch (error) {
//     console.error('❌ Error fetching policies:', error.response?.data || error.message);
//     Alert.alert('Error', 'Failed to load policy data');
//   }
// };

const fetchPolicies = async () => {
  try {
    const emp_id = await AsyncStorage.getItem('username');
    const company_id = await AsyncStorage.getItem('companyname');
    const grade_id_string = await AsyncStorage.getItem('grade_id');

    if (!grade_id_string) {
      console.warn("⚠️ No grade_id found in storage.");
      return;
    }

    const response = await axios.post(
      'http://192.168.0.23:8081/v1/client/policy_claims/claim_policy_employee_grade/',
      {
        company_id: company_id,
        operation: 'read',
        grade_id: parseInt(grade_id_string),
      }
    );

    const apiData = response?.data?.data ?? [];

    const mains = apiData.map(item => ({
      id: item.main_expense_head,
      name: item.main_expense_name,
    }));

    const subsMap = {};
    const newPolicyMap = {};

    apiData.forEach(item => {
      const subList = item.policy_details.map(detail => ({
        id: detail.sub_expense_head,
        name: `${detail.sub_expense_name} (${detail.limit_name})`,
      }));
      subsMap[item.main_expense_head] = subList;

      // Build policyMap for detailed lookup
      newPolicyMap[item.main_expense_head] = item.policy_details.map(detail => ({
        ...detail,
        policy_detail_id: detail.policy_detail_id,
        sub_expense_name: detail.sub_expense_name,
        sub_expense_head: detail.sub_expense_head,
        policy_amount: detail.policy_amount,
        frequency: detail.frequency,
        no_of_times_claim: detail.no_of_times_claim,
        effective_from: detail.effective_from,
        effective_end: detail.effective_end,
        descriptions: detail.descriptions,
      }));
    });

    setMainCategories(mains);
    setSubCategoriesMap(subsMap);
    setPolicyMap(newPolicyMap);

    if (mains.length > 0) {
      setSelectedMainCategory(mains[0].id);
    }
  } catch (error) {
    console.error('❌ Error fetching policies:', error.response?.data || error.message);
    Alert.alert('Error', 'Failed to load policy data');
  }
};

  useEffect(() => {
  if (entity) {
    setEditedDate(entity?.date || '');
    setEditedTotal(entity?.total?.toString() || '');
  }
}, [entity]);

  
  
  const handleChooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error:', response.errorMessage);
          Alert.alert('Error', 'Failed to pick image');
        } else {
          const base64Image = response.assets?.[0]?.base64;
          if (base64Image) {
            setSelectedImage({
              uri: response.assets[0].uri,
              base64: base64Image,
            });
          }
        }
      }
    );
  };
   // const requestGalleryPermission = async () => {
//   if (Platform.OS === 'android') {
//     const permission = Platform.Version >= 33
//       ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//       : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

//     const alreadyGranted = await PermissionsAndroid.check(permission);
//     if (alreadyGranted) return true;

//     const granted = await PermissionsAndroid.request(permission, {
//       title: 'Photo Access Needed',
//       message: 'We need access to your gallery to upload the bill.',
//       buttonPositive: 'OK',
//     });

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   return true; 
// };
  //  const handleUploadBill = async () => {
  //   if (!selectedImage) {
  //     Alert.alert('No Image Selected', 'Please choose an image before uploading.');
  //     return;
  //   }
  
  //   setLoading(true); 
  //   try {
  //     //const permissionGranted = await requestGalleryPermission();
  
  //     // if (!permissionGranted) {
  //     //   Alert.alert(
  //     //     'Permission Denied',
  //     //     'Please enable photo access in settings to upload the bill.',
  //     //     [
  //     //       { text: 'Cancel', style: 'cancel' },
  //     //       { text: 'Open Settings', onPress: () => Linking.openSettings() },
  //     //     ]
  //     //   );
  //     //   setLoading(false);
  //     //   return;
  //     // }
      
  
const handleUploadBill = async () => {
  if (!selectedImage) {
    Alert.alert('No Image Selected', 'Please choose an image before uploading.');
    return;
  }

  if (!selectedImage.base64 || !selectedImage.uri) {
    Alert.alert('Image Error', 'Image is missing base64 or URI data.');
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    // Append the image file
    formData.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type || 'image/jpeg',
      name: selectedImage.fileName || 'upload.jpg',
    });

    // Append the payload with the base64 string as 'document'
    const payload = {
      company_id: 'CompanyID',
      expense_head: 'MainExpense',
      subexpense_head: 'SubExpense',
      document: [`data:image/jpeg;base64,${selectedImage.base64}`],
    };

    formData.append('data', JSON.stringify(payload));

    // Upload the image and data
    const response = await axios.post(
      `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator_four/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure this header is set for form-data
        },
      }
    );
console.log("API response:", response.data);

    const data = response.data;

    // Update UI with returned data
    setEntity(data.entities?.[0]);
    setApiData({
      expense_head: data.expense_head,
      subexpense_head: data.subexpense_head,
    });

    Alert.alert('Success', 'Image uploaded and data populated!');
  } catch (err) {
    console.error('Upload error:', err.response?.data || err.message);

    let errorMessage = 'Something went wrong. Please try again later.';
    const detail = err.response?.data?.detail;

    if (Array.isArray(detail)) {
      errorMessage = detail.map((e) => e.msg || JSON.stringify(e)).join('\n');
    } else if (typeof detail === 'string') {
      errorMessage = detail;
    }

    Alert.alert('Upload failed', errorMessage);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadData = async () => {
    try {
      const storedCompanyId = await AsyncStorage.getItem('companyname');
      const storedEmpId = await AsyncStorage.getItem('username');

      if (storedCompanyId) setCompanyId(storedCompanyId);
      if (storedEmpId) setEmpId(storedEmpId);
    } catch (error) {
      console.error("Failed to load user data", error);
    }
  };

  loadData();
}, []);
const handleSubmit = async()=> {
//const mainExpenseHeadId = selectedMainCategory;
  // const mainCategoryData = mainCategories.find(item => item.name === mainCategory);

// const selectedPolicy = policyMap[mainCategory]?.find(
//   policy => policy.sub_expense_name === subCategory
// );

const selectedPolicy = policyMap[selectedMainCategory]?.find(
  (item) => item.sub_expense_head === selectedSubCategory
);

if (!selectedPolicy) {
  return Alert.alert("Error", ".");
}


const policyId = selectedPolicy.policy_detail_id; 
//const mainExpenseHeadId = mainCategoryData?.id;
const mainExpenseHeadId = selectedMainCategory;

const subExpenseHeadId = selectedPolicy.sub_expense_head;  

const ocrDate = entity?.ocr_date; 
const ocrAmount = entity?.ocr_amount; 
  
  
// const finalDate = date ? formatDate(date) : ocrDate; 
// const finalAmount = amount || ocrAmount; 

const finalDate = editedDate || ocrDate;
const finalAmount = editedTotal || ocrAmount;


const cleanedFinalAmount = Number(finalAmount);
const cleanedFinalDate = finalDate?.trim();  // assuming it's a string like '2023-04-27'

if (isNaN(cleanedFinalAmount)) {
  Alert.alert("Invalid amount", "The amount must be a number.");
  return;
}

const payload = {
  employee_claim_data: [
    {
      company_id: companyId.toString(),
      policy_id: policyId,
      expense_head: mainExpenseHeadId,
      subexpense_head: subExpenseHeadId,
      claim_status: "normal",
      claim_type: "regular",
      emp_id: empId.toString(),
      year: "2025",
      advance_id: null,
      claim_amount: cleanedFinalAmount,
      advance_amount: 0,
      descriptions: "hello",
      document: [
        {
          ocr_amount: Number(entity?.total || 0),
          ocr_date: entity?.date || "",
          booking_id: entity?.bill_no || "",
          ride_id: entity?.bill_no || "",
          from_address: entity?.from_address || "",
          to_address: entity?.to_address || "",
          doc_name: entity?.org || "",
          distance: entity?.distance || "",
          gst_no: entity?.gstno || "",
          times: entity?.time || "",
          invoice_no: entity?.invoiceno || "",
          page1: `data:image/jpeg;base64,${selectedImage?.base64 || ""}`,
          type: "image",
          amount: cleanedFinalAmount,
          date: cleanedFinalDate,
        },
      ],
    },
  ],
};


  console.log("Payload", payload);
    try {

    const response = await axios.post(
      `${BASEPATH}v1/client/ocr_inserts/ocr_inserting/`, 
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    if (response?.data?.status === 200){
      console.log("Full response from API:", response.data);
      navigation.navigate('SubmitClaim'); 
      } else {
      Alert.alert('Error', 'Failed to submit claim.');
    }
  
   
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Something went wrong while submitting the claim.');
  } 
  
  
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.header, { backgroundColor: theme.headerBg, borderBottomColor: theme.borderColor }]}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>New Claim Request</Text>
        </View>

            <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Main Expense Category</Text>
            <View style={[styles.pickerContainer, { backgroundColor: theme.background, borderColor: theme.borderColor }]}>
              <Picker
        selectedValue={selectedMainCategory}
        onValueChange={(itemValue) => setSelectedMainCategory(itemValue)}
      >
       <Picker.Item label="Select Main Expense" value={null} />
  {mainCategories.map((main) => (
    <Picker.Item key={main.id} label={main.name} value={main.id} />
  ))}
      </Picker>
            </View>
          </View>

  
         {selectedMainCategory && (
  <View style={styles.inputGroup}>
    <Text style={[styles.label, { color: theme.text }]}>Sub Expense Category</Text>
    <View
      style={[
        styles.pickerContainer,
        { backgroundColor: theme.background, borderColor: theme.borderColor },
      ]}
    >
      <Picker
  selectedValue={selectedSubCategory}
  onValueChange={(itemValue) => setSelectedSubCategory(itemValue)}
  enabled={subCategoriesMap[selectedMainCategory]?.length > 0}
>
  <Picker.Item label="Select Sub Expense" value={null} />
  {subCategoriesMap[selectedMainCategory]?.map((sub) => (
    <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
  ))}
</Picker>

    </View>
  </View>
)}
 

          {subCategory && (
            <View style={[styles.inputGroup, { paddingTop: 10 }]}>
              <View style={styles.policyHeader}>

  <Text style={[styles.label, { color: theme.text }]}>View Policy</Text>
  <TouchableOpacity onPress={() => setShowPolicyDetails(!showPolicyDetails)}>
    <Icon
      name={showPolicyDetails ? "eye-off-outline" : "eye-outline"}
      size={20}
      color={theme.text}
    />
  </TouchableOpacity>
</View>

              {showPolicyDetails && (() => {
                // const selectedPolicy = policyMap[mainCategory]?.find(
                //   (item) => item.sub_expense_name === subCategory
                // );
                const selectedPolicy = policyMap[selectedMainCategory]?.find(
  (item) => item.sub_expense_head === selectedSubCategory
);

                if (!selectedPolicy) return null;
                return (
                  <View style={[styles.policyContainer, { backgroundColor: theme.background }]}>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Amount Limit: ₹{selectedPolicy.policy_amount}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Frequency: {selectedPolicy.frequency}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Max Claims: {selectedPolicy.no_of_times_claim}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Valid From: {selectedPolicy.effective_from}</Text>
                    <Text style={[styles.policyItem, { color: theme.text }]}>Valid To: {selectedPolicy.effective_end}</Text>
                    {selectedPolicy.descriptions && selectedPolicy.descriptions !== 'null' && (
                      <Text style={[styles.policyItem, { color: theme.text }]}>Description: {selectedPolicy.descriptions}</Text>
                    )}
                  </View>
                );
              })()}
            </View>
          )}
        
          
<View style={styles.inputGroup}>
 
// Image Picker Button (Before Upload)
<TouchableOpacity 
  style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
  onPress={() => handleChooseImage()}>
  <Icon name="image-outline" size={24} color={theme.text} />
  <Text style={[styles.uploadText, { color: theme.text }]}>Choose Image</Text>
</TouchableOpacity>

// If an image is selected, show it
{selectedImage && (
  <View style={styles.selectedImageContainer}>
    <Image 
      source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}` }} 
      style={styles.selectedImage} 
    />
    <Text style={[styles.imageInfo, { color: theme.text }]}>Image Selected</Text>
  </View>
)}

// Upload Button
{selectedImage && !loading && (
  <TouchableOpacity
    style={[styles.uploadButton, { backgroundColor: theme.background, borderColor: theme.borderColor }]}
    onPress={handleUploadBill}
  >
    <Icon name="cloud-upload-outline" size={24} color={theme.text} />
    <Text style={[styles.uploadText, { color: theme.text }]}>Upload Bill</Text>
  </TouchableOpacity>
)}


{loading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.text} />
    <Text style={[styles.loadingText, { color: theme.text }]}>Uploading...</Text>
  </View>
)}


</View>

<View>
  
  {entity?.date && (
  <View style={{ marginBottom: 10 }}>
    <Text>Date</Text>
    <TextInput
      value={editedDate}
      onChangeText={setEditedDate}
      editable={true}
      style={{ borderWidth: 1, padding: 8 }}
    />
    <Text style={styles.note}>*Change the date if it is incorrect.</Text>
  </View>
)}

{entity?.total && (
  <View style={{ marginBottom: 10 }}>
    <Text>Total</Text>
    <TextInput
      value={editedTotal}
      onChangeText={setEditedTotal}
      keyboardType="numeric"
      editable={true}
      style={{ borderWidth: 1, padding: 8 }}
    />
    <Text style={styles.note}>*Change the total if it is incorrect.</Text>
  </View>
)}

  {entity?.bill_no && (
    <View style={{ marginBottom: 10 }}>
      <Text>Bill No</Text>
      <TextInput
        value={entity.bill_no}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}
  {entity?.time && (
    <View style={{ marginBottom: 10 }}>
      <Text>Time</Text>
      <TextInput
        value={entity.org}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}
   {entity?.distance && (
    <View style={{ marginBottom: 10 }}>
      <Text>Distance</Text>
      <TextInput
        value={entity.distance}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}
  {entity?.from_address && (
    <View style={{ marginBottom: 10 }}>
      <Text>From Address</Text>
      <TextInput
        value={entity.from_address}
        editable={false}
        multiline
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}

  {entity?.to_address && (
    <View style={{ marginBottom: 10 }}>
      <Text>To Address</Text>
      <TextInput
        value={entity.to_address}
        editable={false}
        multiline
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}

  {entity?.name && (
    <View style={{ marginBottom: 10 }}>
      <Text>Name</Text>
      <TextInput
        value={entity.name}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}

  {entity?.org && (
    <View style={{ marginBottom: 10 }}>
      <Text>Organization</Text>
      <TextInput
        value={entity.org}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}
 
  {entity?.gstno && (
    <View style={{ marginBottom: 10 }}>
      <Text>GST NO</Text>
      <TextInput
        value={entity.gstno}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}
  
  {entity?.invoice && (
    <View style={{ marginBottom: 10 }}>
      <Text>Invoice No</Text>
      <TextInput
        value={entity.org}
        editable={false}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  )}

  
</View>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.borderColor}]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: theme.buttonBg }]}
              onPress={(e)=>handleSubmit(e)}
            >
              <Text style={[styles.submitButtonText, { color: theme.buttonTextColor }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#fff' 
    },
  scrollContainer: { 
    paddingBottom: 80
   },
  header: {
    padding: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#000' 
  },
  formContainer: { 
    padding: 15 
  },
 
  inputGroup: {
     marginBottom: 10,
     },
  label: { 
    fontSize: 14, 
    color: '#333', 
    marginBottom: 5 
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: { 
    flex: 1,
    height: 55 
  },
  policyContainer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    },
  selectedImageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  imageInfo: {
    fontSize: 14,
    color: '#555',
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  uploadText: { marginLeft: 8, color: '#333' },
  note:{
    color:'#FF0000',
    fontSize:12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '40%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#b5b5b1',
  },
  cancelButtonText: {
     color: '#333', 
     fontWeight: '500'
     },
  submitButton: {
    flex: 1,
    backgroundColor: '#7E8356',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButtonText: { color: '#fff', fontWeight: '500' },
  policyContainer: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  policyItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default NewClaimRequestScreen;