import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type VideoFile = {
  uri: string;
  duration: number | undefined;
  fileName: string;
};

export default function VideoScreen() {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const pickVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Active l'accès à la galerie dans les paramètres.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 120,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setVideo({
        uri: asset.uri,
        duration: asset.duration ?? undefined,
        fileName: asset.fileName ?? "video_cv.mp4",
      });
      setUploaded(false);
    }
  };

  const recordVideo = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Active l'accès à la caméra dans les paramètres.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 120,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setVideo({
        uri: asset.uri,
        duration: asset.duration ?? undefined,
        fileName: asset.fileName ?? "video_cv.mp4",
      });
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    Alert.alert("Upload", "Vidéo CV envoyée avec succès !", [
      { text: "OK", onPress: () => setUploaded(true) },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("Supprimer", "Tu veux supprimer ta vidéo CV ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setVideo(null);
          setUploaded(false);
        },
      },
    ]);
  };

  const formatDuration = (seconds: number | undefined) => {
    if (!seconds) return "—";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vidéo CV</Text>
        <Text style={styles.headerSub}>Présente-toi en moins de 2 minutes</Text>
      </View>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>
          <Ionicons name="bulb-outline" size={14} color="#f59e0b" /> Conseils
        </Text>
        {[
          "Présente-toi en 60-90 secondes",
          "Parle de tes compétences clés",
          "Sois naturel et souriant",
          "Bonne lumière et fond neutre",
        ].map((tip, i) => (
          <View key={i} style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Video Preview */}
      {video ? (
        <View style={styles.previewCard}>
          <View style={styles.previewIcon}>
            <Ionicons name="videocam" size={40} color="#5b4fff" />
          </View>
          <View style={styles.previewInfo}>
            <Text style={styles.previewName} numberOfLines={1}>
              {video.fileName}
            </Text>
            <Text style={styles.previewDuration}>
              Durée: {formatDuration(video.duration)}
            </Text>
            {uploaded && (
              <View style={styles.uploadedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#1D9E75" />
                <Text style={styles.uploadedText}>Envoyée</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyPreview}>
          <Ionicons name="film-outline" size={60} color="#4a4861" />
          <Text style={styles.emptyText}>Aucune vidéo sélectionnée</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonsSection}>
        <Text style={styles.sectionTitle}>Ajouter une vidéo</Text>

        <TouchableOpacity style={styles.btnPrimary} onPress={pickVideo}>
          <Ionicons name="images-outline" size={22} color="#ffffff" />
          <Text style={styles.btnPrimaryText}>Choisir depuis la galerie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={recordVideo}>
          <Ionicons name="camera-outline" size={22} color="#5b4fff" />
          <Text style={styles.btnSecondaryText}>Enregistrer maintenant</Text>
        </TouchableOpacity>

        {video && !uploaded && (
          <TouchableOpacity style={styles.btnUpload} onPress={handleUpload}>
            <Ionicons name="cloud-upload-outline" size={22} color="#ffffff" />
            <Text style={styles.btnUploadText}>Envoyer la vidéo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info */}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={16} color="#4a4861" />
        <Text style={styles.infoText}>
          Formats acceptés: MP4, MOV. Durée max: 2 minutes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08070f" },
  header: { paddingHorizontal: 20, paddingTop: 55, paddingBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#ffffff" },
  headerSub: { fontSize: 13, color: "#4a4861", marginTop: 4 },
  tipsCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f59e0b22",
    padding: 16,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#f59e0b",
    marginBottom: 4,
  },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  tipDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#f59e0b" },
  tipText: { fontSize: 13, color: "#9991b1", flex: 1 },
  previewCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#5b4fff33",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  previewIcon: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#5b4fff18",
    alignItems: "center",
    justifyContent: "center",
  },
  previewInfo: { flex: 1, gap: 4 },
  previewName: { fontSize: 14, fontWeight: "600", color: "#ffffff" },
  previewDuration: { fontSize: 12, color: "#4a4861" },
  uploadedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  uploadedText: { fontSize: 12, color: "#1D9E75", fontWeight: "600" },
  deleteBtn: { padding: 8 },
  emptyPreview: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#0d0c1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1a1830",
    padding: 40,
    alignItems: "center",
    gap: 12,
  },
  emptyText: { fontSize: 14, color: "#4a4861" },
  buttonsSection: { paddingHorizontal: 16, gap: 12, marginBottom: 20 },
  sectionTitle: {
    fontSize: 12,
    color: "#4a4861",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#5b4fff",
    borderRadius: 14,
    padding: 16,
  },
  btnPrimaryText: { fontSize: 15, color: "#ffffff", fontWeight: "700" },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#5b4fff18",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#5b4fff44",
  },
  btnSecondaryText: { fontSize: 15, color: "#5b4fff", fontWeight: "700" },
  btnUpload: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#1D9E75",
    borderRadius: 14,
    padding: 16,
  },
  btnUploadText: { fontSize: 15, color: "#ffffff", fontWeight: "700" },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  infoText: { fontSize: 12, color: "#4a4861", flex: 1, lineHeight: 18 },
});
