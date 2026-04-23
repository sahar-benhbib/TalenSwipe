import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert, View } from "react-native";
import { logoutUser } from "../../hooks/useAuth";

export default function Logout() {
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;

    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
        onPress: () => router.replace("/(entreprise)/offres"),
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          router.replace("/(auth)/login");
        },
      },
    ]);
  }, []);

  return <View style={{ flex: 1, backgroundColor: "#08070f" }} />;
}
