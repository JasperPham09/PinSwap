import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface CommunityForumProps {
    posts: { id: string; author: string; content: string }[];
}

const CommunityForum: React.FC<CommunityForumProps> = ({ posts }) => {
    const theme = useColorScheme() ?? 'light';

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Community Forum
            </Text>
            {posts.map((post) => (
                <View key={post.id} style={styles.post}>
                    <Text style={[styles.author, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{post.author}</Text>
                    <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>{post.content}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    post: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    author: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default CommunityForum;
