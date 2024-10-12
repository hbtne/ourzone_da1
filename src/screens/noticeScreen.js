import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoticeScreen = () => {
  const initialNotifications = [
    { id: 1, message: 'HBT và 2 người khác đã thích video của bạn', time: '2 phút trước', read: false },
    { id: 2, message: 'HBT đã bình luận về video của bạn', time: '2 phút trước', read: true },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notice</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => markAsRead(item.id)}
          >
            <Text style={[styles.notificationText, item.read ? styles.read : styles.unread]}>
              {item.message}
            </Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    padding: 20,
    flex: 1,
    color: '#fff',
  },
  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 30,
    color: '#738F81',
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(115, 143, 129, 0.3)',
    padding: 15,
    borderRadius: 35,
    borderColor:'#738F81',
    marginBottom: 10,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  unread: {
    fontWeight: 'bold',
  },
  read: {
    fontWeight: 'normal',
  },
  timeText: {
    color: '#a8a8a8',
    fontSize: 12,
  },
});

export default NoticeScreen;
