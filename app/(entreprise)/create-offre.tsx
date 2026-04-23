import { Ionicons } from "@expo/vector-icons";
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

const TYPES = ["CDI", "CDD", "Freelance", "Stage"];
const SKILLS_SUGGESTIONS = [
  "React",
  "React Native",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Flutter",
  "Docker",
  "AWS",
  "Figma",
  "SQL",
  "MongoDB",
];

export default function CreateOffre() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = () => {
    if (!title || !company || !location || !salary || !type || !description) {
      Alert.alert(
        "Champs manquants",
        "Veuillez remplir tous les champs obligatoires.",
      );
      return;
    }
    if (skills.length === 0) {
      Alert.alert("Compétences manquantes", "Ajoutez au moins une compétence.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Offre créée ✅",
        `L'offre "${title}" a été publiée avec succès.`,
        [
          {
            text: "OK",
            onPress: () => {
              setTitle("");
              setCompany("");
              setLocation("");
              setSalary("");
              setType("");
              setDescription("");
              setSkills([]);
            },
          },
        ],
      );
    }, 1000);
  };

  const isValid =
    title &&
    company &&
    location &&
    salary &&
    type &&
    description &&
    skills.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#08070f" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Nouvelle</Text>
            <Text style={styles.headerTitle}>Créer une offre</Text>
          </View>
          <View style={styles.headerBadge}>
            <Ionicons name="add-circle-outline" size={22} color="#5b4fff" />
          </View>
        </View>

        {/* Titre */}
        <Text style={styles.label}>
          Titre du poste <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Développeur React Native"
          placeholderTextColor="#4a4861"
          value={title}
          onChangeText={setTitle}
        />

        {/* Entreprise */}
        <Text style={styles.label}>
          Entreprise <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Vermeg"
          placeholderTextColor="#4a4861"
          value={company}
          onChangeText={setCompany}
        />

        {/* Localisation */}
        <Text style={styles.label}>
          Localisation <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="ex: Tunis, Tunisie"
          placeholderTextColor="#4a4861"
          value={location}
          onChangeText={setLocation}
        />

        {/* Salaire */}
        <Text style={styles.label}>
          Salaire <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="ex: 2500 TND"
          placeholderTextColor="#4a4861"
          value={salary}
          onChangeText={setSalary}
        />

        {/* Type de contrat */}
        <Text style={styles.label}>
          Type de contrat <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.typesRow}>
          {TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
              onPress={() => setType(t)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeBtnText,
                  type === t && styles.typeBtnTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Décrivez le poste, les responsabilités..."
          placeholderTextColor="#4a4861"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Compétences */}
        <Text style={styles.label}>
          Compétences <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.skillInputRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Ajouter une compétence..."
            placeholderTextColor="#4a4861"
            value={skillInput}
            onChangeText={setSkillInput}
            onSubmitEditing={() => addSkill(skillInput)}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.skillAddBtn}
            onPress={() => addSkill(skillInput)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#5b4fff" />
          </TouchableOpacity>
        </View>

        {/* Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suggestionsRow}
          contentContainerStyle={styles.suggestionsContent}
        >
          {SKILLS_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
            <TouchableOpacity
              key={s}
              style={styles.suggestionPill}
              onPress={() => addSkill(s)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={12} color="#4a4861" />
              <Text style={styles.suggestionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Skills ajoutés */}
        {skills.length > 0 && (
          <View style={styles.skillsAdded}>
            {skills.map((skill) => (
              <TouchableOpacity
                key={skill}
                style={styles.skillChip}
                onPress={() => removeSkill(skill)}
                activeOpacity={0.8}
              >
                <Text style={styles.skillChipText}>{skill}</Text>
                <Ionicons name="close" size={13} color="#5b4fff" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Bouton submit */}
        <TouchableOpacity
          style={[styles.btnSubmit, !isValid && styles.btnSubmitDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.btnSubmitText}>Publication en cours...</Text>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={18} color="#ffffff" />
              <Text style={styles.btnSubmitText}>Publier l'offre</Text>
            </>
          )}
        </TouchableOpacity>
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
    marginBottom: 24,
  },
  headerSub: { fontSize: 13, color: "#4a4861", marginBottom: 2 },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#ffffff" },
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
  label: { fontSize: 13, fontWeight: "600", color: "#ffffff", marginBottom: 8 },
  required: { color: "#ef4444" },
  input: {
    backgroundColor: "#0d0c1a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#1a1929",
    marginBottom: 16,
  },
  inputMultiline: { height: 100, paddingTop: 12 },
  typesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  typeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  typeBtnActive: { backgroundColor: "#5b4fff22", borderColor: "#5b4fff" },
  typeBtnText: { fontSize: 13, color: "#4a4861", fontWeight: "500" },
  typeBtnTextActive: { color: "#5b4fff" },
  skillInputRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  skillAddBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#5b4fff22",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  suggestionsRow: { marginBottom: 12 },
  suggestionsContent: { gap: 6 },
  suggestionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
  },
  suggestionText: { fontSize: 12, color: "#4a4861" },
  skillsAdded: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: "#5b4fff22",
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  skillChipText: { fontSize: 13, color: "#5b4fff", fontWeight: "500" },
  btnSubmit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#5b4fff",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  btnSubmitDisabled: { opacity: 0.4 },
  btnSubmitText: { fontSize: 15, fontWeight: "700", color: "#ffffff" },
});
