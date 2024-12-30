import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import Post from '../../../components/Post';
import styles from './styles';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [following, setFollowing] = useState([]);
  const [open, setOpen] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid || '';

  const items = [
    { label: 'All', value: 'all' },
    { label: 'Following', value: 'friends' },
    { label: 'Me', value: 'me' },
  ];

  const fetchFollowingList = async () => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', currentUserId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setFollowing(userData.followingsList || []);
    }
  };

  const fetchPosts = async (lastVisible) => {
    const db = getFirestore();
    const postsCollection = collection(db, 'posts');
    const postsQuery = lastVisible
      ? query(
          postsCollection,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(1)  
        )
      : query(postsCollection, orderBy('createdAt', 'desc'), limit(1));
  
    const postsSnapshot = await getDocs(postsQuery);
    const postsList = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLastVisible(postsSnapshot.docs[postsSnapshot.docs.length - 1]);
    setHasMore(postsSnapshot.docs.length > 0);
    return postsList;
  };
  

  const enrichPostsWithUserData = async (postsList) => {
    const db = getFirestore();
    return Promise.all(
      postsList.map(async (post) => {
        const userDoc = doc(db, 'users', post.userId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.exists() ? userSnapshot.data() : {};
        return {
          ...post,
          name: userData.name || 'Unknown',
          avatar: userData.avatar || '',
        };
      })
    );
  };

  const loadPosts = async (lastVisible = null) => {
    try {
      setIsLoading(true);
      const postsList = await fetchPosts(lastVisible);
      const enrichedPosts = await enrichPostsWithUserData(postsList);
      setPosts((prevPosts) =>
        lastVisible ? [...prevPosts, ...enrichedPosts] : enrichedPosts
      );
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredPosts = () => {
    if (currentFilter === 'me') {
      return posts.filter((post) => post.userId === currentUserId);
    }
    if (currentFilter === 'friends') {
      return posts.filter((post) => following.includes(post.userId));
    }
    return posts;
  };

  useFocusEffect(
    React.useCallback(() => {
      setPosts([]);
      setLastVisible(null);
      setHasMore(true);
      loadPosts();
      fetchFollowingList();
    }, [])
  );


  const onEndReachedHandler = () => {
    if (hasMore && !isLoading) {
      loadPosts(lastVisible);  
    }
  };
  
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0]?.index || 0;
      setCurrentIndex(index);  
    }
  }, []);
  
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Text style={styles.title}>Reel</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setOpen(!open)}
            >
              <Text style={styles.dropdownTextStyle}>
                {items.find((item) => item.value === currentFilter)?.label ||
                  'Filter'}
              </Text>
              <ArrowDownIcon style={styles.dropdownArrowStyle} />
            </TouchableOpacity>
          </View>
          {open && (
            <View style={styles.dropdownStyle}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCurrentFilter(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.dropdownTextStyle}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {isLoading && posts.length === 0 ? (
          <View style={styles.loadingFooter}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <FlatList
  ref={flatListRef}
  data={getFilteredPosts()}
  renderItem={({ item, index }) => (
    <Post item={item} isPlaying={index === currentIndex} />
  )}
  keyExtractor={(item) => item.id}
  onEndReached={onEndReachedHandler}
  onEndReachedThreshold={0.5}
  pagingEnabled 
  initialNumToRender={5}  
  maxToRenderPerBatch={5}  
  removeClippedSubviews={true}  
  windowSize={1}  
  onViewableItemsChanged={onViewableItemsChanged}
  viewabilityConfig={viewabilityConfig}
/>

        

        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;