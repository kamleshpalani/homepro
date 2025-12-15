import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { colors } from "../theme/colors";
import { api, setAuthToken } from "../api/client";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.login({ email, password });
      await setAuthToken(res.token);
      navigation.replace("Main");
    } catch (err: any) {
      Alert.alert("Login failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!firstName || !email || !password || !phone) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    try {
      setLoading(true);
      const res = await api.signup({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      if (res.token) {
        await setAuthToken(res.token);
      }
      navigation.replace("Main");
    } catch (err: any) {
      Alert.alert("Signup failed", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignupMode ? "Create Account" : "Customer Login"}
      </Text>

      {isSignupMode && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name *"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone *"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={
          loading
            ? isSignupMode
              ? "Creating Account..."
              : "Logging in..."
            : isSignupMode
            ? "Sign Up"
            : "Login"
        }
        onPress={isSignupMode ? handleSignup : handleLogin}
        color={colors.primary}
        disabled={loading}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title={
            isSignupMode
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"
          }
          onPress={() => setIsSignupMode(!isSignupMode)}
          color={colors.muted}
        />
      </View>
    </View>
  );
}
