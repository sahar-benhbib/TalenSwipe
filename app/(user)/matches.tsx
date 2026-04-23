import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { jobs } from "../../constants/mockData";

export default function Matches() {
  const router = useRouter();

  const likedJobs = jobs.slice(0, 4);

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Matchs</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{likedJobs.length}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {likedJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#4a4861" />
            <Text style={styles.emptyTitle}>Aucun match pour l'instant</Text>
            <Text style={styles.emptySubtitle}>
              Swipe des offres pour les retrouver ici
            </Text>
          </View>
        ) : (
          likedJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push(`/(user)/job-detail?id=${job.id}`)}
            >
              {/* Left — avatar */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {job.company.charAt(0).toUpperCase()}
                </Text>
              </View>

              {/* Center — infos */}
              <View style={styles.cardContent}>
                <Text style={styles.jobTitle} numberOfLines={1}>
                  {job.title}
                </Text>
                <Text style={styles.companyName} numberOfLines={1}>
                  {job.company}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#4a4861"
                    />
                    <Text style={styles.metaText}>{job.location}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="cash-outline" size={12} color="#4a4861" />
                    <Text style={styles.metaText}>{job.salary}</Text>
                  </View>
                </View>

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
              </View>

              {/* Right — boutons */}
              <View style={styles.rightActions}>
                <TouchableOpacity
                  style={styles.chatBtn}
                  onPress={(e) => {
                    e.stopPropagation();
                    router.push(
                      `/(user)/chat?jobId=${job.id}&jobTitle=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`,
                    );
                  }}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={18}
                    color="#5b4fff"
                  />
                </TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#4a4861" />
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
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
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1929",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerBadge: {
    backgroundColor: "#5b4fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  headerBadgeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#0d0c1a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#5b4fff22",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#5b4fff",
    fontSize: 20,
    fontWeight: "800",
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  jobTitle: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  companyName: {
    color: "#4a4861",
    fontSize: 13,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  metaText: {
    color: "#4a4861",
    fontSize: 11,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 4,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chatBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#5b4fff22",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: 12,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: "#4a4861",
    fontSize: 14,
    textAlign: "center",
  },
});
