import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
}

interface QuizProps {
    questions: Question[];
    onQuizComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const theme = useColorScheme() ?? 'light';

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setSelectedAnswer(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            onQuizComplete(score);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.question, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{currentQuestion.text}</Text>
            {currentQuestion.options.map((option) => (
                <Button
                    key={option}
                    title={option}
                    onPress={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    color={selectedAnswer === option ? 'green' : theme === 'light' ? Colors.light.tint : Colors.dark.tint}
                />
            ))}
            <Button
                title={currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                onPress={handleNextQuestion}
                disabled={selectedAnswer === null}
                color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Quiz;
