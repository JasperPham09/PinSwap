import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import CommunityForum from '@/components/CommunityForum';
import { fetchForumPosts, createForumPost, ForumPost } from '@/api/CommunityApi';

const CommunityPage = () => {
    const theme = useColorScheme() ?? 'light';
    const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const posts = await fetchForumPosts();
                setForumPosts(posts);
            } catch (error) {
                console.error("Failed to load forum posts:", error);
                alert("Failed to load forum posts.");
            }
        };

        loadPosts();
    }, []);

    const handlePostSubmit = async () => {
        if (newPostContent.trim() === '') {
            alert('Post content cannot be empty.');
            return;
        }

        const newPost = {
            author: 'CurrentUser', // Replace with actual user authentication
            content: newPostContent,
        };

        try {
            const createdPost = await createForumPost(newPost);
            setForumPosts(prevPosts => [...prevPosts, createdPost]);
            setNewPostContent(''); // Clear the input after successful post
        } catch (error) {
            console.error("Failed to create forum post:", error);
            alert('Failed to create forum post.');
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Community Forum
            </Text>
            <CommunityForum posts={forumPosts} />

            <TextInput
                style={[styles.input, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background, color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}
                placeholder="Write a new post..."
                placeholderTextColor={theme === 'light' ? Colors.light.secondary : Colors.dark.secondary}
                value={newPostContent}
                onChangeText={setNewPostContent}
            />
            <Button title="Post" onPress={handlePostSubmit} color={theme === 'light' ? Colors.light.tint : Colors.dark.tint} />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
});

export default CommunityPage;
