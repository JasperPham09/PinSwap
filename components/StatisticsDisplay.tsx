import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface StatisticsDisplayProps {
    totalBatteriesCollected: number;
}

const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ totalBatteriesCollected }) => {
    const theme = useColorScheme() ?? 'light';

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Statistics
            </Text>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>
                Total Batteries Collected: {totalBatteriesCollected}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default StatisticsDisplay;
