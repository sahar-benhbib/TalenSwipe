import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

const ONBOARDING_KEY = "ONBOARDING_DONE";
const SESSION_KEY = "SESSION_USER";

export default function SplashScreen() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(subtitleFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });

    const timer = setTimeout(async () => {
      try {
        const onboardingDone = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (!onboardingDone) {
          router.replace("/onboarding");
          return;
        }

        const session = await AsyncStorage.getItem(SESSION_KEY);
        if (!session) {
          router.replace("/(auth)/login");
          return;
        }

        const user = JSON.parse(session);
        if (user.role === "user") {
          router.replace("/(user)/swipe");
        } else if (user.role === "recruteur") {
          router.replace("/(recruteur)/dashboard");
        } else if (user.role === "entreprise") {
          router.replace("/(entreprise)/offres");
        } else {
          router.replace("/(auth)/login");
        }
      } catch {
        router.replace("/(auth)/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logoImg}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>
          Talent<Text style={styles.logoAccent}>Swipe</Text>
        </Text>
      </Animated.View>

      <Animated.Text style={[styles.subtitle, { opacity: subtitleFade }]}>
        Le recrutement réinventé
      </Animated.Text>

      <Animated.View style={[styles.dotsWrap, { opacity: subtitleFade }]}>
        <LoadingDots />
      </Animated.View>
    </View>
  );
}

function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  return (
    <View style={styles.dots}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08070f",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  logoWrap: {
    alignItems: "center",
    gap: 14,
  },
  logoImg: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  logoAccent: {
    color: "#5b4fff",
  },
  subtitle: {
    fontSize: 15,
    color: "#4a4861",
    letterSpacing: 0.5,
  },
  dotsWrap: {
    position: "absolute",
    bottom: 60,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#5b4fff",
  },
});
