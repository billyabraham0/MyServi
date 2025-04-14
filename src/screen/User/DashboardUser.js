import React, { useEffect, useState } from "react";
import {
View,
Text,
TextInput,
ScrollView,
TouchableOpacity,
StyleSheet,
ActivityIndicator,
Alert,
Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase.js";

// Contoh data layanan utama
const mainServices = [
{ icon: "snow-outline", label: "Service AC" },
{ icon: "water-outline", label: "Service Pompa Air" },
{ icon: "flash-outline", label: "Service Listrik" },
{ icon: "cube-outline", label: "Service Kulkas" },
{ icon: "phone-portrait-outline", label: "Service Handphone" },
{ icon: "laptop-outline", label: "Service Laptop" },
{ icon: "tv-outline", label: "Service TV" },
];

// Contoh data layanan yang ada di menu "Lainnya"
const moreServices = [
{ icon: "car-outline", label: "Service Mobil" },
{ icon: "motorcycle", label: "Service Motor", library: "MaterialIcons" },
{ icon: "game-controller-outline", label: "Service Console" },
{ icon: "headset-outline", label: "Service Headset" },
{ icon: "watch-outline", label: "Service Jam Tangan" },
{ icon: "camera-outline", label: "Service Camera" },
{ icon: "print-outline", label: "Service Printer" },
{ icon: "speaker-outline", label: "Service Sound System" },
];

const DashboardUser = ({ navigation }) => {
const [teknisiProfiles, setTeknisiProfiles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const [walletBalance, setWalletBalance] = useState(0);

// Untuk menampilkan atau menyembunyikan layanan "Lainnya"
const [showMoreServices, setShowMoreServices] = useState(false);

// Ambil data teknisi dari Firebase
const fetchTeknisiProfiles = async () => {
setLoading(true);
setError(null);
try {
const q = query(collection(db, "teknisiProfiles"));
const querySnapshot = await getDocs(q);
const profiles = querySnapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setTeknisiProfiles(profiles);
} catch (error) {
console.error("Error fetching teknisi profiles:", error);
setError("Gagal memuat data teknisi. Coba lagi nanti.");
}
setLoading(false);
};

// Ambil saldo dompet (contoh statis)
const fetchWalletBalance = async () => {
// Misal ambil dari backend, di sini contoh statis
setWalletBalance(0);
};

useEffect(() => {
fetchTeknisiProfiles();
fetchWalletBalance();
}, []);

// Filter berdasarkan kolom pencarian
const filteredMainServices = mainServices.filter((service) =>
service.label.toLowerCase().includes(searchQuery.toLowerCase())
);
const filteredMoreServices = moreServices.filter((service) =>
service.label.toLowerCase().includes(searchQuery.toLowerCase())
);

// Contoh fungsi menampilkan notifikasi / mencari teknisi terdekat
const handleFindNearestTechnician = (serviceLabel) => {
// Di sini Anda bisa integrasi geolocation atau API untuk cari teknisi terdekat
// Sebagai contoh, kita cek apakah ada teknisi di database untuk serviceLabel
const availableTeknisi = teknisiProfiles.filter(
(profile) => profile.service.toLowerCase() === serviceLabel.toLowerCase()
);

if (availableTeknisi.length > 0) {
Alert.alert(
"Teknisi Ditemukan",
`Terdapat ${availableTeknisi.length} teknisi untuk ${serviceLabel}.`
);
// Lanjutkan ke pemesanan, dsb.
} else {
Alert.alert("Teknisi Tidak Tersedia", `Tidak ada teknisi terdekat untuk ${serviceLabel}.`);
}
};

// Fungsi handleTopUp untuk menambah saldo (contoh sederhana)
const handleTopUp = () => {
// Tampilkan modal atau navigasi ke halaman top up
Alert.alert("Top Up", "Fitur top up melalui ATM / E-Wallet / Mobile Banking.");
// Misal setelah top up sukses, kita update saldo:
setWalletBalance(walletBalance + 50000); // Contoh menambah 50k
};

// Render item layanan (dipakai di layanan utama & "Lainnya")
const renderServiceItem = (item, index) => {
return (
<View key={index} style={styles.serviceItemContainer}>
<TouchableOpacity
style={styles.serviceItem}
onPress={() => handleFindNearestTechnician(item.label)}
>
{item.library === "MaterialIcons" ? (
<MaterialIcons name={item.icon} size={28} color="#555" />
) : (
<Ionicons name={item.icon} size={28} color="#555" />
)}
</TouchableOpacity>
<Text style={styles.serviceLabel}>{item.label}</Text>
</View>
);
};

return (
<View style={styles.container}>
{/* Bagian header + kolom pencarian */}
<View style={styles.header}>
<TextInput
placeholder="Cari layanan..."
style={styles.searchInput}
value={searchQuery}
onChangeText={(text) => setSearchQuery(text)}
/>
{/* Ikon Profile (opsional) */}
<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
<Ionicons name="person-circle-outline" size={32} color="#333" />
</TouchableOpacity>
</View>

{/* Bagian Saldo + Top Up */}
<View style={styles.balanceContainer}>
<View style={styles.balanceInfo}>
<Text style={styles.balanceLabel}>Saldo</Text>
<Text style={styles.balanceValue}>Rp {walletBalance.toLocaleString()}</Text>
</View>
<TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
<Ionicons name="add-circle-outline" size={24} color="#333" />
<Text style={{ marginLeft: 4 }}>Top Up</Text>
</TouchableOpacity>
</View>

{/* Deretan ikon layanan (bagian utama) */}
<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
{/* Layanan utama */}
<View style={styles.servicesContainer}>
{filteredMainServices.map(renderServiceItem)}
{/* Tombol "Lainnya" */}
<View style={styles.serviceItemContainer}>
<TouchableOpacity
style={styles.serviceItem}
onPress={() => setShowMoreServices(!showMoreServices)}
>
<Ionicons name="ellipsis-horizontal-circle-outline" size={28} color="#555" />
</TouchableOpacity>
<Text style={styles.serviceLabel}>Lainnya</Text>
</View>
</View>

{/* Jika klik "Lainnya" muncul additional services */}
{showMoreServices && (
<View style={styles.moreServicesContainer}>
{filteredMoreServices.map(renderServiceItem)}
</View>
)}

{/* Banner promosi (bisa di-slide, ini hanya contoh satu banner) */}
<ScrollView
style={styles.bannerContainer}
horizontal
showsHorizontalScrollIndicator={false}
>
{/* Contoh Banner 1 */}
<TouchableOpacity
style={styles.bannerItem}
onPress={() => {
// Direct ke link website
Alert.alert("Promo", "Banner promo diklik! Arahkan ke link website di sini.");
}}
>
<Image
source={{
uri: "https://via.placeholder.com/300x100.png?text=Promo+1",
}}
style={styles.bannerImage}
/>
</TouchableOpacity>

{/* Contoh Banner 2 */}
<TouchableOpacity
style={styles.bannerItem}
onPress={() => {
Alert.alert("Promo", "Banner promo 2 diklik!");
}}
>
<Image
source={{
uri: "https://via.placeholder.com/300x100.png?text=Promo+2",
}}
style={styles.bannerImage}
/>
</TouchableOpacity>
</ScrollView>

{/* Contoh: jika masih loading */}
{loading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}
{/* Jika ada error */}
{error && <Text style={styles.errorText}>{error}</Text>}
</ScrollView>
</View>
);
};

export default DashboardUser;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#fff",
},
/* Header (search bar + icon profile) */
header: {
flexDirection: "row",
alignItems: "center",
paddingHorizontal: 16,
paddingVertical: 12,
backgroundColor: "#fff",
borderBottomWidth: 1,
borderBottomColor: "#eee",
},
searchInput: {
flex: 1,
backgroundColor: "#f1f1f1",
padding: 10,
borderRadius: 25,
marginRight: 8,
},
/* Bagian Saldo dan Top Up */
balanceContainer: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
paddingHorizontal: 16,
paddingVertical: 12,
borderBottomWidth: 1,
borderBottomColor: "#eee",
},
balanceInfo: {},
balanceLabel: {
fontSize: 14,
color: "#333",
fontWeight: "500",
},
balanceValue: {
fontSize: 20,
fontWeight: "700",
color: "green",
marginTop: 4,
},
topUpButton: {
flexDirection: "row",
alignItems: "center",
backgroundColor: "#f1f1f1",
paddingHorizontal: 10,
paddingVertical: 8,
borderRadius: 8,
},
/* Deretan services */
servicesContainer: {
flexDirection: "row",
flexWrap: "wrap",
paddingHorizontal: 8,
marginTop: 16,
},
serviceItemContainer: {
width: "25%",
alignItems: "center",
marginBottom: 16,
},
serviceItem: {
width: 50,
height: 50,
borderRadius: 25,
backgroundColor: "#f9f9f9",
justifyContent: "center",
alignItems: "center",
},
serviceLabel: {
fontSize: 11,
marginTop: 4,
textAlign: "center",
},
/* Bagian "Lainnya" */
moreServicesContainer: {
flexDirection: "row",
flexWrap: "wrap",
paddingHorizontal: 8,
},
/* Banner promosi */
bannerContainer: {
marginTop: 16,
},
bannerItem: {
marginHorizontal: 8,
borderRadius: 8,
overflow: "hidden",
},
bannerImage: {
width: 300,
height: 100,
resizeMode: "cover",
},
/* Error text */
errorText: {
color: "red",
textAlign: "center",
marginTop: 16,
},
});