// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text,TouchableOpacity,View, SafeAreaView} from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useTheme } from "../../theme/useTheme";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = ({navigation}) =>{
//   const { theme } = useTheme();

//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getUnreadCount();
//     });

//     getUnreadCount(); 

//     return unsubscribe;
//   }, [navigation]);

//   const getUnreadCount = async () => {
//     const count = await AsyncStorage.getItem('unreadCount');
//     setUnreadCount(parseInt(count || '0', 10));
//   };
//   const handleNotification = () => {
//     navigation.navigate('Notifications');
//    }
   
//   return(
    
//     <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//           <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//             <Text style={[styles.headerTitle, { color: theme.text }]}>Expens ez</Text>
//               <View style={{ position: 'absolute', right: 20, top: 20 }}>
//   <TouchableOpacity onPress={handleNotification}>
//     <Icon name="notifications-outline" size={28} color={theme.text} />
//     {unreadCount > 0 && (
//       <View
//         style={{
//           position: 'absolute',
//           top: -4,
//           right: -4,
//           backgroundColor: 'red',
//           borderRadius: 10,
//           width: 18,
//           height: 18,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ color: theme.text, fontSize: 10, fontWeight: 'bold' }}>
//           {unreadCount}
//         </Text>
//       </View>
//     )}
//   </TouchableOpacity>
// </View>
// </View>
// <View>
  
// </View>
     
//     </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1 
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//   },
//   headerTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold' 
//   },
// })
// export default HomeScreen;


// // import React, { useState, useEffect } from 'react';
// // import {
// //   SafeAreaView,
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   ScrollView,
// // } from 'react-native';
// // import { LineChart } from 'react-native-chart-kit';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // const HomeScreen = () => {
// //   // Dynamic data state
// //   const [userData, setUserData] = useState({
// //     name: '',
// //     greeting: '',
// //   });
  
// //   const [claimStats, setClaimStats] = useState({
// //     approvalRate: 0,
// //     approvalTrend: 'up', // 'up' or 'down'
// //     dealRate: 0,
// //     dealTrend: 'down', // 'up' or 'down'
// //     claimThisMonth: 0,
// //     claimTrend: 0,
// //   });
  
// //   const [chartData, setChartData] = useState({
// //     labels: [],
// //     approvedData: [],
// //     rejectedData: [],
// //     totalAmount: 0,
// //     currentMonth: '',
// //   });
  
// //   const [notifications, setNotifications] = useState(0);

// //   // Mock data loading (simulate API fetch)
// //   useEffect(() => {
// //     // Simulate API delay
// //     const loadData = setTimeout(() => {
// //       // User data
// //       setUserData({
// //         name: 'Manoj Kumar',
// //         greeting: getGreeting(),
// //       });
      
// //       // Stats data
// //       setClaimStats({
// //         approvalRate: 68,
// //         approvalTrend: 'up',
// //         dealRate: 40,
// //         dealTrend: 'down',
// //         claimThisMonth: 10254,
// //         claimTrend: 2.5,
// //       });
      
// //       // Chart data
// //       setChartData({
// //         labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
// //         approvedData: [400, 450, 480, 500, 550, 500],
// //         rejectedData: [200, 250, 300, 200, 180, 220],
// //         totalAmount: 20000,
// //         currentMonth: 'August',
// //       });
      
// //       // Notifications
// //       setNotifications(3);
// //     }, 1000);
    
// //     return () => clearTimeout(loadData);
// //   }, []);
  
// //   // Helper function to get appropriate greeting based on time of day
// //   const getGreeting = () => {
// //     const hour = new Date().getHours();
// //     if (hour < 12) return 'Good Morning';
// //     if (hour < 18) return 'Good Afternoon';
// //     return 'Good Evening';
// //   };

// //   // Format number with commas
// //   const formatNumber = (num) => {
// //     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.logo}>Expense EZ Logo</Text>
// //         <View style={styles.notificationContainer}>
// //           <Icon name="bell" size={24} color="#000" />
// //           {notifications > 0 && (
// //             <View style={styles.notificationBadge}>
// //               <Text style={styles.notificationText}>{notifications}</Text>
// //             </View>
// //           )}
// //         </View>
// //       </View>
      
// //       <ScrollView>
// //         {/* User Greeting Card */}
// //         <View style={styles.greetingCard}>
// //           <Text style={styles.greeting}>{userData.greeting}</Text>
// //           <Text style={styles.userName}>{userData.name}</Text>
// //           <Text style={styles.subGreeting}>Have a delightful day!</Text>
// //         </View>
        
// //         {/* Claims Section */}
// //         <View style={styles.claimsContainer}>
// //           <Text style={styles.sectionTitle}>Claims</Text>
          
// //           {/* Legend */}
// //           <View style={styles.legendContainer}>
// //             <View style={styles.legendItem}>
// //               <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
// //               <Text>Approved</Text>
// //             </View>
// //             <View style={styles.legendItem}>
// //               <View style={[styles.legendDot, { backgroundColor: '#34A853' }]} />
// //               <Text>Rejected</Text>
// //             </View>
// //           </View>
          
// //           {/* Chart */}
// //           <View style={styles.chartContainer}>
// //             <LineChart
// //               data={{
// //                 labels: chartData.labels,
// //                 datasets: [
// //                   {
// //                     data: chartData.approvedData,
// //                     color: () => '#4285F4',
// //                     strokeWidth: 2,
// //                   },
// //                   {
// //                     data: chartData.rejectedData,
// //                     color: () => '#34A853',
// //                     strokeWidth: 2,
// //                   },
// //                 ],
// //               }}
// //               width={Dimensions.get('window').width - 40}
// //               height={220}
// //               chartConfig={{
// //                 backgroundColor: '#fff',
// //                 backgroundGradientFrom: '#fff',
// //                 backgroundGradientTo: '#fff',
// //                 decimalPlaces: 0,
// //                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// //                 labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// //                 style: {
// //                   borderRadius: 16,
// //                 },
// //                 propsForDots: {
// //                   r: '6',
// //                   strokeWidth: '2',
// //                   stroke: '#fff',
// //                 },
// //               }}
// //               bezier
// //               style={styles.chart}
// //               withDots={false}
// //               withInnerLines={false}
// //               withOuterLines={false}
// //               fromZero
// //               withShadow={false}
// //             />
            
