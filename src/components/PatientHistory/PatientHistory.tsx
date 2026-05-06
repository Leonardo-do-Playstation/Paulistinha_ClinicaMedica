import React from "react";
import { View, Text } from "react-native";
import { styles } from "./PatientHistoryStyles";

type HistoryItemProps = {
  date: string;
  type: string;
  doctor: string;
  description: string;
};

export function PatientHistory({
  date,
  type,
  doctor,
  description,
}: HistoryItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>

        <Text style={styles.type}>{type}</Text>

        <Text style={styles.doctor}>{doctor}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
