// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const ExpenseHeadChart = ({ claims, policyDetails }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     expenseHeadMap: {},
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
   
//     if (claims && claims.length > 0) {
//       try {
//         const processedData = processExpenseData(claims, policyDetails);
//         setChartData({
//           ...processedData,
//           isLoading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error processing expense data:', error);
//         setChartData(prevState => ({
//           ...prevState,
//           isLoading: false,
//           error: 'Failed to process expense data'
//         }));
//       }
//     } else {
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: null
//       }));
//     }
//   }, [claims, policyDetails]);

  
//   const processExpenseData = (claims, policyDetails) => {
    
//     const expenseHeadMap = {};
//     if (policyDetails && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
//       });
//     }
    
    
//     const expenseHeadData = {};
    
    
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
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
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

//   if (chartData.isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading expense data...</Text>
//       </View>
//     );
//   }

//   if (chartData.error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{chartData.error}</Text>
//       </View>
//     );
//   }

//   if (chartData.labels.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>No expense data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Analysis by Category</Text>
      
//       {/* Legend */}
//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//           <Text>Approved</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//           <Text>Rejected</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//           <Text>Pending</Text>
//         </View>
//       </View>
      
//       {/* Stacked Bar Chart */}
//       <View style={styles.chartContainer}>
//         <BarChart
//           data={{
//             labels: chartData.labels.map(label => 
//               label.length > 8 ? label.substring(0, 6) + '...' : label
//             ),
//             legend: ['Approved', 'Rejected', 'Pending'],
//             data: [
//               chartData.approved,
//               chartData.rejected,
//               chartData.pending
//             ],
//             barColors: ['#4285F4', '#EA4335', '#FBBC05']
//           }}
//           width={Dimensions.get('window').width - 40}
//           height={220}
//           chartConfig={{
//             backgroundColor: '#fff',
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             decimalPlaces: 0,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             barPercentage: 0.8,
//             propsForLabels: {
//               fontSize: 10,
//               rotation: -45,
//             },
//             propsForBackgroundLines: {
//               strokeWidth: 1,
//               stroke: '#e0e0e0',
//             },
//             formatYLabel: (value) => `₹${value}`,
//             formatTopValue: (value) => `₹${value}`,
//           }}
//           style={styles.chart}
//           withHorizontalLabels={true}
//           showValuesOnTopOfBars={false}
//           segments={4}
//         />
//       </View>
      
//       {/* Detailed Breakdown */}
//       <View style={styles.breakdownContainer}>
//         <Text style={styles.breakdownTitle}>Detailed Breakdown</Text>
        
//         {chartData.labels.map((label, index) => {
//           const approved = chartData.approved[index] || 0;
//           const rejected = chartData.rejected[index] || 0;
//           const pending = chartData.pending[index] || 0;
//           const total = approved + rejected + pending;
          
