import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors } from "../theme/colors";
import { styles } from "./BookScreen.styles";
import { api } from "../api/client";

export default function BookScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    area: "",
    date: "",
    timeSlot: "",
    hours: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, phone, service, area, date } = form;

    if (
      !firstName.trim() ||
      !phone.trim() ||
      !service.trim() ||
      !area.trim() ||
      !date.trim()
    ) {
      Alert.alert(
        "Missing Required Fields",
        "Please fill: First Name, Phone, Service, Area, and Date"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await api.createBooking(form);

      Alert.alert(
        "Success! 🎉",
        "Your booking request has been submitted successfully! We will contact you soon to confirm the details.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setForm({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                service: "",
                area: "",
                date: "",
                timeSlot: "",
                hours: "",
                address1: "",
                address2: "",
                city: "",
                pincode: "",
                notes: "",
              });
            },
          },
        ]
      );
    } catch (err: any) {
      Alert.alert("Booking Failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Book a Service</Text>
        <Text style={styles.subtitle}>
          Fill in the details below and we'll contact you to confirm your
          booking
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            First Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor={colors.textMuted}
            value={form.firstName}
            onChangeText={(v) => handleChange("firstName", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor={colors.textMuted}
            value={form.lastName}
            onChangeText={(v) => handleChange("lastName", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Phone Number <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.textMuted}
            value={form.phone}
            onChangeText={(v) => handleChange("phone", v)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Service Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Service Type <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Deep Cleaning, Regular Cleaning"
            placeholderTextColor={colors.textMuted}
            value={form.service}
            onChangeText={(v) => handleChange("service", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Area/Location <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., RS Puram, Gandhipuram"
            placeholderTextColor={colors.textMuted}
            value={form.area}
            onChangeText={(v) => handleChange("area", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Preferred Date <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={colors.textMuted}
            value={form.date}
            onChangeText={(v) => handleChange("date", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hours Needed</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2, 3, 4"
            placeholderTextColor={colors.textMuted}
            value={form.hours}
            onChangeText={(v) => handleChange("hours", v)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time Slot</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Morning, Afternoon, Evening"
            placeholderTextColor={colors.textMuted}
            value={form.timeSlot}
            onChangeText={(v) => handleChange("timeSlot", v)}
          />
        </View>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address Line 1</Text>
          <TextInput
            style={styles.input}
            placeholder="House/Flat number, Street"
            placeholderTextColor={colors.textMuted}
            value={form.address1}
            onChangeText={(v) => handleChange("address1", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Landmark, Area"
            placeholderTextColor={colors.textMuted}
            value={form.address2}
            onChangeText={(v) => handleChange("address2", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Coimbatore"
            placeholderTextColor={colors.textMuted}
            value={form.city}
            onChangeText={(v) => handleChange("city", v)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 641001"
            placeholderTextColor={colors.textMuted}
            value={form.pincode}
            onChangeText={(v) => handleChange("pincode", v)}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Special Instructions</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Any special requirements or instructions..."
            placeholderTextColor={colors.textMuted}
            value={form.notes}
            onChangeText={(v) => handleChange("notes", v)}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.9}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Booking Request</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
