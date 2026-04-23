import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { jobs } from "../../constants/mockData";

type FilterType = "all" | "active" | "closed";

export default function OffresScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [offres, setOffres] = useState(jobs);

  const filtered = offres.filter((o) => {
    if (filter === "all") return true;
    if (filter === "active") return o.type !== "Fermé";
    if (filter === "closed") return o.type === "Fermé";
    return true;
  });

  const handleDelete = (id: string) => {
    Alert.alert("Supprimer l'offre", "Cette action est irréversible.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => setOffres((prev) => prev.filter((o) => o.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes offres</Text>

      <View style={styles.filters}>
        {(["all", "active", "closed"] as FilterType[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f === "all" ? "Toutes" : f === "active" ? "Actives" : "Fermées"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/(entreprise)/offre-detail?id=${item.id}`)
            }
          >
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>
                  {item.location} · {item.type}
                </Text>
              </View>
              <Text style={styles.salary}>{item.salary}</Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  Alert.alert(
                    "Modification",
                    "Fonctionnalité disponible dans une prochaine version.",
                  );
                }}
              >
                <Ionicons name="pencil-outline" size={16} color="#5b4fff" />
                <Text style={styles.actionEdit}>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                <Ionicons name="trash-outline" size={16} color="#ef4444" />
                <Text style={styles.actionDelete}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune offre trouvée.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08070f", paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 8,
    marginBottom: 16,
  },
  filters: { flexDirection: "row", gap: 8, marginBottom: 16 },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  filterBtnActive: { backgroundColor: "#5b4fff", borderColor: "#5b4fff" },
  filterText: { color: "#4a4861", fontSize: 13 },
  filterTextActive: { color: "#ffffff", fontWeight: "600" },
  card: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: { flexDirection: "row", alignItems: "flex-start" },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#ffffff" },
  cardSub: { fontSize: 13, color: "#4a4861", marginTop: 4 },
  salary: { fontSize: 13, color: "#1D9E75", fontWeight: "600" },
  cardActions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1a1929",
  },
  actionBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionEdit: { fontSize: 13, color: "#5b4fff" },
  actionDelete: { fontSize: 13, color: "#ef4444" },
  empty: { color: "#4a4861", textAlign: "center", marginTop: 40 },
});
