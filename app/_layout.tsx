import ThemeProvider from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@/assets/fonts/Inter.ttf')
  });
  if (!loaded) return null;
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
