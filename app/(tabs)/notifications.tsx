import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Notifications from '@/components/Notifications';

const NotificationsPage = () => {
    const theme = useColorScheme() ?? 'light';

    const notifications = [
        { id: '1', message: 'You earned 50 points for recycling batteries!', timestamp: new Date() },
        { id: '2', message: 'New post in the community forum!', timestamp: new Date() },
        { id: '3', message: 'Reminder: Battery collection event tomorrow!', timestamp: new Date() },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Notifications
            </Text>
            <Notifications notifications={notifications} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default NotificationsPage;
