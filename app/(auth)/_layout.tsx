import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Đăng nhập", headerShown: false }} />
      <Stack.Screen name="register" options={{ title: "Đăng ký", headerShown: false }} />
    </Stack>
  );
}
