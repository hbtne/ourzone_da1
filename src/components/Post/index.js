import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { Video, Audio } from 'expo-av';
import { getFirestore, collection,addDoc, getDocs, doc,increment,updateDoc, getDoc, query,arrayUnion,auth, where } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns'; 
import { LinearGradient } from 'expo-linear-gradient';
import FollowButton from '../FollowButton';
import HeartButton from '../HeartButton';
import { getAuth } from 'firebase/auth';
import MusicBar from '../MusicBar';
import CommentBottomSheet from '../CommentBottomSheet';
import CommentIcon from '../../../assets/icons/CommentIcon';
import SendIcon from '../../../assets/icons/SendIcon';
import MoreIcon from '../../../assets/icons/MoreIcon';
import styles from './styles';

const Post = ({ item, navigation }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);
  const [sound, setSound] = useState();
  const [videoRef, setVideoRef] = useState(null);
  const [isSoundError, setIsSoundError] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
    const auth = getAuth();
  useEffect(() => {
    if (item.music && !isSoundError) {
      const loadSound = async () => {
        try {
          const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: item.music },
            { shouldPlay: false, isLooping: true }
          );
          setSound(playbackObject);
        } catch (error) {
          console.error("Error loading sound: ", error);
          setIsSoundError(true);
        }
      };

      loadSound();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  }, [item.music, isSoundError]);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const db = getFirestore();
        const postId = item.id;
        console.log("Post ID:", postId);
  
        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef);
  
        if (postDoc.exists()) {
          const postData = postDoc.data();
          const commentList = postData.commentList || [];
          console.log("Comment List:", commentList);
  
          const validCommentList = commentList.filter((id) => id && id.trim() !== "");
          if (validCommentList.length === 0) {
            console.log("No valid comments found for this post");
            return;
          }
  
          const commentsData = [];
  
          for (let commentId of validCommentList) {
            console.log("Fetching comment ID:", commentId);
  
            const commentRef = doc(db, "Comments", commentId);
            const commentDoc = await getDoc(commentRef);
  
            if (commentDoc.exists()) {
              const commentData = commentDoc.data();
              console.log("Processing comment:", commentData);
  
              const timestamp = commentData.timestamp;
              if (!timestamp || !timestamp.seconds) {
                console.error(`Invalid timestamp for comment ID: ${commentId}`);
                continue;
              }
  
              const timeAgo = formatDistanceToNow(
                new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000),
                { addSuffix: true }
              );
  
              const userRef = doc(db, "users", commentData.user);
              const userDoc = await getDoc(userRef);
  
              if (userDoc.exists()) {
                const userData = userDoc.data();
                const replies = Array.isArray(commentData.replies) ? commentData.replies : [];
  
                const repliesData = await Promise.all(
                  replies.map(async (replyId) => {
                    const replyRef = doc(db, "Comments", replyId); 
                    const replyDoc = await getDoc(replyRef);
  
                    if (replyDoc.exists()) {
                      const replyData = replyDoc.data();
                      const replyTimestamp = replyData.timestamp;
                      const replyTimeAgo = formatDistanceToNow(
                        new Date(replyTimestamp.seconds * 1000 + replyTimestamp.nanoseconds / 1000000),
                        { addSuffix: true }
                      );
  
                      const replyUserRef = doc(db, "users", replyData.user);
                      const replyUserDoc = await getDoc(replyUserRef);
  
                      let replyUser = {};
                      if (replyUserDoc.exists()) {
                        replyUser = replyUserDoc.data();
                      }
  
                      return {
                        id: replyDoc.id,
                        value: replyData.value || "No content",
                        userAvatar: replyUser.avatar || '',
                        userName: replyUser.name || 'Unknown User',
                        timestamp: replyTimeAgo,
                      };
                    }
                    return {}; 
                  })
                );
  
                commentsData.push({
                  id: commentId,
                  value: commentData.value || "No content",
                  userName: userData.name || "Unknown User",
                  userAvatar: userData.avatar || '',
                  timestamp: timeAgo,
                  replies: repliesData,
                });
                console.log(commentsData);
              } else {
                console.error(`User with ID ${commentData.user} not found.`);
              }
            } else {
              console.error(`Comment with ID ${commentId} not found.`);
            }
          }
  
          setComments(commentsData);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    fetchComments();
  }, [item.id]);
  
  const handleAddComment = async (commentText) => {
    if (commentText.trim()) {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.error('User not authenticated');
          return;
        }
  
        const db = getFirestore();
        
        const docRef = await addDoc(collection(db, 'Comments'), {
          user: userId,
          post: item.id,
          value: commentText,
          timestamp: new Date(),
          replies: [],
        });
  
        const userRef = doc(db, 'users', userId); 
        const userDoc = await getDoc(userRef);
  
       
        if (userDoc.exists()) {
          const { name, avatar } = userDoc.data();
          
          
          setComments((prevComments) => [
            ...prevComments,
            { 
              id: docRef.id, 
              userName: name,  
              userAvatar: avatar, 
              value: commentText, 
              replies: [] ,
              timestamp:"Just now" 
            }
          ]);
          
         
          const postRef = doc(db, 'posts', item.id);
          await updateDoc(postRef, {
            commentList: arrayUnion(docRef.id),
            comments: increment(1),
          });
  
          setNewComment(''); 
        } else {
          console.error('User data not found');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };
  
  
  const handleAddReply = async (commentId, replyText) => {
    if (replyText.trim()) {
      try {
        const db = getFirestore();
        const userId = auth.currentUser?.uid;
        const replyDocRef = await addDoc(collection(db, 'Comments'), {
          post: item.id,
          user: userId, 
          value: replyText,
          timestamp: new Date(),
          parentCommentId: commentId, 
        });
  
        const commentRef = doc(db, 'Comments', commentId);
        const commentDoc = await getDoc(commentRef);
        if (commentDoc.exists()) {
          const commentData = commentDoc.data();
          const updatedReplies = commentData.replies || [];
          updatedReplies.push(replyDocRef.id);  
  
          await updateDoc(commentRef, {
            replies: updatedReplies,
          });
        }
        const userRef = doc(db, 'users', userId); 
        const userDoc = await getDoc(userRef);
  
       
      
        const { name, avatar } = userDoc.data();
          
        setComments((prevComments) => prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, { id: replyDocRef.id,timestamp:"Just now" , userName: name, userAvatar: avatar,   value: replyText }] }
            : comment
        ));
        const postRef = doc(db, 'posts', item.id);
        await updateDoc(postRef, {
          comments: increment(1), 
        });
        setNewReply('');  
      } catch (error) {
        console.error('Error adding reply:', error);
      }
    }
  };
  
  
  useEffect(() => {
    if (!navigation) return;
  
    const focusListener = navigation.addListener('focus', () => {
      if (sound) {
        sound.stopAsync();
      }
    });
  
    const blurListener = navigation.addListener('blur', () => {
      if (sound) {
        sound.stopAsync();
      }
    });
  
    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation, sound]);
  
  const toggleBottomSheet = () => setBottomSheetVisible(!isBottomSheetVisible);

  const handleLike = (liked) => {
    setLikes((prevLikes) => (liked ? prevLikes + 1 : prevLikes - 1));
    updateLikesInFirebase(item.id, liked ? likes + 1 : likes - 1);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing video from ${item.channelName || 'Unknown'}: ${item.videoUrl}`,
      });
      console.log(result);
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  };

  const updateLikesInFirebase = async (postId, newLikes) => {
    try {
      const db = getFirestore();
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { likes: newLikes });
      console.log('Likes updated successfully!');
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleVideoStatusUpdate = (status) => {
    if (status.didJustFinish || !status.isPlaying) {
      setIsVideoPaused(true);
      if (sound) {
        sound.stopAsync(); 
      }
    } else if (status.isPlaying && sound) {
      sound.playAsync(); 
    }
  };
  
  const handlePause = () => {
    setIsVideoPaused(true);
    if (sound) {
      sound.stopAsync(); 
    }
  };
  

  return (
    <View style={styles.postContainer}>
      {item.videoUrl ? (
        <Video
          ref={setVideoRef}
          source={{ uri: item.videoUrl }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          useNativeControls
          isMuted={isSoundError}
          onPlaybackStatusUpdate={handleVideoStatusUpdate}
  onPause={handlePause} 
        />
      ) : (
        <Text style={styles.errorText}>Video is unavailable</Text>
      )}

      <LinearGradient colors={['transparent', 'rgba(0,0,0,0)']} style={styles.overlayContainer}>
        <View style={styles.channelContainer}>
          <Image
            source={{ uri: item.avatar || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <Text style={styles.channelName}>{item.name || 'Unknown'}</Text>
          <FollowButton />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.caption}>{item.caption}</Text>
          <MusicBar style={styles.musicName} songName={item.music ? item.music.split('/').pop().replace('.mp3', '').replace(/-/g, ' ') : 'No music'} />
        </View>
      </LinearGradient>

      <View style={styles.interactionContainer}>
        <HeartButton likes={likes} onLike={handleLike} postId={item.id} updateLikesInFirebase={updateLikesInFirebase} />

        <TouchableOpacity onPress={() => setIsCommentVisible(true)}  style={styles.buttonContainer} >
          <CommentIcon width={30} height={30} color="#fff" />
          <Text style={styles.countText}>{item.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.buttonContainer}>
          <SendIcon width={30} height={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreButton}>
          <MoreIcon width={24} height={24} color="#fff" />
        </TouchableOpacity>
      </View>

       <CommentBottomSheet
        isVisible={isCommentVisible}
        onClose={() => setIsCommentVisible(false)}
        comments={comments}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
      />
    </View>
  );
};

export default Post; 