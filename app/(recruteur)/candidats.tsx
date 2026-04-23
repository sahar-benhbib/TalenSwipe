import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CANDIDATES,
  Candidate,
  CandidateStatus,
} from "../../constants/mockData";

type SortOption = "name" | "experience" | "status";

interface CandidateCardProps {
  candidate: Candidate;
  onAccept: (id: string) => void;
  onRefuse: (id: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onAccept,
  onRefuse,
}) => {
  const router = useRouter();

  const statusColor =
    candidate.status === "accepted"
      ? "#1D9E75"
      : candidate.status === "refused"
        ? "#ef4444"
        : "#f59e0b";
  const statusLabel =
    candidate.status === "accepted"
      ? "Accepté"
      : candidate.status === "refused"
        ? "Refusé"
        : "En attente";
  const statusIcon =
    candidate.status === "accepted"
      ? "checkmark-circle"
      : candidate.status === "refused"
        ? "close-circle"
        : "time";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        router.push(`/(recruteur)/candidat-detail?id=${candidate.id}`)
      }
    >
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{candidate.initials}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{candidate.name}</Text>
          <Text style={styles.cardRole}>{candidate.role}</Text>
          <Text style={styles.cardExp}>{candidate.experience}</Text>
        </View>
        <View
          style={[styles.statusPill, { backgroundColor: statusColor + "22" }]}
        >
          <Ionicons name={statusIcon as any} size={13} color={statusColor} />
          <Text style={[styles.statusPillText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardActions}>
        {candidate.status !== "refused" && (
          <TouchableOpacity
            style={styles.btnRefuse}
            onPress={(e) => {
              e.stopPropagation();
              onRefuse(candidate.id);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={16} color="#ef4444" />
            <Text style={styles.btnRefuseText}>Refuser</Text>
          </TouchableOpacity>
        )}
        {candidate.status !== "accepted" && (
          <TouchableOpacity
            style={styles.btnAccept}
            onPress={(e) => {
              e.stopPropagation();
              onAccept(candidate.id);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={16} color="#1D9E75" />
            <Text style={styles.btnAcceptText}>Accepter</Text>
          </TouchableOpacity>
        )}
        {candidate.status === "accepted" && (
          <TouchableOpacity
            style={styles.btnContact}
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation();
              Alert.alert(
                "Contacter",
                `Vous souhaitez contacter ${candidate.name} ?`,
                [
                  { text: "Annuler", style: "cancel" },
                  {
                    text: "Envoyer un message",
                    onPress: () =>
                      Alert.alert(
                        "Message envoyé ✅",
                        `Votre demande de contact a été envoyée à ${candidate.name}.`,
                      ),
                  },
                ],
              );
            }}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#5b4fff" />
            <Text style={styles.btnContactText}>Contacter</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function RecruteurCandidats() {
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CandidateStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("name");
  const [showSort, setShowSort] = useState(false);

  const handleAccept = (id: string) =>
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "accepted" } : c)),
    );
  const handleRefuse = (id: string) =>
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "refused" } : c)),
    );

  const total = candidates.length;
  const accepted = candidates.filter((c) => c.status === "accepted").length;
  const refused = candidates.filter((c) => c.status === "refused").length;
  const pending = candidates.filter((c) => c.status === "pending").length;

  const processed = candidates
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || c.status === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "experience")
        return a.experience.localeCompare(b.experience);
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const FilterPill = ({
    label,
    value,
    count,
  }: {
    label: string;
    value: CandidateStatus | "all";
    count: number;
  }) => (
    <TouchableOpacity
      style={[styles.filterPill, filter === value && styles.filterPillActive]}
      onPress={() => setFilter(value)}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.filterPillText,
          filter === value && styles.filterPillTextActive,
        ]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.filterCount,
          filter === value && styles.filterCountActive,
        ]}
      >
        <Text
          style={[
            styles.filterCountText,
            filter === value && styles.filterCountTextActive,
          ]}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08070f" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Gestion des</Text>
            <Text style={styles.headerTitle}>Candidatures</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{total}</Text>
            <Text style={styles.headerBadgeLabel}>total</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#4a4861" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un candidat..."
            placeholderTextColor="#4a4861"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#4a4861" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterSortRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRowContent}
          >
            <FilterPill label="Tous" value="all" count={total} />
            <FilterPill label="En attente" value="pending" count={pending} />
            <FilterPill label="Acceptés" value="accepted" count={accepted} />
            <FilterPill label="Refusés" value="refused" count={refused} />
          </ScrollView>
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setShowSort(!showSort)}
            activeOpacity={0.8}
          >
            <Ionicons name="funnel-outline" size={16} color="#5b4fff" />
          </TouchableOpacity>
        </View>

        {showSort && (
          <View style={styles.sortDropdown}>
            <Text style={styles.sortTitle}>Trier par</Text>
            {(["name", "experience", "status"] as SortOption[]).map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.sortOption}
                  onPress={() => {
                    setSort(option);
                    setShowSort(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sort === option && styles.sortOptionActive,
                    ]}
                  >
                    {option === "name"
                      ? "Nom (A → Z)"
                      : option === "experience"
                        ? "Expérience"
                        : "Statut"}
                  </Text>
                  {sort === option && (
                    <Ionicons name="checkmark" size={16} color="#5b4fff" />
                  )}
                </TouchableOpacity>
              ),
            )}
          </View>
        )}

        <Text style={styles.resultsText}>
          {processed.length} candidat{processed.length > 1 ? "s" : ""} trouvé
          {processed.length > 1 ? "s" : ""}
        </Text>

        {processed.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#4a4861" />
            <Text style={styles.emptyTitle}>Aucun résultat</Text>
            <Text style={styles.emptyText}>
              Essaie un autre filtre ou mot-clé
            </Text>
          </View>
        ) : (
          processed.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onAccept={handleAccept}
              onRefuse={handleRefuse}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#08070f" },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerSub: { fontSize: 13, color: "#4a4861", marginBottom: 2 },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#ffffff" },
  headerBadge: {
    alignItems: "center",
    backgroundColor: "#5b4fff22",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  headerBadgeText: { fontSize: 20, fontWeight: "700", color: "#5b4fff" },
  headerBadgeLabel: { fontSize: 11, color: "#5b4fff", opacity: 0.7 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  searchInput: { flex: 1, fontSize: 14, color: "#ffffff" },
  filterSortRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  filterRowContent: { gap: 8 },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 99,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  filterPillActive: { backgroundColor: "#5b4fff22", borderColor: "#5b4fff" },
  filterPillText: { fontSize: 12, color: "#4a4861", fontWeight: "500" },
  filterPillTextActive: { color: "#5b4fff" },
  filterCount: {
    backgroundColor: "#1a1929",
    borderRadius: 99,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  filterCountActive: { backgroundColor: "#5b4fff33" },
  filterCountText: { fontSize: 10, color: "#4a4861", fontWeight: "600" },
  filterCountTextActive: { color: "#5b4fff" },
  sortBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#5b4fff22",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  sortDropdown: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  sortTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4a4861",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  sortOptionText: { fontSize: 14, color: "#4a4861" },
  sortOptionActive: { color: "#ffffff", fontWeight: "600" },
  resultsText: {
    fontSize: 12,
    color: "#4a4861",
    marginBottom: 12,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#5b4fff22",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  avatarText: { fontSize: 15, fontWeight: "700", color: "#5b4fff" },
  cardInfo: { flex: 1, gap: 2 },
  cardName: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  cardRole: { fontSize: 13, color: "#4a4861" },
  cardExp: { fontSize: 12, color: "#4a4861" },
  statusPill: {
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusPillText: { fontSize: 11, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#1a1929", marginBottom: 12 },
  cardActions: { flexDirection: "row", gap: 8, justifyContent: "flex-end" },
  btnRefuse: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ef444422",
    borderWidth: 1,
    borderColor: "#ef444444",
  },
  btnRefuseText: { fontSize: 13, color: "#ef4444", fontWeight: "500" },
  btnAccept: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1D9E7522",
    borderWidth: 1,
    borderColor: "#1D9E7544",
  },
  btnAcceptText: { fontSize: 13, color: "#1D9E75", fontWeight: "500" },
  btnContact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#5b4fff22",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  btnContactText: { fontSize: 13, color: "#5b4fff", fontWeight: "500" },
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: "600", color: "#ffffff" },
  emptyText: { fontSize: 13, color: "#4a4861" },
});
