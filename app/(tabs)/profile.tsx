// app/(screen)/profile.tsx
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
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../utils/supabaseClient";
import uuid from "react-native-uuid";

export default function ProfileScreen() {
  const router = useRouter();
  const user = auth.currentUser;
  const displayName = user?.displayName || "@Username";
  interface Post {
    id: string;
    [key: string]: any;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  interface UserData {
    avatarUrl?: string;
    maxPoints?: number;
    followers?: string[];
    rank?: string;
    // Add other fields as needed
  }
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [maxPoints, setMaxPoints] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setAvatarUrl(data.avatarUrl || null);
          setMaxPoints(data.maxPoints || 0);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Failed to fetch user data.");
      }
    };

    fetchUserData();

    const q = query(
      collection(db, "posts"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
      },
      (error) => {
        console.error("Error fetching posts:", error);
        Alert.alert("Error", "Failed to fetch posts.");
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Đăng xuất thành công!", "Bạn đã đăng xuất khỏi tài khoản.");
      router.replace("/(auth)/login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Không thể đăng xuất!";
      Alert.alert("Lỗi", errorMessage);
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
        { text: "Chỉnh sửa hồ sơ", onPress: () => Alert.alert("🔧", "Chỉnh sửa hồ sơ") },
        { text: "Đăng xuất", style: "destructive", onPress: handleLogout },
        { text: "Hủy", style: "cancel" },
      ]);
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const imageUri = result.assets[0].uri;
        const fileExt = imageUri.split(".").pop();
        const fileName = `${user?.uid}-${uuid.v4()}.${fileExt}`;
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const { error } = await supabase.storage
          .from("avatars")
          .upload(fileName, blob, { upsert: true });

        if (!error) {
          const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
          const publicUrl = data.publicUrl;
          setAvatarUrl(publicUrl);
          if (user) {
            await updateDoc(doc(db, "users", user.uid), { avatarUrl: publicUrl });
          } else {
            console.error("User is null. Cannot update avatar URL.");
          }
        } else {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error("Error changing avatar:", error);
      Alert.alert("Lỗi", "Đổi ảnh đại diện thất bại.");
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.username}>{displayName}</Text>
      <Text style={styles.time}>
        {item.createdAt?.toDate?.().toLocaleString() ?? "Unknown time"}
      </Text>
      <Text style={styles.caption}>{item.caption || "No caption"}</Text>
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
        />
      )}
      <View style={styles.iconRow}>
        <Ionicons name="heart-outline" size={20} />
        <Text style={styles.iconText}>{item.likes || 0}</Text>
        <Ionicons name="chatbubble-outline" size={20} style={styles.iconSpacing} />
        <Text style={styles.iconText}>{item.comments || 0}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require("../../assets/images/avt.png")}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleChangeAvatar}>
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>CÁ NHÂN</Text>
          <Text style={styles.role}>Đội trưởng tái chế</Text>
          <Text style={styles.usernameBig}>{displayName}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statItem}>Điểm: {maxPoints}</Text>
            <Text style={styles.statItem}>Người theo dõi: {userData?.followers?.length ?? 0}</Text>
            <Text style={styles.statItem}>Xếp hạng: {userData?.rank ?? "--"}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
          <FontAwesome name="cog" size={24} color="white" />
        </TouchableOpacity>
      </View>

        <View style={styles.navMenu}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/guide")}>
        <Ionicons name="book-outline" size={24} color="#4C7744" />
        <Text style={styles.navText}>Hướng dẫn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/request")}>
        <Ionicons name="leaf-outline" size={24} color="#4C7744" />
        <Text style={styles.navText}>Thu gom</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/redeem")}>
        <Ionicons name="gift-outline" size={24} color="#4C7744" />
        <Text style={styles.navText}>Đổi quà</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/learning")}>
        <Ionicons name="list-outline" size={24} color="#4C7744" />
        <Text style={styles.navText}>Bài tập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/history")}>
        <Ionicons name="time-outline" size={24} color="#4C7744" />
        <Text style={styles.navText}>Lịch sử</Text>
      </TouchableOpacity>
    </View>

      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#4C7744",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: { position: "relative", marginRight: 10 },
  avatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "#fff" },
  editIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#000", borderRadius: 12, padding: 2 },
  infoContainer: { flex: 1, alignItems: "center" },
  settingsButton: { marginLeft: 10 },
  title: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  role: { color: "#fff", fontWeight: "600", marginTop: 4 },
  usernameBig: { fontSize: 16, fontWeight: "bold", color: "#FFD700", marginVertical: 5 },
  statsRow: { flexDirection: "row", marginTop: 6, gap: 10 },
  statItem: { color: "#fff", fontSize: 12 },
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
  iconRow: { flexDirection: "row", marginTop: 10, alignItems: "center" },
  iconText: { marginLeft: 4 },
  iconSpacing: { marginLeft: 16 },
  navMenu: {
  backgroundColor: "#D6EFC7",
  flexDirection: "row",
  justifyContent: "space-around",
  paddingVertical: 10,
  borderBottomColor: "#ccc",
  borderBottomWidth: 1,
},
navItem: {
  alignItems: "center",
  justifyContent: "center",
  width: 60,
},
navText: {
  marginTop: 4,
  fontSize: 10,
  color: "#333",
  textAlign: "center",
},

});
