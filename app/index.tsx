import AnimatedHeader from "@/component/AnimatedHeader";
import TextInputComponent from "@/component/TextInputComponent";
import TextInput from "@/component/TextInputComponent";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TextInputComponent title="name" placeholder="Name" iconType="eye" password showHidePassword/>
    </View>
  );
}
