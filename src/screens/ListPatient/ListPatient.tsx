import React from "react";
import { TouchableOpacity, View, Text, Button, TextInput } from "react-native";
import { styles } from "./ListPatientStyles";
import { TitleCard } from "../../components/TitleCard/TitleCard";

export default function ListPatient() {
  return (
    <View>
      <TitleCard
        title="Pacientes"
        subtitle="Gerenciar pacientes"
        backgroundColor="#2F80ED"
        onBack={() => navigation.back()}
      ></TitleCard>
      <TouchableOpacity style={styles.NewPatientBtn}>
        <Text style={{ fontSize: 24, color: "#ffffff" }}>+Novo Paciente</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.TextInput}
        placeholder="🔍 Buscar Pacientes"
      ></TextInput>
    </View>
  );
}
