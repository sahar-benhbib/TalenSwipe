import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    icon: "flash" as const,
    iconColor: "#5b4fff",
    accent: "#5b4fff18",
    title: "Swipez votre\nfutur emploi",
    subtitle:
      "Découvrez des offres adaptées à votre profil. Swipez à droite pour liker, à gauche pour passer.",
  },
  {
    id: "2",
    icon: "videocam" as const,
    iconColor: "#1D9E75",
    accent: "#1D9E7518",
    title: "Votre CV\nen vidéo",
    subtitle:
      "Démarquez-vous avec une vidéo de présentation. Les recruteurs vous verront avant même de lire votre CV.",
  },
  {
    id: "3",
    icon: "chatbubbles" as const,
    iconColor: "#5b4fff",
    accent: "#5b4fff18",
    title: "Matchez &\nDiscutez",
    subtitle:
      "Quand un recruteur vous like en retour, c'est un match ! Chattez directement et décrochez votre job.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      finish();
    }
  };

  const finish = async () => {
    await AsyncStorage.setItem("ONBOARDING_DONE", "true");
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip */}
      <View style={styles.header}>
        {currentIndex < SLIDES.length - 1 ? (
          <TouchableOpacity onPress={finish} style={styles.skipBtn}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 64 }} />
        )}
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll },
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide]}>
            {/* Icon circle */}
            <View
              style={[styles.iconWrapper, { backgroundColor: item.accent }]}
            >
              <View
                style={[
                  styles.iconInner,
                  { borderColor: item.iconColor + "40" },
                ]}
              >
                <Ionicons name={item.icon} size={56} color={item.iconColor} />
              </View>
            </View>

            {/* Text */}
            <View style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { width: dotWidth, opacity }]}
              />
            );
          })}
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>
            {currentIndex === SLIDES.length - 1 ? "Commencer" : "Suivant"}
          </Text>
          <Ionicons
            name={
              currentIndex === SLIDES.length - 1 ? "checkmark" : "arrow-forward"
            }
            size={18}
            color="#fff"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08070f",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: "flex-end",
    height: 48,
  },
  skipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1929",
  },
  skipText: {
    color: "#4a4861",
    fontSize: 14,
    fontWeight: "500",
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  iconInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d0c1a",
  },
  textBlock: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4a4861",
    textAlign: "center",
    lineHeight: 26,
    maxWidth: 300,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 28,
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5b4fff",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5b4fff",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 50,
    width: "100%",
    shadowColor: "#5b4fff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
