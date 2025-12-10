import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: "600",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: colors.muted, marginBottom: 20 },
  actions: { gap: 12 },
  spacer: { height: 8 },
});