// //             {/* Amount Badge */}
// //             <View style={styles.amountBadge}>
// //               <Text style={styles.amountText}>₹ {formatNumber(chartData.totalAmount)}</Text>
// //               <Text style={styles.amountMonth}>{chartData.currentMonth}</Text>
// //             </View>
// //           </View>
          
// //           {/* Stats */}
// //           <View style={styles.statsContainer}>
// //             <View style={styles.statCard}>
// //               <View style={styles.statIconContainer}>
// //                 <Icon name="check-circle" size={24} color="#4285F4" />
// //               </View>
// //               <View style={styles.statContent}>
// //                 <View style={styles.statHeader}>
// //                   <Text style={styles.statValue}>{claimStats.approvalRate}%</Text>
// //                   <View style={styles.trendContainer}>
// //                     <Icon
// //                       name={claimStats.approvalTrend === 'up' ? 'arrow-up' : 'arrow-down'}
// //                       size={16}
// //                       color={claimStats.approvalTrend === 'up' ? '#34A853' : '#EA4335'}
// //                     />
// //                   </View>
// //                 </View>
// //                 <Text style={styles.statLabel}>Approved this year</Text>
// //               </View>
// //             </View>
            
// //             <View style={styles.statCard}>
// //               <View style={styles.statIconContainer}>
// //                 <Icon name="file-document" size={24} color="#34A853" />
// //               </View>
// //               <View style={styles.statContent}>
// //                 <View style={styles.statHeader}>
// //                   <Text style={styles.statValue}>{claimStats.dealRate}%</Text>
// //                   <View style={styles.trendContainer}>
// //                     <Icon
// //                       name={claimStats.dealTrend === 'up' ? 'arrow-up' : 'arrow-down'}
// //                       size={16}
// //                       color={claimStats.dealTrend === 'up' ? '#34A853' : '#EA4335'}
// //                     />
// //                   </View>
// //                 </View>
// //                 <Text style={styles.statLabel}>Deals this year</Text>
// //               </View>
// //             </View>
// //           </View>
          
// //           {/* Monthly Claim */}
// //           <View style={styles.monthlyClaim}>
// //             <View>
// //               <Text style={styles.monthlyClaimValue}>{formatNumber(claimStats.claimThisMonth)}</Text>
// //               <View style={styles.claimTrendContainer}>
// //                 <Text style={[
// //                   styles.claimTrendValue,
// //                   { color: claimStats.claimTrend > 0 ? '#34A853' : '#EA4335' }
// //                 ]}>
// //                   {claimStats.claimTrend}%
// //                 </Text>
// //                 <Icon
// //                   name={claimStats.claimTrend > 0 ? 'arrow-up' : 'arrow-down'}
// //                   size={16}
// //                   color={claimStats.claimTrend > 0 ? '#34A853' : '#EA4335'}
// //                 />
// //               </View>
// //             </View>
// //             <Text style={styles.monthlyClaimLabel}>Claim this month</Text>
            
// //             {/* Mini chart */}
// //             <View style={styles.miniChart}>
// //               <View style={styles.miniChartLine} />
// //             </View>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f7f9fc',
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //     backgroundColor: '#fff',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#f0f0f0',
// //   },
// //   logo: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   notificationContainer: {
// //     position: 'relative',
// //   },
// //   notificationBadge: {
// //     position: 'absolute',
// //     top: -5,
// //     right: -5,
// //     backgroundColor: 'red',
// //     borderRadius: 10,
// //     width: 20,
// //     height: 20,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   notificationText: {
// //     color: '#fff',
// //     fontSize: 12,
// //     fontWeight: 'bold',
// //   },
// //   greetingCard: {
// //     margin: 20,
// //     padding: 20,
// //     backgroundColor: '#111',
// //     borderRadius: 16,
// //   },
// //   greeting: {
// //     color: '#fff',
// //     opacity: 0.7,
// //     fontSize: 14,
// //   },
// //   userName: {
// //     color: '#fff',
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginVertical: 5,
// //   },
// //   subGreeting: {
// //     color: '#fff',
// //     opacity: 0.7,
// //     fontSize: 14,
// //   },
// //   claimsContainer: {
// //     margin: 20,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //     borderRadius: 16,
// //   },
// //   sectionTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 15,
// //   },
// //   legendContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 10,
// //   },
// //   legendItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginRight: 20,
// //   },
// //   legendDot: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 5,
// //     marginRight: 5,
// //   },
// //   chartContainer: {
// //     position: 'relative',
// //     marginVertical: 10,
// //     alignItems: 'center',
// //   },
// //   chart: {
// //     borderRadius: 16,
// //     paddingRight: 0,
// //   },
// //   amountBadge: {
// //     position: 'absolute',
// //     top: '40%',
// //     backgroundColor: '#fff',
// //     paddingVertical: 8,
// //     paddingHorizontal: 12,
// //     borderRadius: 20,
// //     elevation: 5,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //   },
// //   amountText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   amountMonth: {
// //     fontSize: 12,
// //     textAlign: 'center',
// //     color: '#666',
// //   },
// //   statsContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginVertical: 15,
// //   },
// //   statCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: '48%',
// //   },
// //   statIconContainer: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     backgroundColor: '#f0f0f0',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginRight: 10,
// //   },
// //   statContent: {
// //     flex: 1,
// //   },
// //   statHeader: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   statValue: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   trendContainer: {
// //     marginLeft: 5,
// //   },
// //   statLabel: {
// //     fontSize: 12,
// //     color: '#666',
// //   },
// //   monthlyClaim: {
// //     marginTop: 10,
// //     paddingTop: 15,
// //     borderTopWidth: 1,
// //     borderTopColor: '#f0f0f0',
// //   },
// //   monthlyClaimValue: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //   },
// //   claimTrendContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   claimTrendValue: {
// //     fontSize: 12,
// //     marginRight: 2,
// //   },
// //   monthlyClaimLabel: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginTop: 5,
// //   },
// //   miniChart: {
// //     height: 30,
// //     marginTop: 10,
// //     justifyContent: 'center',
// //   },
// //   miniChartLine: {
// //     height: 2,
// //     backgroundColor: '#f0f0f0',
// //     position: 'relative',
// //   },
// // });

// // export default HomeScreen;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { LineChart } from 'react-native-chart-kit';
// import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASEPATH } from '../config';
// const screenWidth = Dimensions.get('window').width;

// const HomeScreen = () => {
//   const [claims, setClaims] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState(null);

//   const fetchClaims = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//     if (!emp_id || !company_id) {
//       throw new Error('Missing emp_id or company_id in AsyncStorage');
//     }

