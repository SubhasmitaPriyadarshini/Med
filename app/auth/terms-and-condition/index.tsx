import Checkmark from "@/component/Checkmark";
import CustomSafeArea from "@/component/CustomSafeArea";
import appFonts from "@/constant/Fonts";
import { Typography } from "@/constant/typography";
import { useTheme } from "@/theme/useTheme";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text, View } from "react-native";

const TermsandCondition = () => {
  const { theme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  return (
    <CustomSafeArea>
      <View>
        <Image
          source={require("@/assets/images/auth/LeftArrow.png")}
          style={{
            height: 24,
            width: 24,
            tintColor: theme.colors.text.primary,
          }}
        />
        <Text
          style={{
            color: theme.colors.text.primary,
            fontFamily: appFonts.Inter,
            ...(Typography.bold.boldXL as any),
          }}
        >
          Let's get you started!
        </Text>
        <View style={{flexDirection:"row",gap:12}}>
          <Checkmark value={isSelected} onChange={setIsSelected} />
          <View style={{flexDirection:"row",gap:3}}>
          <Text>I agree to</Text>
         <Text>privacy policy</Text>
         <Text>and</Text>
         <Text>Terms of Use.</Text>
         </View>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default TermsandCondition;
