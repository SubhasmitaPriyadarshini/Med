import { useTheme } from "@/theme/useTheme";
import { Text, View } from "react-native";

export default function Index() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor:theme.colors.background.primary
      }}
    >
      <Text style={{color:theme.colors.text.primary}}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
