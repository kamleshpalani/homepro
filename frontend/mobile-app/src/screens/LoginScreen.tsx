import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { colors } from "../theme/colors";
import { api, setAuthToken } from "../api/client";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Login</Text>
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
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        color={colors.primary}
        disabled={loading}
      />
    </View>
  );
}
