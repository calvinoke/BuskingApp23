import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';
//const API_BASE_URL = 'http://localhost:8000/api';

const UpdateBooking = ({ route, navigation }) => {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [seats, setSeats] = useState('');
    const [buses, setBuses] = useState([]);
    const [busId, setBusId] = useState('');

    useEffect(() => {
        fetchBooking();
        fetchBuses();
    }, []);

    const fetchBooking = async () => {
        try {
            const response = await axios.get(`${ EXPO_PUBLIC_API_URL}/bookings/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const booking = response.data;
            setName(booking.name);
            setEmail(booking.email);
            setPhone(booking.phone);
            setSeats(booking.seats.toString());
            setBusId(booking.bus);
        } catch (error) {
            console.error('Error fetching booking:', error);
            Alert.alert('Error', 'Failed to fetch booking details.');
        }
    };

    const fetchBuses = async () => {
        try {
            const response = await axios.get(`${ EXPO_PUBLIC_API_URL}/buses/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBuses(response.data);
        } catch (error) {
            console.error('Error fetching buses:', error);
            Alert.alert('Error', 'Failed to fetch buses.');
        }
    };

    const handleSubmit = async () => {
        const booking = {
            name,
            email,
            phone,
            seats: parseInt(seats),
            bus: busId
        };
        try {
            const response = await axios.put(`${ EXPO_PUBLIC_API_URL}/bookings/${id}/`, booking, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedBooking = response.data;
            Alert.alert('Success', 'Booking updated successfully.');
            navigation.navigate('BookingList',{updatedBooking});
        } catch (error) {
            console.error('Error updating booking:', error);
            Alert.alert('Error', 'Failed to update booking.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Passenger Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                autoCapitalize="words"
            />

            <Text style={styles.label}>Passenger Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />

            <Text style={styles.label}>Passenger Phone</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Seat Number</Text>
            <TextInput
                style={styles.input}
                value={seats}
                onChangeText={setSeats}
                placeholder="Seats"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Bus</Text>
            <Picker
                selectedValue={busId}
                onValueChange={setBusId}
                style={styles.picker}
            >
                {buses.map(bus => (
                    <Picker.Item key={bus.id} label={bus.name} value={bus.id} />
                ))}
            </Picker>

            <Button title="Update Booking" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});

export default UpdateBooking;