//           return (
//             <View key={index} style={styles.expenseItem}>
//               <Text style={styles.expenseItemTitle}>{label}</Text>
//               <View style={styles.expenseAmounts}>
//                 <Text>Approved: {formatCurrency(approved)}</Text>
//                 <Text>Rejected: {formatCurrency(rejected)}</Text>
//                 <Text>Pending: {formatCurrency(pending)}</Text>
//                 <Text style={styles.totalAmount}>Total: {formatCurrency(total)}</Text>
//               </View>
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   chart: {
//     borderRadius: 16,
//   },
//   errorText: {
//     color: '#EA4335',
//     textAlign: 'center',
//   },
//   breakdownContainer: {
//     marginTop: 15,
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   breakdownTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   expenseItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     paddingVertical: 10,
//   },
//   expenseItemTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   expenseAmounts: {
//     marginLeft: 10,
//   },
//   totalAmount: {
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
// });

// export default ExpenseHeadChart;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';

// const ExpenseHeadChart = ({ claims, policyDetails }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     expenseHeadMap: {},
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
//     // Make sure we have valid input data
//     if (Array.isArray(claims) && claims.length > 0) {
//       try {
//         const processedData = processExpenseData(claims, policyDetails || []);
//         setChartData({
//           ...processedData,
//           isLoading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error processing expense data:', error);
//         setChartData(prevState => ({
//           ...prevState,
//           isLoading: false,
//           error: 'Failed to process expense data'
//         }));
//       }
//     } else {
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: null
//       }));
//     }
//   }, [claims, policyDetails]);

  
//   const processExpenseData = (claims, policyDetails) => {
//     // Create a map of expense head IDs to names
//     const expenseHeadMap = {};
//     if (Array.isArray(policyDetails) && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         if (policy && policy.main_expense_head_id) {
//           expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name || `Expense ${policy.main_expense_head_id}`;
//         }
//       });
//     }
    
//     // Process expense data by category
//     const expenseHeadData = {};
    
//     // Process each claim
//     if (Array.isArray(claims) && claims.length) {
//       claims.forEach(claim => {
//         if (!claim) return; // Skip invalid claims
        
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
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
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

//   if (chartData.isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading expense data...</Text>
//       </View>
//     );
//   }

//   if (chartData.error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{chartData.error}</Text>
//       </View>
//     );
//   }

//   if (chartData.labels.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDataText}>No expense data available</Text>
//       </View>
//     );
//   }

//   // Create safe chart data to prevent errors
//   const chartConfig = {
//     backgroundColor: '#fff',
//     backgroundGradientFrom: '#fff',
//     backgroundGradientTo: '#fff',
//     decimalPlaces: 0,
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     style: {
//       borderRadius: 16,
//     },
//     barPercentage: 0.8,
//     propsForLabels: {
//       fontSize: 10,
//       rotation: -45,
//     },
//     propsForBackgroundLines: {
//       strokeWidth: 1,
//       stroke: '#e0e0e0',
//     },
//     formatYLabel: (value) => `₹${value}`,
//     formatTopValue: (value) => `₹${value}`,
//   };

//   // Create safe data structure for BarChart
//   const data = {
//     labels: chartData.labels.map(label => 
//       label.length > 8 ? label.substring(0, 6) + '...' : label
//     ),
//     legend: ['Approved', 'Rejected', 'Pending'],
//     data: [
//       chartData.approved,
//       chartData.rejected,
//       chartData.pending
//     ],
//     barColors: ['#4285F4', '#EA4335', '#FBBC05']
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Analysis by Category</Text>
      
//       {/* Legend */}
//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//           <Text>Approved</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//           <Text>Rejected</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//           <Text>Pending</Text>
//         </View>
//       </View>
      
//       {/* Stacked Bar Chart */}
//       <View style={styles.chartContainer}>
//         {/* Replace the BarChart with a custom visualization */}
//         <View style={styles.customChart}>
//           {chartData.labels.map((label, index) => {
//             const approved = chartData.approved[index] || 0;
//             const rejected = chartData.rejected[index] || 0;
//             const pending = chartData.pending[index] || 0;
//             const total = approved + rejected + pending;
//             const maxValue = Math.max(...chartData.approved, ...chartData.rejected, ...chartData.pending) * 1.1;
            
//             const approvedHeight = (approved / maxValue) * 180;
//             const rejectedHeight = (rejected / maxValue) * 180;
//             const pendingHeight = (pending / maxValue) * 180;
            
//             return (
//               <View key={index} style={styles.barGroup}>
//                 <View style={styles.barContainer}>
//                   {approved > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#4285F4',
//                           height: approvedHeight,
//                         }
//                       ]} 
//                     />
//                   )}
//                   {rejected > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#EA4335',
//                           height: rejectedHeight,
//                           marginTop: 1
//                         }
//                       ]} 
//                     />
//                   )}
//                   {pending > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#FBBC05',
//                           height: pendingHeight,
//                           marginTop: 1
//                         }
//                       ]} 
//                     />
//                   )}
//                 </View>
//                 <Text style={styles.barLabel}>
//                   {label.length > 8 ? label.substring(0, 6) + '...' : label}
//                 </Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   chart: {
//     borderRadius: 16,
//   },
//   errorText: {
//     color: '#EA4335',
//     textAlign: 'center',
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: '#888',
//     padding: 15,
//   },
 
//   expenseItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     paddingVertical: 10,
//   },
//   expenseItemTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   expenseAmounts: {
//     marginLeft: 10,
//   },
//   totalAmount: {
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   customChart: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     height: 220,
//     width: '100%',
//     marginBottom: 20,
//   },
//   barGroup: {
//     alignItems: 'center',
//     width: '18%',
//   },
//   barContainer: {
//     width: '100%',
//     justifyContent: 'flex-end',
//     height: 180, 
//     padding:10
//   },
//   bar: {
//     width: '50%',
//     borderRadius: 3,
//   },
//   barLabel: {
//     fontSize: 10,
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });

