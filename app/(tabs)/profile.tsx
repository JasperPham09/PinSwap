import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
  ActionSheetIOS,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Post = {
  id: string;
  caption: string;
  createdAt: any;
  image?: string;
  likes: number;
  comments: number;
};

export default function ProfileScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const displayName = user?.displayName || "@Username";
  const email = user?.email || "";
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(userPosts);
    });

    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Đăng xuất thành công!", "Bạn đã đăng xuất khỏi tài khoản.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Không thể đăng xuất!");
    }
  };

  const handleSettingsPress = () => {
    const options = ["Chỉnh sửa hồ sơ", "Cài đặt thông báo", "Đăng xuất", "Hủy"];
    const cancelButtonIndex = 3;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          destructiveButtonIndex: 2,
          title: "Tùy chọn cài đặt",
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Alert.alert("Chỉnh sửa hồ sơ");
              break;
            case 1:
              Alert.alert("Cài đặt thông báo");
              break;
            case 2:
              handleLogout();
              break;
          }
        }
      );
    } else {
      Alert.alert("Tùy chọn cài đặt", "", [
        {
          text: "Chỉnh sửa hồ sơ",
          onPress: () => Alert.alert("🔧", "Chỉnh sửa hồ sơ"),
        },
        // {
        //   text: "Cài đặt thông báo",
        //   onPress: () => Alert.alert("🔔", "Cài đặt thông báo"),
        // },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: () => handleLogout(),
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ]);
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.username}>{displayName}</Text>
      <Text style={styles.time}>
        {item.createdAt?.toDate().toLocaleString() ?? ""}
      </Text>
      <Text style={styles.caption}>{item.caption}</Text>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
        />
      )}
      <View style={styles.iconRow}>
        <Ionicons name="heart-outline" size={20} />
        <Text style={styles.iconText}>{item.likes}</Text>
        <Ionicons
          name="chatbubble-outline"
          size={20}
          style={styles.iconSpacing}
        />
        <Text style={styles.iconText}>{item.comments}</Text>
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
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="book-outline" label="Hướng dẫn" onPress={() => router.push("/(screen)/guide")} />
        <MenuItem icon="leaf-outline" label="Yêu cầu thu gom" onPress={() => router.push("/(screen)/request")} />
        <MenuItem icon="gift-outline" label="Đổi quà" onPress={() => Alert.alert("🎁", "Bạn đã đổi được iPhone 16 Pro Max")} />
        <MenuItem icon="clipboard-outline" label="Bài học" onPress={() => router.push("/(screen)/learning")} />
        <MenuItem icon="time-outline" label="Lịch sử" onPress={() => Alert.alert("🕘", "Phạm Quốc Bảo 10A3")} />
      </View>

      {/* Danh sách bài đăng cá nhân */}
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
  caption: { marginTop: 5 },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  iconText: { marginLeft: 4 },
  iconSpacing: { marginLeft: 16 },
});
