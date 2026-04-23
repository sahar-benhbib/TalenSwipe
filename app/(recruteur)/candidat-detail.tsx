import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CANDIDATES } from "../../constants/mockData";

export default function CandidatDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const candidat = CANDIDATES.find((c) => c.id === id);
  const [status, setStatus] = useState(candidat?.status ?? "pending");

  if (!candidat) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#4a4861" />
          <Text style={styles.errorText}>Candidat introuvable</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAccept = () => {
    Alert.alert(
      "Accepter le candidat",
      `Voulez-vous accepter la candidature de ${candidat.name} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Accepter",
          onPress: () => {
            setStatus("accepted");
            Alert.alert("✅ Accepté !", `${candidat.name} a été accepté.`);
          },
        },
      ],
    );
  };

  const handleRefuse = () => {
    Alert.alert(
      "Refuser le candidat",
      `Voulez-vous refuser la candidature de ${candidat.name} ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Refuser",
          style: "destructive",
          onPress: () => {
            setStatus("refused");
            Alert.alert("❌ Refusé", `${candidat.name} a été refusé.`);
          },
        },
      ],
    );
  };

  const handleContact = () => {
    router.push(
      `/(recruteur)/chat?candidatId=${candidat.id}&candidatName=${encodeURIComponent(candidat.name)}`,
    );
  };

  const getStatusStyle = () => {
    switch (status) {
      case "accepted":
        return { color: "#1D9E75", bg: "#1D9E7518", label: "Accepté" };
      case "refused":
        return { color: "#ef4444", bg: "#ef444418", label: "Refusé" };
      default:
        return { color: "#f59e0b", bg: "#f59e0b18", label: "En attente" };
    }
  };

  const statusStyle = getStatusStyle();

  const getSkills = (role: string) => {
    if (role.toLowerCase().includes("react"))
      return ["React Native", "JavaScript", "TypeScript", "Redux"];
    if (role.toLowerCase().includes("full"))
      return ["Node.js", "React", "MongoDB", "Express"];
    if (role.toLowerCase().includes("data"))
      return ["Python", "SQL", "TensorFlow", "Pandas"];
    if (role.toLowerCase().includes("devops"))
      return ["Docker", "Kubernetes", "CI/CD", "AWS"];
    if (role.toLowerCase().includes("design"))
      return ["Figma", "Adobe XD", "UI/UX", "Sketch"];
    return ["JavaScript", "HTML/CSS", "Git", "Agile"];
  };

  const skills = getSkills(candidat.role);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil candidat</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card principale */}
        <View style={styles.mainCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{candidat.initials}</Text>
          </View>
          <Text style={styles.candidatName}>{candidat.name}</Text>
          <Text style={styles.candidatRole}>{candidat.role}</Text>
          <View
            style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusStyle.color }]}
            />
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        {/* Infos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#5b4fff"
            />
            <Text style={styles.sectionTitle}>Informations</Text>
          </View>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="briefcase-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Poste</Text>
                <Text style={styles.infoValue}>{candidat.role}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="time-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Expérience</Text>
                <Text style={styles.infoValue}>{candidat.experience}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="location-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Localisation</Text>
                <Text style={styles.infoValue}>Tunis, Tunisie</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="school-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Disponibilité</Text>
                <Text style={styles.infoValue}>Immédiate</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Compétences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash-outline" size={18} color="#5b4fff" />
            <Text style={styles.sectionTitle}>Compétences</Text>
          </View>
          <View style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Évaluation */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star-outline" size={18} color="#f59e0b" />
            <Text style={styles.sectionTitle}>Évaluation</Text>
          </View>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= 4 ? "star" : "star-outline"}
                size={24}
                color="#f59e0b"
              />
            ))}
            <Text style={styles.starsLabel}>4/5</Text>
          </View>
          <Text style={styles.noteText}>
            Candidat sérieux avec un profil technique solide. Bonne maîtrise des
            technologies demandées.
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Boutons action en bas */}
      <View style={styles.bottomBar}>
        {status === "pending" && (
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.refuseBtn}
              onPress={handleRefuse}
              activeOpacity={0.85}
            >
              <Ionicons name="close" size={20} color="#ef4444" />
              <Text style={styles.refuseBtnText}>Refuser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={handleAccept}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark" size={20} color="#ffffff" />
              <Text style={styles.acceptBtnText}>Accepter</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === "accepted" && (
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={handleContact}
            activeOpacity={0.85}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#ffffff" />
            <Text style={styles.contactBtnText}>Contacter le candidat</Text>
          </TouchableOpacity>
        )}

        {status === "refused" && (
          <TouchableOpacity
            style={styles.reconsiderBtn}
            onPress={handleAccept}
            activeOpacity={0.85}
          >
            <Ionicons name="refresh-outline" size={20} color="#f59e0b" />
            <Text style={styles.reconsiderBtnText}>Reconsidérer</Text>
          </TouchableOpacity>
        )}
      </View>
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
    paddingVertical: 12,
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
  headerTitle: { color: "#ffffff", fontSize: 17, fontWeight: "700" },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 16 },
  mainCard: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: "#5b4fff22",
    borderWidth: 2,
    borderColor: "#5b4fff55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarText: { color: "#5b4fff", fontSize: 28, fontWeight: "800" },
  candidatName: { color: "#ffffff", fontSize: 22, fontWeight: "800" },
  candidatRole: { color: "#4a4861", fontSize: 14, fontWeight: "500" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 13, fontWeight: "700" },
  section: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
    gap: 12,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  infoGrid: { gap: 12 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  infoIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#5b4fff15",
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    color: "#4a4861",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  infoValue: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillBadge: {
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: { color: "#5b4fff", fontSize: 12, fontWeight: "600" },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  starsLabel: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  noteText: { color: "#4a4861", fontSize: 13, lineHeight: 20 },
  bottomBar: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#1a1929",
    backgroundColor: "#08070f",
  },
  bottomActions: { flexDirection: "row", gap: 12 },
  refuseBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ef444415",
    borderWidth: 1,
    borderColor: "#ef444444",
    borderRadius: 14,
    paddingVertical: 14,
  },
  refuseBtnText: { color: "#ef4444", fontSize: 15, fontWeight: "700" },
  acceptBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#1D9E75",
    borderRadius: 14,
    paddingVertical: 14,
  },
  acceptBtnText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#5b4fff",
    borderRadius: 14,
    paddingVertical: 16,
  },
  contactBtnText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  reconsiderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#f59e0b15",
    borderWidth: 1,
    borderColor: "#f59e0b44",
    borderRadius: 14,
    paddingVertical: 16,
  },
  reconsiderBtnText: { color: "#f59e0b", fontSize: 16, fontWeight: "700" },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  errorText: { color: "#4a4861", fontSize: 18, fontWeight: "600" },
  backButton: {
    backgroundColor: "#5b4fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
});
