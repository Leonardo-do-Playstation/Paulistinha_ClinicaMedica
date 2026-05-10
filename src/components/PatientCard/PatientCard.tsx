import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PatientCardStyles";

type Props = {
  name: string;
  phone: string;
  cpf: string;

  showButtons?: boolean;

  onEdit?: () => void;
  onSchedule?: () => void;
  onPress?: () => void;
};

export function PatientCard({
  name,
  phone,
  cpf,
  showButtons = false,
  onEdit,
  onSchedule,
  onPress,
}: Props) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={!showButtons ? onPress : undefined}
      activeOpacity={0.8}
    >
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

      {showButtons && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.scheduleBtn} onPress={onSchedule}>
            <Text style={styles.scheduleText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}