// export default ExpenseHeadChart;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ExpenseHeadChart = ({ claims, policyDetails }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
//     // Make sure we have valid input data
//     if (Array.isArray(claims) && claims.length > 0) {
//       try {
//         const processedData = processExpenseData(claims, policyDetails || []);
//         setChartData({
//           ...processedData,
//           isLoading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error processing expense data:', error);
//         setChartData(prevState => ({
//           ...prevState,
//           isLoading: false,
//           error: 'Failed to process expense data'
//         }));
//       }
//     } else {
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: null
//       }));
//     }
//   }, [claims, policyDetails]);

//   const processExpenseData = (claims, policyDetails) => {
//     // Create a map of expense head IDs to names from policyDetails
//     const expenseHeadMap = {};
//     if (Array.isArray(policyDetails) && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         if (policy && policy.main_expense_head_id && policy.expense_head_name) {
//           expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
//         }
//       });
//     }
    
//     // Process expense data by category using expense_head_name
//     const expenseHeadData = {};
    
//     // Process each claim
//     if (Array.isArray(claims) && claims.length) {
//       claims.forEach(claim => {
//         if (!claim) return; // Skip invalid claims
        
//         const expenseHeadId = claim.expense_head;
//         // Use the expense_head_name from the mapping
//         const expenseHeadName = expenseHeadMap[expenseHeadId] || `Expense ${expenseHeadId}`;
//         const status = claim.status_of_approval || 'pending';
//         const amount = Number(claim.claim_amount || 0);
        
//         // Skip if amount is 0 or expense head is invalid
//         if (amount <= 0 || !expenseHeadId) return;
        
//         // Initialize expense head entry if it doesn't exist
//         if (!expenseHeadData[expenseHeadName]) {
//           expenseHeadData[expenseHeadName] = {
//             approved: 0,
//             rejected: 0,
//             pending: 0
//           };
//         }
        
//         // Add amount to appropriate status category
//         if (status === 'approved') {
//           expenseHeadData[expenseHeadName].approved += amount;
//         } else if (status === 'rejected') {
//           expenseHeadData[expenseHeadName].rejected += amount;
//         } else {
//           expenseHeadData[expenseHeadName].pending += amount;
//         }
//       });
//     }
    
//     // Convert to arrays for chart - using expense_head_name as labels
//     const labels = Object.keys(expenseHeadData);
//     const approvedData = labels.map(name => expenseHeadData[name].approved);
//     const rejectedData = labels.map(name => expenseHeadData[name].rejected);
//     const pendingData = labels.map(name => expenseHeadData[name].pending);
    
//     return {
//       labels,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
//     };
//   };

//   // Format amount with currency symbol
//   const formatCurrency = (amount) => {
//     return `₹ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };

//   if (chartData.isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading expense data...</Text>
//       </View>
//     );
//   }

//   if (chartData.error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{chartData.error}</Text>
//       </View>
//     );
//   }

//   if (chartData.labels.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDataText}>No expense data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Analysis by Category</Text>
      
//       {/* Legend */}
//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//           <Text>Approved</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//           <Text>Rejected</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//           <Text>Pending</Text>
//         </View>
//       </View>
      
//       {/* Custom Bar Chart */}
//       <View style={styles.chartContainer}>
//         <View style={styles.customChart}>
//           {chartData.labels.map((label, index) => {
//             const approved = chartData.approved[index] || 0;
//             const rejected = chartData.rejected[index] || 0;
//             const pending = chartData.pending[index] || 0;
//             const total = approved + rejected + pending;
            
//             // Calculate the maximum value for scaling
//             const maxValue = Math.max(
//               ...chartData.approved, 
//               ...chartData.rejected, 
//               ...chartData.pending
//             ) * 1.1;
            
//             const approvedHeight = (approved / maxValue) * 180;
//             const rejectedHeight = (rejected / maxValue) * 180;
//             const pendingHeight = (pending / maxValue) * 180;
            
//             return (
//               <View key={index} style={styles.barGroup}>
//                 <View style={styles.barContainer}>
//                   {approved > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#4285F4',
//                           height: approvedHeight,
//                         }
//                       ]} 
//                     />
//                   )}
//                   {rejected > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#EA4335',
//                           height: rejectedHeight,
//                           marginTop: 1
//                         }
//                       ]} 
//                     />
//                   )}
//                   {pending > 0 && (
//                     <View 
//                       style={[
//                         styles.bar, 
//                         { 
//                           backgroundColor: '#FBBC05',
//                           height: pendingHeight,
//                           marginTop: 1
//                         }
//                       ]} 
//                     />
//                   )}
//                 </View>
//                 <Text style={styles.barLabel}>
//                   {label.length > 12 ? label.substring(0, 10) + '...' : label}
//                 </Text>
//                 <Text style={styles.amountLabel}>
//                   {formatCurrency(total)}
//                 </Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
      
