import { View, Text, ScrollView, Button } from "react-native";
import { styles } from "./HomeScreen.styles";
import { colors } from "../theme/colors";

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>HomeCare Pro</Text>
      <Text style={styles.title}>Professional cleaning at your fingertips</Text>
      <Text style={styles.subtitle}>
        Book trusted cleaners, track bookings, and manage your account—all from
        your phone.
      </Text>
      <View style={styles.actions}>
        <Button
          title="Book a service"
          onPress={() => navigation.navigate("Book")}
          color={colors.primary}
        />
        <View style={styles.spacer} />
        <Button
          title="Go to dashboard"
          onPress={() => navigation.navigate("Dashboard")}
          color={colors.secondary}
        />
      </View>
    </ScrollView>
  );
}
