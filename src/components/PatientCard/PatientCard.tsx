import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PatientCardStyles";

type Props = {
  name: string;
  phone: string;
  cpf: string;
};

export function PatientCard({ name, phone, cpf }: Props) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>Telefone: {phone}</Text>
          <Text style={styles.info}>CPF: {cpf}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scheduleBtn}>
          <Text style={styles.scheduleText}>Agendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
