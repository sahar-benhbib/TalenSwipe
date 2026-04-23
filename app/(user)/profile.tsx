import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser, logoutUser } from "../../hooks/useAuth";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

const MOCK_SKILLS = [
  "React Native",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Git",
  "Figma",
  "REST API",
  "Redux",
];

const MOCK_EXPERIENCES = [
  {
    id: "1",
    poste: "Développeur Mobile",
    entreprise: "Vermeg",
    periode: "Jan 2023 — Présent",
    description:
      "Développement d'applications bancaires mobiles avec React Native et TypeScript.",
  },
  {
    id: "2",
    poste: "Développeur Front-end",
    entreprise: "Telnet",
    periode: "Juin 2021 — Déc 2022",
    description:
      "Intégration d'interfaces React pour des clients internationaux.",
  },
];

const MOCK_FORMATIONS = [
  {
    id: "1",
    diplome: "Ingénieur en Informatique",
    ecole: "INSAT Tunis",
    annee: "2021",
    mention: "Mention Bien",
  },
  {
    id: "2",
    diplome: "Baccalauréat Sciences",
    ecole: "Lycée Carthage",
    annee: "2016",
    mention: "Mention Très Bien",
  },
];

export default function UserProfile() {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    getUser().then(setUser);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Profil</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* ── Avatar + infos ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name ?? "Utilisateur"}</Text>
          <Text style={styles.userEmail}>{user?.email ?? ""}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="person-outline" size={13} color="#5b4fff" />
            <Text style={styles.roleText}>Candidat</Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Swipes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Matchs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Likés</Text>
          </View>
        </View>

        {/* ── Infos compte ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="person-outline" size={16} color="#5b4fff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nom complet</Text>
                <Text style={styles.infoValue}>{user?.name ?? "—"}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="mail-outline" size={16} color="#5b4fff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email ?? "—"}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="call-outline" size={16} color="#5b4fff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Téléphone</Text>
                <Text style={styles.infoValue}>{user?.phone ?? "—"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Compétences ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          <View style={styles.card}>
            <View style={styles.skillsWrap}>
              {MOCK_SKILLS.map((skill, i) => (
                <View key={i} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Expériences ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expériences</Text>
          <View style={styles.card}>
            {MOCK_EXPERIENCES.map((exp, i) => (
              <View key={exp.id}>
                <View style={styles.expRow}>
                  <View style={styles.expDot} />
                  <View style={styles.expContent}>
                    <Text style={styles.expPoste}>{exp.poste}</Text>
                    <View style={styles.expMeta}>
                      <Text style={styles.expEntreprise}>{exp.entreprise}</Text>
                      <Text style={styles.expSep}>·</Text>
                      <Text style={styles.expPeriode}>{exp.periode}</Text>
                    </View>
                    <Text style={styles.expDesc}>{exp.description}</Text>
                  </View>
                </View>
                {i < MOCK_EXPERIENCES.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ── Formations ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formation</Text>
          <View style={styles.card}>
            {MOCK_FORMATIONS.map((f, i) => (
              <View key={f.id}>
                <View style={styles.formRow}>
                  <View style={styles.formIconWrap}>
                    <Ionicons name="school-outline" size={18} color="#1D9E75" />
                  </View>
                  <View style={styles.formContent}>
                    <Text style={styles.formDiplome}>{f.diplome}</Text>
                    <Text style={styles.formEcole}>{f.ecole}</Text>
                    <View style={styles.formMeta}>
                      <View style={styles.formAnneeTag}>
                        <Text style={styles.formAnneeText}>{f.annee}</Text>
                      </View>
                      <View style={styles.formMentionTag}>
                        <Text style={styles.formMentionText}>{f.mention}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {i < MOCK_FORMATIONS.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={styles.btnLogoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08070f" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    marginBottom: 4,
  },
  headerTitle: { color: "#ffffff", fontSize: 22, fontWeight: "800" },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ef444418",
    borderWidth: 1,
    borderColor: "#ef444440",
    alignItems: "center",
    justifyContent: "center",
  },

  // Avatar
  avatarSection: { alignItems: "center", paddingVertical: 20, gap: 8 },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: "#5b4fff22",
    borderWidth: 2,
    borderColor: "#5b4fff55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarText: { color: "#5b4fff", fontSize: 36, fontWeight: "800" },
  userName: { color: "#ffffff", fontSize: 20, fontWeight: "700" },
  userEmail: { color: "#4a4861", fontSize: 13 },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  roleText: { color: "#5b4fff", fontSize: 13, fontWeight: "600" },

  // Stats
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    marginBottom: 20,
    overflow: "hidden",
  },
  statCard: { flex: 1, alignItems: "center", paddingVertical: 16, gap: 4 },
  statDivider: { width: 1, backgroundColor: "#1a1929", marginVertical: 12 },
  statValue: { color: "#5b4fff", fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#4a4861", fontSize: 12, fontWeight: "500" },

  // Section
  section: { marginBottom: 16 },
  sectionTitle: {
    color: "#4a4861",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
  },
  divider: { height: 1, backgroundColor: "#1a1929", marginVertical: 12 },

  // Infos
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#5b4fff15",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: { flex: 1 },
  infoLabel: { color: "#4a4861", fontSize: 11, marginBottom: 2 },
  infoValue: { color: "#ffffff", fontSize: 14, fontWeight: "600" },

  // Skills
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillTag: {
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: { color: "#5b4fff", fontSize: 13, fontWeight: "600" },

  // Expériences
  expRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  expDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5b4fff",
    marginTop: 5,
    flexShrink: 0,
  },
  expContent: { flex: 1, gap: 4 },
  expPoste: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
  expMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  expEntreprise: { color: "#5b4fff", fontSize: 13, fontWeight: "600" },
  expSep: { color: "#4a4861", fontSize: 13 },
  expPeriode: { color: "#4a4861", fontSize: 12 },
  expDesc: { color: "#9991b1", fontSize: 13, lineHeight: 19, marginTop: 2 },

  // Formation
  formRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  formIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#1D9E7518",
    borderWidth: 1,
    borderColor: "#1D9E7544",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  formContent: { flex: 1, gap: 4 },
  formDiplome: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
  formEcole: { color: "#4a4861", fontSize: 13 },
  formMeta: { flexDirection: "row", gap: 8, marginTop: 4 },
  formAnneeTag: {
    backgroundColor: "#1a1929",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  formAnneeText: { color: "#4a4861", fontSize: 12, fontWeight: "600" },
  formMentionTag: {
    backgroundColor: "#1D9E7518",
    borderWidth: 1,
    borderColor: "#1D9E7544",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  formMentionText: { color: "#1D9E75", fontSize: 12, fontWeight: "600" },

  // Logout
  btnLogout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ef444418",
    borderRadius: 14,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ef444440",
    marginTop: 8,
  },
  btnLogoutText: { color: "#ef4444", fontSize: 15, fontWeight: "700" },
});
