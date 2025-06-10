import appColors from "@/constant/Colors";
import appFonts from "@/constant/Fonts";
import { Typography } from "@/constant/typography";
import { useTheme } from "@/theme/useTheme";
import { Image } from "expo-image";
import React from "react";
import { DimensionValue, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  height: number;
  width: DimensionValue;
  backgroundColor: string;
  imageSrc: any;
  title: string;
  borderColor:string;
  onPress: () => void; 
}

const Button: React.FC<ButtonProps> = ({
  height,
  width,
  backgroundColor,
  imageSrc,
  title,
  borderColor,
  onPress
}) => {

     const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={{
        height: height || 48,
        width: width || "100%",
        backgroundColor: backgroundColor || appColors.ButtonLinerGradient1,
        borderRadius: 12,
        paddingHorizontal: 48,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        borderWidth:1,
        borderColor:borderColor
      }}
      onPress={onPress}
    >
      <Image
        source={imageSrc}
        style={{ height: 20, width: 20 }}
      />
      <Text
        style={{
    color:appColors.backgorundColorLight,
          ...Typography.bold,
          fontFamily: appFonts.Inter,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
