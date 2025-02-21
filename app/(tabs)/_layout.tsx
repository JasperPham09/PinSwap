// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: 'Map',
                    title: 'Pin Swap Locations',
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    tabBarLabel: 'Explore',
                    title: 'Explore',
                }}
            />
        </Tabs>
    );
};

export default TabLayout;