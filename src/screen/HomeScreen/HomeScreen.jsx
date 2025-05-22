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
// import {SafeAreaView,View,Text,StyleSheet,ScrollView,ActivityIndicator, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useTheme } from 'react-native-paper';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import ExpenseHeadChart from './ExpenseHeadChart';
// const HomeScreen = ({navigation}) => {
//    const theme = useTheme(); 

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
//    // fetchClaimsData();
    
   
    
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
//          <Text style={styles.sectionTitle}>Expense Analysis</Text>
    
//     {/* Expense Head Chart Component */}
//     {!loading && (
//       <ExpenseHeadChart 
//         claims={data.claims} 
//         policyDetails={data.policy_details_data_sec} 
//       />
//     )}
//         {/* Claims Section */}
//         <View style={styles.claimsContainer}>
//           <Text style={styles.sectionTitle}>Claims</Text>
        
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

// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import { useTheme } from 'react-native-paper';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import ExpenseHeadChart from './ExpenseHeadChart';

// const HomeScreen = ({ navigation }) => {
//   const theme = useTheme();

//   const [unreadCount, setUnreadCount] = useState(0);
//   const [userData, setUserData] = useState({ name: '', greeting: '' });
//   const [claimStats, setClaimStats] = useState({
//     approvalRate: 0,
//     approvalTrend: '',
//     dealRate: 0,
//     dealTrend: '',
//     claimThisMonth: 0,
//     claimTrend: 0
//   });
//   const [data, setData] = useState({
//     claims: [],
//     policy_details_data_sec: []
//   });
//   const [loading, setLoading] = useState(true);

//   // Fetch unread count when screen focuses
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
//   };

//   useEffect(() => {
//     const hour = new Date().getHours();
//     let greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
//     fetchUserData(greeting);
//     fetchClaimsData();
//   }, []);

//   const fetchUserData = async (greeting) => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) throw new Error('Missing emp_id or company_id');

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );
//       const data = response.data;

//       setUserData({
//         name: data.name || 'User',
//         greeting
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setUserData({ name: 'User', greeting });
//     }
//   };

//   const fetchClaimsData = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) throw new Error('Missing emp_id or company_id');

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const responseData = response.data;

//       setData({
//         claims: responseData.claims || [],
//         policy_details_data_sec: responseData.policy_details_data_sec || []
//       });

//       const stats = processClaimsStats(responseData.claims);
//       setClaimStats(stats);
//     } catch (error) {
//       console.error('Error fetching claims data:', error);
//       setData({ claims: [], policy_details_data_sec: [] });
//       setClaimStats({
//         approvalRate: 0,
//         approvalTrend: 'down',
//         dealRate: 0,
//         dealTrend: 'down',
//         claimThisMonth: 0,
//         claimTrend: 0
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

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

//     const totalClaims = claims.length;
//     const approvedClaims = claims.filter(
//       (claim) => claim.status_of_approval?.toLowerCase() === 'approved'
//     ).length;
//     const approvalRate = Math.round((approvedClaims / totalClaims) * 100);

//     const dealClaims = claims.filter(
//       (claim) =>
//         claim.status_of_approval?.toLowerCase() === 'approved' &&
//         Number(claim.claim_amount) > 50000
//     ).length;
//     const dealRate = Math.round((dealClaims / totalClaims) * 100);

//     const currentDate = new Date();
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();

//     const thisMonthClaims = claims.filter((claim) => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return (
//         claimDate.getFullYear() === currentYear &&
//         claimDate.getMonth() === currentMonth
//       );
//     }).length;

//     const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     const prevMonthClaims = claims.filter((claim) => {
//       if (!claim.submitted_date) return false;
//       const claimDate = new Date(claim.submitted_date);
//       return (
//         claimDate.getFullYear() === prevYear &&
//         claimDate.getMonth() === prevMonth
//       );
//     }).length;

//     let claimTrend = 0;
//     if (prevMonthClaims > 0) {
//       claimTrend = Math.round(((thisMonthClaims - prevMonthClaims) / prevMonthClaims) * 1000) / 10;
//     }

//     return {
//       approvalRate,
//       approvalTrend: 'up',
//       dealRate,
//       dealTrend: 'down',
//       claimThisMonth: thisMonthClaims,
//       claimTrend
//     };
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Expens ez</Text>
//         <View style={{ position: 'absolute', right: 20, top: 20 }}>
//           <TouchableOpacity onPress={handleNotification}>
//             <IonIcon name="notifications-outline" size={28} />
//             {unreadCount > 0 && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: -4,
//                   right: -4,
//                   backgroundColor: 'red',
//                   borderRadius: 10,
//                   width: 18,
//                   height: 18,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{unreadCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView>
//         <View style={styles.greetingCard}>
//           <Text style={styles.greeting}>{userData.greeting}</Text>
//           <Text style={styles.userName}>{userData.name}</Text>
//           <Text style={styles.subGreeting}>Have a delightful day!</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Expense Analysis</Text>

//         {data.claims.length === 0 ? (
//           <Text style={{ textAlign: 'center', color: '#999' }}>No claims to display.</Text>
//         ) : (
//           <ExpenseHeadChart
//             claims={data.claims}
//             policyDetails={data.policy_details_data_sec}
//           />
//         )}