//       {/* Y-axis label */}
//       <View style={styles.axisLabelContainer}>
//         <Text style={styles.axisLabel}>Amount (₹)</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   errorText: {
//     color: '#EA4335',
//     textAlign: 'center',
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: '#888',
//     padding: 15,
//   },
//   customChart: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     height: 220,
//     width: '100%',
//     marginBottom: 10,
//   },
//   barGroup: {
//     alignItems: 'center',
//     width: '18%',
//   },
//   barContainer: {
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: 180,
//   },
//   bar: {
//     width: '70%',
//     borderRadius: 3,
//   },
//   barLabel: {
//     fontSize: 10,
//     marginTop: 5,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   amountLabel: {
//     fontSize: 8,
//     color: '#666',
//     textAlign: 'center',
//   },
//   axisLabelContainer: {
//     alignItems: 'center',
//   },
//   axisLabel: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: 'bold',
//   }
// });

// export default ExpenseHeadChart;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ExpenseHeadChart = ({ claims, policyDetails }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
//     if (Array.isArray(claims) && claims.length > 0) {
//       try {
//         const processedData = processExpenseData(claims, policyDetails || []);
//         setChartData({
//           ...processedData,
//           isLoading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error processing expense data:', error);
//         setChartData(prevState => ({
//           ...prevState,
//           isLoading: false,
//           error: 'Failed to process expense data'
//         }));
//       }
//     } else {
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: null
//       }));
//     }
//   }, [claims, policyDetails]);

//   const processExpenseData = (claims, policyDetails) => {
//     const expenseHeadMap = {};
//     if (Array.isArray(policyDetails) && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         if (policy && policy.main_expense_head_id !== undefined && policy.expense_head_name) {
//           expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
//         }
//       });
//     }

//     const expenseHeadData = {};

//     claims.forEach(claim => {
//       if (!claim) return;

//       const expenseHeadId = claim.expense_head;

//       // Use the expense_head_name from the mapping or fallback
//       const expenseHeadName = expenseHeadMap[expenseHeadId] || `Expense ${expenseHeadId}`;

//       // Clean and parse claim_amount
//       const rawAmount = claim.claim_amount || "0";
//       const cleanedAmount = rawAmount.toString().replace(/[^0-9.]/g, '');
//       const amount = parseFloat(cleanedAmount) || 0;

//       // Use status or default to 'pending'
//       const status = claim.status_of_approval || 'pending';

//       // Debug logs for tracing values
//       console.log(`Claim expenseHead: ${expenseHeadId}, status: ${status}, raw amount: ${rawAmount}, parsed amount: ${amount}`);

//       // Skip invalid entries
//       if (amount <= 0 || expenseHeadId === null || expenseHeadId === undefined) return;

//       if (!expenseHeadData[expenseHeadName]) {
//         expenseHeadData[expenseHeadName] = {
//           approved: 0,
//           rejected: 0,
//           pending: 0
//         };
//       }

//       if (status === 'approved') {
//         expenseHeadData[expenseHeadName].approved += amount;
//       } else if (status === 'rejected') {
//         expenseHeadData[expenseHeadName].rejected += amount;
//       } else {
//         expenseHeadData[expenseHeadName].pending += amount;
//       }
//     });

//     const labels = Object.keys(expenseHeadData);
//     const approvedData = labels.map(name => expenseHeadData[name].approved);
//     const rejectedData = labels.map(name => expenseHeadData[name].rejected);
//     const pendingData = labels.map(name => expenseHeadData[name].pending);

//     return {
//       labels,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
//     };
//   };

//   const formatCurrency = (amount) => {
//     return `₹ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };

//   if (chartData.isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading expense data...</Text>
//       </View>
//     );
//   }

//   if (chartData.error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{chartData.error}</Text>
//       </View>
//     );
//   }

//   if (chartData.labels.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDataText}>No expense data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Analysis by Category</Text>

//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//           <Text>Approved</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//           <Text>Rejected</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//           <Text>Pending</Text>
//         </View>
//       </View>

//       <View style={styles.chartContainer}>
//         <View style={styles.customChart}>
//           {chartData.labels.map((label, index) => {
//             const approved = chartData.approved[index] || 0;
//             const rejected = chartData.rejected[index] || 0;
//             const pending = chartData.pending[index] || 0;
//             const total = approved + rejected + pending;

//             const maxValue = Math.max(
//               ...chartData.approved,
//               ...chartData.rejected,
//               ...chartData.pending
//             ) * 1.1;

