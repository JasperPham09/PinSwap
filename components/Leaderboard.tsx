import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface LeaderboardEntry {
    id: string;
    username: string;
    points: number;
    rank: number;
}

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
    const theme = useColorScheme() ?? 'light';

    const renderItem = ({ item }: { item: LeaderboardEntry }) => (
        <View style={styles.entry}>
            <Text style={[styles.rank, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{item.rank}</Text>
            <Text style={[styles.username, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{item.username}</Text>
            <Text style={[styles.points, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{item.points} points</Text>
        </View>
    );

    return (
        <FlatList
            style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    rank: {
        width: 30,
    },
    username: {
        flex: 1,
    },
    points: {
        width: 80,
        textAlign: 'right',
    },
});

export default Leaderboard;
