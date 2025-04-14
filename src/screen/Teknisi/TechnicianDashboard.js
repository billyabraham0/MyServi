import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { auth, db } from '../../config/firebase.js';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { Header } from '../../components/Header.js';
import * as ImagePicker from 'expo-image-picker';

const TechnicianDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('menunggu');
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'bookings'),
        where('status', '==', statusFilter)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      Alert.alert('Error', 'Gagal mengambil data job.');
    }
    setLoading(false);
  };

  const acceptJob = async (bookingId) => {
    const user = auth.currentUser;
    if (!user) return Alert.alert('Error', 'User belum login.');
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'diproses',
        technicianId: user.uid,
      });
      Alert.alert('Sukses', 'Job diterima!');
      fetchJobs();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menerima job.');
    }
  };

  const completeJob = async (bookingId) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'selesai',
      });
      Alert.alert('Sukses', 'Job diselesaikan!');
      fetchJobs();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal menyelesaikan job.');
    }
  };

  const pickImage = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'before') setBeforeImage(result.uri);
      if (type === 'after') setAfterImage(result.uri);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const renderJob = ({ item }) => {
    const currentUser = auth.currentUser;
    const isOwner = currentUser && item.technicianId === currentUser.uid;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.service}</Text>
        <Text>{item.date} • {item.time}</Text>
        <Text>{item.address}</Text>

        {statusFilter === 'menunggu' && (
          <TouchableOpacity
            onPress={() => acceptJob(item.id)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Terima Job</Text>
          </TouchableOpacity>
        )}

        {statusFilter === 'diproses' && isOwner && (
          <TouchableOpacity
            onPress={() => completeJob(item.id)}
            style={styles.buttonGreen}
          >
            <Text style={styles.buttonText}>Selesaikan</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Dashboard Teknisi" />

      <View style={styles.tabs}>
        {['menunggu', 'diproses', 'selesai'].map((status) => (
          <TouchableOpacity key={status} onPress={() => setStatusFilter(status)}>
            <Text
              style={[
                styles.tabText,
                statusFilter === status && styles.activeTab,
              ]}
            >
              {status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJob}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabText: { fontSize: 16, color: '#555' },
  activeTab: { fontWeight: 'bold', color: '#000' },
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: '#2ecc71',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default TechnicianDashboard;
