import { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { colors } from "../theme/colors";
import { api } from "../api/client";
import { styles } from "./CleanerApplyScreen.styles";

export default function CleanerApplyScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    area: "",
    servicesOffered: "",
    experienceYears: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const { firstName, lastName, email, phone, area } = form;
    if (!firstName || !lastName || !email || !phone || !area) {
      Alert.alert(
        "Missing info",
        "First name, last name, email, phone, and area are required"
      );
      return;
    }

    try {
      setLoading(true);
      await api.applyCleaner({
        ...form,
        typeOfWork: "full-time",
        preferredContactMethod: "whatsapp",
      });
      Alert.alert("Success", "Application submitted");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        area: "",
        servicesOffered: "",
        experienceYears: "",
      });
    } catch (err: any) {
      Alert.alert("Submit failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Join as a cleaner</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
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
        placeholder="Area"
        value={form.area}
        onChangeText={(v) => handleChange("area", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Services offered"
        value={form.servicesOffered}
        onChangeText={(v) => handleChange("servicesOffered", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience (years)"
        keyboardType="numeric"
        value={form.experienceYears}
        onChangeText={(v) => handleChange("experienceYears", v)}
      />
      <Button
        title={loading ? "Submitting..." : "Submit"}
        onPress={handleSubmit}
        color={colors.primary}
        disabled={loading}
      />
    </ScrollView>
  );
}