//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data = response.data.claims || [];
//       setClaims(data);
//       processChartData(data);
//     } catch (error) {
//       console.error('Error fetching claims:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processChartData = (claims) => {
//     const months = Array.from({ length: 12 }, (_, i) =>
//       moment().month(i).format('MMM')
//     );

//     const initialCounts = () =>
//       months.reduce((acc, m) => {
//         acc[m] = 0;
//         return acc;
//       }, {});

//     const approvedCounts = initialCounts();
//     const pendingCounts = initialCounts();
//     const rejectedCounts = initialCounts();

//     claims.forEach((claim) => {
//       const dateStr = claim.submitted_date;
//       const status = claim.status_of_approval || 'pending';
//       const month = moment(dateStr).format('MMM');

//       if (approvedCounts[month] !== undefined) {
//         if (status === 'approved') approvedCounts[month]++;
//         else if (status === 'pending') pendingCounts[month]++;
//         else if (status === 'rejected') rejectedCounts[month]++;
//       }
//     });

//     setChartData({
//       labels: months,
//       datasets: [
//         {
//           data: months.map((m) => approvedCounts[m]),
//           color: () => '#4CAF50',
//           strokeWidth: 2,
//           legend: 'Approved',
//         },
//         {
//           data: months.map((m) => pendingCounts[m]),
//           color: () => '#FFC107',
//           strokeWidth: 2,
//           legend: 'Pending',
//         },
//         {
//           data: months.map((m) => rejectedCounts[m]),
//           color: () => '#F44336',
//           strokeWidth: 2,
//           legend: 'Rejected',
//         },
//       ],
//       legend: ['Approved', 'Pending', 'Rejected'],
//     });
//   };

//   useEffect(() => {
//     fetchClaims();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Monthly Claim Status</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#000" />
//       ) : chartData ? (
//         <LineChart
//           data={chartData}
//           width={screenWidth - 32}
//           height={280}
//           yAxisLabel=""
//           yAxisSuffix=""
//           chartConfig={{
//             backgroundColor: '#fff',
//             backgroundGradientFrom: '#f2f2f2',
//             backgroundGradientTo: '#f2f2f2',
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             labelColor: () => '#000',
//             propsForDots: {
//               r: '5',
//               strokeWidth: '2',
//               stroke: '#fff',
//             },
//           }}
//           bezier
//           style={styles.chart}
//         />
//       ) : (
//         <Text style={styles.noData}>No claim data available.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   chart: {
//     marginVertical: 8,
//     borderRadius: 12,
//   },
//   noData: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default HomeScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import axios from 'axios';
// import moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASEPATH } from '../config';

// const screenWidth = Dimensions.get('window').width;

// const HomeScreen = () => {
//   const [claims, setClaims] = useState([]);
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchClaims = async () => {
//     try {
//            const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//     if (!emp_id || !company_id) {
//       throw new Error('Missing emp_id or company_id in AsyncStorage');
//     }

//       const res = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const claimList = res.data.claims;

//       setClaims(claimList);
//       generateChart(claimList);
//     } catch (error) {
//       console.error('Error fetching claims:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateChart = (claimList) => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     // Initialize counts
//     const approved = Array(12).fill(0);
//     const rejected = Array(12).fill(0);

//     claimList.forEach(claim => {
//       const monthIndex = moment(claim.submitted_date).month(); // 0-based
//       if (claim.status_of_approval === 'approved') {
//         approved[monthIndex]++;
//       } else if (claim.status_of_approval === 'rejected') {
//         rejected[monthIndex]++;
//       }
//     });

//     setChartData({
//       labels: months,
//       datasets: [
//         {
//           data: approved,
//           color: () => '#2563EB',
//           strokeWidth: 2,
//         },
//         {
//           data: rejected,
//           color: () => '#10B981',
//           strokeWidth: 2,
//         },
//       ],
//       legend: ['Approved', 'Rejected'],
//     });
//   };

//   useEffect(() => {
//     fetchClaims();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Claims Overview</Text>

//       {chartData && (
//         <LineChart
//           data={chartData}
//           width={screenWidth - 32}
//           height={220}
//           withVerticalLines={false}
//           withHorizontalLines={true}
//           chartConfig={{
//             backgroundColor: '#fff',
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
//             labelColor: () => '#6B7280',
//             propsForDots: {
//               r: '4',
//               strokeWidth: '2',
//               stroke: '#fff',
//             },
//           }}
//           bezier
//           style={{ borderRadius: 16 }}
//         />
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F9FAFB',
//     padding: 16,
//     flex: 1,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator, TouchableOpacity
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASEPATH } from '../config';
// import axios from 'axios';
// import { useTheme } from "../../theme/useTheme";
// const HomeScreen = ({navigation}) => {
//   const { theme } = useTheme();

//     const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getUnreadCount();
//     });

//     getUnreadCount(); 

//     return unsubscribe;
//   }, [navigation]);

//   const getUnreadCount = async () => {
//     const count = await AsyncStorage.getItem('unreadCount');
//     setUnreadCount(parseInt(count || '0', 10));
//   };
//   const handleNotification = () => {
//     navigation.navigate('Notifications');
//    }
//  // All data states with empty initial values
//   const [userData, setUserData] = useState({
//     name: '',
//     greeting: '',
//   });
  
//   const [claimStats, setClaimStats] = useState({
//     approvalRate: 0,
//     approvalTrend: '',
//     dealRate: 0,
//     dealTrend: '',
//     claimThisMonth: 0,
//     claimTrend: 0,
//   });
  
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     highlightedMonth: '',
//     highlightedAmount: 0,
//     isLoading: true,
//     error: null
//   });
  
//   //const [notifications, setNotifications] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Load all data on component mount
//   useEffect(() => {
//     // Get greeting based on time of day
//     const hour = new Date().getHours();
//     let greeting = '';
//     if (hour < 12) greeting = 'Good Morning';
//     else if (hour < 18) greeting = 'Good Afternoon';
//     else greeting = 'Good Evening';
    
//     // Fetch user data
//     fetchUserData(greeting);
    
//     // Fetch claims data for chart and stats
//     fetchClaimsData();
    
//     // Fetch notifications
//     //fetchNotifications();
//   }, []);

//   // Fetch user data
//   const fetchUserData = async (greeting) => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//     if (!emp_id || !company_id) {
//       throw new Error('Missing emp_id or company_id in AsyncStorage');
//     }

//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data =  response.data;
      
