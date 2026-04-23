import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser, logoutUser, saveUser } from "../../hooks/useAuth";

type Section = "main" | "edit" | "password";

export default function Settings() {
  const [section, setSection] = useState<Section>("main");
  const [user, setUser] = useState<any>(null);

  // Edit profile
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Preferences
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const u = await getUser();
      if (u) {
        setUser(u);
        setName(u.name);
        setPhone(u.phone);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert("Erreur", "Le nom ne peut pas être vide");
      return;
    }
    await saveUser({
      fullName: name,
      email: user.email,
      phone: phone,
      role: user.role,
      password: user.password,
    });
    const updated = await getUser();
    setUser(updated);
    Alert.alert("Succès ✓", "Profil mis à jour !", [
      { text: "OK", onPress: () => setSection("main") },
    ]);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    if (currentPassword !== user.password) {
      Alert.alert("Erreur", "Mot de passe actuel incorrect");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(
        "Erreur",
        "Nouveau mot de passe trop court (min 6 caractères)",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    await saveUser({
      fullName: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: newPassword,
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    Alert.alert("Succès ✓", "Mot de passe modifié !", [
      { text: "OK", onPress: () => setSection("main") },
    ]);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "user":
        return "Candidat";
      case "recruteur":
        return "Recruteur";
      case "entreprise":
        return "Entreprise";
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "user":
        return "#5b4fff";
      case "recruteur":
        return "#1D9E75";
      case "entreprise":
        return "#f59e0b";
      default:
        return "#4a4861";
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION EDIT PROFILE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (section === "edit") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => setSection("main")}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier le profil</Text>
          <View style={{ width: 38 }} />
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.label}>Nom complet</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#4a4861"
            placeholder="Votre nom"
          />

          <Text style={styles.label}>Téléphone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#4a4861"
            placeholder="Votre téléphone"
            keyboardType="phone-pad"
          />

          <Text style={styles.labelDisabled}>Email (non modifiable)</Text>
          <View style={styles.inputDisabled}>
            <Text style={styles.inputDisabledText}>{user?.email}</Text>
          </View>

          <Text style={styles.labelDisabled}>Rôle (non modifiable)</Text>
          <View style={styles.inputDisabled}>
            <Text style={styles.inputDisabledText}>
              {getRoleLabel(user?.role)}
            </Text>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#ffffff"
            />
            <Text style={styles.saveBtnText}>Enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION CHANGE PASSWORD
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (section === "password") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => setSection("main")}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Changer le mot de passe</Text>
          <View style={{ width: 38 }} />
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.label}>Mot de passe actuel</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholderTextColor="#4a4861"
            placeholder="••••••••"
            secureTextEntry
          />

          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor="#4a4861"
            placeholder="••••••••"
            secureTextEntry
          />

          <Text style={styles.label}>Confirmer le nouveau mot de passe</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#4a4861"
            placeholder="••••••••"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleChangePassword}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#ffffff" />
            <Text style={styles.saveBtnText}>Modifier le mot de passe</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION MAIN
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() ?? "?"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name ?? "..."}</Text>
          <View
            style={[
              styles.roleBadge,
              {
                backgroundColor: getRoleColor(user?.role) + "22",
                borderColor: getRoleColor(user?.role),
              },
            ]}
          >
            <Text
              style={[styles.roleText, { color: getRoleColor(user?.role) }]}
            >
              {getRoleLabel(user?.role ?? "")}
            </Text>
          </View>
        </View>

        {/* Infos compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={16} color="#5b4fff" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nom</Text>
              <Text style={styles.infoValue}>{user?.name ?? "..."}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={16} color="#5b4fff" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email ?? "..."}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={16} color="#5b4fff" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>{user?.phone ?? "..."}</Text>
            </View>
          </View>
        </View>

        {/* Actions compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => setSection("edit")}
          >
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#5b4fff18" }]}
              >
                <Ionicons name="create-outline" size={18} color="#5b4fff" />
              </View>
              <Text style={styles.actionText}>Modifier le profil</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4a4861" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => setSection("password")}
          >
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#f59e0b18" }]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#f59e0b"
                />
              </View>
              <Text style={styles.actionText}>Changer le mot de passe</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4a4861" />
          </TouchableOpacity>
        </View>

        {/* Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          <View style={styles.switchRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#1D9E7518" }]}
              >
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="#1D9E75"
                />
              </View>
              <Text style={styles.actionText}>Notifications</Text>
            </View>
            <Switch
              value={notifEnabled}
              onValueChange={setNotifEnabled}
              trackColor={{ false: "#1a1929", true: "#5b4fff" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.switchRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#3b82f618" }]}
              >
                <Ionicons name="briefcase-outline" size={18} color="#3b82f6" />
              </View>
              <Text style={styles.actionText}>Alertes nouvelles offres</Text>
            </View>
            <Switch
              value={jobAlerts}
              onValueChange={setJobAlerts}
              trackColor={{ false: "#1a1929", true: "#5b4fff" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.switchRow}>
            <View style={styles.actionLeft}>
              <View
                style={[styles.actionIcon, { backgroundColor: "#ef444418" }]}
              >
                <Ionicons name="heart-outline" size={18} color="#ef4444" />
              </View>
              <Text style={styles.actionText}>Alertes matchs</Text>
            </View>
            <Switch
              value={matchAlerts}
              onValueChange={setMatchAlerts}
              trackColor={{ false: "#1a1929", true: "#5b4fff" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08070f" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1929",
  },
  headerBack: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#ffffff", fontSize: 20, fontWeight: "800" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 16 },
  avatarSection: { alignItems: "center", paddingVertical: 16, gap: 10 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#5b4fff22",
    borderWidth: 2,
    borderColor: "#5b4fff55",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#5b4fff", fontSize: 32, fontWeight: "800" },
  userName: { color: "#ffffff", fontSize: 20, fontWeight: "700" },
  roleBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  roleText: { fontSize: 13, fontWeight: "700" },
  section: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
    gap: 4,
  },
  sectionTitle: {
    color: "#4a4861",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#5b4fff15",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: { flex: 1 },
  infoLabel: {
    color: "#4a4861",
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
  },
  infoValue: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#1a1929", marginVertical: 4 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  actionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#ef444415",
    borderWidth: 1,
    borderColor: "#ef444444",
    borderRadius: 14,
    paddingVertical: 16,
  },
  logoutText: { color: "#ef4444", fontSize: 15, fontWeight: "700" },
  label: {
    color: "#4a4861",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 8,
  },
  labelDisabled: {
    color: "#4a486180",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 14,
  },
  inputDisabled: {
    backgroundColor: "#0d0c1a80",
    borderWidth: 1,
    borderColor: "#1a192980",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  inputDisabledText: { color: "#4a486180", fontSize: 14 },
  saveBtn: {
    backgroundColor: "#5b4fff",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  saveBtnText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
});
