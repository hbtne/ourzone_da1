// index.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CommentBottomSheet = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Không render nếu không hiển thị

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bình luận</Text>
        <Text style={styles.commentText}>Đây là phần bình luận.</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentBottomSheet;
