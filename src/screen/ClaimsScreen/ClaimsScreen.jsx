

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   FlatList,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
// import { useTheme } from '../../theme/useTheme';
// import { BASEPATH } from '../config';

// const ClaimsScreen = ({ navigation }) => {
//   const { theme } = useTheme();
//   const [claims, setClaims] = useState([]);
//   const [allClaims, setAllClaims] = useState([]);
//   const [query, setQuery] = useState('');
//   const [expenseHeads, setExpenseHeads] = useState([]);
//   const [subExpenseHeads, setSubExpenseHeads] = useState([]);


//   const [dateOpen, setDateOpen] = useState(false);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [amountOpen, setAmountOpen] = useState(false);

//   const [dateValue, setDateValue] = useState(null);
//   const [statusValue, setStatusValue] = useState(null);
//   const [amountValue, setAmountValue] = useState(null);

//   const dateItems = [
//     { label: 'Today', value: 'today' },
//     { label: 'All', value: 'all' },
//   ];
//   const statusItems = [
//     { label: 'Approved', value: 'approved' },
//     { label: 'Pending', value: 'pending' },
//     { label: 'Rejected', value: 'rejected' },
//     { label: 'All', value: 'all' },
//   ];
//   const amountItems = [
//     { label: 'More than 1000', value: 1000 },
//     { label: 'More than 5000', value: 5000 },
//     { label: 'More than 10000', value: 10000 },
//     { label: 'All', value: 'all' },
//   ];

//   const fetchClaims = async () => {
//     try {
//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=EMP002&company_id=durr`
//       );
//       setClaims(response.data.claims);
//       setAllClaims(response.data.claims);
//     } catch (error) {
//       console.error('Error fetching claims:', error);
//     }
//   };
 
//   useEffect(() => {
//     fetchClaims();
    
//   }, []);
  
//   useEffect(() => {
//     let filtered = allClaims;

//     if (dateValue === 'today') {
//       const today = new Date().toISOString().split('T')[0];
//       filtered = filtered.filter(item => item.submitted_date === today);
//     }

//     if (statusValue && statusValue !== 'all') {
//       filtered = filtered.filter(
//         item => item.status_of_approval?.toLowerCase() === statusValue.toLowerCase()
//       );
//     }

//     if (amountValue && amountValue !== 'all') {
//       filtered = filtered.filter(item => {
//         const amount = item.documents?.[0]?.entered_amount || 0;
//         return amount > amountValue;
//       });
//     }

//     setClaims(filtered);
//   }, [dateValue, statusValue, amountValue]);

//   const handleSearch = text => {
//     setQuery(text);
//     const filtered = allClaims.filter(item =>
//       item.descriptions?.toLowerCase().includes(text.toLowerCase())
//     );
//     setClaims(filtered);
//   };

//   const getStatusColor = status => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return '#219e4f';
//       case 'pending':
//         return '#7d421e';
//       case 'rejected':
//         return '#F44336';
//       default:
//         return '#9E9E9E';
//     }
//   };

//   const renderClaim = ({ item }) => {
//     const document = item.documents?.[0];

//     // Function to render a value, showing 'N/A' if it's null
//     const renderValue = value => (value ? value : 'N/A');

//     // Function to handle the navigation to ClaimDetailScreen
//     const handleClaimPress = () => {
//       navigation.navigate('ClaimDetailScreen', { claim: item });
//     };

//     return (
//       <TouchableOpacity
//         style={[styles.claimItem, { backgroundColor: theme.cardBg }]}
//         onPress={handleClaimPress}>
//         <View style={styles.claimContent}>
//           <View style={styles.claimHeader}>
//             <Text style={[styles.categoryText, { color: theme.text }]}>
//               Claim #{item.claim_id}
//             </Text>
//             <View
//               style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_of_approval) }]}>
//               <Text style={styles.statusText}>{renderValue(item.status_of_approval)}</Text>
//             </View>
//           </View>
//           <Text style={{ color: theme.text }}>
//             Main Category: {renderValue(item.expense_head)}
//           </Text>

//           <Text style={{ color: theme.text }}>
//             Sub Category: {renderValue(item.subexpense_head)}
//           </Text>
          
