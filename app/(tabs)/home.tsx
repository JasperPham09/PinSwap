// home.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { useRouter, router } from 'expo-router';
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

type Post = {
  id: string;
  name: string;
  content: string;
  createdAt: Timestamp;
  comments: string;
  // image:,
  likes: string;
  caption: string;
  users: string;
};

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postData);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  
  const filteredPosts = posts.filter(
    (post) =>
      (post.caption || '').toLowerCase().includes(search.toLowerCase()) ||
      (post.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>PINSWAP</Text>       
        <TouchableOpacity style={styles.announcement}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.search}>
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push("/(screen)/post")}>
        <Ionicons name="person-circle" size={30} color="gray" />
          <Text style={{opacity: 0.5, marginLeft: 5}}>
            Chia sẻ
          </Text>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Gợi ý</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabTextInactive}>Đang theo dõi</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách bài đăng */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Text style={styles.username}>{item.name || "Ẩn danh"}</Text>
              <Text style={styles.time}>
              {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "Đang cập nhật"}
            </Text>

            </View>
            <Text style={styles.caption}>{item.content}</Text>
            {/* <Image source={{ uri: item.image }} style={styles.postImage} /> */}
            <View style={styles.postActions}>
              <Ionicons name="heart-outline" size={20} />
              <Text style={styles.actionText}>{item.likes}</Text>
              <Ionicons name="chatbubble-outline" size={20} style={{ marginLeft: 15 }} />
              <Text style={styles.actionText}>{item.comments}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4e8' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#4a6f43',
    alignItems: 'center',
  },

  logo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 125,
  },

  announcement: { flexDirection: 'row', gap: 15, marginRight: -40 },

  search: { flexDirection: 'row', gap: 15},

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  // searchInput: { flex: 1, marginLeft: 10 },

  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  tabActive: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#4a6f43',
  },

  tabInactive: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  tabTextActive: {
    fontWeight: 'bold',
    color: '#4a6f43',
  },

  tabTextInactive: {
    color: 'gray',
  },

  post: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  username: {
    fontWeight: 'bold',
  },

  time: {
    color: 'gray',
  },

  caption: {
    marginVertical: 5,
  },

  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  actionText: {
    marginLeft: 5,
  },
});

