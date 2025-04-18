// // app/(tabs)/_layout.tsx
// import { Tabs } from 'expo-router';
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

// const TabLayoutHome = () => {
//     return (
//             <Tabs>
//                 <Tabs.Screen
//                     name="index"
//                     options={{
//                         tabBarLabel: 'Map',
//                         title: 'Pin Swap Locations',
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="explore"
//                     options={{
//                         tabBarLabel: 'Explore',
//                         title: 'Explore',
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="profile"
//                     options={{
//                         tabBarLabel: 'Profile',
//                         title: 'Profile',
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="notifications"
//                     options={{
//                         tabBarLabel: 'Notifications',
//                         title: 'Notifications',
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="community"
//                     options={{
//                         tabBarLabel: 'Community',
//                         title: 'Community',
//                     }}
//                 />
//                 <Tabs.Screen
//                     name="leaderboard"
//                     options={{
//                         tabBarLabel: 'Leaderboard',
//                         title: 'Leaderboard',
//                     }}
//                 />
//             </Tabs>
//     );
// };

// export default TabLayoutHome;