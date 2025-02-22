import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface PointExchangeProps {
    userPoints: number;
    onExchange: (itemCost: number) => void;
}

const PointExchange: React.FC<PointExchangeProps> = ({ userPoints, onExchange }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const theme = useColorScheme() ?? 'light';

    const items = [
        { id: 'tree', name: 'Small Tree', cost: 100 },
        { id: 'largeTree', name: 'Large Tree', cost: 200 },
        { id: 'seed', name: 'Seed Pack', cost: 50 },
        { id: 'ecoBag', name: 'Eco-Friendly Bag', cost: 75 },
    ];

    const handleExchange = (itemCost: number) => {
        if (userPoints >= itemCost) {
            onExchange(itemCost);
            alert('Exchange successful!');
        } else {
            alert('Not enough points!');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
            <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
                Exchange Points for Greenery
            </Text>
            <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>
                Your Points: {userPoints}
            </Text>
            {items.map((item) => (
                <View key={item.id} style={styles.item}>
                    <Text style={{ color: theme === 'light' ? Colors.light.text : Colors.dark.text }}>{item.name} - {item.cost} points</Text>
                    <Button
                        title={`Exchange for ${item.cost} points`}
                        onPress={() => handleExchange(item.cost)}
                        color={theme === 'light' ? Colors.light.tint : Colors.dark.tint}
                    />
                </View>
            ))}
        </View>
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
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default PointExchange;