//       setUserData({
//         name: data.name || 'User', 
//         greeting: greeting,
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Set fallback values in case of error
//       setUserData({
//         name: 'User',
//         greeting: greeting,
//       });
//     }
//   };

//   // Fetch and process claims data
//   const fetchClaimsData = async () => {
//     try {
//        const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//     if (!emp_id || !company_id) {
//       throw new Error('Missing emp_id or company_id in AsyncStorage');
//     }

//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data =  response.data;
      
//       // Process claims data for chart
//       const processedChartData = processClaimsChartData(data.claims);
//       setChartData({
//         ...processedChartData,
//         isLoading: false,
//         error: null
//       });
      
//       // Process claims data for statistics
//       const processedStatsData = processClaimsStats(data.claims);
//       setClaimStats(processedStatsData);
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching claims data:', error);
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: 'Failed to load claims data'
//       }));
//       setLoading(false);
//     }
//   };

//   // Fetch notifications
//   // const fetchNotifications = async () => {
//   //   try {
//   //     // Replace with your actual API endpoint
//   //     const response = await fetch('YOUR_API_ENDPOINT/notifications');
//   //     const data = await response.json();
      
//   //     setNotifications(data.unread_count || 0);
//   //   } catch (error) {
//   //     console.error('Error fetching notifications:', error);
//   //     // Default to zero if fetch fails
//   //     setNotifications(0);
//   //   }
//   // };

//   // Process raw claims data into chart-friendly format
//   const processClaimsChartData = (claims) => {
//     // Initialize data structure to track monthly amounts by status
//     const monthlyData = {};
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
//     // Get current month for highlighting
//     const currentDate = new Date();
//     const currentMonth = months[currentDate.getMonth()];
    
//     // Initialize month data
//     months.forEach(month => {
//       monthlyData[month] = {
//         approved: 0,
//         rejected: 0,
//         pending: 0
//       };
//     });
    
//     // Calculate total amount for each month by status
//     claims && claims.forEach(claim => {
//       if (claim.submitted_date) {
//         const date = new Date(claim.submitted_date);
//         const month = months[date.getMonth()];
        
//         // Add amount to appropriate status category
//         if (claim.status_of_approval === 'approved') {
//           monthlyData[month].approved += Number(claim.claim_amount || 0);
//         } else if (claim.status_of_approval === 'rejected') {
//           monthlyData[month].rejected += Number(claim.claim_amount || 0);
//         } else {
//           // Assuming anything not approved or rejected is pending
//           monthlyData[month].pending += Number(claim.claim_amount || 0);
//         }
//       }
//     });
    
//     // Get last 6 months for display
//     const lastSixMonths = getLastSixMonths(months, currentDate.getMonth());
    
//     // Extract the data for chart
//     const approvedData = lastSixMonths.map(month => monthlyData[month].approved / 1000); // Convert to thousands for better display
//     const rejectedData = lastSixMonths.map(month => monthlyData[month].rejected / 1000);
//     const pendingData = lastSixMonths.map(month => monthlyData[month].pending / 1000);
    
//     // Get current month total for highlight badge
//     const currentMonthTotal = monthlyData[currentMonth].approved + 
//                              monthlyData[currentMonth].rejected + 
//                              monthlyData[currentMonth].pending;
    
//     return {
//       labels: lastSixMonths,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
//       highlightedMonth: currentMonth,
//       highlightedAmount: currentMonthTotal
//     };
//   };
  
//   // Process claims data for statistics
//   const processClaimsStats = (claims) => {
//     if (!claims || !claims.length) {
//       return {
//         approvalRate: 0,
//         approvalTrend: 'up',
//         dealRate: 0,
//         dealTrend: 'down',
//         claimThisMonth: 0,
//         claimTrend: 0
//       };
//     }
    
//     // Calculate approval rate
//     const totalClaims = claims.length;
//     const approvedClaims = claims.filter(claim => claim.status_of_approval === 'approved').length;
//     const approvalRate = Math.round((approvedClaims / totalClaims) * 100);
    
//     // Calculate deal rate (assuming deals are a subset of approved claims with certain criteria)
//     // This is a placeholder calculation - replace with your actual business logic
//     const dealClaims = claims.filter(claim => {
//       return claim.status_of_approval === 'approved' && 
//              Number(claim.claim_amount) > 50000; // Example criterion
//     }).length;
//     const dealRate = Math.round((dealClaims / totalClaims) * 100);
    
//     // Calculate current month claims
//     const currentDate = new Date();
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
    
//     const thisMonthClaims = claims.filter(claim => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return claimDate.getFullYear() === currentYear && 
//              claimDate.getMonth() === currentMonth;
//     }).length;
    
//     // Calculate trend (comparing to previous month)
//     const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
//     const prevMonthClaims = claims.filter(claim => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return claimDate.getFullYear() === prevYear && 
//              claimDate.getMonth() === prevMonth;
//     }).length;
    
//     // Calculate trend percentage
//     let claimTrend = 0;
//     if (prevMonthClaims > 0) {
//       claimTrend = Math.round(((thisMonthClaims - prevMonthClaims) / prevMonthClaims) * 100 * 10) / 10;
//     }
    
//     return {
//       approvalRate,
//       approvalTrend: 'up', // This should be calculated based on historical data
//       dealRate,
//       dealTrend: 'down', // This should be calculated based on historical data
//       claimThisMonth: thisMonthClaims,
//       claimTrend
//     };
//   };
  
//   // Helper function to get last N months
//   const getLastSixMonths = (months, currentMonthIndex) => {
//     const result = [];
//     for (let i = 5; i >= 0; i--) {
//       const monthIndex = (currentMonthIndex - i + 12) % 12;
//       result.push(months[monthIndex]);
//     }
//     return result;
//   };

//   // Format number with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//       </View>
//     );
//   }

//   return (
//      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
//           <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
//              <Text style={[styles.headerTitle, { color: theme.text }]}>Expens ez</Text>
//               <View style={{ position: 'absolute', right: 20, top: 20 }}>
//   <TouchableOpacity onPress={handleNotification}>
//   <Icon name="notifications-outline" size={28} color={theme.text} />
//      {unreadCount > 0 && (
//       <View
//         style={{
//           position: 'absolute',
//           top: -4,
//           right: -4,
//           backgroundColor: 'red',
//           borderRadius: 10,
//           width: 18,
//           height: 18,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ color: theme.text, fontSize: 10, fontWeight: 'bold' }}>
//           {unreadCount}
//         </Text>
//       </View>
//     )}
//   </TouchableOpacity>
// </View>
// </View>
// <View>
  
