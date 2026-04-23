import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { jobs } from "../../constants/mockData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 120;

export default function Swipe() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastAction, setLastAction] = useState<
    "like" | "pass" | "super" | null
  >(null);
  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5;
      },
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5;
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const swipeRight = () => {
    setLastAction("like");
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => nextCard());
  };

  const swipeLeft = () => {
    setLastAction("pass");
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => nextCard());
  };

  const swipeSuper = () => {
    setLastAction("super");
    Animated.timing(position, {
      toValue: { x: 0, y: -500 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => nextCard());
  };

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
    ],
  };

  const currentJob = jobs[currentIndex];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CDI":
        return "#1D9E75";
      case "CDD":
        return "#f59e0b";
      case "Freelance":
        return "#5b4fff";
      case "Stage":
        return "#3b82f6";
      default:
        return "#4a4861";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TalentSwipe</Text>
        <View style={styles.headerRight}>
          <Ionicons name="options-outline" size={22} color="#4a4861" />
        </View>
      </View>

      {/* Counter */}
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {currentIndex < jobs.length
            ? `${currentIndex + 1} / ${jobs.length}`
            : "Terminé"}
        </Text>
      </View>

      {/* Cards zone */}
      <View style={styles.cardsContainer}>
        {currentIndex >= jobs.length ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="checkmark-circle-outline"
              size={72}
              color="#5b4fff"
            />
            <Text style={styles.emptyTitle}>Tu as tout vu !</Text>
            <Text style={styles.emptySubtitle}>
              Reviens plus tard pour de nouvelles offres
            </Text>
            <TouchableOpacity
              style={styles.restartButton}
              onPress={() => setCurrentIndex(0)}
            >
              <Text style={styles.restartButtonText}>Recommencer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Next card (static behind) */}
            {jobs[currentIndex + 1] && (
              <View style={[styles.card, styles.cardBehind]}>
                <Text style={styles.jobTitle}>
                  {jobs[currentIndex + 1].title}
                </Text>
              </View>
            )}

            {/* Current card */}
            <Animated.View
              style={[styles.card, cardStyle]}
              {...panResponder.panHandlers}
            >
              {/* LIKE badge */}
              <Animated.View
                style={[
                  styles.badge,
                  styles.likeBadge,
                  { opacity: likeOpacity },
                ]}
              >
                <Text style={styles.badgeLikeText}>LIKE</Text>
              </Animated.View>

              {/* PASS badge */}
              <Animated.View
                style={[
                  styles.badge,
                  styles.passBadge,
                  { opacity: passOpacity },
                ]}
              >
                <Text style={styles.badgePassText}>PASS</Text>
              </Animated.View>

              {/* Company avatar */}
              <View style={styles.companyAvatar}>
                <Text style={styles.companyInitial}>
                  {currentJob.company.charAt(0).toUpperCase()}
                </Text>
              </View>

              <Text style={styles.jobTitle}>{currentJob.title}</Text>
              <Text style={styles.companyName}>{currentJob.company}</Text>

              {/* Badges row */}
              <View style={styles.badgesRow}>
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor: getTypeColor(currentJob.type) + "22",
                      borderColor: getTypeColor(currentJob.type),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeBadgeText,
                      { color: getTypeColor(currentJob.type) },
                    ]}
                  >
                    {currentJob.type}
                  </Text>
                </View>
                <View style={styles.infoBadge}>
                  <Ionicons name="location-outline" size={12} color="#4a4861" />
                  <Text style={styles.infoBadgeText}>
                    {currentJob.location}
                  </Text>
                </View>
              </View>

              {/* Salary */}
              <View style={styles.salaryRow}>
                <Ionicons name="cash-outline" size={16} color="#1D9E75" />
                <Text style={styles.salaryText}>{currentJob.salary}</Text>
              </View>

              {/* Description */}
              <Text style={styles.description} numberOfLines={3}>
                {currentJob.description}
              </Text>

              {/* Skills */}
              <View style={styles.skillsRow}>
                {currentJob.skills.slice(0, 3).map((skill, i) => (
                  <View key={i} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
                {currentJob.skills.length > 3 && (
                  <View style={styles.skillBadge}>
                    <Text style={styles.skillText}>
                      +{currentJob.skills.length - 3}
                    </Text>
                  </View>
                )}
              </View>

              {/* Voir détail — FIX PanResponder */}
              <TouchableOpacity
                style={styles.detailButton}
                activeOpacity={0.8}
                onStartShouldSetResponder={() => true}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  router.push(`/(user)/job-detail?id=${jobs[currentIndex].id}`);
                }}
              >
                <Ionicons name="eye-outline" size={15} color="#5b4fff" />
                <Text style={styles.detailButtonText}>Voir le détail</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
      </View>

      {/* Action buttons */}
      {currentIndex < jobs.length && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.passBtn]}
            onPress={swipeLeft}
          >
            <Ionicons name="close" size={28} color="#ef4444" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.superBtn]}
            onPress={swipeSuper}
          >
            <Ionicons name="star" size={24} color="#f59e0b" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.likeBtn]}
            onPress={swipeRight}
          >
            <Ionicons name="heart" size={26} color="#1D9E75" />
          </TouchableOpacity>
        </View>
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
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1929",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  headerRight: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#0d0c1a",
    borderWidth: 1,
    borderColor: "#1a1929",
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    alignItems: "center",
    paddingVertical: 8,
  },
  counterText: {
    color: "#4a4861",
    fontSize: 13,
    fontWeight: "500",
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: SCREEN_WIDTH - 32,
    backgroundColor: "#0d0c1a",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1a1929",
    padding: 20,
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardBehind: {
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },
  badge: {
    position: "absolute",
    top: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 3,
    zIndex: 10,
  },
  likeBadge: {
    right: 20,
    borderColor: "#1D9E75",
    backgroundColor: "#1D9E7522",
    transform: [{ rotate: "15deg" }],
  },
  passBadge: {
    left: 20,
    borderColor: "#ef4444",
    backgroundColor: "#ef444422",
    transform: [{ rotate: "-15deg" }],
  },
  badgeLikeText: {
    color: "#1D9E75",
    fontSize: 18,
    fontWeight: "900",
  },
  badgePassText: {
    color: "#ef4444",
    fontSize: 18,
    fontWeight: "900",
  },
  companyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#5b4fff22",
    borderWidth: 2,
    borderColor: "#5b4fff55",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  companyInitial: {
    color: "#5b4fff",
    fontSize: 26,
    fontWeight: "800",
  },
  jobTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  companyName: {
    color: "#4a4861",
    fontSize: 14,
    fontWeight: "500",
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#1a1929",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  infoBadgeText: {
    color: "#4a4861",
    fontSize: 11,
  },
  salaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  salaryText: {
    color: "#1D9E75",
    fontSize: 15,
    fontWeight: "700",
  },
  description: {
    color: "#4a4861",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  skillsRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  skillBadge: {
    backgroundColor: "#5b4fff18",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  skillText: {
    color: "#5b4fff",
    fontSize: 11,
    fontWeight: "600",
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#5b4fff15",
    borderWidth: 1,
    borderColor: "#5b4fff44",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  detailButtonText: {
    color: "#5b4fff",
    fontSize: 13,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  actionBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  passBtn: {
    backgroundColor: "#ef444415",
    borderColor: "#ef444444",
  },
  superBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f59e0b15",
    borderColor: "#f59e0b44",
  },
  likeBtn: {
    backgroundColor: "#1D9E7515",
    borderColor: "#1D9E7544",
  },
  emptyState: {
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
  },
  emptySubtitle: {
    color: "#4a4861",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  restartButton: {
    backgroundColor: "#5b4fff",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  restartButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
