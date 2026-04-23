import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { jobs } from "../../constants/mockData";

export default function OffreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const offre = jobs.find((j) => j.id === id);

  if (!offre) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={48} color="#4a4861" />
          <Text style={styles.notFoundText}>Offre introuvable</Text>
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.back()}
          >
            <Text style={styles.backLinkText}>Retour aux offres</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleModifier = () => {
    Alert.alert(
      "Modification",
      "Fonctionnalité disponible dans une prochaine version.",
    );
  };

  const handleSupprimer = () => {
    Alert.alert("Supprimer l'offre", "Cette action est irréversible.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => router.replace("/(entreprise)/offres"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Détail de l'offre</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.offreTitle}>{offre.title}</Text>
          <Text style={styles.company}>{offre.company}</Text>
          <View style={styles.row}>
            <View style={styles.badge}>
              <Ionicons name="location-outline" size={13} color="#5b4fff" />
              <Text style={styles.badgeText}>{offre.location}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="briefcase-outline" size={13} color="#5b4fff" />
              <Text style={styles.badgeText}>{offre.type}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="cash-outline" size={13} color="#1D9E75" />
              <Text style={[styles.badgeText, { color: "#1D9E75" }]}>
                {offre.salary}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: "Vues", value: "124", icon: "eye-outline" },
            { label: "Candidatures", value: "18", icon: "people-outline" },
            { label: "Matchs", value: "6", icon: "heart-outline" },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon as any} size={20} color="#5b4fff" />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{offre.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Compétences requises</Text>
          <View style={styles.skillsWrap}>
            {offre.skills.map((skill) => (
              <View key={skill} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnModifier} onPress={handleModifier}>
            <Ionicons name="pencil-outline" size={18} color="#5b4fff" />
            <Text style={styles.btnModifierText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSupprimer}
            onPress={handleSupprimer}
          >
            <Ionicons name="trash-outline" size={18} color="#ef4444" />
            <Text style={styles.btnSupprimerText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
  card: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  offreTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  company: { fontSize: 14, color: "#4a4861", marginBottom: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1a1929",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, color: "#ffffff" },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statValue: { fontSize: 18, fontWeight: "700", color: "#ffffff" },
  statLabel: { fontSize: 11, color: "#4a4861" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 10,
  },
  description: { fontSize: 14, color: "#4a4861", lineHeight: 22 },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillChip: {
    backgroundColor: "#1a1929",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: { fontSize: 12, color: "#5b4fff", fontWeight: "500" },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 32,
  },
  btnModifier: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#5b4fff",
    borderRadius: 12,
    paddingVertical: 14,
  },
  btnModifierText: { color: "#5b4fff", fontWeight: "600", fontSize: 15 },
  btnSupprimer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 12,
    paddingVertical: 14,
  },
  btnSupprimerText: { color: "#ef4444", fontWeight: "600", fontSize: 15 },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 100,
  },
  notFoundText: { fontSize: 16, color: "#4a4861" },
  backBtn: { padding: 16 },
  backLink: {
    backgroundColor: "#5b4fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  backLinkText: { color: "#ffffff", fontWeight: "600" },
});
