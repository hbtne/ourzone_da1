import { getFirestore, collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../ourzone_da1/firebase/firebase';  // Import db từ file firebase.js

// Hàm thêm bình luận mới
export const addComment = async (userId, postId, commentValue) => {
  try {
    const newCommentRef = await addDoc(collection(db, 'Comments'), {
      user: userId,
      post: postId,
      value: commentValue,
      reply: [],  // Bình luận gốc không có trả lời
      time: new Date(),
    });

    return newCommentRef.id;  // Trả về ID của bình luận đã tạo
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};

// Hàm thêm câu trả lời (reply) cho một bình luận
export const addReply = async (commentId, userId, replyValue) => {
  try {
    // Tạo câu trả lời mới
    const newReplyRef = await addDoc(collection(db, 'Comments'), {
      user: userId,
      post: '',  // Nếu cần, bạn có thể thêm postId từ comment gốc
      value: replyValue,
      replyy: [],  // Bình luận trả lời không có trả lời thêm nữa
      time: new Date(),
      parentCommentId: commentId,  // Liên kết với comment gốc
    });

    // Cập nhật bình luận gốc, thêm ID của trả lời vào trường replies
    const commentRef = doc(db, 'Comments', commentId);
    await updateDoc(commentRef, {
      replies: arrayUnion(newReplyRef.id),  // Thêm ID của reply vào trường replies
    });

    return newReplyRef.id;  // Trả về ID của câu trả lời đã tạo
  } catch (error) {
    console.error('Error adding reply: ', error);
  }
};
