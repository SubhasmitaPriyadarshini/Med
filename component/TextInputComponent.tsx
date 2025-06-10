import React, { useState } from "react";
import {
  DimensionValue,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import appClors from "@/constant/Colors";
import appFonts from "@/constant/Fonts";
import { Ionicons } from "@expo/vector-icons";

interface TextInput10Props {
  height?: number;
  width?: DimensionValue;
  placeholder?: string;
  title?: string;
  backgroundColor?: string;
  placeholderTextColor?: string;
  titleColor?: string;
  mt?: number;
  txtSize?: number;
  txtFont?: any;
  password?: boolean;
  showHidePassword?: boolean;
  borderColor?: string;
  color?: string;
  onChange?: (text: string) => void;
  value?: string;
  autoFocus?: boolean;
  disable?: boolean;
  keyboardType?: "number-pad" | "default";
  maxLength?: number;
  iconType?: "eye" | "card" | "exp" | "info" | "copy" | "calender";
  iconColor?: string;
  iconOnpress?: () => void;
  datemonth?: boolean;
  datemonthyear?: boolean;
}

const TextInput10: React.FC<TextInput10Props> = ({
  height = 48,
  width,
  placeholder = "",
  keyboardType,
  title,
  maxLength,
  onChange,
  backgroundColor,
  autoFocus,
  placeholderTextColor = 'gray',
  titleColor = "#000",
  mt,
  txtSize,
  iconColor,
  disable = false,
  txtFont,
  password,
  showHidePassword,
  borderColor = "#D0D5DD",
  color,
  value,
  iconType,
  iconOnpress,
  datemonth,
  datemonthyear,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    if (password && text.length >= 16) return;
    let formatted = text;

    if (iconType === "card") {
      formatted = formatCardNumber(text);
    } else if (datemonthyear || datemonth) {
      formatted = formatDateInput(text);
    }

    setInputValue(formatted);
  };

  const formatDateInput = (text: string) => {
    const numbersOnly = text.replace(/[^\d]/g, "");
    if (datemonthyear) {
      return numbersOnly
        .replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3")
        .substring(0, 10);
    } else if (datemonth) {
      return numbersOnly
        .replace(/^(\d{2})(\d{0,2}).*/, "$1/$2")
        .substring(0, 5);
    }
    return text;
  };
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D+/g, ""); // remove non-digits
    return cleaned.replace(/(.{4})/g, "$1 ").trim(); // add space every 4 digits
  };

  const styles = StyleSheet.create({
    title: {
      fontFamily: txtFont ? txtFont : appFonts.Inter,
      fontSize: txtSize ? txtSize : 14,
      color: appClors.selecteditemDark,
    },
    inputContainer: {
      borderWidth: 2,
      borderColor: isFocused ? appClors.inputfieldDark : borderColor,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      position: "relative",
      backgroundColor: disable ? "#F0F0F080" : backgroundColor,
    },
    input: {
      flex: 1,
      width: "100%",
      color: disable ? "#A0A0A0" : color || appClors.selecteditemDark,
      height: "100%",
      letterSpacing: 0,
      ...(Platform.OS === "web" ? { outlineWidth: 0 } : {}),
    },
    eyeIcon: {
      position: "absolute",
      right: 10,
    },
  });

  return (
    <View style={{ width: "100%", gap: 6, marginTop: mt || 0 }}>
      {title && (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      )}

      <View style={[styles.inputContainer, { height, width }]}>
        {/* Main text input field */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={password ? !isPasswordVisible : false}
          value={inputValue}
          keyboardType={keyboardType || "default"}
          autoFocus={autoFocus ? autoFocus : false}
          maxLength={maxLength}
          onChangeText={(text: string) => {
            // Handle input change with formatting based on iconType or date props
            if (!disable) {
              let formatted = text;
              if (iconType === "card") {
                formatted = formatCardNumber(text);
              } else if (datemonth || datemonthyear) {
                formatted = formatDateInput(text);
              }
              if (onChange) onChange(formatted);
              handleChangeText(text);
            }
          }}
          // Focus and blur styling handler
          onFocus={() => !disable && setIsFocused(true)}
          onBlur={() => !disable && setIsFocused(false)}
          // Custom cursor color and editable flag
          cursorColor={disable ? "transparent" : appClors.inputfieldDark}
          editable={!disable}
        />
        {/* Icon types */}
        {(password && showHidePassword && !disable) || iconType === "eye" ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              tintColor={iconColor ? iconColor : appClors.inputfieldDark}
             size={20}
            />
          </TouchableOpacity>
        ) : iconType === "card" ? (
          <TouchableOpacity onPress={iconOnpress}>
            <Text>Card</Text>
          </TouchableOpacity>
        ) : iconType === "exp" ? (
          <TouchableOpacity onPress={iconOnpress}>
            <Image
              tintColor={iconColor ? iconColor : appClors.inputfieldDark}
              //  source={require("@/assets/images/Visa/note.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        ) : iconType === "info" ? (
          <TouchableOpacity onPress={iconOnpress}>
            <Image
              tintColor={iconColor ? iconColor : appClors.inputfieldDark}
              // source={require("@/assets/images/Visa/Exclamation-.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        ) : iconType === "copy" ? (
          <TouchableOpacity onPress={iconOnpress}>
            <Ionicons name="copy-outline" color={appClors.inputfieldDark} size={17} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default TextInput10;
