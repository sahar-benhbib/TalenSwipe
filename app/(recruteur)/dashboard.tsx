import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CANDIDATES, Candidate } from "../../constants/mockData";

type FilterStatus = "all" | "pending" | "accepted" | "refused";

interface StatCardProps {
  label: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={[styles.statIconWrap, { backgroundColor: color + "22" }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

interface CandidateRowProps {
  candidate: Candidate;
  onAccept: (id: string) => void;
  onRefuse: (id: string) => void;
}

const CandidateRow: React.FC<CandidateRowProps> = ({
  candidate,
  onAccept,
  onRefuse,
}) => {
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

  return (
    <View style={styles.candidateCard}>
      <View style={styles.candidateLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{candidate.initials}</Text>
        </View>
        <View style={styles.candidateInfo}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <Text style={styles.candidateRole}>{candidate.role}</Text>
          <Text style={styles.candidateExp}>{candidate.experience}</Text>
        </View>
      </View>

      <View
        style={[styles.statusBadge, { backgroundColor: statusColor + "22" }]}
      >
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {statusLabel}
        </Text>
      </View>

      {candidate.status === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.btnRefuse}
            onPress={() => onRefuse(candidate.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={18} color="#ef4444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnAccept}
            onPress={() => onAccept(candidate.id)}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark" size={18} color="#1D9E75" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function RecruteurDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const total = candidates.length;
  const accepted = candidates.filter((c) => c.status === "accepted").length;
  const refused = candidates.filter((c) => c.status === "refused").length;
  const pending = candidates.filter((c) => c.status === "pending").length;

  const handleAccept = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "accepted" } : c)),
    );
  };

  const handleRefuse = (id: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "refused" } : c)),
    );
  };

  const filtered =
    filter === "all"
      ? candidates
      : candidates.filter((c) => c.status === filter);

  const FilterPill = ({
    label,
    value,
    count,
  }: {
    label: string;
    value: FilterStatus;
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
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour 👋</Text>
            <Text style={styles.title}>Dashboard Recruteur</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="briefcase-outline" size={22} color="#5b4fff" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
        <View style={styles.statsGrid}>
          <StatCard
            label="Total"
            value={total}
            icon="people-outline"
            color="#5b4fff"
          />
          <StatCard
            label="En attente"
            value={pending}
            icon="time-outline"
            color="#f59e0b"
          />
          <StatCard
            label="Acceptés"
            value={accepted}
            icon="checkmark-circle-outline"
            color="#1D9E75"
          />
          <StatCard
            label="Refusés"
            value={refused}
            icon="close-circle-outline"
            color="#ef4444"
          />
        </View>

        {total > 0 && (
          <View style={styles.rateCard}>
            <View style={styles.rateHeader}>
              <Text style={styles.rateLabel}>Taux d'acceptation</Text>
              <Text style={styles.rateValue}>
                {Math.round((accepted / total) * 100)}%
              </Text>
            </View>
            <View style={styles.rateBarBg}>
              <View
                style={[
                  styles.rateBarFill,
                  { width: `${Math.round((accepted / total) * 100)}%` },
                ]}
              />
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>Candidatures</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterRowContent}
        >
          <FilterPill label="Tous" value="all" count={total} />
          <FilterPill label="En attente" value="pending" count={pending} />
          <FilterPill label="Acceptés" value="accepted" count={accepted} />
          <FilterPill label="Refusés" value="refused" count={refused} />
        </ScrollView>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="person-outline" size={48} color="#4a4861" />
            <Text style={styles.emptyText}>
              Aucun candidat dans cette catégorie
            </Text>
          </View>
        ) : (
          filtered.map((candidate) => (
            <CandidateRow
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
    marginBottom: 28,
  },
  greeting: { fontSize: 13, color: "#4a4861", marginBottom: 2 },
  title: { fontSize: 24, fontWeight: "700", color: "#ffffff" },
  headerBadge: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#5b4fff22",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4a4861",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    gap: 6,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  statValue: { fontSize: 26, fontWeight: "700", color: "#ffffff" },
  statLabel: { fontSize: 12, color: "#4a4861", fontWeight: "500" },
  rateCard: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 28,
  },
  rateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rateLabel: { fontSize: 14, color: "#ffffff", fontWeight: "500" },
  rateValue: { fontSize: 14, color: "#1D9E75", fontWeight: "700" },
  rateBarBg: {
    height: 6,
    backgroundColor: "#1a1929",
    borderRadius: 99,
    overflow: "hidden",
  },
  rateBarFill: { height: "100%", backgroundColor: "#1D9E75", borderRadius: 99 },
  filterRow: { marginBottom: 16 },
  filterRowContent: { gap: 8, paddingRight: 4 },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  filterPillActive: { backgroundColor: "#5b4fff22", borderColor: "#5b4fff" },
  filterPillText: { fontSize: 13, color: "#4a4861", fontWeight: "500" },
  filterPillTextActive: { color: "#5b4fff" },
  filterCount: {
    backgroundColor: "#1a1929",
    borderRadius: 99,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  filterCountActive: { backgroundColor: "#5b4fff33" },
  filterCountText: { fontSize: 11, color: "#4a4861", fontWeight: "600" },
  filterCountTextActive: { color: "#5b4fff" },
  candidateCard: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  candidateLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
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
  candidateInfo: { flex: 1, gap: 2 },
  candidateName: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  candidateRole: { fontSize: 13, color: "#4a4861" },
  candidateExp: { fontSize: 12, color: "#4a4861" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    marginBottom: 10,
  },
  statusDot: { width: 6, height: 6, borderRadius: 99 },
  statusText: { fontSize: 12, fontWeight: "600" },
  actions: { flexDirection: "row", gap: 10, justifyContent: "flex-end" },
  btnRefuse: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ef444422",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ef444444",
  },
  btnAccept: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1D9E7522",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1D9E7544",
  },
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, color: "#4a4861", textAlign: "center" },
});
