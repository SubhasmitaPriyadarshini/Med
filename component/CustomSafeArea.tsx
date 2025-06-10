import appColors from "@/constant/Colors";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  useWindowDimensions,
  View
} from "react-native";
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
    <View style={{ flex: 1, backgroundColor: appColors.White }}>
      <StatusBar style="light" />

      <SafeAreaView style={{ flex: 1, backgroundColor:appColors.White,padding:24 }}>
        {/* Render NavBar */}

        {children}
      </SafeAreaView>
    </View>
  );
};

export default CustomSafeArea;
