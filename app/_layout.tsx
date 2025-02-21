// app/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index" // Tên route cho trang chủ (index.tsx)
                options={{
                    tabBarLabel: 'Bản Đồ', // Label trên tab
                    title: 'Điểm Đổi Pin', // Title trên header
                    // tabBarIcon: ({ color, focused }) => ( ... Icon cho tab ... ), // Tùy chỉnh icon
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
        </Tabs>
    );
};

export default TabLayout;