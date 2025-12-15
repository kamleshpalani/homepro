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
} from "react-native";
import { api } from "../api/client";
import { colors } from "../theme/colors";

export default function AdminCleanersScreen({ navigation }: any) {
  const [cleaners, setCleaners] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCleaners();
  }, []);

  const loadCleaners = async () => {
    setRefreshing(true);
    try {
      const result = await api.getCleaners();
      if (result.success && result.cleaners) {
        setCleaners(result.cleaners);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to load cleaners");
    } finally {
      setRefreshing(false);
    }
  };

  const renderCleaner = ({ item }: any) => (
    <View style={styles.cleanerCard}>
      <View style={styles.cleanerHeader}>
        <Text style={styles.cleanerName}>
          {item.firstName} {item.lastName}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "approved"
                  ? colors.successLight
                  : item.status === "rejected"
                  ? colors.errorLight
                  : colors.warningLight,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === "approved"
                    ? colors.successDark
                    : item.status === "rejected"
                    ? colors.errorDark
                    : colors.warningDark,
              },
            ]}
          >
            {item.status || "pending"}
          </Text>
        </View>
      </View>

      <View style={styles.cleanerDetails}>
        <Text style={styles.cleanerInfo}>📞 {item.phone}</Text>
        <Text style={styles.cleanerInfo}>📧 {item.email}</Text>
        {item.experience && (
          <Text style={styles.cleanerInfo}>
            💼 Experience: {item.experience}
          </Text>
        )}
        {item.availability && (
          <Text style={styles.cleanerInfo}>
            📅 Availability: {item.availability}
          </Text>
        )}
      </View>

      <Text style={styles.appliedAt}>
        Applied: {new Date(item.createdAt).toLocaleString()}
      </Text>

      {item.status === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={() => handleUpdateStatus(item._id, "approved")}
          >
            <Text style={styles.actionButtonText}>✓ Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleUpdateStatus(item._id, "rejected")}
          >
            <Text style={styles.actionButtonText}>✗ Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleUpdateStatus = async (cleanerId: string, status: string) => {
    try {
      const result = await api.updateCleanerStatus({ cleanerId, status });
      if (result.success) {
        Alert.alert("Success", `Cleaner ${status} successfully`);
        loadCleaners();
      } else {
        Alert.alert("Error", result.message || "Failed to update status");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update status");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Cleaners</Text>
        <Text style={styles.headerSubtitle}>
          Review and approve cleaner applications
        </Text>
      </View>

      <FlatList
        data={cleaners}
        renderItem={renderCleaner}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadCleaners} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>👷 No cleaner applications yet</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
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
  list: {
    padding: 16,
  },
  cleanerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cleanerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cleanerName: {
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
  cleanerDetails: {
    gap: 6,
  },
  cleanerInfo: {
    fontSize: 14,
    color: colors.textLight,
  },
  appliedAt: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 12,
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  rejectButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
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
