import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import Post from '../../../components/Post';
import styles from './styles';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [following, setFollowing] = useState([]);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'All', value: 'all' },
    { label: 'Following', value: 'friends' },
    { label: 'Me', value: 'me' },
  ]);
  const [currentPostPlaying, setCurrentPostPlaying] = useState(null); // Track current post with sound
  const flatListRef = useRef(null);
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid || '';

  // Fetch posts and following data
  const fetchPostsAndFollowing = async () => {
    try {
      const db = getFirestore();

      // Fetch posts
      const postsCollection = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Enrich posts with user data
      const enrichedPosts = await Promise.all(
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
      setPosts(enrichedPosts);

      // Fetch user's following list
      const userDoc = doc(db, 'users', currentUserId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFollowing(userData.followingsList || []);
      }
    } catch (error) {
      console.error('Error fetching posts and users: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch on every screen focus
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true); // Set loading before fetching
      fetchPostsAndFollowing(); // Fetch data when screen is focused
    }, [])
  );

  const getFilteredPosts = () => {
    if (currentFilter === 'me') {
      return posts.filter((post) => post.userId === currentUserId);
    }
    if (currentFilter === 'friends') {
      return posts.filter((post) => following.includes(post.userId));
    }
    return posts;
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    const newVisiblePost = viewableItems[0]?.item.id;

    // Stop sound of the previous post
    if (currentPostPlaying && currentPostPlaying !== newVisiblePost) {
      setCurrentPostPlaying(null); // Stop sound of the previous post
    }

    // Start sound for the new post
    if (newVisiblePost) {
      setCurrentPostPlaying(newVisiblePost); // Set new post as the current post
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Adjust visibility threshold as needed
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
                {items.find((item) => item.value === currentFilter)?.label || 'Filter'}
              </Text>
              <ArrowDownIcon style={styles.dropdownArrowStyle} />
            </TouchableOpacity>
          </View>

          {/* Dropdown Menu */}
          {open && (
            <View style={styles.dropdownStyle}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCurrentFilter(item.value);
                    setOpen(false); // Close dropdown after selection
                  }}
                >
                  <Text style={styles.dropdownTextStyle}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Post List */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <FlatList
            style={styles.postContainer}
            data={getFilteredPosts()}
            renderItem={({ item }) => <Post item={item} currentPostPlaying={currentPostPlaying} />}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            ref={flatListRef}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={<Text style={styles.emptyText}>No posts available</Text>}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
