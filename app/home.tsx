import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const posts = [
  {
    id: '1',
    user: '@Nguyễn Linh',
    time: '8 giờ trước',
    caption: 'CAPTION',
    image: 'https://via.placeholder.com/300', // Thay link ảnh thật
    likes: 18,
    comments: 3,
  },
  {
    id: '2',
    user: '@Emma Bùi',
    time: '2 ngày trước',
    caption: 'CAPTION',
    image: 'https://via.placeholder.com/300', // Thay link ảnh thật
    likes: 10,
    comments: 2,
  },
];

const HomeScreen = () => {
  const [search, setSearch] = useState('');

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
        data={posts}
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
              <Text>❤️ {item.likes}</Text>
              <Text>💬 {item.comments}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4e8' },

  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#4a6f43' },

  logo: { color: 'white', fontSize: 12, fontWeight: 'bold', marginLeft: 130, marginTop: 5, fontFamily: 'SigmarOne' },  

  headerIcons: { flexDirection: 'row', gap: 15 },

  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, margin: 10, borderRadius: 10 },

  searchInput: { flex: 1, marginLeft: 10 },

  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd' },

  tabActive: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: '#4a6f43' },

  tabInactive: { flex: 1, padding: 10, alignItems: 'center' },

  tabTextActive: { fontWeight: 'bold', color: '#4a6f43' },

  tabTextInactive: { color: 'gray' },

  post: { backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10 },

  postHeader: { flexDirection: 'row', justifyContent: 'space-between' },

  username: { fontWeight: 'bold' },

  time: { color: 'gray' },

  caption: { marginVertical: 5 },

  postImage: { width: '100%', height: 200, borderRadius: 10 },
  
  postActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});

export default  HomeScreen;
