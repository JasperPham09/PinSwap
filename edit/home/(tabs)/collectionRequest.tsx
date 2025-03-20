// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { requestHomeCollection } from '@/api/CommunityApi';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { Colors } from '@/constants/Colors';

// const CollectionRequest = () => {
//     const [address, setAddress] = useState('');
//     const [contactNumber, setContactNumber] = useState('');
//     const theme = useColorScheme() ?? 'light';

//     const handleSubmit = async () => {
//         if (!address || !contactNumber) {
//             Alert.alert('Error', 'Please fill in all fields.');
//             return;
//         }

//         try {
//             const request = { address, contactNumber };
//             await requestHomeCollection(request);
//             Alert.alert('Success', 'Collection request submitted!');
//             setAddress('');
//             setContactNumber('');
//         } catch (error) {
//             console.error("Failed to submit collection request:", error);
//             Alert.alert('Error', 'Failed to submit collection request.');
//         }
//     };

//     return (
//         <View style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
//             <Text style={[styles.label, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Address:</Text>
//             <TextInput
//                 style={[styles.input, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background, color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}
//                 value={address}
//                 onChangeText={setAddress}
//                 placeholder="Enter your address"
//                 placeholderTextColor={theme === 'light' ? Colors.light.secondary : Colors.dark.secondary}
//             />

//             <Text style={[styles.label, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Contact Number:</Text>
//             <TextInput
//                 style={[styles.input, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background, color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}
//                 value={contactNumber}
//                 onChangeText={setContactNumber}
//                 placeholder="Enter your contact number"
//                 placeholderTextColor={theme === 'light' ? Colors.light.secondary : Colors.dark.secondary}
//                 keyboardType="phone-pad"
//             />

//             <Button title="Submit Request" onPress={handleSubmit} color={theme === 'light' ? Colors.light.tint : Colors.dark.tint} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 15,
//         padding: 10,
//         borderRadius: 5,
//     },
// });

// export default CollectionRequest;
