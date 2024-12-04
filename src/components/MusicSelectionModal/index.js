// MusicSelectionModal.js

import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from './styles'; // Import styles

const MusicSelectionModal = ({ musicList, onSelectMusic, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Select a Music Track</Text>
        <FlatList
  data={musicList}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => onSelectMusic(item.secure_url)}>
      {/* Bọc chuỗi văn bản trong <Text> */}
      <Text>{item.public_id}</Text>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.public_id}
/>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MusicSelectionModal;
