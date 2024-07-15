import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Bus Booking App</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity 
                    style={styles.iconWrapper} 
                    onPress={() => navigation.navigate('BusList')}
                >
                    <Icon name="bus" size={60} color="#4CAF50" />
                    <Text style={styles.iconText}>Buses</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.iconWrapper} 
                    onPress={() => navigation.navigate('BookingList')}
                >
                    <Icon name="book" size={60} color="#2196F3" />
                    <Text style={styles.iconText}>Bookings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    iconText: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
    },
});

export default HomeScreen;
