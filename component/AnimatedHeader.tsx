import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import appColors from "@/constant/Colors";
import appFonts from "@/constant/Fonts";

// Define a type for icons to ensure valid Ionicons names
type IconType = {
  name: string;
  source?: any;
  icon?: "search-outline" | "notifications-outline"; // Explicitly list valid icon names
};

const AnimatedHeader: React.FC = () => {
  const { width } = useWindowDimensions();
  const words = ["Wheels", "Beast"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Text animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  // Logo animation values (circular motion)
  const logoAngles = [
    useSharedValue(0),
    useSharedValue(90),
    useSharedValue(180),
    useSharedValue(270),
  ];
  const logoPositions = logoAngles.map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
  }));
  const isHovering = useSharedValue(-1); // -1: no hover, 0-3: index of hovered logo

  // Icons for the right side
  const icons: IconType[] = [
    { name: "location",  icon: "search-outline" },
    { name: "search", icon: "search-outline" },
    { name: "notifications", icon: "notifications-outline" },
    { name: "profile",  icon: "notifications-outline" },
  ];

  // Text animation (fade in, zoom out, next word)
  useEffect(() => {
    const animateWord = () => {
      opacity.value = 0;
      scale.value = 1;
      opacity.value = withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      );
      scale.value = withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(1.5, { duration: 1000, easing: Easing.out(Easing.exp) })
      );
    };

    animateWord();
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      animateWord();
    }, 3000); // Repeat every 3s
    return () => clearInterval(interval);
  }, [currentWordIndex]);

  // Circular motion for logos
  useEffect(() => {
    logoAngles.forEach((angle) => {
      angle.value = withRepeat(
        withTiming(angle.value + 360, { duration: 10000, easing: Easing.linear }),
        -1,
        false
      );
    });
  }, []);

  // Animated style for text
  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  // Gesture handler for cursor movement
  const onGestureEvent = (index: number) => ({
    onGestureEvent: (event: any) => {
      if (event.nativeEvent.state === 2 || event.nativeEvent.state === 4) { // BEGAN or ACTIVE
        isHovering.value = index;
        const maxMove = 20; // Max distance to move
        const deltaX = event.nativeEvent.x - 22; // Adjust for logo center (44/2)
        const deltaY = event.nativeEvent.y - 22;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const moveRatio = Math.min(maxMove / distance, 1);
        logoPositions[index].x.value = withTiming(deltaX * moveRatio, { duration: 200 });
        logoPositions[index].y.value = withTiming(deltaY * moveRatio, { duration: 200 });
      }
    },
    onHandlerStateChange: (event: any) => {
      if (event.nativeEvent.state === 5 || event.nativeEvent.state === 3) { // END or CANCELLED
        isHovering.value = -1;
        logoPositions[index].x.value = withTiming(0, { duration: 200 });
        logoPositions[index].y.value = withTiming(0, { duration: 200 });
      }
    },
  });

  // Animated style for logos
  const getAnimatedLogoStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const radius = 40; // Radius of circular path
      const baseX = radius * Math.cos((logoAngles[index].value * Math.PI) / 180);
      const baseY = radius * Math.sin((logoAngles[index].value * Math.PI) / 180);
      const offsetX = logoPositions[index].x.value;
      const offsetY = logoPositions[index].y.value;
      return {
        transform: [
          { translateX: baseX + (isHovering.value === index ? offsetX : 0) },
          { translateY: baseY + (isHovering.value === index ? offsetY : 0) },
        ],
      };
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { width }]}>
        {/* Left Side: Animated Text */}
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => router.push("/")}
        >
          <Animated.View style={animatedTextStyle}>
            <Text style={styles.title}>{words[currentWordIndex]}</Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Right Side: Moving Logos */}
        <View style={styles.rightContainer}>
          {icons.map((icon, index) => (
            <PanGestureHandler
              key={icon.name}
              {...onGestureEvent(index)}
            >
              <Animated.View style={[styles.logoContainer, getAnimatedLogoStyle(index)]}>
                {icon.source ? (
                  <Image
                    source={icon.source}
                    style={styles.logo}
                    contentFit={icon.name === "profile" ? "cover" : "contain"}
                  />
                ) : (
                  <Ionicons
                    name={icon.icon!} // Non-null assertion since we know icon exists
                    size={24}
                    color={appColors.selecteditemDark}
                  />
                )}
              </Animated.View>
            </PanGestureHandler>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 124,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 70,
    paddingVertical: 20,
    backgroundColor: "white",
    boxShadow: "0px 2px 3px rgba(0,0,0,0.15)",
  },
  leftContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: appColors.inputfieldDark,
    fontFamily: appFonts.Inter,
    letterSpacing: 2,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: 150,
    height: 150,
    justifyContent: "center",
  },
  logoContainer: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.selecteditemDark,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default AnimatedHeader;