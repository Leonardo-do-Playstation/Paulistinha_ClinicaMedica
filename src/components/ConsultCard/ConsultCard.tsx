import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./ConsultCardStyles";

type ConsultCardProps = {
  data: {
    id: number;
    name: string;
    time: string;
    doctor: string;
    specialty: string;
  };
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
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.info}>Horário: {data.time}</Text>
          <Text style={styles.info}>
            Doutor: {data.doctor} - {data.specialty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
