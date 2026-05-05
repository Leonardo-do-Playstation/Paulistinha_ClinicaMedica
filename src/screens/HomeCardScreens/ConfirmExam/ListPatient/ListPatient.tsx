import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { styles } from "./ListPatientStyles";
import { TitleCard } from "../../../../components/TitleCard/TitleCard";
import { PatientCard } from "../../../../components/PatientCard/PatientCard";
import { patients } from "../../../../data/patients";

export default function ListPatient() {
  return (
    <View style={styles.container}>
      <TitleCard
        title="Pacientes"
        subtitle="Gerenciar pacientes"
        backgroundColor="#2F80ED"
        onBack={() => navigation.back()}
      />

      <View style={{ padding: 15 }}>
        <TouchableOpacity style={styles.NewPatientBtn}>
          <Text style={{ fontSize: 24, color: "#ffffff" }}>
            + Novo Paciente
          </Text>
        </TouchableOpacity>

        <TextInput style={styles.TextInput} placeholder="🔍 Buscar Pacientes" />
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <PatientCard name={item.name} phone={item.phone} cpf={item.cpf} />
        )}
      />
    </View>
  );
}
