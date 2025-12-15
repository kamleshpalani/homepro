import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Alert, 
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
    address1: "",
    city: "",
    pincode: "",
    experienceYears: "",
    servicesOffered: "",
    languagesKnown: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const { firstName, lastName, email, phone, area } = form;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !area.trim()) {
      Alert.alert(
        "Missing Required Fields",
        "Please fill: First Name, Last Name, Email, Phone, and Area"
      );
      return;
    }

    try {
      setLoading(true);
      await api.applyCleaner(form);
      Alert.alert(
        "Success! 🎉",
        "Your application has been submitted successfully! We will review and contact you soon.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setForm({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                area: "",
                address1: "",
                city: "",
                pincode: "",
                experienceYears: "",
                servicesOffered: "",
                languagesKnown: "",
                notes: "",
              });
            },
          },
        ]
      );
    } catch (err: any) {
      Alert.alert("Application Failed", err?.message || "Please try again");
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
        <Text style={styles.title}>Apply as Cleaner</Text>
        <Text style={styles.subtitle}>
          Join our team of professional cleaners and start earning today
        </Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
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
          <Text style={styles.label}>
            Last Name <Text style={styles.required}>*</Text>
          </Text>
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
            Email <Text style={styles.required}>*</Text>
          </Text>
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
      </View>

      {/* Work Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Location</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Primary Area <Text style={styles.required}>*</Text>
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
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Your full address"
            placeholderTextColor={colors.textMuted}
            value={form.address1}
            onChangeText={(v) => handleChange("address1", v)}
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

      {/* Experience & Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience & Skills</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2, 5, 10"
            placeholderTextColor={colors.textMuted}
            value={form.experienceYears}
            onChangeText={(v) => handleChange("experienceYears", v)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Services You Can Provide</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            placeholder="e.g., Deep cleaning, Regular cleaning, Kitchen cleaning"
            placeholderTextColor={colors.textMuted}
            value={form.servicesOffered}
            onChangeText={(v) => handleChange("servicesOffered", v)}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Languages Known</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Tamil, English, Hindi"
            placeholderTextColor={colors.textMuted}
            value={form.languagesKnown}
            onChangeText={(v) => handleChange("languagesKnown", v)}
          />
        </View>
      </View>

      {/* Additional Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tell Us About Yourself</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            placeholder="Any additional information you'd like to share..."
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
          <Text style={styles.submitButtonText}>Submit Application</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
