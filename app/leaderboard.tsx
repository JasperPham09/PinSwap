import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const leaderboardData = [
    { id: 1, username: 'Charles Tran', title: 'Tướng quân xanh', score: 102 },
    { id: 2, username: 'Emma Bui', title: 'Thủ lĩnh môi trường', score: 96 },
    { id: 3, username: 'Nguyễn Khang', title: 'Đội trưởng tái chế', score: 49 },
    { id: 4, username: 'Thu Hiền Đăng', title: 'Đội trưởng tái chế', score: 48 },
    { id: 5, username: 'thuthanh2112', title: 'Đội trưởng tái chế', score: 47 },
    { id: 6, username: 'thuytrang 44', title: 'Đội trưởng tái chế', score: 47 },
    { id: 7, username: 'Jessica', title: 'Đội trưởng tái chế', score: 45 },
    { id: 8, username: 'Vickybae', title: 'Đội trưởng tái chế', score: 42 },
    { id: 9, username: 'Namanh263', title: 'Đội trưởng tái chế', score: 40 },
    { id: 10, username: 'Username', title: 'Đội trưởng tái chế', score: 38 },
    { id: 11, username: 'Jolibeek 247', title: 'Đội trưởng tái chế', score: 36 },
    { id: 12, username: 'Hana michi', title: 'Đội trưởng tái chế', score: 33 },
    { id: 13, username: 'Smith Nguyên', title: 'Đội trưởng tái chế', score: 30 },
    { id: 14, username: 'Nguyễn Linh', title: 'Đội trưởng tái chế', score: 29 },
    { id: 15, username: 'Donghuy333', title: 'Đội trưởng tái chế', score: 26 },
    { id: 16, username: 'Hà Vy', title: 'Đội trưởng tái chế', score: 22 },
    { id: 17, username: 'Trần Hoàng Mình Quang', title: 'Đội trưởng tái chế', score: 20 },
    { id: 18, username: 'mikey 369', title: 'Binh nhì tái chế', score: 17 },
    { id: 19, username: 'Vyvx', title: 'Binh nhì thu gom', score: 14 },
    { id: 20, username: 'Bảo ngọc', title: 'Binh nhì thu gom', score: 10 },
    { id: 21, username: 'Sa sukez', title: 'Tân binh xanh', score: 5 },
    { id: 22, username: '20lune', title: 'Tân binh xanh', score: 1 },
];

const rankColors = ['#fdd835', '#e0e0e0', '#cd7f32'];

const styles: { [key: string]: any } = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
    topPlayersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    topPlayer: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        width: '30%',
    },
    rank1: { backgroundColor: '#fdd835' },
    rank2: { backgroundColor: '#e0e0e0' },
    rank3: { backgroundColor: '#cd7f32' },
    username: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    table: {
        width: '100%',
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
    },
});

const TopPlayer = ({ player, index }: { player: (typeof leaderboardData)[number]; index: number }) => (
    <View style={[styles.topPlayer, styles[`rank${index + 1}`]]}>
        <Text>Hạng {index + 1}</Text>
        <Text style={styles.username}>{player.username}</Text>
        <Text>{player.title}</Text>
    </View>
);

const App = () => {
    const topPlayers = leaderboardData.slice(0, 3);
    const remainingPlayers = leaderboardData.slice(3);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>BẢNG XẾP HẠNG</Text>
                <View style={styles.topPlayersContainer}>
                    {topPlayers.map((player, index) => (
                        <TopPlayer player={player} index={index} key={player.id} />
                    ))}
                </View>
                <View style={styles.table}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>Hạng</Text>
                        <Text style={styles.headerCell}>Tên người dùng</Text>
                        <Text style={styles.headerCell}>Danh hiệu</Text>
                        <Text style={styles.headerCell}>Điểm</Text>
                    </View>
                    {remainingPlayers.map((player, index) => (
                        <View style={styles.row} key={player.id}>
                            <Text style={styles.cell}>{index + 4}</Text>
                            <Text style={styles.cell}>{player.username}</Text>
                            <Text style={styles.cell}>{player.title}</Text>
                            <Text style={styles.cell}>{player.score}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;