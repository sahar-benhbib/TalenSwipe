import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginUser, redirectByRole } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    const user = await loginUser(email, password);
    console.log("🔍 Login result:", JSON.stringify(user));
    if (!user) {
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
      return;
    }
    router.replace(redirectByRole(user.role) as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={styles.logoEmoji}>🎯</Text>
      </View>
      <Text style={styles.title}>Bon retour 👋</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <View style={styles.inputRow}>
        <Text style={styles.inputIcon}>✉️</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#4a4861"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputIcon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#4a4861"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.btnMain} onPress={handleLogin}>
        <Text style={styles.btnMainText}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.orRow}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity
        style={styles.btnOutline}
        onPress={() => router.push("/(auth)/signup/step1")}
      >
        <Text style={styles.btnOutlineText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08070f",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#5b4fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#4a4861",
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#ffffff10",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    width: "100%",
    height: 50,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
  },
  btnMain: {
    backgroundColor: "#5b4fff",
    borderRadius: 12,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  btnMainText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ffffff10",
  },
  orText: {
    color: "#4a4861",
    marginHorizontal: 10,
    fontSize: 12,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#ffffff15",
    borderRadius: 12,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
  },
  btnOutlineText: {
    color: "#ffffff80",
    fontSize: 14,
    fontWeight: "600",
  },
});
