import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./ConsultCardStyles";
import { Consult } from "../../data/types/consultTypes";

type ConsultCardProps = {
  data: Consult;
  onPress: () => void;
};

export function ConsultCard({ data, onPress }: ConsultCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{data.patientName}</Text>
          <Text style={styles.info}>Horário: {data.time}</Text>
          <Text style={styles.info}>
            Doutor: {data.doctorName} - {data.doctorSpecialty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
