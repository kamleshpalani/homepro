import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { colors } from "../theme/colors";
import { styles } from "./BookScreen.styles";
import { api } from "../api/client";

export default function BookScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    area: "",
    date: "",
    timeSlot: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, phone, service, area, date } = form;
    if (!firstName || !phone || !service || !area || !date) {
      Alert.alert("Missing info", "Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      await api.createBooking({
        ...form,
        preferredContactMethod: "whatsapp",
      });
      Alert.alert("Success", "Booking submitted");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        area: "",
        date: "",
        timeSlot: "",
      });
    } catch (err: any) {
      Alert.alert("Booking failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick booking</Text>
      <TextInput
        style={styles.input}
        placeholder="First name*"
        value={form.firstName}
        onChangeText={(v) => handleChange("firstName", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={form.lastName}
        onChangeText={(v) => handleChange("lastName", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(v) => handleChange("phone", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Service (e.g., Deep clean)"
        value={form.service}
        onChangeText={(v) => handleChange("service", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={form.area}
        onChangeText={(v) => handleChange("area", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)*"
        value={form.date}
        onChangeText={(v) => handleChange("date", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time slot"
        value={form.timeSlot}
        onChangeText={(v) => handleChange("timeSlot", v)}
      />
      <Button
        title={loading ? "Submitting..." : "Submit"}
        color={colors.primary}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}
