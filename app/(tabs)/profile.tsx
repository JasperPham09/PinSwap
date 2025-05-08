// profile.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter, router } from "expo-router";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Profile: undefined;
  Map: undefined;
};

const posts = [
  {
    id: "1",
    username: "@Username",
    time: "2 giờ trước",
    caption: "Chung tay bảo vệ môi trường 🌎",
    likes: 4,
    comments: 1,
    saves: 1,
  },
  {
    id: "2",
    username: "@Username",
    time: "3 ngày trước",
    caption: "Thu gom pin cũ - Bảo vệ trái đất! 🔋",
    likes: 6,
    comments: 0,
    saves: 3,
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = auth.currentUser;
  const displayName = user?.displayName || "@Username";
  const email = user?.email || "";

  const handleSettingsPress = () => {
    Alert.alert("⚙️", "Bạn đã nhấn Cài đặt!");
  };

  const handleMenuPress = (label: string) => {
    Alert.alert(`📚`, `Bạn đã chọn: ${label}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Đăng xuất thành công!", "Bạn đã đăng xuất khỏi tài khoản.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể đăng xuất!");
    }
  };

  const renderPostItem = ({ item }: { item: typeof posts[number] }) => (
    <View style={styles.postCard}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.caption}>{item.caption}</Text>
      <View style={styles.iconRow}>
        <Ionicons name="heart-outline" size={20} />
        <Text style={styles.iconText}>{item.likes}</Text>
        <Ionicons name="chatbubble-outline" size={20} style={styles.iconSpacing} />
        <Text style={styles.iconText}>{item.comments}</Text>
        <Ionicons name="bookmark-outline" size={20} style={styles.iconSpacing} />
        <Text style={styles.iconText}>{item.saves}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
          <FontAwesome name="cog" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.title}>CÁ NHÂN</Text>
          <Text style={styles.team}>Đội trưởng tái chế</Text>
          <Text style={styles.usernameBig}>{displayName}</Text>
          <Text style={styles.emailText}>{email}</Text>
          <Text style={styles.stats}>
            Điểm: 38 | Theo dõi: 16 | Người theo dõi: 12 | Xếp hạng: 10
          </Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="book-outline" label="Hướng dẫn" onPress={() => router.push("/(screen)/guide")} />
        <MenuItem icon="map-outline" label="Bản đồ" onPress={() => router.push("/(tabs)/map")} />
        <MenuItem icon="gift-outline" label="Đổi quà" onPress={() => handleMenuPress("Đổi quà")} />
        <MenuItem icon="clipboard-outline" label="Bài học" onPress={() => router.push("/(screen)/learning")} />
        <MenuItem icon="time-outline" label="Lịch sử" onPress={() => handleMenuPress("Lịch sử")} />
      </View>

      {/* Bài đăng */}
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

const MenuItem = ({ icon, label, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#4C7744",
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: { flex: 1, alignItems: "center" },
  settingsButton: { marginRight: 10 },
  title: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  team: { color: "#fff", marginTop: 5 },
  usernameBig: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginVertical: 5,
  },
  emailText: {
    fontSize: 12,
    color: "#fff",
  },
  stats: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  menu: {
    backgroundColor: "#CFE5C9",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
    width: "18%",
    marginVertical: 10,
  },
  menuLabel: { fontSize: 12, marginTop: 5, textAlign: "center" },
  postCard: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  username: { fontWeight: "bold" },
  time: { color: "#666", fontSize: 12 },
  caption: { marginTop: 5, marginBottom: 10 },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  iconText: { marginLeft: 4 },
  iconSpacing: { marginLeft: 16 },
});