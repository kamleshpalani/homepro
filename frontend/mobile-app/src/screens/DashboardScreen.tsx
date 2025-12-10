import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { colors } from "../theme/colors";
import { api } from "../api/client";
import { styles } from "./DashboardScreen.styles";

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, b] = await Promise.all([api.profile(), api.bookings()]);
        setProfile(p);
        setBookings(b);
      } catch (err: any) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        Welcome back{profile?.firstName ? `, ${profile.firstName}` : ""}
      </Text>
      <Text style={styles.subtitle}>Recent bookings</Text>
      {bookings.length === 0 ? (
        <Text style={styles.muted}>No bookings yet.</Text>
      ) : (
        bookings.map((b) => (
          <View key={b._id} style={styles.card}>
            <Text style={styles.cardTitle}>{b.service}</Text>
            <Text style={styles.muted}>{b.date}</Text>
            <Text style={styles.muted}>{b.area}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
