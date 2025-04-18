// app/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/Ionicons';


const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Ẩn header
            }} >
            <Tabs.Screen 
                name="home" // Tên route cho trang chủ (index.tsx)
                options={{
                    tabBarLabel: 'Home', // Label trên tab
                    title: 'PinSwap', // Title trên header
                    tabBarActiveTintColor: "black",
                    tabBarIcon: ({ color, focused }) =>(<Icon size={28} name={focused ? 'home' : 'home-outline'} color={color} />),
                        }
                      }
            />
            <Tabs.Screen
                name="index" // Tên route cho trang chủ (index.tsx)
                options={{
                    tabBarLabel: 'Map', // Label trên tab
                    title: 'Điểm Đổi Pin', // Title trên header
                    tabBarActiveTintColor: "black",
                    tabBarIcon: ({ color, focused }) =>(<Icon size={28} name={focused ? 'map' : 'map-outline'} color={color} />),
                }}
            />
            <Tabs.Screen
                name="leaderboard" // Tên route cho trang khám phá (explore.tsx)
                options={{
                    tabBarLabel: 'LeaderBoard',
                    title: 'Bảng Xếp Hạng',
                    tabBarActiveTintColor: "black",
                    tabBarIcon: ({ color, focused }) =>(<Icon size={28} name={focused ? 'trophy' : 'trophy-outline'} color={color} />),
                }}
            />
            <Tabs.Screen
                name="profile" // Tên route cho trang cá nhân (profile.tsx)
                options={{
                    tabBarLabel: 'Profile',
                    title: 'Tài khoản',
                    tabBarActiveTintColor: "black",
                    tabBarIcon: ({ color, focused }) =>(<Icon size={28} name={focused ? 'person' : 'person-outline'} color={color} />),
                }}
            />
            {/* TODO: Thêm các Tabs.Screen khác nếu cần (ví dụ: Trang yêu cầu đổi pin, trang cá nhân...) */}
            <Tabs.Screen
                name="signup" // Tên route cho trang cá nhân (signup.tsx)
                options={{
                    tabBarLabel: 'signup',
                    title: 'Tài khoản',
                    tabBarActiveTintColor: "black",
                    tabBarIcon: ({ color, focused }) =>(<Icon size={28} name={focused ? 'person' : 'person-outline'} color={color} />),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;