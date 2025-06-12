import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CheckmarkProps {
  value?: boolean;
  onChange: (newValue: boolean) => void;
}

const Checkmark: React.FC<CheckmarkProps> = ({ value = false, onChange }) => {
  const styles = StyleSheet.create({
    radioGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    radioButton: {
      width: 24,
      height: 24,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#94A3BB",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.radioGroup}>
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => onChange(!value)}
      >
        {value && (
          <Image
            source={require("@/assets/images/auth/Check.png")}
            style={{
              height: 12,
              width: 12,
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Checkmark;

//  const [isSelected, setIsSelected] = useState(false);
//  <RadioButton value={isSelected} onChange={setIsSelected} />
