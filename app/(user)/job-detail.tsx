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

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#4a4861" />
          <Text style={styles.errorText}>Offre introuvable</Text>
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

  const handleApply = () => {
    Alert.alert(
      "Candidature envoyée 🎉",
      `Votre candidature pour le poste "${job.title}" chez ${job.company} a bien été envoyée !`,
      [{ text: "Super !", onPress: () => router.back() }],
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CDI":
        return "#1D9E75";
      case "CDD":
        return "#f59e0b";
      case "Freelance":
        return "#5b4fff";
      case "Stage":
        return "#3b82f6";
      default:
        return "#4a4861";
    }
  };

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
        <Text style={styles.headerTitle}>Détail de l'offre</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card principale */}
        <View style={styles.mainCard}>
          {/* Avatar entreprise */}
          <View style={styles.companyAvatar}>
            <Text style={styles.companyInitial}>
              {job.company.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>

          {/* Badges */}
          <View style={styles.badgesRow}>
            <View
              style={[
                styles.typeBadge,
                {
                  backgroundColor: getTypeColor(job.type) + "22",
                  borderColor: getTypeColor(job.type),
                },
              ]}
            >
              <Text
                style={[
                  styles.typeBadgeText,
                  { color: getTypeColor(job.type) },
                ]}
              >
                {job.type}
              </Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="location-outline" size={13} color="#4a4861" />
              <Text style={styles.infoBadgeText}>{job.location}</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="cash-outline" size={13} color="#4a4861" />
              <Text style={styles.infoBadgeText}>{job.salary}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text-outline" size={18} color="#5b4fff" />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <Text style={styles.descriptionText}>{job.description}</Text>
        </View>

        {/* Infos clés */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#5b4fff"
            />
            <Text style={styles.sectionTitle}>Informations clés</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="briefcase-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Type de contrat</Text>
                <Text style={styles.infoValue}>{job.type}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="location-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Localisation</Text>
                <Text style={styles.infoValue}>{job.location}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="cash-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Salaire</Text>
                <Text style={styles.infoValue}>{job.salary}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconWrapper}>
                <Ionicons name="business-outline" size={18} color="#5b4fff" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Entreprise</Text>
                <Text style={styles.infoValue}>{job.company}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash-outline" size={18} color="#5b4fff" />
            <Text style={styles.sectionTitle}>Compétences requises</Text>
          </View>
          <View style={styles.skillsGrid}>
            {job.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bouton postuler fixe en bas */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.85}
        >
          <Ionicons name="paper-plane-outline" size={20} color="#ffffff" />
          <Text style={styles.applyButtonText}>Postuler maintenant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08070f",
  },
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  mainCard: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 24,
    alignItems: "center",
  },
  companyAvatar: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#5b4fff22",
    borderWidth: 2,
    borderColor: "#5b4fff55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  companyInitial: {
    color: "#5b4fff",
    fontSize: 30,
    fontWeight: "800",
  },
  jobTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  companyName: {
    color: "#4a4861",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1a1929",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  infoBadgeText: {
    color: "#4a4861",
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  descriptionText: {
    color: "#4a4861",
    fontSize: 14,
    lineHeight: 22,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
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
  infoValue: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBadge: {
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: "#5b4fff",
    fontSize: 12,
    fontWeight: "600",
  },
  bottomBar: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#1a1929",
    backgroundColor: "#08070f",
  },
  applyButton: {
    backgroundColor: "#5b4fff",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  errorText: {
    color: "#4a4861",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "#5b4fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
