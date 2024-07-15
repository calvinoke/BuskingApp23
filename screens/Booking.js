import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '@env';

const BookingScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seats, setSeats] = useState('');
  const [buses, setBuses] = useState([]);
  const [busId, setBusId] = useState('');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/buses/`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setBuses(response.data);
        if (response.data.length > 0) {
          setBusId(response.data[0].id); // Set the initial selected bus
        }
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    fetchBuses();
  }, []);

  const handleBooking = async () => {
    try {
      const booking = {
        name: name,
        email: email,
        phone: phone,
        seats: parseInt(seats),
        bus: busId,
      };
      await axios.post(`${EXPO_PUBLIC_API_URL}/bookings/`, booking, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Booking Successful', 'Your booking was successful.');
      navigation.navigate('BookingList');
    } catch (error) {
      Alert.alert('Booking Failed', 'There was an error processing your booking.');
      console.error('Error creating booking:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Passenger Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Passenger Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Passenger Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Number of Seats</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Seats"
        value={seats}
        onChangeText={setSeats}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bus</Text>
      <Picker
        selectedValue={busId}
        onValueChange={(itemValue) => setBusId(itemValue)}
        style={styles.picker}
      >
        {buses.map(bus => (
          <Picker.Item key={bus.id} label={bus.name} value={bus.id} />
        ))}
      </Picker>

      <Button title="Book Now" onPress={handleBooking} />
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
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default BookingScreen;