//             const approvedHeight = (approved / maxValue) * 180;
//             const rejectedHeight = (rejected / maxValue) * 180;
//             const pendingHeight = (pending / maxValue) * 180;

//             return (
//               <View key={index} style={styles.barGroup}>
//                 <View style={styles.barContainer}>
//                   {approved > 0 && (
//                     <View
//                       style={[
//                         styles.bar,
//                         {
//                           backgroundColor: '#4285F4',
//                           height: approvedHeight,
//                         },
//                       ]}
//                     />
//                   )}
//                   {rejected > 0 && (
//                     <View
//                       style={[
//                         styles.bar,
//                         {
//                           backgroundColor: '#EA4335',
//                           height: rejectedHeight,
//                           marginTop: 1,
//                         },
//                       ]}
//                     />
//                   )}
//                   {pending > 0 && (
//                     <View
//                       style={[
//                         styles.bar,
//                         {
//                           backgroundColor: '#FBBC05',
//                           height: pendingHeight,
//                           marginTop: 1,
//                         },
//                       ]}
//                     />
//                   )}
//                 </View>
//                 <Text style={styles.barLabel}>
//                   {label.length > 12 ? label.substring(0, 10) + '...' : label}
//                 </Text>
//                 <Text style={styles.amountLabel}>{formatCurrency(total)}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>

//       <View style={styles.axisLabelContainer}>
//         <Text style={styles.axisLabel}>Amount (₹)</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   errorText: {
//     color: '#EA4335',
//     textAlign: 'center',
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: '#888',
//     padding: 15,
//   },
//   customChart: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     height: 220,
//     width: '100%',
//     marginBottom: 10,
//   },
//   barGroup: {
//     alignItems: 'center',
//     width: '18%',
//   },
//   barContainer: {
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: 180,
//   },
//   bar: {
//     width: '70%',
//     borderRadius: 3,
//   },
//   barLabel: {
//     fontSize: 10,
//     marginTop: 5,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   amountLabel: {
//     fontSize: 8,
//     color: '#666',
//     textAlign: 'center',
//   },
//   axisLabelContainer: {
//     alignItems: 'center',
//   },
//   axisLabel: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: 'bold',
//   },
// });

// export default ExpenseHeadChart;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ExpenseHeadChart = ({ claims, policyDetails }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     approved: [],
//     rejected: [],
//     pending: [],
//     isLoading: true,
//     error: null
//   });

//   useEffect(() => {
//     // Make sure we have valid input data
//     if (Array.isArray(claims) && claims.length > 0) {
//       try {
//         const processedData = processExpenseData(claims, policyDetails || []);
//         setChartData({
//           ...processedData,
//           isLoading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error processing expense data:', error);
//         setChartData(prevState => ({
//           ...prevState,
//           isLoading: false,
//           error: 'Failed to process expense data'
//         }));
//       }
//     } else {
//       setChartData(prevState => ({
//         ...prevState,
//         isLoading: false,
//         error: null
//       }));
//     }
//   }, [claims, policyDetails]);

//   const processExpenseData = (claims, policyDetails) => {
//     // Create a map of expense head IDs to names from policyDetails
//     const expenseHeadMap = {};
//     if (Array.isArray(policyDetails) && policyDetails.length) {
//       policyDetails.forEach(policy => {
//         if (policy && policy.main_expense_head_id !== undefined && policy.expense_head_name) {
//           expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
//         }
//       });
//     }
    
//     // Process expense data by category using expense_head_name
//     const expenseHeadData = {};
    
//     // Process each claim
//     if (Array.isArray(claims) && claims.length) {
//       claims.forEach(claim => {
//         if (!claim) return; // Skip invalid claims
        
//         const expenseHeadId = claim.expense_head;
        
//         // Use the expense_head_name from the mapping or fallback
//         const expenseHeadName = expenseHeadMap[expenseHeadId] || 
//                                claim.expense_head_name ||
//                                `Expense ${expenseHeadId}`;
        
//         // Clean and parse claim_amount
//         const rawAmount = claim.claim_amount || "0";
//         const cleanedAmount = rawAmount.toString().replace(/[^0-9.]/g, '');
//         const amount = parseFloat(cleanedAmount) || 0;
        
//         // Normalize status to lowercase and trim
//         const status = (claim.status_of_approval || 'pending').toString().toLowerCase().trim();
        
//         // Add debug logs
//         console.log(`Processing claim: ${expenseHeadName}, status: ${status}, amount: ${amount}`);
        
