import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { Alert } from "react-native";
import { logoutUser } from "../../hooks/useAuth";

export default function EntrepriseLayout() {
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await logoutUser();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0d0c1a",
          borderTopColor: "#1a1929",
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#5b4fff",
        tabBarInactiveTintColor: "#4a4861",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="offres"
        options={{
          title: "Offres",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-offre"
        options={{
          title: "Créer",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="offre-detail" options={{ href: null }} />
      <Tabs.Screen
        name="logout"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          title: "Logout",
          tabBarIcon: ({ size }) => (
            <Ionicons name="log-out-outline" size={size} color="#ef4444" />
          ),
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
            color: "#ef4444",
          },
        }}
      />
    </Tabs>
  );
}