//           <Text style={[styles.dateText, { color: theme.text }]}>
//             {renderValue(item.submitted_date)}
//           </Text>
//           {/* <Text style={[styles.descriptionText, { color: theme.text }]}>
//             Description: {renderValue(item.descriptions)}
//           </Text> */}

          
//           {document?.entered_amount && (
//             <Text style={[styles.amountText, { color: theme.text }]}>
//               ₹{document.entered_amount}
//             </Text>
//           )}

          
          
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleNewClaim = () => navigation.navigate('NewClaimRequest');

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//       <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//         <Text style={[styles.headerTitle, { color: theme.text }]}>Claims</Text>
//         <TouchableOpacity>
//           <Icon name="notifications-outline" size={24} color={theme.text} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.searchBar}>
//         <View style={styles.searchContainer}>
//           <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
//           <TextInput
//             style={[styles.searchInput, { color: theme.text }]}
//             placeholder="Search Claims"
//             value={query}
//             onChangeText={handleSearch}
//             placeholderTextColor={theme.text}
//           />
//         </View>
//       </View>

//       <View style={styles.filterRow}>
//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={dateOpen}
//             value={null}
//             items={dateItems}
//             setOpen={setDateOpen}
//             setValue={setDateValue}
//             setItems={() => {}}
//             placeholder="Date"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//             zIndex={3000}
//           />
          
//         </View>

//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={statusOpen}
//             value={null}
//             items={statusItems}
//             setOpen={setStatusOpen}
//             setValue={setStatusValue}
//             setItems={() => {}}
//             placeholder="Status"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//             zIndex={2000}
//           />
//         </View>

//         <View style={styles.dropdownWrapper}>
//           <DropDownPicker
//             open={amountOpen}
//             value={null}
//             items={amountItems}
//             setOpen={setAmountOpen}
//             setValue={setAmountValue}
//             setItems={() => {}}
//             placeholder="Amount"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//             zIndex={1000}
//           />
//         </View>
//       </View>

//       <FlatList
//         data={claims}
//         keyExtractor={item => item.claim_id.toString()}
//         renderItem={renderClaim}
//         contentContainerStyle={styles.claimsList}
//       />

//       <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
//         <Text style={styles.addClaimText}>Add New Claim</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   claimItem: {
//     borderRadius: 10,
//     padding: 15,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   claimContent: {
//     flex: 1,
//   },
//   claimHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   searchBar: {
//     flexDirection: 'row',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginLeft: 20,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//   },
//   claimsList: {
//     padding: 10,
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//     marginLeft:'60%',
//   },
//   statusText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//   },
//   dateText: {
//     color: '#666',
//     marginTop: 5,
//   },
//   amountText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   addClaimButton: {
//     backgroundColor: '#7E8356',
//     padding: 15,
//     margin: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   addClaimText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   filterRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     },
//   dropdownWrapper: {
//     flex: 1,
//     marginHorizontal: 5,
//     backgroundColor:'white'
//   },
//   dropdown: {
//     borderColor: '#888',
//     backgroundColor: 'white',
//     minHeight: 40,
//   },
//   dropdownText: {
//     color: 'black',
//     fontSize: 14,
//   },
//   dropdownContainer: {
//     backgroundColor:'white',
//     borderColor: '#888',
//   },
// });

// export default ClaimsScreen;





import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useTheme } from '../../theme/useTheme';
import { BASEPATH } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClaimsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [claims, setClaims] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [query, setQuery] = useState('');
  //const [selectedClaims, setSelectedClaims] = useState(new Set());
const [selectedClaims, setSelectedClaims] = useState([]);

  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);

  const [dateValue, setDateValue] = useState(null);
  const [statusValue, setStatusValue] = useState(null);
  const [amountValue, setAmountValue] = useState(null);

  const dateItems = [
    { label: 'Today', value: 'today' },
    { label: 'All', value: 'all' },
  ];
  const statusItems = [
    { label: 'Approved', value: 'approved' },
    { label: 'Pending', value: 'pending' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'All', value: 'all' },
  ];
  const amountItems = [
    { label: 'More than 1000', value: 1000 },
    { label: 'More than 5000', value: 5000 },
    { label: 'More than 10000', value: 10000 },
    { label: 'All', value: 'all' },
  ];
  useEffect(() => {
    if (!Array.isArray(allClaims)) return;
    let filtered = allClaims;

    if (dateValue === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(item => item.submitted_date === today);
    }

    if (statusValue && statusValue !== 'all') {
      filtered = filtered.filter(
        item => item.status_of_approval?.toLowerCase() === statusValue.toLowerCase()
      );
    }

    if (amountValue && amountValue !== 'all') {
      filtered = filtered.filter(item => {
        const amount = item.documents?.[0]?.entered_amount || 0;
        return amount > amountValue;
      });
    }

    setClaims(filtered);
  }, [dateValue, statusValue, amountValue, allClaims]);

  

