import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ConfirmCardStyles";

type Props = {
  name: string;
  phone: string;
  time: string;
  doctor: string;
  specialty: string;
};

export function ConfirmCard({ name, phone, time, doctor, specialty }: Props) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Horário</Text>
          <Text style={styles.infoText}>{time}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Médico</Text>
          <Text style={styles.infoText}>{doctor}</Text>
        </View>
      </View>

      <View style={styles.fullInfoBox}>
        <Text style={styles.label}>Especialidade</Text>
        <Text style={styles.infoText}>{specialty}</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Confirmar Presença</Text>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.absentBtn}>
          <Text style={styles.absentText}>Ausente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