// </View>
      
//       <ScrollView>
//         {/* User Greeting Card */}
//         <View style={styles.greetingCard}>
//           <Text style={styles.greeting}>{userData.greeting}</Text>
//           <Text style={styles.userName}>{userData.name}</Text>
//           <Text style={styles.subGreeting}>Have a delightful day!</Text>
//         </View>
        
//         {/* Claims Section */}
//         <View style={styles.claimsContainer}>
//           <Text style={styles.sectionTitle}>Claims</Text>
          
//           {/* Legend */}
//           <View style={styles.legendContainer}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//               <Text>Approved</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#34A853' }]} />
//               <Text>Rejected</Text>
//             </View>
//           </View>
          
//           {/* Chart - Render only if data is loaded */}
//           {!chartData.isLoading && !chartData.error && (
//             <View style={styles.chartContainer}>
//               <LineChart
//                 data={{
//                   labels: chartData.labels,
//                   datasets: [
//                     {
//                       data: chartData.approved,
//                       color: () => '#4285F4',
//                       strokeWidth: 2,
//                     },
//                     {
//                       data: chartData.rejected,
//                       color: () => '#34A853',
//                       strokeWidth: 2,
//                     },
//                   ],
//                 }}
//                 width={Dimensions.get('window').width - 60}
//                 height={220}
//                 chartConfig={{
//                   backgroundColor: '#fff',
//                   backgroundGradientFrom: '#fff',
//                   backgroundGradientTo: '#fff',
//                   decimalPlaces: 0,
//                   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   style: {
//                     borderRadius: 16,
//                   },
//                   propsForDots: {
//                     r: '6',
//                     strokeWidth: '2',
//                     stroke: '#fff',
//                   },
//                 }}
//                 bezier
//                 style={styles.chart}
//                 withDots={false}
//                 withInnerLines={false}
//                 withOuterLines={false}
//                 fromZero
//                 withShadow={false}
//               />
              
//               {/* Amount Badge */}
//               <View style={styles.amountBadge}>
//                 <Text style={styles.amountText}>₹ {formatNumber(chartData.highlightedAmount)}</Text>
//                 <Text style={styles.amountMonth}>{chartData.highlightedMonth}</Text>
//               </View>
//             </View>
//           )}
          
//           {/* Show error message if data loading failed */}
//           {chartData.error && (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>{chartData.error}</Text>
//             </View>
//           )}
          
//           {/* Stats */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statCard}>
//               <View style={styles.statIconContainer}>
//                 <Icon name="check-circle" size={24} color="#4285F4" />
//               </View>
//               <View style={styles.statContent}>
//                 <View style={styles.statHeader}>
//                   <Text style={styles.statValue}>{claimStats.approvalRate}%</Text>
//                   <View style={styles.trendContainer}>
//                     <Icon
//                       name={claimStats.approvalTrend === 'up' ? 'arrow-up' : 'arrow-down'}
//                       size={16}
//                       color={claimStats.approvalTrend === 'up' ? '#34A853' : '#EA4335'}
//                     />
//                   </View>
//                 </View>
//                 <Text style={styles.statLabel}>Approved this year</Text>
//               </View>
//             </View>
            
//             <View style={styles.statCard}>
//               <View style={styles.statIconContainer}>
//                 <Icon name="file-document" size={24} color="#34A853" />
//               </View>
//               <View style={styles.statContent}>
//                 <View style={styles.statHeader}>
//                   <Text style={styles.statValue}>{claimStats.dealRate}%</Text>
//                   <View style={styles.trendContainer}>
//                     <Icon
//                       name={claimStats.dealTrend === 'up' ? 'arrow-up' : 'arrow-down'}
//                       size={16}
//                       color={claimStats.dealTrend === 'up' ? '#34A853' : '#EA4335'}
//                     />
//                   </View>
//                 </View>
//                 <Text style={styles.statLabel}>Deals this year</Text>
//               </View>
//             </View>
//           </View>
          
//           {/* Monthly Claim */}
//           <View style={styles.monthlyClaim}>
//             <View>
//               <Text style={styles.monthlyClaimValue}>{formatNumber(claimStats.claimThisMonth)}</Text>
//               <View style={styles.claimTrendContainer}>
//                 <Text style={[
//                   styles.claimTrendValue,
//                   { color: claimStats.claimTrend >= 0 ? '#34A853' : '#EA4335' }
//                 ]}>
//                   {Math.abs(claimStats.claimTrend)}%
//                 </Text>
//                 <Icon
//                   name={claimStats.claimTrend >= 0 ? 'arrow-up' : 'arrow-down'}
//                   size={16}
//                   color={claimStats.claimTrend >= 0 ? '#34A853' : '#EA4335'}
//                 />
//               </View>
//             </View>
//             <Text style={styles.monthlyClaimLabel}>Claim this month</Text>
            
