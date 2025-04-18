// // File: signup.tsx
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ScrollView } from "react-native";
// import axios from "axios";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { FontAwesome } from '@expo/vector-icons';
// import ProfileScreen from "./profile";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import auth from "@react-native-firebase/auth";
// import * as firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/firestore';
// import MapComponent from '@/components/MapComponent';


// type RootStackParamList = {
//   Register: undefined;
//   Login: undefined;
//   Profile: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const saveUserData = async () => {
//     if (!name || !email || !password) {
//       Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
//       return;
//     }

//     try {
//       // Register user with Firebase Authentication
//       await auth().createUserWithEmailAndPassword(email, password);

//       // Save user data to the backend
//       await axios.post("http://192.168.1.12:5000/register", { name, email, password });

//       Alert.alert("Thành công", "Đăng ký thành công!");
//       navigation.navigate("Profile");
//     } catch (error: any) {
//       if (error.code === "auth/email-already-in-use") {
//         Alert.alert("Lỗi", "Email này đã được sử dụng!");
//       } else if (error.code === "auth/invalid-email") {
//         Alert.alert("Lỗi", "Email không hợp lệ!");
//       } else if (error.code === "auth/weak-password") {
//         Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
//       } else {
//         Alert.alert("Lỗi", error.message || "Có lỗi xảy ra!");
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         PIN<Text style={styles.highlight}>SWAP</Text>
//       </Text>
//       <Text style={styles.subtitle}>Vì Trái Đất xanh</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Tên"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email hoặc số điện thoại"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mật khẩu"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <TouchableOpacity style={styles.button} onPress={saveUserData}>
//         <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
//       </TouchableOpacity>

//       <Text style={styles.footerText}>
//         Bạn đã có tài khoản?{" "}
//         <Text
//           style={styles.linkText}
//           onPress={() => navigation.navigate("Login")}
//         >
//           Đăng nhập
//         </Text>
//       </Text>
//     </View>
//   );
// };

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F5F5E6', padding: 20 }}>
//       {/* Header */}
//       <View style={{ backgroundColor: '#4C7744', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 40, alignItems: 'center' }}>
//         <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFD700' }}>PIN</Text>
//         <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000' }}>SWAP</Text>
//         <Text style={{ color: '#FFD700', marginTop: 5 }}>Vì Trái Đất xanh</Text>
//       </View>

//       {/* Tabs */}
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
//         <TouchableOpacity style={{ backgroundColor: '#4C7744', padding: 10, borderRadius: 20, marginRight: 10 }}>
//           <Text style={{ color: 'white' }}>Đăng nhập</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{ borderWidth: 1, borderColor: '#4C7744', padding: 10, borderRadius: 20 }}>
//           <Text style={{ color: '#4C7744' }}>Đăng ký</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Input Fields */}
//       <TextInput 
//         style={{ borderWidth: 1, borderColor: '#4C7744', borderRadius: 10, padding: 10, marginBottom: 15 }}
//         placeholder='Email hoặc số điện thoại'
//         placeholderTextColor='#888'
//         value={email}
//         onChangeText={setEmail}
//       />
      
//       <TextInput 
//         style={{ borderWidth: 1, borderColor: '#4C7744', borderRadius: 10, padding: 10, marginBottom: 15 }}
//         placeholder='Mật khẩu'
//         placeholderTextColor='#888'
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
      
//       {/* Login Button */}
//       <TouchableOpacity style={{ backgroundColor: '#4C7744', padding: 15, borderRadius: 10, alignItems: 'center' }}>
//         <Text style={{ color: 'white', fontSize: 16 }}>ĐĂNG NHẬP</Text>
//       </TouchableOpacity>

//       {/* Sign up link */}
//       <Text style={{ textAlign: 'center', marginTop: 20 }}>Bạn chưa có tài khoản?{" "}
//         <Text style={{ fontWeight: 'bold', color: '#3D6D4A', textDecorationLine: "underline" }} onPress={() => navigation.navigate("Register")}>Vui lòng đăng ký</Text>
//       </Text>
//     </View>
//   );
// };

