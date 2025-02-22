import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface Notification {
    id: string;
    message: string;
    timestamp: Date;
}

interface NotificationsProps {
    notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
    const theme = useColorScheme() ?? 'light';

    const renderItem = ({ item }: { item: Notification }) => (
        <View style={styles.notification}>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>{item.message}</Text>
            <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
        </View>
    );

    return (
        <FlatList
            style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    notification: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
});

export default Notifications;
