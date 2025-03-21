import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();

const [message, setMessage] = useState('');
global.myVariable = "Xin chào từ biến toàn cục!";

// Gọi API từ Python khi mở app
useEffect(() => {
    axios.get('http://192.168.1.12:5000/get-data')  // Đổi IP theo mạng của bạn
        .then(response => {
            setMessage(response.data.message);
        })
        .catch(error => console.error("Lỗi khi gọi API:", error));
}, []);

// Gửi dữ liệu lên Python Backend
const sendDataToPython = () => {
    axios.post('http://192.168.1.12:5000/send-data', {
        newMessage: "Xin chào từ React Native!"
    })
    .then(response => {
        alert("Dữ liệu đã gửi thành công!");
        setMessage(response.data.updated_message);
    })
    .catch(error => console.error("Lỗi khi gửi dữ liệu:", error));
};

return (
    <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18 }}>Tin nhắn từ Python: {message}</Text>
        <Button title="Gửi Dữ Liệu" onPress={sendDataToPython} />
    </View>
);

<Stack.Screen name="login" component={LoginScreen} />

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


