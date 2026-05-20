import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function GetStartedScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    startFloatingAnimation(float1, 4000, -15);
    startFloatingAnimation(float2, 6000, 20);
    startFloatingAnimation(float3, 5000, -25);
  }, []);

  const startFloatingAnimation = (
    animation: Animated.Value,
    duration: number,
    toValue: number
  ) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      {/* Decorative Ambient Glow Orbs */}
      <Animated.View
        style={[styles.glowLeft, { transform: [{ translateY: float3 }] }]}
      />
      <Animated.View
        style={[styles.circleLarge, { transform: [{ translateY: float1 }] }]}
      />
      <Animated.View
        style={[styles.circleSmall, { transform: [{ translateY: float2 }] }]}
      />

      {/* Main Content Wrapper */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Brand Icon / Logo Mark */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBg}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.brandTag}>BITEOS SaaS</Text>
        </View>

        {/* Catchy Headline */}
        <Text style={styles.title}>
          Deliver Faster.{"\n"}
          <Text style={styles.titleHighlight}>Scale Smarter.</Text>
        </Text>

        {/* Subtitle description */}
        <Text style={styles.subtitle}>
          The white-label orchestration engine built for modern restaurant chains
          and local delivery fleets.
        </Text>

        {/* Fixed Interactive Button Flow */}
        <Animated.View
          style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}
        >
          <Link href="/" asChild>
            <Pressable
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>Launch Platform</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </Link>
        </Animated.View>

        <Text style={styles.footerText}>v1.0.0 • Production Ready Platform</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19", // Deeper premium charcoal black
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  content: {
    width: "88%",
    alignItems: "center",
    paddingVertical: 20,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },

  logoIcon: {
    fontSize: 36,
  },

  brandTag: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38BDF8", // Vibrant Sky Blue
    letterSpacing: 3,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.5,
    lineHeight: 52,
  },

  titleHighlight: {
    color: "#3B82F6", // Royal Blue accent
  },

  subtitle: {
    fontSize: 15,
    color: "#94A3B8", // Softer muted slate
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 60,
    paddingHorizontal: 15,
  },

  buttonWrapper: {
    width: "100%",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  button: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 20,
    width: "100%",
  },

  buttonPressed: {
    backgroundColor: "#2563EB", // Darkens slightly on press
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },

  footerText: {
    fontSize: 12,
    color: "#475569",
    marginTop: 32,
    letterSpacing: 0.5,
  },

  /* Decorative Orbs */
  circleLarge: {
    position: "absolute",
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "rgba(59, 130, 246, 0.08)", // Softer blend
    top: -width * 0.4,
    right: -width * 0.3,
  },

  circleSmall: {
    position: "absolute",
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: "rgba(14, 165, 233, 0.06)",
    bottom: -width * 0.2,
    left: -width * 0.2,
  },

  glowLeft: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: "rgba(99, 102, 241, 0.04)", // Subtle violet glow side hint
    top: "35%",
    left: -width * 0.3,
  },
});