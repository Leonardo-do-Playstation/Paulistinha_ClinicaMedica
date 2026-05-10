import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { styles } from "./ListPatientStyles";
import { PatientCard } from "../../../../components/PatientCard/PatientCard";
import { patients } from "../../../../data/patients";
import { useNavigation } from "@react-navigation/native";

export default function ListPatient() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ padding: 15 }}>
        <TouchableOpacity
          style={styles.NewPatientBtn}
          onPress={() => navigation.navigate("CreatePatient")}
        >
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
          <PatientCard
            name={item.name}
            phone={item.phone}
            cpf={item.cpf}
            showButtons={true}
          />
        )}
      />
    </View>
  );
}