const handleSearch = (text) => {
  setQuery(text);

  if (!text.trim()) {
    setClaims(allClaims);
    return;
  }

  const lowerText = text.toLowerCase();

  const filtered = allClaims.filter(item => {
    const { main, sub } = getExpenseNames(item, policyDetails);
    return (
      (main?.toLowerCase().includes(lowerText)) ||
      (sub?.toLowerCase().includes(lowerText)) ||
      (item.descriptions?.toLowerCase().includes(lowerText))
    );
  });

  setClaims(filtered);
};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // This is your real fetch function
    });
  
    return unsubscribe;
  }, [navigation]);
  
  

const fetchData = async () => {
  try {
    const emp_id = await AsyncStorage.getItem('username');
    const company_id = await AsyncStorage.getItem('companyname');

    if (!emp_id || !company_id) {
      throw new Error('Missing emp_id or company_id in AsyncStorage');
    }

    const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);

    // Get both claims and policy details data
    const claims = response.data.claims;
    const policyDetailsSec = response.data.approval_claim_data.policy_details_data_sec;

    console.log("Claims Data:", claims);
    //console.log("Policy Details Data:", policyDetailsSec);

    // Set claims and policy details state
    setClaims(claims);
    setAllClaims(claims);
    setPolicyDetails(policyDetailsSec);

    // Match policies to claims by policy_id
    const updatedClaims = claims.map(claim => {
      const claimPolicyId = String(claim.policy_id); // Ensure comparison is done as string
      const claimMainId = String(claim.expense_head); // Ensure comparison is done as string
      const claimSubId = String(claim.subexpense_head); // Ensure comparison is done as string

      console.log(`Checking claim policy_id: ${claimPolicyId} against policy_policy_id`);

      // Find matching policy from policy_details_data_sec
      const matchingPolicy = policyDetailsSec.find(policy => {
        const policyPolicyId = String(policy.policy_detail_id); // Use policy_detail_id for matching
        const policyMainId = String(policy.main_expense_head_id); // Ensure comparison is done as string
        const policySubId = String(policy.sub_expense_head_id); // Ensure comparison is done as string

        // Log the comparison before checking
        //console.log(`Checking: Claim(${claimPolicyId}, ${claimMainId}, ${claimSubId}) vs Policy(${policyPolicyId}, ${policyMainId}, ${policySubId})`);

        // Match based on policy_id, expense_head, and subexpense_head
        return policyPolicyId === claimPolicyId &&
               policyMainId === claimMainId &&
               policySubId === claimSubId;
      });

      // Log if matching policy is found or not
      console.log(`Matching policy for claim ${claim.claim_id}:`, matchingPolicy);

      return {
        ...claim,
        policyDetails: matchingPolicy || null,
      };
    });

    // Set the updated claims to state
    setClaims(updatedClaims);
    setAllClaims(updatedClaims);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);

// Get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return '#065f46';
    case 'pending':
      return '#b58900';
    case 'rejected':
      return '#d32f2f';
    default:
      return '#000';
  }
};


