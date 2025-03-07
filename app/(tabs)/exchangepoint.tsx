import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import PointExchange from '@/components/PointExchange';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import Leaderboard from '@/components/Leaderboard';
import Quiz from '@/components/Quiz';

const ProfilePage = () => {
    const theme = useColorScheme() ?? 'light';
    const [userPoints, setUserPoints] = useState(200);
    const [totalBatteriesCollected, setTotalBatteriesCollected] = useState(50);
    const [showQuiz, setShowQuiz] = useState(false);

    const leaderboardEntries = [
        { id: '1', username: 'EcoWarrior1', points: 500, rank: 1 },
        { id: '2', username: 'GreenHero', points: 450, rank: 2 },
        { id: '3', username: 'BatterySaver', points: 400, rank: 3 },
    ];

    const quizQuestions = [
        {
            id: '1',
            text: 'What is the primary environmental concern with disposable batteries?',
            options: ['Water pollution', 'Air pollution', 'Soil contamination', 'Noise pollution'],
            correctAnswer: 'Soil contamination',
        },
        {
            id: '2',
            text: 'Which of the following metals is commonly found in batteries and can be harmful to the environment?',
            options: ['Iron', 'Aluminum', 'Lead', 'Copper'],
            correctAnswer: 'Lead',
        },
    ];

    const handleExchange = (itemCost: number) => {
        setUserPoints(userPoints - itemCost);
    };

    const handleQuizComplete = (score: number) => {
        alert(`Quiz completed! Your score: ${score}/${quizQuestions.length}`);
        setShowQuiz(false);
        setUserPoints(userPoints + score * 10); // Award points for completing the quiz
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Your Profile
            </Text>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>
                Welcome, EcoChampion!
            </Text>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>
                Your Points: {userPoints}
            </Text>

            <PointExchange userPoints={userPoints} onExchange={handleExchange} />
            <StatisticsDisplay totalBatteriesCollected={totalBatteriesCollected} />
            <Leaderboard entries={leaderboardEntries} />

            <Button
                title="Take Quiz"
                onPress={() => setShowQuiz(true)}
                color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
            />

            {showQuiz && (
                <Quiz questions={quizQuestions} onQuizComplete={handleQuizComplete} />
            )}
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

export default ProfilePage;
