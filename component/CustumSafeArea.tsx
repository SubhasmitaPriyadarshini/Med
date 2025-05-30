import {
  View,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Href, useFocusEffect, useRouter } from "expo-router";
const CustomSafeArea: React.FC<{
  children: React.ReactNode; 
  pagetype?: "authenticated" | "un-authenticated" | "all"; 
}> = ({ children, pagetype }) => {
  const { width, height } = useWindowDimensions();
   const router = useRouter()
//   const dispatch = useDispatch()
//   const tknsts = useSelector((state : RootState)=>state.appredux.userToken);

//   useFocusEffect(
//     React.useCallback(() => {
//       async function getToken() {
//         const token = await AsyncStorage.getItem("userToken");
//         if(token){
//           dispatch(userToken(token));
//         }
//         if (pagetype == 'authenticated' && !token){ 
//           router.push('/Auth/SignIn'as Href)
//         }else if(pagetype == 'un-authenticated' && token){
//           router.navigate('/')
//         }
//       }
//       getToken()
//     },[pagetype, tknsts])
//   )
  
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        {/* Render NavBar */}

        {children}
      </SafeAreaView>
    </View>
  );
};

export default CustomSafeArea;