const getExpenseNames = (claim, policyDetails) => {
  if (!Array.isArray(policyDetails)) return { main: 'N/A', sub: 'N/A' };

  const claimPolicyId = Number(claim.policy_id);
  const claimMainId = Number(claim.expense_head);
  const claimSubId = Number(claim.subexpense_head);

  // Add logs for debugging
  console.log(`Matching for claim ${claim.claim_id}:`, {
    claimPolicyId,
    claimMainId,
    claimSubId,
  });

  // Find the matching policy
  const match = policyDetails.find(p => {
    const policyMainId = p.main_expense_head_id ? Number(p.main_expense_head_id) : null;
    const policySubId = p.sub_expense_head_id ? Number(p.sub_expense_head_id) : null;

    const isMatch = 
      Number(p.policy_detail_id) === claimPolicyId &&
      policyMainId === claimMainId &&
      policySubId === claimSubId;

    return isMatch;
  });

  if (!match) {
    console.warn("❌ No match found for claim:", {
      claimPolicyId,
      claimMainId,
      claimSubId
    });
  }

  return {
    main: match?.expense_head_name || 'N/A',
    sub: match?.sub_expense_head_name || 'N/A',
  };
};



// const renderClaim = ({ item }) => {
//   const { main, sub } = getExpenseNames(item, policyDetails);

//   return (
//     <TouchableOpacity style={[styles.claimItem, { backgroundColor: theme.cardBg }]}>
     
//       <View style={styles.claimHeader}>
//         <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
//           <Text style={[styles.titleText, { color: theme.text }]}>{main}</Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_of_approval) }]}>
//           <Text style={styles.statusText}>{item.status_of_approval}</Text>
//         </View>
//       </View>
//       <Text style={[styles.subtitleText, { color: theme.text }]}>{sub}</Text>
//       <View style={styles.bottomRow}>
//         <Text style={[styles.dateText, { color: theme.text }]}>{item.submitted_date}</Text>
//         {/* <Text style={[styles.amountText, { color: theme.text }]}>INR. {item.documents?.[0]?.entered_amount || '0.00'}</Text> */}
//          <Text style={[styles.amountText,{ color: theme.text }]}>INR. {item.documents?.[0]?.entered_amount?.toFixed(2) ?? '0.00'}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

  

const renderClaim = ({ item }) => {
  const { main, sub } = getExpenseNames(item, policyDetails);
  //const isSelected = selectedClaims.has(item.claim_id);
const isSelected = selectedClaims.includes(item.claim_id);

  // const toggleSelect = () => {
  //   const updated = new Set(selectedClaims);
  //   if (isSelected) {
  //     updated.delete(item.claim_id);
  //   } else {
  //     updated.add(item.claim_id);
  //   }
  //   setSelectedClaims(updated);
  // };
const toggleSelect = (claimId) => {
  if (selectedClaims.includes(claimId)) {
    // Remove claimId from selectedClaims
    setSelectedClaims(selectedClaims.filter(id => id !== claimId));
  } else {
    // Add claimId to selectedClaims
    setSelectedClaims([...selectedClaims, claimId]);
  }
};

  return (
    <TouchableOpacity style={[styles.claimItem, { backgroundColor: theme.cardBg }]} activeOpacity={1}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={toggleSelect}
          color={theme.buttonBg}
        /> */}
        <Checkbox
  status={selectedClaims.includes(item.claim_id) ? 'checked' : 'unchecked'}
  onPress={() => toggleSelect(item.claim_id)}
  color={theme.buttonBg}
/>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={styles.claimHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={[styles.titleText, { color: theme.text }]}>{main}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status_of_approval) }]}>
              <Text style={styles.statusText}>{item.status_of_approval}</Text>
            </View>
          </View>
          <Text style={[styles.subtitleText, { color: theme.text }]}>{sub}</Text>
          <View style={styles.bottomRow}>
            <Text style={[styles.dateText, { color: theme.text }]}>{item.submitted_date}</Text>
            {/* <Text style={[styles.amountText, { color: theme.text }]}>INR. {item.documents?.[0]?.entered_amount?.toFixed(2) ?? '0.00'}</Text> */}
            <Text style={[styles.amountText, { color: theme.text }]}>
  INR. {(typeof item.documents?.[0]?.entered_amount === 'number'
    ? item.documents[0].entered_amount.toFixed(2)
    : '0.00')}
</Text>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

  const handleNewClaim = () => navigation.navigate('NewClaimRequest');

//   const handleDelete = async () => {
//   if (selectedClaims.size === 0) {
//     Alert.alert("No selection", "Please select at least one claim to delete.");
//     return;
//   }

