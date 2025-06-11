import appColors from "@/constant/Colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonProps {
  height?: number;
  width?: DimensionValue;
  borderColor?: string;
  imagesrc?: any;
  title?: any;
  useGradient?: boolean;
  onPress: () => void;
  backgroundcolor?: string;
}

const Button: React.FC<ButtonProps> = ({
  height,
  width,
  borderColor,
  imagesrc,
  title,
  useGradient,
  onPress,
  backgroundcolor,
}) => {
  const styles = StyleSheet.create({
    main: {
      height: height || 48,
      width: width || "100%",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: borderColor,
      paddingHorizontal: 8,
      // paddingVertical: 48,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
      backgroundColor: backgroundcolor,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      {useGradient ? (
        <LinearGradient
          colors={[
            appColors.ButtonLinerGradient1,
            appColors.ButtonLinerGradient2,
            appColors.ButtonLinerGradient3,
          ]}
          style={styles.main}
        >
          {imagesrc && (
          <Image source={imagesrc} style={{ height: 20, width: 20 }} />
          )}
          <Text style={{color: "#fff", fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.main}>
           {imagesrc && (
          <Image source={imagesrc} style={{ height: 20, width: 20 }} />
          )}
          <Text style={{color: "#fff", fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
