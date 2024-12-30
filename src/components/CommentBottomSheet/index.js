import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import styles from './styles';

const CommentBottomSheet = ({ isVisible, onClose, comments, onAddComment, onAddReply }) => {
  if (!isVisible) return null;

  const [newComment, setNewComment] = React.useState('');
  const [newReplies, setNewReplies] = React.useState({});
  const [showReplies, setShowReplies] = React.useState({}); 

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    const replyText = newReplies[commentId];
    if (replyText.trim()) {
      onAddReply(commentId, replyText);
      setNewReplies((prev) => ({
        ...prev,
        [commentId]: '', 
      }));
    }
  };

  const handleChangeReply = (commentId, text) => {
    setNewReplies((prev) => ({
      ...prev,
      [commentId]: text,
    }));
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], 
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}/>
        <Text style={styles.title}>Bình luận</Text>

        <ScrollView style={styles.scrollContainer}
  contentContainerStyle={styles.scrollContent}
 keyboardShouldPersistTaps="handled">
          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>Chưa có bình luận nào</Text>
          ) : (
            comments.map((comment) => (
              <View key={comment.id} style={styles.commentContainer}>
                <View style={styles.userInfoContainer}>
                  <Image source={{ uri: comment.userAvatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.userName}>{comment.userName}</Text>
                    <Text style={styles.commentTime}>{comment.timestamp}</Text>
                  </View>
                </View>
                <Text style={styles.commentText}>{comment.value}</Text>

                <TouchableOpacity onPress={() => toggleReplies(comment.id)} style={styles.showRepliesButton}>
                  <Text style={styles.showRepliesButtonText}>
                    {showReplies[comment.id] ? 'Ẩn trả lời' : 'Xem trả lời'}
                  </Text>
                </TouchableOpacity>

                {showReplies[comment.id] && comment.replies?.length > 0 && (
                  <View style={styles.repliesContainer}>
                    {comment.replies.map((reply, index) => (
                      <View key={index} style={styles.replyContainer}>
                        <View style={styles.userInfoContainer}>
                          <Image source={{ uri: reply.userAvatar }} style={styles.avatar} />
                          <View>
                          <Text style={styles.userName}>{reply.userName}</Text>
                          <Text style={styles.commentTime}>{reply.timestamp}</Text>
                        </View>
                        </View>
                        <Text style={styles.replyText}>{reply.value}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Input trả lời */}
                {showReplies[comment.id] && (
                  <>
                    <TextInput
                      placeholder="Trả lời..."
                      value={newReplies[comment.id] || ''}
                      onChangeText={(text) => handleChangeReply(comment.id, text)}
                      style={styles.replyInput}
                    />
                    <TouchableOpacity
                      onPress={() => handleAddReply(comment.id)}
                      style={styles.replyButton}
                    >
                      <Text style={styles.replyButtonText}>Đăng trả lời</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))
          )}
        </ScrollView>

        {/* Input bình luận mới */}
        <TextInput
          placeholder="Viết bình luận..."
          value={newComment}
          onChangeText={setNewComment}
          style={styles.commentInput}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Đăng bình luận</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
};

export default CommentBottomSheet;
