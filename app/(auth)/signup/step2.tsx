import { router, useLocalSearchParams } from "expo-router";
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
import { redirectByRole, saveUser } from "../../../hooks/useAuth";

export default function Step2() {
  const { fullName, email, phone, role } = useLocalSearchParams<{
    fullName: string;
    email: string;
    phone: string;
    role: Role;
  }>();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const getStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 4) return 1;
    if (password.length < 8) return 2;
    return 3;
  };

  const strengthColors = ["#ffffff10", "#ef4444", "#f59e0b", "#1D9E75"];
  const strengthLabels = ["", "Faible", "Moyen", "Fort ✓"];
  const strength = getStrength();

  const handleCreate = async () => {
    if (!password || !confirm) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erreur", "Mot de passe trop court (min 6 caractères)");
      return;
    }

    await saveUser({
      fullName: fullName ?? "",
      email: email ?? "",
      phone: phone ?? "",
      role: (role ?? "user") as Role,
      password,
    });

    Alert.alert("Compte créé ✓", "Bienvenue sur TalentSwipe !", [
      {
        text: "Continuer",
        onPress: () =>
          router.replace(redirectByRole((role ?? "user") as Role) as any),
      },
    ]);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.stepBadge}>Étape 2 / 2</Text>
      <Text style={styles.title}>Sécurité</Text>
      <Text style={styles.subtitle}>Créez un mot de passe fort</Text>

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor="#4a4861"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.strengthBar}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.strengthSeg,
              {
                backgroundColor:
                  i <= strength ? strengthColors[strength] : "#ffffff10",
              },
            ]}
          />
        ))}
      </View>

      {password.length > 0 && (
        <Text
          style={[styles.strengthLabel, { color: strengthColors[strength] }]}
        >
          {strengthLabels[strength]}
        </Text>
      )}

      <Text style={styles.label}>Confirmer le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        placeholderTextColor="#4a4861"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      {confirm.length > 0 && (
        <Text
          style={{
            fontSize: 12,
            color: password === confirm ? "#1D9E75" : "#ef4444",
            marginBottom: 16,
            marginTop: -8,
          }}
        >
          {password === confirm
            ? "✓ Mots de passe identiques"
            : "✕ Ne correspondent pas"}
        </Text>
      )}

      <View style={styles.recapBox}>
        <Text style={styles.recapTitle}>Récapitulatif</Text>
        <Text style={styles.recapText}>👤 {fullName}</Text>
        <Text style={styles.recapText}>✉️ {email}</Text>
        <Text style={styles.recapText}>📱 {phone}</Text>
        <Text style={styles.recapText}>🎭 {role}</Text>
      </View>

      <TouchableOpacity style={styles.btnMain} onPress={handleCreate}>
        <Text style={styles.btnMainText}>Créer le compte ✓</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
        <Text style={styles.btnBackText}>← Retour</Text>
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
    marginBottom: 10,
  },
  strengthBar: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  strengthSeg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 16,
  },
  recapBox: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffffff10",
    padding: 16,
    marginBottom: 24,
    gap: 6,
  },
  recapTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8b80ff",
    marginBottom: 8,
  },
  recapText: {
    fontSize: 13,
    color: "#ffffff80",
  },
  btnMain: {
    backgroundColor: "#5b4fff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  btnMainText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  btnBack: {
    alignItems: "center",
    paddingVertical: 10,
  },
  btnBackText: {
    color: "#4a4861",
    fontSize: 14,
  },
});