//   Alert.alert(
//     "Delete Claims",
//     `Are you sure you want to delete ${selectedClaims.size} claim(s)?`,
//     [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             for (const claimId of selectedClaims) {
//               await axios.delete(`${BASEPATH}v1/client/ocr_inserts/claims_delete/`);
//             }
//             Alert.alert("Success", "Selected claims deleted.");
//             setSelectedClaims(new Set());
//             fetchData(); // refresh claims list
//           } catch (error) {
//             console.error("Delete error:", error);
//             Alert.alert("Error", "Failed to delete one or more claims.");
//           }
//         }
//       }
//     ]
//   );
// };
// const handleDelete = async () => {
//   console.log("Delete button pressed", selectedClaims);
//   if (selectedClaims.size === 0) {
//     Alert.alert("No selection", "Please select at least one claim to delete.");
//     return;
//   }

//   Alert.alert(
//     "Delete Claims",
//     `Are you sure you want to delete ${selectedClaims.size} claim(s)?`,
//     [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             for (const claimId of selectedClaims) {
//               await axios.delete(`${BASEPATH}v1/client/ocr_inserts/claims_delete/${claimId}/`);
//             }
//             Alert.alert("Success", "Selected claims deleted.");
//             setSelectedClaims(new Set());
//             fetchData(); // refresh claims list
//           } catch (error) {
//             console.error("Delete error:", error);
//             Alert.alert("Error", "Failed to delete one or more claims.");
//           }
//         }
//       }
//     ]
//   );
// };
// const handleDelete = async () => {
//    console.log("Delete button pressed", selectedClaims);
//   if (selectedClaims.length === 0) {
//     Alert.alert("No selection", "Please select at least one claim to delete.");
//     return;
//   }

