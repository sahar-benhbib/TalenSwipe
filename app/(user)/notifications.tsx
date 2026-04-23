import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationType = "match" | "view" | "accepted" | "refused" | "new";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "accepted",
    title: "Candidature acceptée 🎉",
    message: "Votre candidature chez Vermeg a été acceptée !",
    time: "Il y a 2 min",
    read: false,
  },
  {
    id: "2",
    type: "match",
    title: "Nouveau match !",
    message: "Vous avez matché avec une offre React Native chez Telnet.",
    time: "Il y a 15 min",
    read: false,
  },
  {
    id: "3",
    type: "view",
    title: "Profil consulté 👀",
    message: "Un recruteur chez Sofrecom a consulté votre profil.",
    time: "Il y a 1h",
    read: false,
  },
  {
    id: "4",
    type: "new",
    title: "Nouvelle offre pour vous",
    message: "Une offre Full Stack JS chez OnePoint correspond à votre profil.",
    time: "Il y a 3h",
    read: true,
  },
  {
    id: "5",
    type: "refused",
    title: "Candidature refusée",
    message: "Votre candidature chez Proxym n'a pas été retenue.",
    time: "Il y a 5h",
    read: true,
  },
  {
    id: "6",
    type: "match",
    title: "Nouveau match !",
    message: "Vous avez matché avec une offre DevOps chez Actia.",
    time: "Hier",
    read: true,
  },
  {
    id: "7",
    type: "new",
    title: "Nouvelle offre pour vous",
    message: "Une offre Mobile Flutter chez Esprit correspond à votre profil.",
    time: "Hier",
    read: true,
  },
  {
    id: "8",
    type: "view",
    title: "Profil consulté 👀",
    message: "Un recruteur chez Wevioo a consulté votre profil.",
    time: "Il y a 2 jours",
    read: true,
  },
];

const getNotifStyle = (type: NotificationType) => {
  switch (type) {
    case "accepted":
      return {
        color: "#1D9E75",
        bg: "#1D9E7518",
        icon: "checkmark-circle" as const,
      };
    case "refused":
      return {
        color: "#ef4444",
        bg: "#ef444418",
        icon: "close-circle" as const,
      };
    case "match":
      return { color: "#5b4fff", bg: "#5b4fff18", icon: "heart" as const };
    case "view":
      return { color: "#f59e0b", bg: "#f59e0b18", icon: "eye" as const };
    case "new":
      return { color: "#3b82f6", bg: "#3b82f618", icon: "briefcase" as const };
  }
};

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.headerSub}>
              {unreadCount} non lue{unreadCount > 1 ? "s" : ""}
            </Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
            <Ionicons name="checkmark-done-outline" size={16} color="#5b4fff" />
            <Text style={styles.markAllText}>Tout lire</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name="notifications-off-outline"
            size={72}
            color="#4a4861"
          />
          <Text style={styles.emptyTitle}>Aucune notification</Text>
          <Text style={styles.emptySubtitle}>
            Vous serez notifié de vos matchs et candidatures ici
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Unread */}
          {notifications.some((n) => !n.read) && (
            <>
              <Text style={styles.sectionLabel}>NOUVELLES</Text>
              {notifications
                .filter((n) => !n.read)
                .map((notif) => {
                  const style = getNotifStyle(notif.type);
                  return (
                    <TouchableOpacity
                      key={notif.id}
                      style={[styles.card, styles.cardUnread]}
                      onPress={() => markRead(notif.id)}
                      activeOpacity={0.85}
                    >
                      <View
                        style={[
                          styles.iconWrapper,
                          { backgroundColor: style.bg },
                        ]}
                      >
                        <Ionicons
                          name={style.icon}
                          size={22}
                          color={style.color}
                        />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{notif.title}</Text>
                        <Text style={styles.cardMessage}>{notif.message}</Text>
                        <Text style={styles.cardTime}>{notif.time}</Text>
                      </View>
                      <View style={styles.unreadDot} />
                    </TouchableOpacity>
                  );
                })}
            </>
          )}

          {/* Read */}
          {notifications.some((n) => n.read) && (
            <>
              <Text style={styles.sectionLabel}>PRÉCÉDENTES</Text>
              {notifications
                .filter((n) => n.read)
                .map((notif) => {
                  const style = getNotifStyle(notif.type);
                  return (
                    <TouchableOpacity
                      key={notif.id}
                      style={styles.card}
                      onPress={() => deleteNotif(notif.id)}
                      activeOpacity={0.85}
                    >
                      <View
                        style={[
                          styles.iconWrapper,
                          { backgroundColor: style.bg },
                        ]}
                      >
                        <Ionicons
                          name={style.icon}
                          size={22}
                          color={style.color}
                        />
                      </View>
                      <View style={styles.cardContent}>
                        <Text style={[styles.cardTitle, styles.cardTitleRead]}>
                          {notif.title}
                        </Text>
                        <Text style={styles.cardMessage}>{notif.message}</Text>
                        <Text style={styles.cardTime}>{notif.time}</Text>
                      </View>
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#4a4861"
                      />
                    </TouchableOpacity>
                  );
                })}
            </>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      )}
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1929",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerSub: {
    color: "#5b4fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  markAllText: {
    color: "#5b4fff",
    fontSize: 12,
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 8,
  },
  sectionLabel: {
    color: "#4a4861",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0d0c1a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 14,
  },
  cardUnread: {
    borderColor: "#5b4fff33",
    backgroundColor: "#5b4fff08",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  cardTitleRead: {
    fontWeight: "500",
    color: "#ffffff99",
  },
  cardMessage: {
    color: "#4a4861",
    fontSize: 12,
    lineHeight: 18,
  },
  cardTime: {
    color: "#4a4861",
    fontSize: 11,
    marginTop: 2,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5b4fff",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  emptySubtitle: {
    color: "#4a4861",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});
