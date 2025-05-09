import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { router } from "expo-router";
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function PostScreen() {
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    const content = postContent.trim();

    if (!content) {
      Alert.alert("Lỗi", "Bài viết không được để trống!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để đăng bài!");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        name: user.displayName || "Ẩn danh",
        content,
        createdAt: serverTimestamp(),
        points: 1,
      });

      Alert.alert("Thành công", "Bài viết đã được đăng!");
      setPostContent("");
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      Alert.alert("Lỗi", "Không thể đăng bài. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >   
    <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
        <Ionicons name="arrow-back" size={24} color="#4C7744" />
    </TouchableOpacity>

      <Text style={styles.title}>Đăng bài viết</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Viết nội dung tại đây..."
        value={postContent}
        onChangeText={setPostContent}
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handlePost}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>ĐĂNG BÀI</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    height: 150,
    textAlignVertical: "top",
    borderColor: "#3D6D4A",
    borderWidth: 1,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#3D6D4A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