//   Alert.alert(
//     "Delete Claims",
//     `Are you sure you want to delete ${selectedClaims.length} claim(s)?`,
//     [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             for (const claimId of selectedClaims) {
//               await axios.delete(`${BASEPATH}v1/client/ocr_inserts/claims_delete/?claim_id=${claimId}`);
//             }
//             Alert.alert("Success", "Selected claims deleted.");
//             setSelectedClaims([]); // reset selection
//             fetchData(); // refresh claims list
//           } catch (error) {
//             console.error("Delete error:", error);
//             Alert.alert("Error", "Failed to delete one or more claims.");
//           }
//         }
//       }
//     ]
//   );
// };
const handleDelete = async () => {
  if (!selectedClaims || selectedClaims.length === 0) {
    console.warn("No claims selected for deletion.");
    return;
  }

  console.log("Delete button pressed", selectedClaims);

  // Construct payload in the format your API expects
  const deletePayload = selectedClaims.map((claimId) => ({
    company_id: "durr", // Replace with dynamic value if needed
    claim_id: claimId,
    is_deleted: "True"
  }));

  try {
    const response = await axios.delete(
      `${BASEPATH}v1/client/ocr_inserts/claims_delete/`,
      {
        data: {
          delete_claims: deletePayload
        }
      }
    );

    console.log("Delete successful", response.data);

    // Optional: Clear selected claims, refetch list, or show success message
    setSelectedClaims([]);
    // refreshData(); // if you have a function to reload data
  } catch (error) {
    console.error("Error deleting claims:", error);
  }
};

  return (
   <TouchableWithoutFeedback
   onPress={() => {
    setDateOpen(false);
    setStatusOpen(false);
    setAmountOpen(false);
    Keyboard.dismiss;
   }}
   >
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Claims</Text>
        {/*<TouchableOpacity  onPress={handleNotification} >
          <Icon name="notifications-outline" size={24} color={theme.text} />
        </TouchableOpacity>*/}
      </View>
      <View style={[styles.searchBar,{ color: theme.text },{ backgroundColor: theme.background }]}>
        <Icon name="search" size={20} color="#888" style={[styles.searchIcon,{ color: theme.text },{ backgroundColor: theme.background }]} />
        <TextInput
          style={[styles.searchInput, { color: theme.text },{ backgroundColor: theme.background }]}
          placeholder="Search Claims"
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      <View style={[styles.filterRow, { color: theme.text },{ backgroundColor: theme.background }]}>
        <View style={[styles.dropdownWrapper, { color: theme.text },{ backgroundColor: theme.background }]}>
          <DropDownPicker
            open={dateOpen}
            value={null}
            items={dateItems}
            setOpen={setDateOpen}
            setValue={setDateValue}
            setItems={() => {}}
            placeholder="Date"
            style={[styles.dropdown,{ color: theme.text },{ backgroundColor: theme.background }]}
            textStyle={[styles.dropdownText,{ color: theme.text }]}
            dropDownContainerStyle={[styles.dropdownContainer,{ color: theme.text },{ backgroundColor: theme.background }]}
            zIndex={3000}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={statusOpen}
            value={null}
            items={statusItems}
            setOpen={setStatusOpen}
            setValue={setStatusValue}
            setItems={() => {}}
            placeholder="Status"
            style={[styles.dropdown,{ color: theme.text },{ backgroundColor: theme.background }]}
            textStyle={[styles.dropdownText,{ color: theme.text }]}
            dropDownContainerStyle={[styles.dropdownContainer,{ color: theme.text },{ backgroundColor: theme.background }]}
            zIndex={2000}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={amountOpen}
            value={null}
            items={amountItems}
            setOpen={setAmountOpen}
            setValue={setAmountValue}
            setItems={() => {}}
            placeholder="Amount"
            style={[styles.dropdown,{ color: theme.text },{ backgroundColor: theme.background }]}
            textStyle={[styles.dropdownText,{ color: theme.text }]}
            dropDownContainerStyle={[styles.dropdownContainer,{ color: theme.text },{ backgroundColor: theme.background }]}
            zIndex={1000}
          />
        </View>
      </View>

      {claims.length === 0 ? (
        <Text style={{ padding: 20, textAlign: 'center', color: theme.text }}>
          No claims found.
        </Text>
      ) : (
        <FlatList
          data={claims}
          keyExtractor={item => item.claim_id.toString()}
          renderItem={renderClaim}
        />
      )}
<View style={styles.buttonRow}>
  
      <TouchableOpacity style={styles.addClaimButton} onPress={handleNewClaim}>
        <Text style={styles.addClaimText}>Add New Claim</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.updateButton}>
     <Text style={styles.updateText}>Update</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
     <Text style={styles.deleteText}>Delete</Text>
  </TouchableOpacity> */}
  <TouchableOpacity style={styles.advanceButton}>
    <Text style={styles.advanceText}>Request Advance</Text>
  </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  claimItem: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  claimContent: { 
    flex: 1 
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
  // statusBadge: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 15,
  // },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#eee', // fallback
  },
  statusText: { 
    color: '#FFFFFF', 
    fontSize: 12,
    textTransform:'capitalize',
    fontWeight: '600',
  },
  dateText: { 
    color: '#666', 
    marginTop: 5 
  },
  amountText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  buttonRow:{
    flexDirection:'row'
  },
  addClaimButton: {
    backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    width:"40%",
    borderRadius: 10,
    alignItems: 'center',
    marginLeft:20,
  },
  addClaimText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  advanceButton:{
    //backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    width:"40%",
    borderRadius: 10,
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#7E8356',
    marginRight:20,
  },
  advanceText:{
    color:'#7E8356',
    fontWeight:'bold',
  },
  updateButton:{
    borderRadius:10,
    backgroundColor: '#7E8356',
    padding: 15,
    margin: 10,
    width:"20%",
    alignItems: 'center',
  },
  updateText:{
    color:'#FFFFFF',
    fontWeight:'bold',
  },
  deleteButton:{
    borderRadius:10,
    padding:15,
    margin:10,
    width:'20%',
    backgroundColor:'#7E8356',
    alignItems:'center',
  },
  deleteText:{
    color:'#FFFFFF',
    fontWeight:'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#fff',
    width:'90%',
    marginLeft:20
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
    marginBottom: 10 
  },
  dropdownWrapper: { 
    flex: 1, 
    marginHorizontal: 5 
  },
  dropdown: { 
    borderColor: '#888', 
    backgroundColor: 'white', 
    minHeight: 40 
  },
  dropdownText: { 
    color: 'black', 
    fontSize: 14 
  },
  dropdownContainer: { 
    backgroundColor: 'white', 
    borderColor: '#888' 
  },
});

export default ClaimsScreen;