// export default function App() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ title: "Đăng Ký" }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ title: "Đăng Nhập" }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ title: "Tài Khoản" }}
//       />
//     </Stack.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "#F5F5DC",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#3D6D4A",
//   },
//   highlight: {
//     color: "#FFD700",
//   },
//   subtitle: {
//     textAlign: "center",
//     color: "#3D6D4A",
//     marginBottom: 30,
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 15,
//     borderColor: "#3D6D4A",
//     borderWidth: 1,
//   },
//   button: {
//     backgroundColor: "#3D6D4A",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   footerText: {
//     textAlign: "center",
//     marginTop: 10,
//   },
//   linkText: {
//     fontWeight: "bold",
//     color: "#3D6D4A",
//     textDecorationLine: "underline",
//   },
// });

// signup.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ProfileScreen from "./profile";
import { auth } from "../firebaseConfig"; // 👈 Firebase Web SDK
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const saveUserData = async () => {
    if (!name || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await axios.post("http://192.168.1.12:5000/register", { name, email, password });
      Alert.alert("Thành công", "Đăng ký thành công!");
      navigation.navigate("Profile");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Lỗi", "Email này đã được sử dụng!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Lỗi", "Email không hợp lệ!");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
      } else {
        Alert.alert("Lỗi", error.message || "Có lỗi xảy ra!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PIN<Text style={styles.highlight}>SWAP</Text>
      </Text>
      <Text style={styles.subtitle}>Vì Trái Đất xanh</Text>

      <TextInput style={styles.input} placeholder="Tên" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email hoặc số điện thoại" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={saveUserData}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Bạn đã có tài khoản?{" "}
        <Text style={styles.linkText} onPress={() => navigation.navigate("Login")}>
          Đăng nhập
        </Text>
      </Text>
    </View>
  );
};

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Thành công", "Đăng nhập thành công!");
      navigation.navigate("Profile");
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đăng nhập thất bại");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5E6", padding: 20 }}>
      <View style={{ backgroundColor: "#4C7744", borderBottomLeftRadius: 50, borderBottomRightRadius: 50, padding: 40, alignItems: "center" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#FFD700" }}>PIN</Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#000" }}>SWAP</Text>
        <Text style={{ color: "#FFD700", marginTop: 5 }}>Vì Trái Đất xanh</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
        <TouchableOpacity style={{ backgroundColor: "#4C7744", padding: 10, borderRadius: 20, marginRight: 10 }}>
          <Text style={{ color: "white" }}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#4C7744", padding: 10, borderRadius: 20 }}>
          <Text style={{ color: "#4C7744" }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={{ borderWidth: 1, borderColor: "#4C7744", borderRadius: 10, padding: 10, marginBottom: 15 }} placeholder="Email hoặc số điện thoại" placeholderTextColor="#888" value={email} onChangeText={setEmail} />
      <TextInput style={{ borderWidth: 1, borderColor: "#4C7744", borderRadius: 10, padding: 10, marginBottom: 15 }} placeholder="Mật khẩu" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#4C7744", padding: 15, borderRadius: 10, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 16 }}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Bạn chưa có tài khoản?{" "}
        <Text style={{ fontWeight: "bold", color: "#3D6D4A", textDecorationLine: "underline" }} onPress={() => navigation.navigate("Register")}>
          Vui lòng đăng ký
        </Text>
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D6D4A",
  },
  highlight: {
    color: "#FFD700",
  },
  subtitle: {
    textAlign: "center",
    color: "#3D6D4A",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#3D6D4A",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#3D6D4A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
  },
  linkText: {
    fontWeight: "bold",
    color: "#3D6D4A",
    textDecorationLine: "underline",
  },
});