//         <View style={styles.claimsContainer}>
//           <Text style={styles.sectionTitle}>Claims</Text>

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
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   headerTitle: {
//     fontSize: 18,
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
//     marginLeft: 20,
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
// import { BarChart } from 'react-native-chart-kit';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IonIcon from 'react-native-vector-icons/Ionicons';
// import { BASEPATH } from '../config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useTheme } from 'react-native-paper';

// const HomeScreen = ({ navigation }) => {
//   const theme = useTheme();
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState({
//     name: '',
//     greeting: '',
//   });
  
//   const [expenseData, setExpenseData] = useState({
//     labels: [],
//     expenseHeadMap: {}, // Maps expense head IDs to names
//     chartData: {
//       labels: [],
//       approved: [],
//       rejected: [],
//       pending: [],
//     },
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getUnreadCount();
//     });

//     // Get greeting based on time of day
//     const hour = new Date().getHours();
//     let greeting = '';
//     if (hour < 12) greeting = 'Good Morning';
//     else if (hour < 18) greeting = 'Good Afternoon';
//     else greeting = 'Good Evening';
    
//     // Load user data and expense data
//     fetchUserData(greeting);
//     fetchExpenseData();

//     getUnreadCount();
//     return unsubscribe;
//   }, [navigation]);

//   const getUnreadCount = async () => {
//     const count = await AsyncStorage.getItem('unreadCount');
//     setUnreadCount(parseInt(count || '0', 10));
//   };

//   const handleNotification = () => {
//     navigation.navigate('Notifications');
//   };

//   // Fetch user data
//   const fetchUserData = async (greeting) => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }

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

//   // Fetch and process expense data for stacked bar chart
//   const fetchExpenseData = async () => {
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id in AsyncStorage');
//       }
      
//       const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
//       const data = response.data;
      
//       // Process expense data for stacked bar chart
//       const processedData = processExpenseData(data.claims, data.policy_details_data_sec);
//       setExpenseData({
//         ...processedData,
//         isLoading: false,
//         error: null
//       });
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching expense data:', error);
//       setExpenseData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: 'Failed to load expense data'
//       }));
//       setLoading(false);
//     }
//   };

//   // Process claims data for stacked bar chart
//   const processExpenseData = (claims, policyDetails) => {
//     // Create mapping of expense head IDs to their names
//     const expenseHeadMap = {};
//     if (policyDetails && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
//       });
//     }
    
//     // Initialize data structure to track amounts by expense head and status
//     const expenseHeadData = {};
    
//     // Process each claim
//     if (claims && claims.length) {
//       claims.forEach(claim => {
//         const expenseHeadId = claim.expense_head;
//         const status = claim.status_of_approval || 'pending';
//         const amount = Number(claim.claim_amount || 0);
        
//         // Skip if amount is 0 or expense head is invalid
//         if (amount <= 0 || !expenseHeadId) return;
        
//         // Initialize expense head entry if it doesn't exist
//         if (!expenseHeadData[expenseHeadId]) {
//           expenseHeadData[expenseHeadId] = {
//             approved: 0,
//             rejected: 0,
//             pending: 0
//           };
//         }
        
//         // Add amount to appropriate status category
//         if (status === 'approved') {
//           expenseHeadData[expenseHeadId].approved += amount;
//         } else if (status === 'rejected') {
//           expenseHeadData[expenseHeadId].rejected += amount;
//         } else {
//           expenseHeadData[expenseHeadId].pending += amount;
//         }
//       });
//     }
    
//     // Convert to arrays for chart
//     const expenseHeadIds = Object.keys(expenseHeadData);
//     const labels = expenseHeadIds.map(id => {
//       // Use expense head name if available, otherwise use ID
//       return expenseHeadMap[id] || `Expense ${id}`;
//     });
    
//     const approvedData = expenseHeadIds.map(id => expenseHeadData[id].approved);
//     const rejectedData = expenseHeadIds.map(id => expenseHeadData[id].rejected);
//     const pendingData = expenseHeadIds.map(id => expenseHeadData[id].pending);
    
//     return {
//       labels,
//       expenseHeadMap,
//       chartData: {
//         labels,
//         approved: approvedData,
//         rejected: rejectedData,
//         pending: pendingData,
//       }
//     };
//   };

//   // Format number with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   // Format amount with currency symbol
//   const formatCurrency = (amount) => {
//     return `₹ ${formatNumber(amount)}`;
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Expens ez</Text>
//         <View style={{ position: 'absolute', right: 20, top: 20 }}>
//           <TouchableOpacity onPress={handleNotification}>
//             <IonIcon name="notifications-outline" size={28} />
//             {unreadCount > 0 && (
//               <View
//                 style={{
//                   position: 'absolute',
//                   top: -4,
//                   right: -4,
//                   backgroundColor: 'red',
//                   borderRadius: 10,
//                   width: 18,
//                   height: 18,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>
//                   {unreadCount}
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       <ScrollView>
//         {/* User Greeting Card */}
//         <View style={styles.greetingCard}>
//           <Text style={styles.greeting}>{userData.greeting}</Text>
//           <Text style={styles.userName}>{userData.name}</Text>
//           <Text style={styles.subGreeting}>Have a delightful day!</Text>
//         </View>
        
//         {/* Expense Analysis Section */}
//         <View style={styles.expenseContainer}>
//           <Text style={styles.sectionTitle}>Expense Analysis</Text>
          
//           {/* Legend */}
//           <View style={styles.legendContainer}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//               <Text>Approved</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//               <Text>Rejected</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//               <Text>Pending</Text>
//             </View>
//           </View>
          
//           {/* Stacked Bar Chart - Render only if data is loaded */}
//           {/* {!expenseData.isLoading && !expenseData.error && expenseData.chartData.labels.length > 0 ? (
//             <View style={styles.chartContainer}>
//               <BarChart
//                 // data={{
//                 //   labels: expenseData.chartData.labels.map(label => 
//                 //     label.length > 8 ? label.substring(0, 6) + '...' : label
//                 //   ),
//                 //   legend: ['Approved', 'Rejected', 'Pending'],
//                 //   data: [
//                 //     expenseData.chartData.approved,
//                 //     expenseData.chartData.rejected,
//                 //     expenseData.chartData.pending
//                 //   ],
//                 //   barColors: ['#4285F4', '#EA4335', '#FBBC05']
//                 // }}
// //                 data={{
// //   labels: chartData.labels.map(label => 
// //     label.length > 8 ? label.substring(0, 6) + '...' : label
// //   ),
// //   legend: ['Approved', 'Rejected', 'Pending'],
// //   data: chartData.labels.map((_, index) => [
// //     chartData.approved[index] || 0,
// //     chartData.rejected[index] || 0,
// //     chartData.pending[index] || 0
// //   ]),
// //   barColors: ['#4285F4', '#EA4335', '#FBBC05']
// // }}
// // data={{
// //   labels: chartData.labels.map(label =>
// //     label.length > 8 ? label.substring(0, 6) + '...' : label
// //   ),
// //   legend: ['Approved', 'Rejected', 'Pending'],
// //   data: chartData.labels.map((_, index) => ([
// //     chartData.approved?.[index] ?? 0,
// //     chartData.rejected?.[index] ?? 0,
// //     chartData.pending?.[index] ?? 0
// //   ])),
// //   barColors: ['#4285F4', '#EA4335', '#FBBC05']
// // }}
// data={{
//   labels: expenseData.chartData.labels.map(label =>
//     label.length > 8 ? label.substring(0, 6) + '...' : label
//   ),
//   legend: ['Approved', 'Rejected', 'Pending'],
//   data: expenseData.chartData.labels.map((_, index) => ([
//     expenseData.chartData.approved?.[index] ?? 0,
//     expenseData.chartData.rejected?.[index] ?? 0,
//     expenseData.chartData.pending?.[index] ?? 0
//   ])),
//   barColors: ['#4285F4', '#EA4335', '#FBBC05']
// }}
//                 width={Dimensions.get('window').width - 40}
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
//                   barPercentage: 0.8,
//                   propsForLabels: {
//                     fontSize: 10,
//                     rotation: -45,
//                   },
//                   propsForBackgroundLines: {
//                     strokeWidth: 1,
//                     stroke: '#e0e0e0',
//                   },
//                   formatYLabel: (value) => `₹${value}`,
//                   formatTopValue: (value) => `₹${value}`,
//                 }}
//                 style={styles.chart}
//                 withHorizontalLabels={true}
//                 showValuesOnTopOfBars={false}
//                 segments={4}
//               />
//             </View>
//           ) : expenseData.chartData.labels.length === 0 && !expenseData.isLoading ? (
//             <View style={styles.noDataContainer}>
//               <Icon name="chart-bar" size={50} color="#ccc" />
//               <Text style={styles.noDataText}>No expense data available</Text>
//             </View>
//           ) : null} */}
//           {!expenseData.isLoading &&
//   !expenseData.error &&
//   expenseData.chartData &&
//   expenseData.chartData.labels &&
//   expenseData.chartData.labels.length > 0 && (
//     <View style={styles.chartContainer}>
//       <BarChart
//         data={{
//           labels: expenseData.chartData.labels.map(label =>
//             label.length > 8 ? label.substring(0, 6) + '...' : label
//           ),
//           legend: ['Approved', 'Rejected', 'Pending'],
//           data: expenseData.chartData.labels.map((_, index) => [
//             expenseData.chartData.approved?.[index] ?? 0,
//             expenseData.chartData.rejected?.[index] ?? 0,
//             expenseData.chartData.pending?.[index] ?? 0
//           ]),
//           barColors: ['#4285F4', '#EA4335', '#FBBC05']
//         }}
//         width={Dimensions.get('window').width - 40}
//         height={220}
//         chartConfig={{
//           backgroundColor: '#fff',
//           backgroundGradientFrom: '#fff',
//           backgroundGradientTo: '#fff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//           barPercentage: 0.8,
//           propsForLabels: {
//             fontSize: 10,
//             rotation: -45,
//           },
//           propsForBackgroundLines: {
//             strokeWidth: 1,
//             stroke: '#e0e0e0',
//           },
//           formatYLabel: (value) => `₹${value}`,
//           formatTopValue: (value) => `₹${value}`,
//         }}
//         style={styles.chart}
//         withHorizontalLabels={true}
//         showValuesOnTopOfBars={false}
//         segments={4}
//       />
//     </View>
// )}

//           {/* Show error message if data loading failed */}
//           {expenseData.error && (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>{expenseData.error}</Text>
//             </View>
//           )}
          
//           {/* Expense Breakdown */}
//           {!expenseData.isLoading && !expenseData.error && expenseData.chartData.labels.length > 0 && (
//             <View style={styles.expenseBreakdown}>
//               <Text style={styles.breakdownTitle}>Expense Breakdown</Text>
              
//               {expenseData.chartData.labels.map((label, index) => {
//                 const approved = expenseData.chartData.approved[index] || 0;
//                 const rejected = expenseData.chartData.rejected[index] || 0;
//                 const pending = expenseData.chartData.pending[index] || 0;
//                 const total = approved + rejected + pending;
                
//                 return (
//                   <View key={index} style={styles.expenseItem}>
//                     <Text style={styles.expenseItemTitle}>{label}</Text>
                    
//                     <View style={styles.expenseItemDetails}>
//                       <View style={styles.expenseStatusItem}>
//                         <View style={styles.expenseStatusHeader}>
//                           <View style={[styles.statusIndicator, { backgroundColor: '#4285F4' }]} />
//                           <Text style={styles.expenseStatusLabel}>Approved</Text>
//                         </View>
//                         <Text style={styles.expenseStatusValue}>{formatCurrency(approved)}</Text>
//                       </View>
                      
//                       <View style={styles.expenseStatusItem}>
//                         <View style={styles.expenseStatusHeader}>
//                           <View style={[styles.statusIndicator, { backgroundColor: '#EA4335' }]} />
//                           <Text style={styles.expenseStatusLabel}>Rejected</Text>
//                         </View>
//                         <Text style={styles.expenseStatusValue}>{formatCurrency(rejected)}</Text>
//                       </View>
                      
//                       <View style={styles.expenseStatusItem}>
//                         <View style={styles.expenseStatusHeader}>
//                           <View style={[styles.statusIndicator, { backgroundColor: '#FBBC05' }]} />
//                           <Text style={styles.expenseStatusLabel}>Pending</Text>
//                         </View>
//                         <Text style={styles.expenseStatusValue}>{formatCurrency(pending)}</Text>
//                       </View>
                      
//                       <View style={[styles.expenseStatusItem, styles.totalItem]}>
//                         <Text style={styles.totalLabel}>Total</Text>
//                         <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 );
//               })}
//             </View>
//           )}
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
//   headerTitle: {
//     fontSize: 18,
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
//   expenseContainer: {
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
//     marginVertical: 10,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   chart: {
//     borderRadius: 16,
//     paddingRight: 0,
//   },
//   noDataContainer: {
//     alignItems: 'center',
//     paddingVertical: 40,
//   },
//   noDataText: {
//     marginTop: 10,
//     fontSize: 16,
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
//   expenseBreakdown: {
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//     paddingTop: 15,
//   },
//   breakdownTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   expenseItem: {
//     marginBottom: 20,
//     padding: 15,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//   },
//   expenseItemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   expenseItemDetails: {
//     marginTop: 5,
//   },
//   expenseStatusItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   expenseStatusHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusIndicator: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 8,
//   },
//   expenseStatusLabel: {
//     fontSize: 14,
//     color: '#555',
//   },
//   expenseStatusValue: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   totalItem: {
//     borderBottomWidth: 0,
//     marginTop: 5,
//   },
//   totalLabel: {
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   totalValue: {
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ExpenseHeadChart from './ExpenseHeadChart';

// const HomeScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     claims: [],
//     policyDetails: [],
//     summary: {
//       totalClaims: 0,
//       pendingClaims: 0,
//       approvedClaims: 0,
//       rejectedClaims: 0,
//       totalAmount: 0,
//       pendingAmount: 0,
//       approvedAmount: 0,
//       rejectedAmount: 0
//     }
//   });

//   // Fetch dashboard data on component mount and when refreshing
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       // In a real app, this would be an API call
//       // For now, we'll use mock data
//       const mockData = generateMockData();
      
//       // Simulate network delay
//       setTimeout(() => {
//         setDashboardData(mockData);
//         setIsLoading(false);
//         setRefreshing(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   // Generate mock data for testing
//   const generateMockData = () => {
//     // Generate expense head policies
//     const expenseHeads = [
//       { main_expense_head_id: '1', expense_head_name: 'Travel' },
//       { main_expense_head_id: '2', expense_head_name: 'Meals' },
//       { main_expense_head_id: '3', expense_head_name: 'Accommodation' },
//       { main_expense_head_id: '4', expense_head_name: 'Office Supplies' }
//     ];

//     // Generate random claims
//     const statuses = ['approved', 'rejected', 'pending'];
//     const mockClaims = Array(30).fill().map((_, i) => {
//       const expenseHeadId = Math.floor(Math.random() * 4 + 1).toString();
//       const status = statuses[Math.floor(Math.random() * statuses.length)];
//       const amount = Math.floor(Math.random() * 10000) + 500;
      
//       return {
//         id: `claim-${i}`,
//         expense_head: expenseHeadId,
//         claim_amount: amount,
//         status_of_approval: status,
//         created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
//       };
//     });

//     // Calculate summary data
//     const summary = {
//       totalClaims: mockClaims.length,
//       pendingClaims: mockClaims.filter(c => c.status_of_approval === 'pending').length,
//       approvedClaims: mockClaims.filter(c => c.status_of_approval === 'approved').length,
//       rejectedClaims: mockClaims.filter(c => c.status_of_approval === 'rejected').length,
//       totalAmount: mockClaims.reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       pendingAmount: mockClaims.filter(c => c.status_of_approval === 'pending')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       approvedAmount: mockClaims.filter(c => c.status_of_approval === 'approved')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       rejectedAmount: mockClaims.filter(c => c.status_of_approval === 'rejected')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0)
//     };

//     return {
//       claims: mockClaims,
//       policyDetails: expenseHeads,
//       summary
//     };
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `₹ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//         <Text style={styles.loadingText}>Loading dashboard...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Expense Dashboard</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <Icon name="account-circle" size={30} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#4285F4']}
//           />
//         }
//       >
//         {/* Summary Cards */}
//         <View style={styles.summaryContainer}>
//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E8F0FE' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.totalClaims}</Text>
//               <Text style={styles.summaryLabel}>Total Claims</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.totalAmount)}</Text>
//             </View>
            
//             <View style={[styles.summaryCard, { backgroundColor: '#FEF7E0' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.pendingClaims}</Text>
//               <Text style={styles.summaryLabel}>Pending</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.pendingAmount)}</Text>
//             </View>
//           </View>
          
//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.approvedClaims}</Text>
//               <Text style={styles.summaryLabel}>Approved</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.approvedAmount)}</Text>
//             </View>
            
//             <View style={[styles.summaryCard, { backgroundColor: '#FCE8E6' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.rejectedClaims}</Text>
//               <Text style={styles.summaryLabel}>Rejected</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.rejectedAmount)}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Quick Action Buttons */}
//         <View style={styles.quickActionsContainer}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.quickActionButtons}>
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => navigation.navigate('NewClaim')}
//             >
//               <View style={[styles.actionIcon, { backgroundColor: '#4285F4' }]}>
//                 <Icon name="add" size={24} color="#fff" />
//               </View>
//               <Text style={styles.actionText}>New Claim</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => navigation.navigate('ClaimHistory')}
//             >
//               <View style={[styles.actionIcon, { backgroundColor: '#0F9D58' }]}>
//                 <Icon name="history" size={24} color="#fff" />
//               </View>
//               <Text style={styles.actionText}>History</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={styles.actionButton}
//               onPress={() => navigation.navigate('ExpensePolicy')}
//             >
//               <View style={[styles.actionIcon, { backgroundColor: '#F4B400' }]}>
//                 <Icon name="description" size={24} color="#fff" />
//               </View>
//               <Text style={styles.actionText}>Policy</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Expense Chart */}
//         <ExpenseHeadChart 
//           claims={dashboardData.claims} 
//           policyDetails={dashboardData.policyDetails} 
//         />

//         {/* Recent Transactions */}
//         <View style={styles.recentTransactionsContainer}>
//           <View style={styles.sectionTitleRow}>
//             <Text style={styles.sectionTitle}>Recent Claims</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('ClaimHistory')}>
//               <Text style={styles.viewAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>

//           {dashboardData.claims.slice(0, 5).map((claim, index) => {
//             const expenseHead = dashboardData.policyDetails.find(
//               p => p.main_expense_head_id === claim.expense_head
//             );
            
//             let statusColor = '#FBBC05'; // Pending
//             if (claim.status_of_approval === 'approved') statusColor = '#4285F4';
//             if (claim.status_of_approval === 'rejected') statusColor = '#EA4335';
            
//             return (
//               <TouchableOpacity 
//                 key={claim.id} 
//                 style={styles.transactionItem}
//                 onPress={() => navigation.navigate('ClaimDetails', { claimId: claim.id })}
//               >
//                 <View style={styles.transactionLeft}>
//                   <View style={[styles.categoryIcon, { backgroundColor: statusColor + '20' }]}>
//                     <Icon 
//                       name={
//                         expenseHead?.expense_head_name === 'Travel' ? 'flight' :
//                         expenseHead?.expense_head_name === 'Meals' ? 'restaurant' :
//                         expenseHead?.expense_head_name === 'Accommodation' ? 'hotel' :
//                         'shopping-bag'
//                       } 
//                       size={20} 
//                       color={statusColor} 
//                     />
//                   </View>
//                   <View>
//                     <Text style={styles.transactionTitle}>
//                       {expenseHead?.expense_head_name || `Expense ${claim.expense_head}`}
//                     </Text>
//                     <Text style={styles.transactionDate}>
//                       {new Date(claim.created_at).toLocaleDateString()}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={styles.transactionRight}>
//                   <Text style={styles.transactionAmount}>
//                     {formatCurrency(claim.claim_amount)}
//                   </Text>
//                   <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
//                     <Text style={[styles.statusText, { color: statusColor }]}>
//                       {claim.status_of_approval.charAt(0).toUpperCase() + claim.status_of_approval.slice(1)}
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#333',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   scrollContent: {
//     padding: 15,
//   },
//   summaryContainer: {
//     marginBottom: 20,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryCard: {
//     width: '48%',
//     borderRadius: 12,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   summaryValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 6,
//   },
//   summaryAmount: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   quickActionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   quickActionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     alignItems: 'center',
//     width: '30%',
//   },
//   actionIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   recentTransactionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   viewAllText: {
//     color: '#4285F4',
//     fontSize: 14,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   transactionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   transactionTitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 4,
//   },
//   transactionDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   transactionRight: {
//     alignItems: 'flex-end',
//   },
//   transactionAmount: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 4,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '500',
//   }
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ExpenseHeadChart from './ExpenseHeadChart';

// const HomeScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     claims: [],
//     policyDetails: [],
//     summary: {
//       totalClaims: 0,
//       pendingClaims: 0,
//       approvedClaims: 0,
//       rejectedClaims: 0,
//       totalAmount: 0,
//       pendingAmount: 0,
//       approvedAmount: 0,
//       rejectedAmount: 0
//     }
//   });

//   // Fetch dashboard data on component mount and when refreshing
//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       // In a real app, this would be an API call
//       // For now, we'll use mock data
//       const mockData = generateMockData();
      
//       // Simulate network delay
//       setTimeout(() => {
//         // Ensure data structure is complete before updating state
//         const safeData = {
//           claims: mockData.claims || [],
//           policyDetails: mockData.policyDetails || [],
//           summary: mockData.summary || {
//             totalClaims: 0,
//             pendingClaims: 0,
//             approvedClaims: 0,
//             rejectedClaims: 0,
//             totalAmount: 0,
//             pendingAmount: 0,
//             approvedAmount: 0,
//             rejectedAmount: 0
//           }
//         };
//         setDashboardData(safeData);
//         setIsLoading(false);
//         setRefreshing(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   // Generate mock data for testing
//   const generateMockData = () => {
//     // Generate expense head policies
//     const expenseHeads = [
//       { main_expense_head_id: '1', expense_head_name: 'Travel' },
//       { main_expense_head_id: '2', expense_head_name: 'Meals' },
//       { main_expense_head_id: '3', expense_head_name: 'Accommodation' },
//       { main_expense_head_id: '4', expense_head_name: 'Office Supplies' }
//     ];

//     // Generate random claims
//     const statuses = ['approved', 'rejected', 'pending'];
//     const mockClaims = Array(30).fill().map((_, i) => {
//       const expenseHeadId = Math.floor(Math.random() * 4 + 1).toString();
//       const status = statuses[Math.floor(Math.random() * statuses.length)];
//       const amount = Math.floor(Math.random() * 10000) + 500;
      
//       return {
//         id: `claim-${i}`,
//         expense_head: expenseHeadId,
//         claim_amount: amount,
//         status_of_approval: status,
//         created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
//       };
//     });

//     // Calculate summary data
//     const summary = {
//       totalClaims: mockClaims.length,
//       pendingClaims: mockClaims.filter(c => c.status_of_approval === 'pending').length,
//       approvedClaims: mockClaims.filter(c => c.status_of_approval === 'approved').length,
//       rejectedClaims: mockClaims.filter(c => c.status_of_approval === 'rejected').length,
//       totalAmount: mockClaims.reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       pendingAmount: mockClaims.filter(c => c.status_of_approval === 'pending')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       approvedAmount: mockClaims.filter(c => c.status_of_approval === 'approved')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0),
//       rejectedAmount: mockClaims.filter(c => c.status_of_approval === 'rejected')
//         .reduce((sum, claim) => sum + Number(claim.claim_amount), 0)
//     };

//     return {
//       claims: mockClaims,
//       policyDetails: expenseHeads,
//       summary
//     };
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     return `₹ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//         <Text style={styles.loadingText}>Loading dashboard...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Expense Dashboard</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <Icon name="account-circle" size={30} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#4285F4']}
//           />
//         }
//       >
//         {/* Summary Cards */}
//         <View style={styles.summaryContainer}>
//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E8F0FE' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.totalClaims}</Text>
//               <Text style={styles.summaryLabel}>Total Claims</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.totalAmount)}</Text>
//             </View>
            
//             <View style={[styles.summaryCard, { backgroundColor: '#FEF7E0' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.pendingClaims}</Text>
//               <Text style={styles.summaryLabel}>Pending</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.pendingAmount)}</Text>
//             </View>
//           </View>
          
//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.approvedClaims}</Text>
//               <Text style={styles.summaryLabel}>Approved</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.approvedAmount)}</Text>
//             </View>
            
//             <View style={[styles.summaryCard, { backgroundColor: '#FCE8E6' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.rejectedClaims}</Text>
//               <Text style={styles.summaryLabel}>Rejected</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.rejectedAmount)}</Text>
//             </View>
//           </View>
//         </View>

        

//         {/* Expense Chart */}
//         <ExpenseHeadChart 
//           claims={dashboardData.claims} 
//           policyDetails={dashboardData.policyDetails} 
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#333',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   scrollContent: {
//     padding: 15,
//   },
//   summaryContainer: {
//     marginBottom: 20,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   summaryCard: {
//     width: '48%',
//     borderRadius: 12,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   summaryValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 6,
//   },
//   summaryAmount: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   quickActionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   quickActionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     alignItems: 'center',
//     width: '30%',
//   },
//   actionIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   recentTransactionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 15,
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   viewAllText: {
//     color: '#4285F4',
//     fontSize: 14,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   transactionLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   transactionTitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 4,
//   },
//   transactionDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   transactionRight: {
//     alignItems: 'flex-end',
//   },
//   transactionAmount: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 4,
//   },
//   statusBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 12,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: '#888',
//     padding: 15,
//   }
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
//   SafeAreaView
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ExpenseHeadChart from './ExpenseHeadChart';
// import { BASEPATH } from '../config';

// const HomeScreen = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     claims: [],
//     policyDetails: [],
//     summary: {
//       totalClaims: 0,
//       pendingClaims: 0,
//       approvedClaims: 0,
//       rejectedClaims: 0,
//       totalAmount: 0,
//       pendingAmount: 0,
//       approvedAmount: 0,
//       rejectedAmount: 0
//     }
//   });

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       const emp_id = await AsyncStorage.getItem('username');
//       const company_id = await AsyncStorage.getItem('companyname');

//       if (!emp_id || !company_id) {
//         throw new Error('Missing emp_id or company_id');
//       }

//       const response = await axios.get(
//         `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
//       );

//       const claims = response.data.claims || [];
//       const policyDetails = response.data.approval_claim_data.policy_details_data_sec || [];

//       // Attach policy details to claims
//       const updatedClaims = claims.map(claim => {
//         const match = policyDetails.find(policy =>
//           String(policy.policy_detail_id) === String(claim.policy_id) &&
//           String(policy.main_expense_head_id) === String(claim.expense_head) &&
//           String(policy.sub_expense_head_id) === String(claim.subexpense_head)
//         );

//         return {
//           ...claim,
//           expense_head_name: match?.expense_head_name || 'N/A',
//           sub_expense_head_name: match?.sub_expense_head_name || 'N/A',
//         };
//       });

//       // Generate summary
//       // const summary = {
//       //   totalClaims: updatedClaims.length,
//       //   pendingClaims: updatedClaims.filter(c => c.status_of_approval === 'pending').length,
//       //   approvedClaims: updatedClaims.filter(c => c.status_of_approval === 'approved').length,
//       //   rejectedClaims: updatedClaims.filter(c => c.status_of_approval === 'rejected').length,
//       //   totalAmount: updatedClaims.reduce((sum, c) => sum + Number(c.claim_amount || 0), 0),
//       //   pendingAmount: updatedClaims.filter(c => c.status_of_approval === 'pending')
//       //     .reduce((sum, c) => sum + Number(c.claim_amount || 0), 0),
//       //   approvedAmount: updatedClaims.filter(c => c.status_of_approval === 'approved')
//       //     .reduce((sum, c) => sum + Number(c.claim_amount || 0), 0),
//       //   rejectedAmount: updatedClaims.filter(c => c.status_of_approval === 'rejected')
//       //     .reduce((sum, c) => sum + Number(c.claim_amount || 0), 0)
//       // };
// const roundToTwo = (num) => {
//   return Math.round(num * 100) / 100;
// };

// // const summary = {
// //   totalClaims: updatedClaims.length,
// //   pendingClaims: updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'pending').length,
// //   approvedClaims: updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'approved').length,
// //   rejectedClaims: updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'rejected').length,
  
// //   totalAmount: roundToTwo(updatedClaims.reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
  
// //   pendingAmount: roundToTwo(updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'pending')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
    
// //   approvedAmount: roundToTwo(updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'approved')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
    
// //   rejectedAmount: roundToTwo(updatedClaims.filter(c => c.status_of_approval?.toLowerCase().trim() === 'rejected')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
// // };
// // const normalizeStatus = (status) => status?.toString().toLowerCase().trim();
// // const safeAmount = (amount) => {
// //   const num = Number(amount);
// //   return isNaN(num) ? 0 : num;
// // };
// const safeAmount = (claim) => {
//   // Try claim_amount first; fallback to approved_amount or rejected_amount if applicable
//   const amount = claim.claim_amount ?? claim.approved_amount ?? claim.rejected_amount ?? 0;
//   const num = Number(amount);
//   return isNaN(num) ? 0 : num;
// };

// console.log('Claims grouped by status and amounts:');

// ['pending', 'approved', 'rejected'].forEach(status => {
//   const filtered = updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === status);
//   console.log(`${status} claims count:`, filtered.length);
//   console.log(`${status} claims amounts:`, filtered.map(c => c.claim_amount));
// });

// const summary = {
//   totalClaims: updatedClaims.length,
//   pendingClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'pending').length,
//   approvedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'approved').length,
//   rejectedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'rejected').length,

//   // totalAmount: roundToTwo(updatedClaims.reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

//   // pendingAmount: roundToTwo(updatedClaims
//   //   .filter(c => normalizeStatus(c.status_of_approval) === 'pending')
//   //   .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

//   // approvedAmount: roundToTwo(updatedClaims
//   //   .filter(c => normalizeStatus(c.status_of_approval) === 'approved')
//   //   .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

//   // rejectedAmount: roundToTwo(updatedClaims
//   //   .filter(c => normalizeStatus(c.status_of_approval) === 'rejected')
//   //   .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

//   totalAmount: roundToTwo(updatedClaims.reduce((sum, c) => sum + safeAmount(c), 0)),

// pendingAmount: roundToTwo(updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'pending')
//   .reduce((sum, c) => sum + safeAmount(c), 0)),

// approvedAmount: roundToTwo(updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'approved')
//   .reduce((sum, c) => sum + safeAmount(c), 0)),

// rejectedAmount: roundToTwo(updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'rejected')
//   .reduce((sum, c) => sum + safeAmount(c), 0)),

// };

// // const summary = {
// //   totalClaims: updatedClaims.length,
// //   pendingClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'pending').length,
// //   approvedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'approved').length,
// //   rejectedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'rejected').length,
// //   totalAmount: roundToTwo(updatedClaims.reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
// //   pendingAmount: roundToTwo(updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'pending')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
// //   approvedAmount: roundToTwo(updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'approved')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
// //   rejectedAmount: roundToTwo(updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'rejected')
// //     .reduce((sum, c) => sum + Number(c.claim_amount) || 0, 0)),
// // };

// console.log('Pending amounts:', updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'pending')
//   .map(c => c.claim_amount));

// console.log('Approved amounts:', updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'approved')
//   .map(c => c.claim_amount));

// console.log('Rejected amounts:', updatedClaims
//   .filter(c => normalizeStatus(c.status_of_approval) === 'rejected')
//   .map(c => c.claim_amount));

//       setDashboardData({
//         claims: updatedClaims,
//         policyDetails,
//         summary
//       });

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   // const formatCurrency = (amount) => {
//   //   return `₹ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   // };
// const formatCurrency = (amount) => {
//   return `₹ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
// };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4285F4" />
//         <Text style={styles.loadingText}>Loading dashboard...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Expense Dashboard</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           <Icon name="account-circle" size={30} color="#333" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#4285F4']}
//           />
//         }
//       >
//         <View style={styles.summaryContainer}>
//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E8F0FE' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.totalClaims}</Text>
//               <Text style={styles.summaryLabel}>Total Claims</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.totalAmount)}</Text>
//             </View>
//             <View style={[styles.summaryCard, { backgroundColor: '#FEF7E0' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.pendingClaims}</Text>
//               <Text style={styles.summaryLabel}>Pending</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.pendingAmount)}</Text>
//             </View>
//           </View>

//           <View style={styles.summaryRow}>
//             <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.approvedClaims}</Text>
//               <Text style={styles.summaryLabel}>Approved</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.approvedAmount)}</Text>
//             </View>
//             <View style={[styles.summaryCard, { backgroundColor: '#FCE8E6' }]}>
//               <Text style={styles.summaryValue}>{dashboardData.summary.rejectedClaims}</Text>
//               <Text style={styles.summaryLabel}>Rejected</Text>
//               <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.rejectedAmount)}</Text>
//             </View>
//           </View>
//         </View>

//         <ExpenseHeadChart 
//           claims={dashboardData.claims} 
//           policyDetails={dashboardData.policyDetails} 
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   loadingContainer: {
//     flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5',
//   },
//   loadingText: { marginTop: 10, color: '#333' },
//   header: {
//     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//     paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
//     borderBottomWidth: 1, borderBottomColor: '#eee',
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
//   scrollContent: { padding: 15 },
//   summaryContainer: { marginBottom: 20 },
//   summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   summaryCard: {
//     width: '48%', borderRadius: 12, padding: 15,
//     shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
//   },
//   summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 },
//   summaryLabel: { fontSize: 14, color: '#666', marginBottom: 6 },
//   summaryAmount: { fontSize: 16, fontWeight: '500', color: '#333' },
// });

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseHeadChart from './ExpenseHeadChart';
import { BASEPATH } from '../config';
import { useTheme } from "../../theme/useTheme";
import Icon from 'react-native-vector-icons/Ionicons';
//import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Utility functions moved outside component
const normalizeStatus = (status) => status?.toString().toLowerCase().trim();

// const safeAmount = (amount) => {
//   const num = Number(amount);
//   return isNaN(num) ? 0 : num;
// };
const safeAmount = (amount) => {
  if (!amount) return 0;
  // Convert to string, remove anything except digits and dot (decimal)
  const cleaned = amount.toString().replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const roundToTwo = (num) => Math.round(num * 100) / 100;

const formatCurrency = (amount) => {
  return `₹ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
  const [userData, setUserData] = useState({
    name: '',
    greeting: '',
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUnreadCount();
    });

    getUnreadCount(); 

    return unsubscribe;
  }, [navigation]);

  const getUnreadCount = async () => {
    const count = await AsyncStorage.getItem('unreadCount');
    setUnreadCount(parseInt(count || '0', 10));
  };
    const fetchUserData = async (greeting) => {
    try {
           const emp_id = await AsyncStorage.getItem('username');
    const company_id = await AsyncStorage.getItem('companyname');

     if (!emp_id || !company_id) {
       throw new Error('Missing emp_id or company_id in AsyncStorage');
     }

      const response = await axios.get(`${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`);
      const data = response.data;
      
      setUserData({
        name: data.name || 'User', // Fallback if name is not provided
        greeting: greeting,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set fallback values in case of error
      setUserData({
        name: 'emp_id',
        greeting: greeting,
      });
    }
  };
      useEffect(() => {
    // Get greeting based on time of day
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    // Fetch user data
    fetchUserData(greeting);
  }, []);

  const handleNotification = () => {
    navigation.navigate('Notifications');
   }
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    claims: [],
    policyDetails: [],
    summary: {
      totalClaims: 0,
      pendingClaims: 0,
      approvedClaims: 0,
      rejectedClaims: 0,
      totalAmount: 0,
      pendingAmount: 0,
      approvedAmount: 0,
      rejectedAmount: 0
    }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const emp_id = await AsyncStorage.getItem('username');
      const company_id = await AsyncStorage.getItem('companyname');

      if (!emp_id || !company_id) {
        throw new Error('Missing emp_id or company_id');
      }

      const response = await axios.get(
        `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
      );

      const claims = response.data.claims || [];
      const policyDetails = response.data.approval_claim_data?.policy_details_data_sec || [];

      // Attach policy details to claims
      const updatedClaims = claims.map(claim => {
        const match = policyDetails.find(policy =>
          String(policy.policy_detail_id) === String(claim.policy_id) &&
          String(policy.main_expense_head_id) === String(claim.expense_head) &&
          String(policy.sub_expense_head_id) === String(claim.subexpense_head)
        );

        return {
          ...claim,
          expense_head_name: match?.expense_head_name || 'N/A',
          sub_expense_head_name: match?.sub_expense_head_name || 'N/A',
        };
      });

      // Generate summary
      const summary = {
        totalClaims: updatedClaims.length,
        pendingClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'pending').length,
        approvedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'approved').length,
        rejectedClaims: updatedClaims.filter(c => normalizeStatus(c.status_of_approval) === 'rejected').length,

        totalAmount: roundToTwo(updatedClaims.reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

        pendingAmount: roundToTwo(updatedClaims
          .filter(c => normalizeStatus(c.status_of_approval) === 'pending')
          .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

        approvedAmount: roundToTwo(updatedClaims
          .filter(c => normalizeStatus(c.status_of_approval) === 'approved')
          .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),

        rejectedAmount: roundToTwo(updatedClaims
          .filter(c => normalizeStatus(c.status_of_approval) === 'rejected')
          .reduce((sum, c) => sum + safeAmount(c.claim_amount), 0)),
      };

      setDashboardData({
        claims: updatedClaims,
        policyDetails,
        summary
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Dashboard</Text>
          <TouchableOpacity onPress={handleNotification}>
     <Icon name="notifications-outline" size={28} color={theme.text} />
     {unreadCount > 0 && (
      <View
        style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: 'red',
          borderRadius: 10,
          width: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.text, fontSize: 10, fontWeight: 'bold' }}>
          {unreadCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
      </View>
        <View style={styles.greetingCard}>
          <Text style={styles.greeting}>{userData.greeting}</Text>           <Text style={styles.userName}>{userData.name}</Text>
           <Text style={styles.subGreeting}>Have a delightful day!</Text>
         </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4285F4']}
          />
        }
      >
       
        <ExpenseHeadChart
          claims={dashboardData.claims}
          policyDetails={dashboardData.policyDetails}
        />
         <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, { backgroundColor: '#E8F0FE' }]}>
              <Text style={styles.summaryValue}>{dashboardData.summary.totalClaims}</Text>
              <Text style={styles.summaryLabel}>Total Claims</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.totalAmount)}</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: '#FEF7E0' }]}>
              <Text style={styles.summaryValue}>{dashboardData.summary.pendingClaims}</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.pendingAmount)}</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, { backgroundColor: '#E6F4EA' }]}>
              <Text style={styles.summaryValue}>{dashboardData.summary.approvedClaims}</Text>
              <Text style={styles.summaryLabel}>Approved</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.approvedAmount)}</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: '#FCE8E6' }]}>
              <Text style={styles.summaryValue}>{dashboardData.summary.rejectedClaims}</Text>
              <Text style={styles.summaryLabel}>Rejected</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(dashboardData.summary.rejectedAmount)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5',
  },
  loadingText: { marginTop: 10, color: '#333' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  scrollContent: { padding: 15 },
  summaryContainer: { marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryCard: {
    width: '48%', borderRadius: 12, padding: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  summaryValue: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  summaryLabel: { fontSize: 14, color: '#666', marginBottom: 6 },
  summaryAmount: { fontSize: 16, fontWeight: '500', color: '#333' },
    greetingCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 16,
  },
  greeting: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  subGreeting: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
  },
});

export default HomeScreen;
