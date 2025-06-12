import { useTheme } from "@/theme/useTheme";
import { Image } from "expo-image";
import { Href, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const Splash = () => {
  const router = useRouter();
  const { theme } = useTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/promoscreen" as Href);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: theme.colors.background.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/splash/splash.png")}
        style={{ height: 160, width: 160 }}
      />
    </View>
  );
};

export default Splash;
