import { Stack } from "expo-router";
import { useFonts } from "expo-font";
export default function RootLayout() {
  const [loaded] = useFonts({
   Inter : require('@/assets/fonts/Inter.ttf')
  })
  return(
    // <Provider >
    <Stack screenOptions={{ headerShown: false }} />
  // </Provider>
  );
}
