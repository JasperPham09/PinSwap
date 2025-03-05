// app/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index" // Tên route cho trang chủ (index.tsx)
                options={{
                    tabBarLabel: 'Bản Đồ', // Label trên tab
                    title: 'Điểm Đổi Pin', // Title trên header
                    // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore" // Tên route cho trang khám phá (explore.tsx)
                options={{
                    tabBarLabel: 'Khám Phá',
                    title: 'Khám Phá',
                    // tabBarIcon: ({ color, focused }) => ( ... Icon cho tab ... ),
                }}
            />
            {/* TODO: Thêm các Tabs.Screen khác nếu cần (ví dụ: Trang yêu cầu đổi pin, trang cá nhân...) */}
            <Tabs.Screen
                name="(tabs)" // Tên route cho trang chủ (index.tsx)
                options={{
                    tabBarLabel: 'Home', // Label trên tab
                    title: 'Trang chủ', // Title trên header
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'home' : 'home-outline';
                        return <IconSymbol name={iconName} size={24} color={color} />;
                      }
                      
                }}
            />
        </Tabs>
    );
};

export default TabLayout;