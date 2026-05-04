import { View, Text } from "react-native";
import FooterStyles from "./FooterStyles";

export default function Footer() {
  return (
    <View style={FooterStyles.footer}>
      <Text style={FooterStyles.footerText}>
        © 2026 Clínica médica <strong>Maria Auxilíadora</strong>. 
      </Text>
    </View>
  );
}
