import Button from "@/component/Button";
import CustomSafeArea from "@/component/CustomSafeArea";
import appColors from "@/constant/Colors";
import { Typography } from "@/constant/typography";
import { useTheme } from "@/theme/useTheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

const slides = [
  {
    image: require("@/assets/images/splash/promoImage1.png"),
    title: "STRESS LESS",
    subtitle: "Make Mindfulness a daily habit\nand be kind to your mind",
  },
  {
    image: require("@/assets/images/splash/promoImage2.png"),
    title: "RELAX MORE",
    subtitle: "Unwind and find serenity in a\n guided meditation sessions",
  },
  {
    image: require("@/assets/images/splash/promoImage3.png"),
    title: "SLEEP LONGER",
    subtitle: "Calm racing mind and prepare/n  your body for deep sleep",
  },
  {
    image: require("@/assets/images/splash/promoImage4.png"),
    title: "LIVE BETTER ",
    subtitle: "Invest in Personal sense of inner peace and balance",
  },
];

const PromoScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const { width } = Dimensions.get("window");
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <CustomSafeArea>
      <StatusBar />
      <View style={{ height: "100%", width: "100%", gap: 24 }}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        >
          {slides.map((item, index) => (
            <View key={index}>
              <Image
                source={item.image}
                style={{ height: 458, width: width, borderRadius: 12 }}
                contentFit="cover"
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    ...(Typography.bold.boldXL as any),
                    color: theme.colors.text.primary,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...(Typography.bold.boldL as any),
                    color: theme.colors.text.primary,
                    textAlign: "center",
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 24,
              height: 9,
              borderRadius: 12,
              backgroundColor: appColors.ButtonLinerGradient1,
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 100,
              backgroundColor: "#D2EEE9",
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 100,
              backgroundColor: "#D2EEE9",
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 100,
              backgroundColor: "#D2EEE9",
            }}
          />
        </View>
        <View style={{ gap: 8 }}>
          <Button
            title="Next"
            height={48}
            width={"100%"}
            onPress={() => router.push("/")}
            useGradient={true}
          />
          <Text
            style={{
              color: theme.colors.text.primary,
              ...(Typography.bold.boldXL as any),
              textDecorationLine: "underline",
              textAlign: "center",
            }}
          >
            Sign in
          </Text>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default PromoScreen;



