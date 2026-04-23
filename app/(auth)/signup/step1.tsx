import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Role } from "../../../constants/mockData";

export default function Step1() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("user");

  const handleContinue = () => {
    if (!fullName || !email || !phone) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    router.push({
      pathname: "/(auth)/signup/step2",
      params: { fullName, email, phone, role },
    });
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.stepBadge}>Étape 1 / 2</Text>
      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Quelques infos pour commencer</Text>

      <Text style={styles.label}>Nom complet</Text>
      <TextInput
        style={styles.input}
        placeholder="Mohamed Ali"
        placeholderTextColor="#4a4861"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="email@exemple.com"
        placeholderTextColor="#4a4861"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="+216 XX XXX XXX"
        placeholderTextColor="#4a4861"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Votre rôle</Text>
      <View style={styles.roleRow}>
        {(["user", "recruteur", "entreprise"] as Role[]).map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.roleChip, role === r && styles.roleChipActive]}
            onPress={() => setRole(r)}
          >
            <Text
              style={[
                styles.roleChipText,
                role === r && styles.roleChipTextActive,
              ]}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btnMain} onPress={handleContinue}>
        <Text style={styles.btnMainText}>Continuer →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#08070f",
  },
  container: {
    padding: 24,
    paddingTop: 60,
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8b80ff",
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff30",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
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
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    color: "#4a4861",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#ffffff10",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 14,
    marginBottom: 16,
  },
  roleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  roleChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff10",
    backgroundColor: "#0d0c1a",
    alignItems: "center",
  },
  roleChipActive: {
    backgroundColor: "#5b4fff18",
    borderColor: "#5b4fff55",
  },
  roleChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4a4861",
  },
  roleChipTextActive: {
    color: "#8b80ff",
  },
  btnMain: {
    backgroundColor: "#5b4fff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnMainText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