//             {/* Mini chart */}
//             <View style={styles.miniChart}>
//               <View style={styles.miniChartLine} />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f9fc',
//   },
//   //   container: { 
// //     flex: 1 
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     padding: 15,
// //   },
// //   headerTitle: { 
// //     fontSize: 20, 
// //     fontWeight: 'bold' 
// //   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   notificationContainer: {
//     position: 'relative',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   greetingCard: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#111',
//     borderRadius: 16,
//   },
//   greeting: {
//     color: '#fff',
//     opacity: 0.7,
//     fontSize: 14,
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   subGreeting: {
//     color: '#fff',
//     opacity: 0.7,
//     fontSize: 14,
//   },
//   claimsContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     position: 'relative',
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   chart: {
//     borderRadius: 16,
//     paddingRight: 0,
//   },
//   amountBadge: {
//     position: 'absolute',
//     top: '40%',
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   amountText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   amountMonth: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#666',
//   },
//   errorContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: '#EA4335',
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 15,
//   },
//   // statCard: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   width: '48%',
//   // },
//   statCard: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#f2f2f2',
//   borderRadius: 12,
//   padding: 10,
//   flex: 1,
//   marginRight: 10,
// },

//   statIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   statContent: {
//     flex: 1,
//   },
//   statHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   trendContainer: {
//     marginLeft: 5,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//   },
//   monthlyClaim: {
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   monthlyClaimValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   claimTrendContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   claimTrendValue: {
//     fontSize: 12,
//     marginRight: 2,
//   },
//   monthlyClaimLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   miniChart: {
//     height: 30,
//     marginTop: 10,
//     justifyContent: 'center',
//   },
//   miniChartLine: {
//     height: 2,
//     backgroundColor: '#f0f0f0',
//     position: 'relative',
//   },
// });

// export default HomeScreen;


// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator, 
//   TouchableOpacity
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useTheme } from 'react-native-paper';
// import IonIcon from 'react-native-vector-icons/Ionicons';

// const HomeScreen = ({navigation}) => {
//    const { theme } = useTheme();
//    const [unreadCount, setUnreadCount] = useState(0);
//      useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getUnreadCount();
//     });

//     getUnreadCount(); 

//     return unsubscribe;
//   }, [navigation]);

//   const getUnreadCount = async () => {
//     const count = await AsyncStorage.getItem('unreadCount');
//     setUnreadCount(parseInt(count || '0', 10));
//   };
//   const handleNotification = () => {
//     navigation.navigate('Notifications');
//    }
//   const [userData, setUserData] = useState({
//     name: '',
//     greeting: '',
//   });
  
//   const [claimStats, setClaimStats] = useState({
//     approvalRate: 0,
//     approvalTrend: '',
//     dealRate: 0,
//     dealTrend: '',
//     claimThisMonth: 0,
//     claimTrend: 0,
//   });
  
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     highlightedMonth: '',
//     highlightedAmount: 0,
//     isLoading: true,
//     error: null
//   });
  
  
//   const [loading, setLoading] = useState(true);

//   // Load all data on component mount
//   useEffect(() => {
//     // Get greeting based on time of day
//     const hour = new Date().getHours();
//     let greeting = '';
//     if (hour < 12) greeting = 'Good Morning';
//     else if (hour < 18) greeting = 'Good Afternoon';
//     else greeting = 'Good Evening';
    
//     // Fetch user data
//     fetchUserData(greeting);
    
//     // Fetch claims data for chart and stats
//     fetchClaimsData();
    
   
    
//   }, []);

//   // Fetch user data
//   const fetchUserData = async (greeting) => {
//     try {
//            const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//      if (!emp_id || !company_id) {
//        throw new Error('Missing emp_id or company_id in AsyncStorage');
//      }

//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data = response.data;
      
//       setUserData({
//         name: data.name || 'User', // Fallback if name is not provided
//         greeting: greeting,
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Set fallback values in case of error
//       setUserData({
//         name: 'User',
//         greeting: greeting,
//       });
//     }
//   };

//   // Fetch and process claims data
//   const fetchClaimsData = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//     const company_id = await AsyncStorage.getItem('companyname');

//      if (!emp_id || !company_id) {
//        throw new Error('Missing emp_id or company_id in AsyncStorage');
//      }
      
//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data = response.data;
      
//       // Process claims data for chart
//       const processedChartData = processClaimsChartData(data.claims);
//       setChartData({
//         ...processedChartData,
//         isLoading: false,
//         error: null
//       });
      
//       // Process claims data for statistics
//       const processedStatsData = processClaimsStats(data.claims);
//       setClaimStats(processedStatsData);
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching claims data:', error);
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: 'Failed to load claims data'
//       }));
//       setLoading(false);
//     }
//   };

//   // Process raw claims data into chart-friendly format
//   const processClaimsChartData = (claims) => {
//     // Initialize data structure to track monthly amounts by status
//     const monthlyData = {};
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
//     // Get current month for highlighting
//     const currentDate = new Date();
//     const currentMonth = months[currentDate.getMonth()];
    
//     // Initialize month data
//     months.forEach(month => {
//       monthlyData[month] = {
//         approved: 0,
//         rejected: 0,
//         pending: 0
//       };
//     });
    
//     // Calculate total amount for each month by status
//     claims && claims.forEach(claim => {
//       if (claim.submitted_date) {
//         const date = new Date(claim.submitted_date);
//         const month = months[date.getMonth()];
        
//         // Add amount to appropriate status category
//         if (claim.status_of_approval === 'approved') {
//           monthlyData[month].approved += Number(claim.claim_amount || 0);
//         } else if (claim.status_of_approval === 'rejected') {
//           monthlyData[month].rejected += Number(claim.claim_amount || 0);
//         } else {
//           // Assuming anything not approved or rejected is pending
//           monthlyData[month].pending += Number(claim.claim_amount || 0);
//         }
//       }
//     });
    
//     // Get last 6 months for display
//     const lastSixMonths = getLastSixMonths(months, currentDate.getMonth());
    
//     // Extract the data for chart
//     const approvedData = lastSixMonths.map(month => monthlyData[month].approved / 1000); // Convert to thousands for better display
//     const rejectedData = lastSixMonths.map(month => monthlyData[month].rejected / 1000);
//     const pendingData = lastSixMonths.map(month => monthlyData[month].pending / 1000);
    
//     // Get current month total for highlight badge
//     const currentMonthTotal = monthlyData[currentMonth].approved + 
//                              monthlyData[currentMonth].rejected + 
//                              monthlyData[currentMonth].pending;
    
//     return {
//       labels: lastSixMonths,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
//       highlightedMonth: currentMonth,
//       highlightedAmount: currentMonthTotal
//     };
//   };
  
//   // Process claims data for statistics
//   const processClaimsStats = (claims) => {
//     if (!claims || !claims.length) {
//       return {
//         approvalRate: 0,
//         approvalTrend: 'up',
//         dealRate: 0,
//         dealTrend: 'down',
//         claimThisMonth: 0,
//         claimTrend: 0
//       };
//     }
    
//     // Calculate approval rate
//     const totalClaims = claims.length;
//     const approvedClaims = claims.filter(claim => claim.status_of_approval === 'approved').length;
//     const approvalRate = Math.round((approvedClaims / totalClaims) * 100);
    
//     // Calculate deal rate (assuming deals are a subset of approved claims with certain criteria)
//     // This is a placeholder calculation - replace with your actual business logic
//     const dealClaims = claims.filter(claim => {
//       return claim.status_of_approval === 'approved' && 
//              Number(claim.claim_amount) > 50000; // Example criterion
//     }).length;
//     const dealRate = Math.round((dealClaims / totalClaims) * 100);
    
//     // Calculate current month claims
//     const currentDate = new Date();
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
    
//     const thisMonthClaims = claims.filter(claim => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return claimDate.getFullYear() === currentYear && 
//              claimDate.getMonth() === currentMonth;
//     }).length;
    
//     // Calculate trend (comparing to previous month)
//     const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
//     const prevMonthClaims = claims.filter(claim => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return claimDate.getFullYear() === prevYear && 
//              claimDate.getMonth() === prevMonth;
//     }).length;
    
//     // Calculate trend percentage
//     let claimTrend = 0;
//     if (prevMonthClaims > 0) {
//       claimTrend = Math.round(((thisMonthClaims - prevMonthClaims) / prevMonthClaims) * 100 * 10) / 10;
//     }
    
//     return {
//       approvalRate,
//       approvalTrend: 'up', // This should be calculated based on historical data
//       dealRate,
//       dealTrend: 'down', // This should be calculated based on historical data
//       claimThisMonth: thisMonthClaims,
//       claimTrend
//     };
//   };
  
//   // Helper function to get last N months
//   const getLastSixMonths = (months, currentMonthIndex) => {
//     const result = [];
//     for (let i = 5; i >= 0; i--) {
//       const monthIndex = (currentMonthIndex - i + 12) % 12;
//       result.push(months[monthIndex]);
//     }
//     return result;
//   };

//   // Calculate y-axis labels based on data
//   const getYAxisLabels = () => {
//     if (!chartData.approved.length && !chartData.rejected.length) {
//       return [0, 25, 50, 75, 100]; // Default values if no data
//     }
    
//     // Find max value in all datasets
//     const allValues = [...chartData.approved, ...chartData.rejected];
//     const maxValue = Math.max(...allValues, 1); // Ensure at least 1 to avoid division by zero
    
//     // Create 5 evenly spaced labels
//     const step = Math.ceil(maxValue / 4);
//     return [0, step, step * 2, step * 3, Math.ceil(step * 4)];
//   };

//   // Format number with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   // Format y-axis label with K for thousands
//   const formatYLabel = (value) => {
//     return `${value}K`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//       </View>
//     );
//   }

//   return (
//         <SafeAreaView style={[styles.container]}>
//           <View style={[styles.header, ]}>
//             <Text style={[styles.headerTitle, ]}>Expens ez</Text>
//               <View style={{ position: 'absolute', right: 20, top: 20 }}>
//   <TouchableOpacity onPress={handleNotification}>
//     <IonIcon name="notifications-outline" size={28}  />
//     {unreadCount > 0 && (
//       <View
//         style={{
//           position: 'absolute',
//           top: -4,
//           right: -4,
//           backgroundColor: 'red',
//           borderRadius: 10,
//           width: 18,
//           height: 18,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
//           {unreadCount}
//         </Text>
//       </View>
//     )}
//   </TouchableOpacity>
// </View>
// </View>
// <View>
  
// </View>
      
//       <ScrollView>
//         {/* User Greeting Card */}
//         <View style={styles.greetingCard}>
//           <Text style={styles.greeting}>{userData.greeting}</Text>
//           <Text style={styles.userName}>{userData.name}</Text>
//           <Text style={styles.subGreeting}>Have a delightful day!</Text>
//         </View>
        
//         {/* Claims Section */}
//         <View style={styles.claimsContainer}>
//           <Text style={styles.sectionTitle}>Claims</Text>
          
//           {/* Legend */}
//           <View style={styles.legendContainer}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//               <Text>Approved</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#34A853' }]} />
//               <Text>Rejected</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#F29339' }]} />
//               <Text>Pending</Text>
//             </View>
//           </View>
          
//           {/* Chart - Render only if data is loaded */}
//           {!chartData.isLoading && !chartData.error && (
//             <View style={styles.chartContainer}>
//               <LineChart
//                 data={{
//                   labels: chartData.labels,
//                   datasets: [
//                     {
//                       data: chartData.approved.length > 0 ? chartData.approved : [0, 0, 0, 0, 0, 0],
//                       color: () => '#4285F4',
//                       strokeWidth: 2,
//                     },
//                     {
//                       data: chartData.rejected.length > 0 ? chartData.rejected : [0, 0, 0, 0, 0, 0],
//                       color: () => '#34A853',
//                       strokeWidth: 2,
//                     },
//                   ],
//                 }}
//                 width={Dimensions.get('window').width - 60}
//                 height={220}
//                 yAxisLabel=""
//                 yAxisSuffix="K"
//                 yAxisInterval={1}
//                 chartConfig={{
//                   backgroundColor: '#fff',
//                   backgroundGradientFrom: '#fff',
//                   backgroundGradientTo: '#fff',
//                   decimalPlaces: 0,
//                   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   style: {
//                     borderRadius: 16,
//                   },
//                   propsForDots: {
//                     r: '4',
//                     strokeWidth: '2',
//                     stroke: '#fff',
//                   },
//                   propsForBackgroundLines: {
//                     strokeWidth: 1,
//                     stroke: '#e0e0e0',
//                     strokeDasharray: '',
//                   },
//                   propsForVerticalLabels: {
//                     fontSize: 10,
//                     rotation: 0,
//                     fontWeight: 'normal',
//                   },
//                   propsForHorizontalLabels: {
//                     fontSize: 10,
//                     fontWeight: 'normal',
//                   },
//                   // Make sure Y-axis labels are visible
//                   formatYLabel: (value) => `${value}`,
//                 }}
//                 bezier
//                 style={styles.chart}
//                 withDots={true}
//                 withInnerLines={true}
//                 withOuterLines={true}
//                 withVerticalLines={true}
//                 withHorizontalLines={true}
//                 fromZero
//                 withShadow={false}
//                 segments={4}
//               />
              
//               {/* Amount Badge */}
//               {/* <View style={styles.amountBadge}>
//                 <Text style={styles.amountText}>₹ {formatNumber(chartData.highlightedAmount)}</Text>
//                 <Text style={styles.amountMonth}>{chartData.highlightedMonth}</Text>
//               </View> */}
//             </View>
//           )}
          
//           {/* Show error message if data loading failed */}
//           {chartData.error && (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>{chartData.error}</Text>
//             </View>
//           )}
          
//           {/* Stats */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statCard}>
//               <View style={styles.statIconContainer}>
//                 <Icon name="check-circle" size={24} color="#4285F4" />
//               </View>
//               <View style={styles.statContent}>
//                 <View style={styles.statHeader}>
//                   <Text style={styles.statValue}>{claimStats.approvalRate}%</Text>
//                   <View style={styles.trendContainer}>
//                     <Icon
//                       name={claimStats.approvalTrend === 'up' ? 'arrow-up' : 'arrow-down'}
//                       size={16}
//                       color={claimStats.approvalTrend === 'up' ? '#34A853' : '#EA4335'}
//                     />
//                   </View>
//                 </View>
//                 <Text style={styles.statLabel}>Approved this month</Text>
//               </View>
//             </View>
            
//             <View style={styles.statCard}>
//               <View style={styles.statIconContainer}>
//                 <Icon name="file-document" size={24} color="#34A853" />
//               </View>
//               <View style={styles.statContent}>
//                 <View style={styles.statHeader}>
//                   <Text style={styles.statValue}>{claimStats.dealRate}%</Text>
//                   <View style={styles.trendContainer}>
//                     <Icon
//                       name={claimStats.dealTrend === 'up' ? 'arrow-up' : 'arrow-down'}
//                       size={16}
//                       color={claimStats.dealTrend === 'up' ? '#34A853' : '#EA4335'}
//                     />
//                   </View>
//                 </View>
//                 <Text style={styles.statLabel}>Rejected this month</Text>
//               </View>
//             </View>
//           </View>
          
//           {/* Monthly Claim */}
//           {/* <View style={styles.monthlyClaim}>
//             <View>
//               <Text style={styles.monthlyClaimValue}>{formatNumber(claimStats.claimThisMonth)}</Text>
//               <View style={styles.claimTrendContainer}>
//                 <Text style={[
//                   styles.claimTrendValue,
//                   { color: claimStats.claimTrend >= 0 ? '#34A853' : '#EA4335' }
//                 ]}>
//                   {Math.abs(claimStats.claimTrend)}%
//                 </Text>
//                 <Icon
//                   name={claimStats.claimTrend >= 0 ? 'arrow-up' : 'arrow-down'}
//                   size={16}
//                   color={claimStats.claimTrend >= 0 ? '#34A853' : '#EA4335'}
//                 />
//               </View>
//             </View>
//             <Text style={styles.monthlyClaimLabel}>Claim this month</Text>
            
            
//             <View style={styles.miniChart}>
//               <View style={styles.miniChartLine} />
//             </View>
//           </View> */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f9fc',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   logo: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   notificationContainer: {
//     position: 'relative',
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notificationText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   greetingCard: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#111',
//     borderRadius: 16,
//   },
//   greeting: {
//     color: '#fff',
//     opacity: 0.7,
//     fontSize: 14,
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   subGreeting: {
//     color: '#fff',
//     opacity: 0.7,
//     fontSize: 14,
//   },
//   claimsContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     position: 'relative',
//     marginVertical: 10,
//     alignItems: 'center',
//     paddingVertical: 10, // Add padding to ensure y-axis labels are visible
//     paddingLeft: 10, // Extra padding on left for y-axis labels
//   },
//   chart: {
//     borderRadius: 16,
//     paddingRight: 0,
//   },
//   amountBadge: {
//     position: 'absolute',
//     top: '40%',
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   amountText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   amountMonth: {
//     fontSize: 12,
//     textAlign: 'center',
//     color: '#666',
//   },
//   errorContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     color: '#EA4335',
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 15,
//   },
//   statCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '48%',
//   },
//   statIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   statContent: {
//     flex: 1,
//   },
//   statHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   trendContainer: {
//     marginLeft: 5,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//   },
//   monthlyClaim: {
//     marginTop: 10,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   monthlyClaimValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   claimTrendContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   claimTrendValue: {
//     fontSize: 12,
//     marginRight: 2,
//   },
//   monthlyClaimLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   miniChart: {
//     height: 30,
//     marginTop: 10,
//     justifyContent: 'center',
//   },
//   miniChartLine: {
//     height: 2,
//     backgroundColor: '#f0f0f0',
//     position: 'relative',
//   },
// });

// export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryStack, VictoryAxis, VictoryTheme } from 'victory-native';
import Svg from 'react-native-svg';

// Utility function to transform API data
const transformData = (claims) => {
  const result = {};

  claims.forEach(claim => {
    const head = `Expense ${claim.expense_head}`;
    const status = claim.status_of_approval || 'pending';
    const amount = claim.documents?.[0]?.entered_amount || 0;

    if (!result[head]) {
      result[head] = { approved: 0, rejected: 0, pending: 0 };
    }

    result[head][status] += amount;
  });

  const heads = Object.keys(result);
  const approved = heads.map(h => ({ x: h, y: result[h].approved }));
  const rejected = heads.map(h => ({ x: h, y: result[h].rejected }));
  const pending = heads.map(h => ({ x: h, y: result[h].pending }));

  return { approved, rejected, pending };
};

const HomeScreen = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API fetch - replace this with your real fetch
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        // Example: replace with your API call
        const response = await fetch('https://your-api.com/claims');
        const json = await response.json();
        setClaims(json.claims);
      } catch (e) {
        console.error(e);
        // Fallback demo data if needed
        setClaims([
          {
            expense_head: 116,
            status_of_approval: 'pending',
            documents: [{ entered_amount: 229 }],
          },
          {
            expense_head: 116,
            status_of_approval: 'approved',
            documents: [{ entered_amount: 300 }],
          },
          {
            expense_head: 120,
            status_of_approval: 'rejected',
            documents: [{ entered_amount: 100 }],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading claims data...</Text>
      </View>
    );
  }

  const { approved, rejected, pending } = transformData(claims);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Claims Summary (Stacked Bar Chart)</Text>
      <Svg height={400} width="100%">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          height={400}
          width={350}
        >
          <VictoryAxis 
            tickFormat={(t) => t.split(' ')[1]} // Show only expense number
            style={{ tickLabels: { angle: -45, fontSize: 10, padding: 15 } }}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `₹${x}`} />
          <VictoryStack colorScale={['green', 'red', 'orange']}>
            <VictoryBar data={approved} />
            <VictoryBar data={rejected} />
            <VictoryBar data={pending} />
          </VictoryStack>
        </VictoryChart>
      </Svg>
      <View style={styles.legend}>
        <View style={[styles.legendItem, { backgroundColor: 'green' }]} />
        <Text>Approved</Text>
        <View style={[styles.legendItem, { backgroundColor: 'red', marginLeft: 20 }]} />
        <Text>Rejected</Text>
        <View style={[styles.legendItem, { backgroundColor: 'orange', marginLeft: 20 }]} />
        <Text>Pending</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  centered: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 20,
  },
  legend: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  legendItem: {
    width: 20,
    height: 20,
  },
});

export default HomeScreen;