//         // Skip if amount is 0 or expense head is invalid
//         if (amount <= 0 || expenseHeadId === null || expenseHeadId === undefined) return;
        
//         // Initialize expense head entry if it doesn't exist
//         if (!expenseHeadData[expenseHeadName]) {
//           expenseHeadData[expenseHeadName] = {
//             approved: 0,
//             rejected: 0,
//             pending: 0
//           };
//         }
        
//         // Add amount to appropriate status category
//         if (status === 'approved') {
//           expenseHeadData[expenseHeadName].approved += amount;
//         } else if (status === 'rejected') {
//           expenseHeadData[expenseHeadName].rejected += amount;
//         } else {
//           expenseHeadData[expenseHeadName].pending += amount;
//         }
//       });
//     }

//     // Convert to arrays for chart - using expense_head_name as labels
//     const labels = Object.keys(expenseHeadData);
//     const approvedData = labels.map(name => expenseHeadData[name].approved);
//     const rejectedData = labels.map(name => expenseHeadData[name].rejected);
//     const pendingData = labels.map(name => expenseHeadData[name].pending);
    
//     // Debug output
//     console.log('Processed expense data:', {
//       labels,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData
//     });
    
//     return {
//       labels,
//       approved: approvedData,
//       rejected: rejectedData,
//       pending: pendingData,
//     };
//   };

//   // Format amount with currency symbol
//   const formatCurrency = (amount) => {
//     return `₹ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
//   };

//   if (chartData.isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading expense data...</Text>
//       </View>
//     );
//   }

//   if (chartData.error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{chartData.error}</Text>
//       </View>
//     );
//   }

//   if (chartData.labels.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDataText}>No expense data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Expense Analysis by Category</Text>
      
//       {/* Legend */}
//       <View style={styles.legendContainer}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
//           <Text>Approved</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#EA4335' }]} />
//           <Text>Rejected</Text>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#FBBC05' }]} />
//           <Text>Pending</Text>
//         </View>
//       </View>
      
//       {/* Custom Bar Chart */}
//       <View style={styles.chartContainer}>
//         <View style={styles.customChart}>
//           {chartData.labels.map((label, index) => {
//             const approved = chartData.approved[index] || 0;
//             const rejected = chartData.rejected[index] || 0;
//             const pending = chartData.pending[index] || 0;
//             const total = approved + rejected + pending;
            
//             // Ensure we have some data to show
//             if (total <= 0) return null;
            
//             // Calculate the maximum value for scaling
//             const allValues = [
//               ...chartData.approved, 
//               ...chartData.rejected, 
//               ...chartData.pending
//             ].filter(val => val > 0);
            
//             const maxValue = Math.max(...allValues) * 1.1;
            
//             // Calculate heights based on percentage of max value
//             // Ensure minimum visible height for non-zero values
//             const getHeight = (value) => {
//               if (value <= 0) return 0;
//               return Math.max((value / maxValue) * 180, 5); // Minimum 5px height if not zero
//             };
            
//             const approvedHeight = getHeight(approved);
//             const rejectedHeight = getHeight(rejected);
//             const pendingHeight = getHeight(pending);
            
//             return (
//               <View key={index} style={styles.barGroup}>
//                 <View style={styles.barContainer}>
//                   {/* Stack the bars from bottom to top */}
//                   <View style={styles.stackedBarContainer}>
//                     {/* Approved (bottom) */}
//                     {approved > 0 && (
//                       <View 
//                         style={[
//                           styles.bar, 
//                           { 
//                             backgroundColor: '#4285F4',
//                             height: approvedHeight
//                           }
//                         ]} 
//                       />
//                     )}
                    
//                     {/* Rejected (middle) */}
//                     {rejected > 0 && (
//                       <View 
//                         style={[
//                           styles.bar, 
//                           { 
//                             backgroundColor: '#EA4335',
//                             height: rejectedHeight
//                           }
//                         ]} 
//                       />
//                     )}
                    
//                     {/* Pending (top) */}
//                     {pending > 0 && (
//                       <View 
//                         style={[
//                           styles.bar, 
//                           { 
//                             backgroundColor: '#FBBC05',
//                             height: pendingHeight
//                           }
//                         ]} 
//                       />
//                     )}
//                   </View>
//                 </View>
//                 <Text style={styles.barLabel}>
//                   {label.length > 12 ? label.substring(0, 10) + '...' : label}
//                 </Text>
//                 <Text style={styles.amountLabel}>{formatCurrency(total)}</Text>
//               </View>
//             );
//           })}
//         </View>
//       </View>
      
