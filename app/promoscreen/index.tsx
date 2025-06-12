import Button from "@/component/Button";
import CustomSafeArea from "@/component/CustomSafeArea";
import appColors from "@/constant/Colors";
import { Typography } from "@/constant/typography";
import { useTheme } from "@/theme/useTheme";
import { Image as ExpoImage } from "expo-image"; // Renamed to avoid conflict
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
  Image as RNImage, // Import React Native Image for getSize
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
    subtitle: "Unwind and find serenity in a\nguided meditation sessions",
  },
  {
    image: require("@/assets/images/splash/promoImage3.png"),
    title: "SLEEP LONGER",
    subtitle: "Calm racing mind and prepare\nyour body for deep sleep",
  },
  {
    image: require("@/assets/images/splash/promoImage4.png"),
    title: "LIVE BETTER",
    subtitle: "Invest in personal sense of inner peace and balance",
  },
];

const PromoScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get("window");

  // State to store image dimensions
  const [imageDimensions, setImageDimensions] = useState<
    { width: number; height: number }[]
  >(
    slides.map(() => ({
      width: 0,
      height: 0,
    }))
  );

  // Preload images and get their dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      // Preload images using expo-image
      await Promise.all(slides.map((slide) => ExpoImage.prefetch(slide.image)));

      // Get dimensions using React Native Image
      const dimensions = await Promise.all(
        slides.map((slide) =>
          new Promise<{ width: number; height: number }>((resolve) => {
            RNImage.getSize(
              slide.image,
              (width: number, height: number) => resolve({ width, height }),
              () => resolve({ width: 0, height: 0 }) // Fallback in case of error
            );
          })
        )
      );
      setImageDimensions(dimensions);
    };
    loadImageDimensions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
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

  // Define padding and calculate image width
  const paddingHorizontal = 16;
  const imageWidth = width - 2 * paddingHorizontal; // Account for padding on both sides

  return (
    <CustomSafeArea>
      <StatusBar />
      <View style={{ gap: 24 }}>
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
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {slides.map((item, index) => {
            // Calculate the height based on the image's aspect ratio
            const { width: imgWidth, height: imgHeight } =
              imageDimensions[index];
            const aspectRatio =
              imgWidth && imgHeight ? imgWidth / imgHeight : 1;
            const calculatedHeight = imgWidth
              ? (imageWidth / imgWidth) * imgHeight
              : 458; // Fallback height if dimensions aren't loaded

            return (
              <View
                key={index}
                style={{
                  width: width,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: paddingHorizontal,
                  gap: 20,
                }}
              >
                <View
                  style={{
                    width: imageWidth,
                    height: calculatedHeight,
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                >
                  <ExpoImage
                    source={item.image}
                    style={{
                      width: imageWidth,
                      height: calculatedHeight,
                      borderRadius: 12,
                    }}
                    contentFit="cover"
                  />
                </View>
                <View style={{ gap: 10 }}>
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
            );
          })}
        </Animated.ScrollView>

        {/* Dynamic Dot Indicators */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: currentIndex === index ? 24 : 10,
                height: 10,
                borderRadius: 12,
                backgroundColor:
                  currentIndex === index
                    ? appColors.ButtonLinerGradient1
                    : "#D2EEE9",
              }}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={{ gap: 8, paddingHorizontal: 16 }}>
          <Button
            title="Next"
            height={48}
            width={"100%"}
            onPress={() => router.push("/auth/termsandcondition")}
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