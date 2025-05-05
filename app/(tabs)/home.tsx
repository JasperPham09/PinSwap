// home.tsx
import React, { useState } from 'react';
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

const posts = [
  {
    id: '1',
    user: '@Nguyễn Linh',
    time: '8 giờ trước',
    caption: 'Hãy cùng nhau thu gom pin và bảo vệ môi trường!',
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/376/618/products/pin-tieu-aaa-danh-cho-can-dien-tu.jpg?v=1610963294877',
    likes: 18,
    comments: 3,
  },
  {
    id: '2',
    user: '@Emma Bùi',
    time: '2 ngày trước',
    caption: 'Đừng vứt pin vào thùng rác, hãy đến điểm thu gom gần nhất!',
    image: 'https://cdn.s99.vn/ss1/prod/product/4b351d4513f239e4fe2a6319ebf0e159.jpg',
    likes: 10,
    comments: 2,
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(
    (post) =>
      post.caption.toLowerCase().includes(search.toLowerCase()) ||
      post.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>PINSWAP</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Ionicons name="search-outline" size={24} color="white" />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="person-circle" size={30} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Chia sẻ"
          placeholderTextColor="gray"
          value={search}
          onChangeText={setSearch}
        />
      </View>

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
              <Text style={styles.username}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.caption}>{item.caption}</Text>
            <Image source={{ uri: item.image }} style={styles.postImage} />
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
  },

  logo: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerIcons: { flexDirection: 'row', gap: 15 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  searchInput: { flex: 1, marginLeft: 10 },

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

