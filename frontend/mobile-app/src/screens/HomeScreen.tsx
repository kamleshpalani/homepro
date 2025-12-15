import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { styles } from "./HomeScreen.styles";
import { colors } from "../theme/colors";

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section with Gradient Background */}
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🏠 HomeCare Pro</Text>
        </View>

        <Text style={styles.heroTitle}>
          Professional Cleaning{"\n"}At Your Fingertips
        </Text>

        <Text style={styles.heroSubtitle}>
          Book trusted cleaners, manage services, and keep your home
          spotless—all from your phone.
        </Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Book")}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Book a Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("CleanerApply")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Apply as Cleaner</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>✓</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Verified Cleaners</Text>
            <Text style={styles.featureDescription}>
              All our cleaners are background-checked and professionally trained
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💰</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Transparent Pricing</Text>
            <Text style={styles.featureDescription}>
              No hidden fees. Know exactly what you'll pay upfront
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>⚡</Text>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Fast & Reliable</Text>
            <Text style={styles.featureDescription}>
              Same-day service available. Cleaners arrive on time, every time
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
