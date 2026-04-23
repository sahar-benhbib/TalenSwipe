import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  text: string;
  sender: "user" | "recruteur";
  time: string;
};

const getTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Bonjour ! Nous avons bien reçu votre candidature et elle nous intéresse beaucoup.",
    sender: "recruteur",
    time: "09:00",
  },
  {
    id: "2",
    text: "Merci beaucoup ! Je suis vraiment motivé par ce poste.",
    sender: "user",
    time: "09:02",
  },
  {
    id: "3",
    text: "Seriez-vous disponible pour un entretien cette semaine ?",
    sender: "recruteur",
    time: "09:05",
  },
];

export default function RecruteurChat() {
  const { candidatId, candidatName } = useLocalSearchParams<{
    candidatId: string;
    candidatName: string;
  }>();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const CHAT_KEY = `CHAT_USER_${candidatId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(CHAT_KEY);
        if (saved) {
          setMessages(JSON.parse(saved));
        } else {
          setMessages(MOCK_MESSAGES);
          await AsyncStorage.setItem(CHAT_KEY, JSON.stringify(MOCK_MESSAGES));
        }
      } catch {
        setMessages(MOCK_MESSAGES);
      }
    };
    load();
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "recruteur",
      time: getTime(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInput("");
    await AsyncStorage.setItem(CHAT_KEY, JSON.stringify(updated));

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const initials = decodeURIComponent(candidatName ?? "?")
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.headerName} numberOfLines={1}>
              {decodeURIComponent(candidatName ?? "")}
            </Text>
            <Text style={styles.headerSub}>Candidat</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: false })
        }
        renderItem={({ item }) => {
          const isMe = item.sender === "recruteur";
          return (
            <View
              style={[
                styles.bubbleWrap,
                isMe ? styles.bubbleWrapRight : styles.bubbleWrapLeft,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isMe ? styles.bubbleMe : styles.bubbleThem,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    isMe ? styles.bubbleTextMe : styles.bubbleTextThem,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <Text
                style={[
                  styles.bubbleTime,
                  isMe ? styles.bubbleTimeRight : styles.bubbleTimeLeft,
                ]}
              >
                {item.time}
              </Text>
            </View>
          );
        }}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Écrire un message..."
            placeholderTextColor="#4a4861"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#08070f" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1929",
    backgroundColor: "#0d0c1a",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#1a1929",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#1D9E7522",
    borderWidth: 1,
    borderColor: "#1D9E7544",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: {
    color: "#1D9E75",
    fontSize: 14,
    fontWeight: "800",
  },
  headerName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  headerSub: {
    color: "#4a4861",
    fontSize: 12,
  },
  messagesList: {
    padding: 16,
    gap: 12,
    paddingBottom: 8,
  },
  bubbleWrap: {
    maxWidth: "78%",
    gap: 4,
    marginBottom: 8,
  },
  bubbleWrapRight: { alignSelf: "flex-end", alignItems: "flex-end" },
  bubbleWrapLeft: { alignSelf: "flex-start", alignItems: "flex-start" },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleMe: {
    backgroundColor: "#5b4fff",
    borderBottomRightRadius: 4,
  },
  bubbleThem: {
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextMe: { color: "#ffffff" },
  bubbleTextThem: { color: "#ffffff" },
  bubbleTime: { fontSize: 11, color: "#4a4861" },
  bubbleTimeRight: { textAlign: "right" },
  bubbleTimeLeft: { textAlign: "left" },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1a1929",
    backgroundColor: "#0d0c1a",
  },
  input: {
    flex: 1,
    backgroundColor: "#1a1929",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#5b4fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { backgroundColor: "#1a1929" },
});
