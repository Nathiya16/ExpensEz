
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASEPATH } from '../config';
import DropDownPicker from 'react-native-dropdown-picker';
import { useTheme } from '../../theme/useTheme';
import moment from 'moment';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const [dateOpen, setDateOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [dateValue, setDateValue] = useState('all');
  const [statusValue, setStatusValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dateItems = [
    { label: 'Today', value: 'today' },
    { label: 'All', value: 'all' },
  ];

  const statusItems = [
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'All', value: 'all' },
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
  try {
    const emp_id = await AsyncStorage.getItem('username');
    const company_id = await AsyncStorage.getItem('companyname');
    const readStatusesStr = await AsyncStorage.getItem('readStatuses');
    const readStatuses = readStatusesStr ? JSON.parse(readStatusesStr) : [];

    const response = await axios.get(
      `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
    );

    // Existing claim status notifications
    const rawNotifications = response.data?.status_claims_notifications || [];

    const formatted = rawNotifications.map((item) => {
      const approver = item.approver_name || item.approver_id || 'Someone';
      const status = item.status_of_approval;
      const action =
        status === 'Approved'
          ? 'approved'
          : status === 'Rejected'
          ? 'rejected'
          : 'updated';

      return {
        id: item.id,
        message: `${approver} ${action} your claim`,
        status_read: readStatuses.includes(item.id) ? 'read' : 'unread',
        created_at: item.created_at,
        type: 'status',
      };
    });

    // Claim request (approval) notifications
    const approvalClaimData = response.data?.approval_claim_data?.approval_hiery_data || [];

    const approvalNotifications = approvalClaimData.map((item) => ({
      id: `approval_${item.claim_id}`,
      message: `Claim requested by ${item.emp_name}`,
      note: 'You have a claim to review',
      status_read: readStatuses.includes(`approval_${item.claim_id}`) ? 'read' : 'unread',
      created_at: item.created_at,
      type: 'approval',
    }));
// Combine both types
const allFormatted = [...formatted, ...approvalNotifications];

// Deduplicate based on visible content (not just ID)
const seen = new Set();
const uniqueNotifications = [];

for (const item of allFormatted) {
  const key = `${item.message}|${item.type}|${item.created_at}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueNotifications.push(item);
  }
}

// Sort by created date
uniqueNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

setAllNotifications(uniqueNotifications);
setNotifications(uniqueNotifications);

// Store unread count
const unreadCount = uniqueNotifications.filter((n) => n.status_read === 'unread').length;
await AsyncStorage.setItem('unreadCount', unreadCount.toString());

    // // Combine and deduplicate
    // const allFormatted = [...formatted, ...approvalNotifications];

    // const uniqueNotifications = Array.from(
    //   new Map(allFormatted.map((item) => [item.id, item])).values()
    // );

    // // Sort by created_at descending
    // uniqueNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // setAllNotifications(uniqueNotifications);
    // setNotifications(uniqueNotifications);

    // // Store unread count
    // const unreadCount = uniqueNotifications.filter((n) => n.status_read === 'unread').length;
    // await AsyncStorage.setItem('unreadCount', unreadCount.toString());
  } catch (error) {
    console.log('Error fetching notifications:', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    let filtered = [...allNotifications];

    if (dateValue === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(item => item.submitted_date === today);
    }

    if (statusValue && statusValue !== 'all') {
      filtered = filtered.filter(item => {
        const cleanStatus = item.status_of_approval?.trim().toLowerCase();
        return cleanStatus === statusValue.toLowerCase();
      });
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.message?.toLowerCase().includes(query) ||
        item.approver_name?.toLowerCase().includes(query) ||
        item.status_of_approval?.toLowerCase().includes(query)
      );
    }

    setNotifications(filtered);
  }, [dateValue, statusValue, searchQuery, allNotifications]);

  // const markAsRead = async (id) => {
  //   // Update the notification status in state
  //   const updatedNotifications = notifications.map((notif) =>
  //     notif.id === id ? { ...notif, status_read: 'read' } : notif
  //   );
  //   setNotifications(updatedNotifications);

  //   // Save the read notification ID to AsyncStorage
  //   const readStatuses = await AsyncStorage.getItem('readStatuses');
  //   let updatedReadStatuses = readStatuses ? JSON.parse(readStatuses) : [];
    
  //   // Only add to readStatuses if it's not already added
  //   if (!updatedReadStatuses.includes(id)) {
  //     updatedReadStatuses.push(id);
  //     await AsyncStorage.setItem('readStatuses', JSON.stringify(updatedReadStatuses));
  //   }
  // };

  const markAsRead = async (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, status_read: 'read' } : notif
    );
    setNotifications(updatedNotifications);
    setAllNotifications(updatedNotifications);
  
    const readStatusesStr = await AsyncStorage.getItem('readStatuses');
    const readStatuses = readStatusesStr ? JSON.parse(readStatusesStr) : [];
  
    if (!readStatuses.includes(id)) {
      readStatuses.push(id);
      await AsyncStorage.setItem('readStatuses', JSON.stringify(readStatuses));
      const newUnreadCount = updatedNotifications.filter(n => n.status_read === 'unread').length;
await AsyncStorage.setItem('unreadCount', newUnreadCount.toString());

    }
  };
  const renderItem = ({ item }) => {
  //const relativeTime = moment(item.created_at).fromNow(); // Format the time
  const relativeTime = moment.utc(item.created_at).local().fromNow();

  return (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        item.status_read === 'unread' && styles.unreadNotification,
        { backgroundColor: theme.background },
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.row}>
        <View style={[styles.avatarContainer, { color: theme.text }]}>
          {item.approver_image_url ? (
            <Image source={{ uri: item.approver_image_url }} style={[styles.avatar]} />
          ) : (
            <View style={[styles.avatar, styles.defaultAvatar]}>
              <Icon name="person" size={24} color="#888" />
            </View>
          )}

          {item.status_read === 'unread' && <View style={styles.unreadDot} />}
        </View>

        <View style={[styles.messageContainer, { backgroundColor: theme.background, color: theme.text }]}>
          <Text style={[styles.mainMessage, { color: theme.text }]}>
            {item.type === 'status' ? (
              <>
                <Text style={styles.boldText}>{item.message.split(' ')[0]}</Text>
                {' ' + item.message.split(' ').slice(1).join(' ')}
              </>
            ) : item.type === 'approval' ? (
              <>
                Claim requested by{' '}
                <Text style={styles.boldText}>{item.message.replace('Claim requested by ', '')}</Text>
              </>
            ) : (
              item.message
            )}
          </Text>
          <Text style={[styles.date, { color: theme.text }]}>{relativeTime}</Text> {/* Display relative time */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDateOpen(false);
        setStatusOpen(false);
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={[styles.container,{backgroundColor:theme.background}]}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerTitle, {color:theme.text}]}>Notifications</Text>
        </View>

        <View style={[styles.searchBar,{backgroundColor:theme.background}, {color:theme.text}]}>
          <Icon name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search Notifications"
            style={[styles.searchInput,{color:theme.text}]}
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterRow}>
          <View style={styles.dropdownWrapper}>
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
            />
          </View>
        </View>

        <FlatList
          data={notifications}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: 'gray' }}>
                No notifications found.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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
    width: '100%',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  dropdown: {
    borderColor: '#888',
    backgroundColor: 'white',
    minHeight: 40,
  },
  dropdownText: {
    color: 'black',
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderColor: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
 
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // light separator line
    backgroundColor: '#fff',
  },
  
  // unreadNotification: {
  //   backgroundColor: '#7E8356'
    
  // },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 12,
  },
  defaultAvatar: {
  backgroundColor: '#e0e0e0',
  justifyContent: 'center',
  alignItems: 'center',
},

  messageContainer: {
    flex: 1,

  },
  mainMessage: {
    fontSize: 16,
    color: '#333',
    marginLeft:20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: '#888',
    marginLeft:20,
  },
  
  
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50', // match your green
    borderWidth: 1,
    borderColor: 'white', // optional: adds a clean border
  },
  avatar: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#e0e0e0', // ensure a background is always present
  justifyContent: 'center',
  alignItems: 'center',
},
avatarContainer: {
  position: 'relative',
  width: 44,
  height: 44,
  marginRight: 12,
  justifyContent: 'center',
  alignItems: 'center',
},

});

export default NotificationScreen;
