import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { colors } from "../theme/colors";

export default function AuthSelectionScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🏠 HomeCarePro</Text>
          <Text style={styles.tagline}>Professional Cleaning Services</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.card, styles.customerCard]}
            onPress={() => navigation.navigate("CustomerLogin")}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <Text style={styles.cardTitle}>Customer</Text>
            <Text style={styles.cardDescription}>
              Book cleaning services for your home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.adminCard]}
            onPress={() => navigation.navigate("AdminLogin")}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.iconText}>🔐</Text>
            </View>
            <Text style={styles.cardTitle}>Admin</Text>
            <Text style={styles.cardDescription}>
              Manage bookings and operations
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Select your role to continue</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textLight,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  customerCard: {
    borderColor: colors.primary,
  },
  adminCard: {
    borderColor: colors.gray400,
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
  },
  footerText: {
    marginTop: 32,
    fontSize: 14,
    color: colors.textMuted,
  },
});
