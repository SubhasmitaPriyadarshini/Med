import { useTheme } from "@/theme/useTheme";
import { View } from "react-native";
import Splash from "./splash";

export default function Index() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background.primary,
      }}
    >
      <Splash />
    </View>
  );
}
