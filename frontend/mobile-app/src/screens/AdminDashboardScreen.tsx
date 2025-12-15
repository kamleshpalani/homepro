import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { api } from "../api/client";
import { colors } from "../theme/colors";

export default function AdminDashboardScreen({ navigation }: any) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setRefreshing(true);
    try {
      const result = await api.getBookings();
      if (result.success && result.bookings) {
        setBookings(result.bookings);
        calculateStats(result.bookings);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load bookings");
    } finally {
      setRefreshing(false);
    }
  };

  const calculateStats = (bookingsList: any[]) => {
    const total = bookingsList.length;
    const pending = bookingsList.filter((b) => b.status === "pending").length;
    const confirmed = bookingsList.filter(
      (b) => b.status === "confirmed"
    ).length;
    const completed = bookingsList.filter(
      (b) => b.status === "completed"
    ).length;

    setStats({ total, pending, confirmed, completed });
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await api.logout();
          navigation.replace("AuthSelection");
        },
      },
    ]);
  };

  const renderStatCard = (title: string, value: number, color: string) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderBooking = ({ item }: any) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() =>
        navigation.navigate("AdminBookingDetail", { booking: item })
      }
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingName}>
          {item.firstName} {item.lastName}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "confirmed"
                  ? colors.successLight
                  : item.status === "completed"
                  ? colors.infoLight
                  : colors.warningLight,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === "confirmed"
                    ? colors.successDark
                    : item.status === "completed"
                    ? colors.infoDark
                    : colors.warningDark,
              },
            ]}
          >
            {item.status || "pending"}
          </Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <Text style={styles.bookingInfo}>📞 {item.phone}</Text>
        <Text style={styles.bookingInfo}>📧 {item.email}</Text>
        <Text style={styles.bookingInfo}>
          🧹 {item.service || "Not specified"}
        </Text>
        <Text style={styles.bookingInfo}>
          📍 {item.area || "Not specified"}
        </Text>
        <Text style={styles.bookingInfo}>
          📅 {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
        </Text>
      </View>

      <Text style={styles.createdAt}>
        Created: {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage all bookings</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
        contentContainerStyle={styles.statsContent}
      >
        {renderStatCard("Total", stats.total, colors.primary)}
        {renderStatCard("Pending", stats.pending, colors.warning)}
        {renderStatCard("Confirmed", stats.confirmed, colors.success)}
        {renderStatCard("Completed", stats.completed, colors.info)}
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("AdminCleaners")}
        >
          <Text style={styles.actionButtonText}>👷 Manage Cleaners</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadBookings} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>📋 No bookings yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.card,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },
  statsContainer: {
    maxHeight: 120,
  },
  statsContent: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    minWidth: 120,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  actions: {
    padding: 16,
    paddingBottom: 8,
  },
  actionButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  bookingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  bookingDetails: {
    gap: 6,
  },
  bookingInfo: {
    fontSize: 14,
    color: colors.textLight,
  },
  createdAt: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 12,
    fontStyle: "italic",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
  },
});
