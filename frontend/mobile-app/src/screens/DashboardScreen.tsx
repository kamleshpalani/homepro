import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../theme/colors";
import { api } from "../api/client";
import { styles } from "./DashboardScreen.styles";

// Safe field accessor
const getFieldValue = (obj: any, field: string, fallback = "N/A") => {
  const value = obj?.[field];
  return value !== undefined && value !== null && value !== ""
    ? value
    : fallback;
};

export default function DashboardScreen({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const profileData = await api.profile();
        setProfile(profileData);

        const bookingsResult = await api.getBookings();
        if (bookingsResult.success && bookingsResult.bookings) {
          setBookings(bookingsResult.bookings);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Welcome back{profile?.firstName ? `, ${profile.firstName}` : ""}
          </Text>
          <Text style={styles.subtitle}>Recent bookings</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {bookings.length === 0 ? (
        <Text style={styles.muted}>No bookings yet.</Text>
      ) : (
        bookings.map((b) => {
          const isExpanded = expandedBooking === b._id;
          return (
            <TouchableOpacity
              key={b._id}
              style={styles.card}
              onPress={() => setExpandedBooking(isExpanded ? null : b._id)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.cardTitle}>
                  {getFieldValue(b, "service")}
                </Text>
                <Text style={{ fontSize: 16, color: colors.primary }}>
                  {isExpanded ? "▼" : "►"}
                </Text>
              </View>
              <Text style={styles.muted}>Date: {getFieldValue(b, "date")}</Text>
              <Text style={styles.muted}>Area: {getFieldValue(b, "area")}</Text>
              <Text
                style={[
                  styles.muted,
                  { fontWeight: "600", color: getStatusColor(b.status) },
                ]}
              >
                Status: {getFieldValue(b, "status", "New")}
              </Text>

              {isExpanded && (
                <View
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: "#eee",
                  }}
                >
                  <Text style={styles.detailHeader}>Contact Information</Text>
                  <Text style={styles.detailText}>
                    Name: {getFieldValue(b, "firstName")}{" "}
                    {getFieldValue(b, "lastName", "")}
                  </Text>
                  <Text style={styles.detailText}>
                    Phone: {getFieldValue(b, "phone")}
                  </Text>
                  <Text style={styles.detailText}>
                    Email: {getFieldValue(b, "email")}
                  </Text>

                  <Text style={[styles.detailHeader, { marginTop: 10 }]}>
                    Service Details
                  </Text>
                  <Text style={styles.detailText}>
                    Hours: {getFieldValue(b, "hours")}
                  </Text>
                  <Text style={styles.detailText}>
                    Time Slot: {getFieldValue(b, "timeSlot")}
                  </Text>
                  <Text style={styles.detailText}>
                    Frequency: {getFieldValue(b, "serviceFrequency")}
                  </Text>

                  <Text style={[styles.detailHeader, { marginTop: 10 }]}>
                    Address
                  </Text>
                  <Text style={styles.detailText}>
                    {getFieldValue(b, "address1")}
                  </Text>
                  {b.address2 && (
                    <Text style={styles.detailText}>{b.address2}</Text>
                  )}
                  <Text style={styles.detailText}>
                    {getFieldValue(b, "city")}, {getFieldValue(b, "state")} -{" "}
                    {getFieldValue(b, "pincode")}
                  </Text>

                  {b.assignedCleaner && (
                    <>
                      <Text style={[styles.detailHeader, { marginTop: 10 }]}>
                        Assigned Cleaner
                      </Text>
                      <Text style={styles.detailText}>{b.assignedCleaner}</Text>
                    </>
                  )}

                  {b.notes && (
                    <>
                      <Text style={[styles.detailHeader, { marginTop: 10 }]}>
                        Your Notes
                      </Text>
                      <Text style={styles.detailText}>{b.notes}</Text>
                    </>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
}

// Helper to get status color
function getStatusColor(status: string) {
  switch (status) {
    case "New":
      return "#6c757d";
    case "Assigned":
      return "#17a2b8";
    case "In Progress":
      return "#ffc107";
    case "Completed":
      return "#28a745";
    case "Cancelled":
      return "#dc3545";
    default:
      return "#6c757d";
  }
}
