import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 12 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: { fontSize: 22, fontWeight: "700", color: colors.text },
  subtitle: { fontSize: 16, fontWeight: "600", color: colors.text },
  muted: { color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  error: { color: colors.danger, fontSize: 16 },
});