//       <View style={styles.axisLabelContainer}>
//         <Text style={styles.axisLabel}>Amount (₹)</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 5,
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   errorText: {
//     color: '#EA4335',
//     textAlign: 'center',
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: '#888',
//     padding: 15,
//   },
//   customChart: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'flex-end',
//     height: 220,
//     width: '100%',
//     marginBottom: 10,
//   },
//   barGroup: {
//     alignItems: 'center',
//     width: '18%',
//   },
//   barContainer: {
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: 180,
//   },
//   stackedBarContainer: {
//     width: '70%',
//     height: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   bar: {
//     width: '100%',
//     borderRadius: 3,
//   },
//   barLabel: {
//     fontSize: 10,
//     marginTop: 5,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   amountLabel: {
//     fontSize: 8,
//     color: '#666',
//     textAlign: 'center',
//   },
//   axisLabelContainer: {
//     alignItems: 'center',
//   },
//   axisLabel: {
//     fontSize: 12,
//     color: '#666',
//     fontWeight: 'bold',
//   },
// });

// export default ExpenseHeadChart;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseHeadChart = ({ claims, policyDetails }) => {
  // Create a map of expense head IDs to names from policyDetails
  const expenseHeadMap = {};
  if (Array.isArray(policyDetails) && policyDetails.length) {
    policyDetails.forEach(policy => {
      if (policy && policy.main_expense_head_id !== undefined && policy.expense_head_name) {
        expenseHeadMap[policy.main_expense_head_id] = policy.expense_head_name;
      }
    });
  }
  
  // Process expense data by category
  const processExpenseData = () => {
    const expenseHeadData = {};
    
    // Process each claim
    if (Array.isArray(claims) && claims.length) {
      claims.forEach(claim => {
        if (!claim) return; // Skip invalid claims
        
        const expenseHeadId = claim.expense_head;
        
        // Use the expense_head_name from the mapping or fallback
        const expenseHeadName = expenseHeadMap[expenseHeadId] || 
                               claim.expense_head_name ||
                               `Expense ${expenseHeadId}`;
        
        // Clean and parse claim_amount - IMPORTANT: Accept zero values for counts
        // const rawAmount = claim.claim_amount || "0";
        // const cleanedAmount = rawAmount.toString().replace(/[^0-9.]/g, '');
        // const amount = parseFloat(cleanedAmount) || 0;
       let rawAmount = claim.claim_amount;

// Handle null, undefined, boolean, or malformed string
if (rawAmount == null || typeof rawAmount === 'boolean') {
  rawAmount = "0";
} else if (typeof rawAmount === 'number') {
  rawAmount = rawAmount.toString();
} else if (typeof rawAmount === 'string') {
  rawAmount = rawAmount.replace(/[^\d.]/g, '');
}

if (rawAmount.trim() === '' || isNaN(rawAmount)) {
  rawAmount = "0";
}

const amount = parseFloat(rawAmount);

if (amount === 0 && claim.claim_amount !== 0) {
  console.log(`⚠️ Problematic claim_amount:`, claim.claim_amount, '→ Parsed as:', amount);
}



        // Normalize status to lowercase and trim
        //const status = (claim.status_of_approval || 'pending').toString().toLowerCase().trim();
        let status = (claim.status_of_approval || '').toString().toLowerCase().trim();
if (!['approved', 'rejected', 'pending'].includes(status)) {
  status = 'pending'; // fallback for invalid statuses
}

        // Debug log for troubleshooting
        console.log(`Processing claim: ${expenseHeadName}, status: ${status}, amount: ${amount}`);
        
        // IMPORTANT CHANGE: Don't skip zero amounts - these might be valid approved/rejected claims
        // that just have zero value. This is likely why approved/rejected claims aren't showing.
        // Only skip if expense head is invalid
        if (expenseHeadId === null || expenseHeadId === undefined) return;
        
        // Initialize expense head entry if it doesn't exist
        if (!expenseHeadData[expenseHeadName]) {
          expenseHeadData[expenseHeadName] = {
            approved: 0,
            rejected: 0,
            pending: 0,
            approvedCount: 0,
            rejectedCount: 0,
            pendingCount: 0
          };
        }
        
        // Add amount to appropriate status category
        if (status === 'approved') {
          expenseHeadData[expenseHeadName].approved += amount;
          expenseHeadData[expenseHeadName].approvedCount += 1;
        } else if (status === 'rejected') {
          expenseHeadData[expenseHeadName].rejected += amount;
          expenseHeadData[expenseHeadName].rejectedCount += 1;
        } else {
          expenseHeadData[expenseHeadName].pending += amount;
          expenseHeadData[expenseHeadName].pendingCount += 1;
        }
      });
    }
    
    return expenseHeadData;
  };

  const expenseHeadData = processExpenseData();
  const totals = {
  approvedAmount: 0,
  rejectedAmount: 0,
  approvedCount: 0,
  rejectedCount: 0,
};

Object.values(expenseHeadData).forEach(data => {
  totals.approvedAmount += data.approved;
  totals.rejectedAmount += data.rejected;
  totals.approvedCount += data.approvedCount;
  totals.rejectedCount += data.rejectedCount;
});

console.log('TOTALS:', totals); // You can remove this after verifying

  // Convert to arrays for chart
  const labels = Object.keys(expenseHeadData);
  
  // Format amount with currency symbol
  const formatCurrency = (amount) => {
    return `₹ ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };
  
  // Calculate max value for scaling
  const allValues = [];
  labels.forEach(label => {
    const data = expenseHeadData[label];
    // Use 1 as minimum non-zero height for status bars that have count but zero amount
    if (data.approvedCount > 0) allValues.push(Math.max(data.approved, data.approvedCount > 0 ? 1 : 0));
    if (data.rejectedCount > 0) allValues.push(Math.max(data.rejected, data.rejectedCount > 0 ? 1 : 0));
    if (data.pendingCount > 0) allValues.push(Math.max(data.pending, data.pendingCount > 0 ? 1 : 0));
  });
  
  const maxValue = Math.max(...allValues, 1) * 1.1;
  
  // Get height for bar display - ensure we show bars even for zero amount if count is > 0
  // const getHeight = (value, count) => {
  //   if (count <= 0) return 0;
  //   // If count > 0 but value is 0, show a minimum bar height for visibility
  //   if (value <= 0) return 10;
  //   return Math.max((value / maxValue) * 180, 10); // Minimum 10px for visibility
  // };
const getHeight = (value, count) => {
  if (count <= 0) return 0;
  return value <= 0 ? 10 : Math.max((value / maxValue) * 180, 10);
};

  if (labels.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No expense data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Analysis by Category</Text>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#328E6E' }]} />
          <Text>Approved</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
          <Text>Rejected</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#60B5FF' }]} />
          <Text>Pending</Text>
        </View>
      </View>
      
      {/* Custom Bar Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.customChart}>
          {labels.map((label, index) => {
            const data = expenseHeadData[label];
            const approvedHeight = getHeight(data.approved, data.approvedCount);
            const rejectedHeight = getHeight(data.rejected, data.rejectedCount);
            const pendingHeight = getHeight(data.pending, data.pendingCount);
            
            // Skip if no data to show for this category
            if (approvedHeight + rejectedHeight + pendingHeight <= 0) return null;
            
            return (
              <View key={index} style={styles.barGroup}>
                <View style={styles.barContainer}>
                  <View style={styles.stackedBarContainer}>
                    {/* Approved */}
                    {data.approvedCount > 0 && (
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            backgroundColor: '#328E6E',
                            height: approvedHeight,
                            
                          }
                        ]} 
                      />
                    )}
                    
                    {/* Rejected */}
                    {data.rejectedCount > 0 && (
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            backgroundColor: '#FF0000',
                            height: rejectedHeight
                          }
                        ]} 
                      />
                    )}
                    
                    {/* Pending */}
                    {data.pendingCount > 0 && (
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            backgroundColor: '#60B5FF',
                            height: pendingHeight
                          }
                        ]} 
                      />
                    )}
                  </View>
                </View>
                <Text style={styles.barLabel}>
                  {label.length > 12 ? label.substring(0, 10) + '...' : label}
                </Text>
                <Text style={styles.amountLabel}>
                  {formatCurrency(data.approved + data.rejected + data.pending)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      
      {/* <View style={styles.axisLabelContainer}>
        <Text style={styles.axisLabel}>Amount (₹)</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    padding: 15,
  },
  customChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 220,
    width: '100%',
    marginBottom: 10,
  },
  barGroup: {
    alignItems: 'center',
    width: '18%',
  },
  barContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 180,
  },
  stackedBarContainer: {
    width: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    borderRadius: 3,
  },
  barLabel: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  amountLabel: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 2,
  },
  countLabel: {
    fontSize: 7,
    color: '#444',
    marginHorizontal: 2,
  },
  axisLabelContainer: {
    alignItems: 'center',
  },
  axisLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default ExpenseHeadChart;