import { StyleSheet, Platform } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "web" ? 60 : 40,
    paddingBottom: 40,
    backgroundColor: colors.backgroundTertiary,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    ...(Platform.OS === "web"
      ? { boxShadow: `0px 4px 8px ${colors.primary}4D` }
      : {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }),
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 16,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 17,
    color: colors.textLight,
    marginBottom: 32,
    lineHeight: 26,
  },
  actions: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    ...(Platform.OS === "web"
      ? { boxShadow: `0px 4px 8px ${colors.primary}4D` }
      : {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        }),
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.08)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }),
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 22,
  },
});
