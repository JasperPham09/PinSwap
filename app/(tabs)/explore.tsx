import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const App = () => {
    const danhHieu = [
        { title: '"Tân bình xanh"', description: 'người dùng đạt số điểm từ 0-5.' },
        { title: '"Bình nhỉ thu gom"', description: 'người dùng đạt số điểm từ 6-19.' },
        { title: '"Đội trường tái chế"', description: 'người dùng đạt số điểm từ 20-49.' },
        { title: '“Thủ lĩnh môi trường"', description: 'người dùng đạt số điểm từ 50-99 điểm' },
        { title: '"Tướng quân xanh"', description: 'người dùng đạt số điểm từ 100 trở lên' },
    ];

    const diem = [
        { item: 'Pin AA/AAA', points: '1 điểm/cục.' },
        { item: 'Pin đồng hồ hoặc các loại nhỏ khác', points: '1 điểm/cục.' },
        { item: 'Pin điện thoại laptop/...', points: '5 điểm/cục.' },
        { item: 'Pin năng lượng lớn (như pin xe điện, pin UPS)', points: '10 điểm/cục.' },
    ];

    const styles = StyleSheet.create({
        container: {
            fontFamily: 'sans-serif',
            padding: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            backgroundColor: '#f9f9f9',
            maxWidth: 600,
            marginVertical: 20,
            marginHorizontal: 'auto',
        },
        title: {
            textAlign: 'center',
            color: '#333',
            marginBottom: 20,
            fontSize: 24,
            fontWeight: 'bold',
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            backgroundColor: '#fdd835',
            color: '#333',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 20,
            textAlign: 'center',
            marginBottom: 10,
            display: 'flex',
        },
        listItem: {
            marginBottom: 8,
            lineHeight: 24,
        },
        pointItem: {
            marginBottom: 8,
            lineHeight: 24,
            marginLeft: 20,
        },
    });

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>HƯỚNG DẪN</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DANH HIỆU</Text>
                    {danhHieu.map((item, index) => (
                        <Text key={index} style={styles.listItem}>
                            <Text style={{ fontWeight: 'bold' }}>{item.title}: </Text>
                            {item.description}
                        </Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ĐIỂM</Text>
                    {diem.map((item, index) => (
                        <Text key={index} style={styles.pointItem}>
                            <Text style={{ fontWeight: 'bold' }}>{item.item}: </Text>
                            {item.points}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default App;