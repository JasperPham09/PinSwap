import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
}

interface MessagesProps {
    messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
    const theme = useColorScheme() ?? 'light';

    const renderItem = ({ item }: { item: Message }) => (
        <View style={styles.message}>
            <Text style={[styles.sender, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{item.sender}</Text>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>{item.content}</Text>
            <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
        </View>
    );

    return (
        <FlatList
            style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    message: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sender: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
});

export default Messages;
