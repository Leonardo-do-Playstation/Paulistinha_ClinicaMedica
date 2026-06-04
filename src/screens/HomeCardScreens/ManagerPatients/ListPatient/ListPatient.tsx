import React, { useEffect, useState, useCallback } from "react";
import {
  TouchableOpacity, View, Text, TextInput,
  FlatList, ActivityIndicator, Alert,
} from "react-native";
import { styles } from "./ListPatientStyles";
import { PatientCard } from "../../../../components/PatientCard/PatientCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getPatients, deletePatient } from "../../../../Services/PatientService/patientService";
import { Patient } from "../../../../data/types/patientTypes";

export default function ListPatient() {
  const navigation: any = useNavigation();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setFiltered(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os pacientes.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchPatients(); }, []));

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(patients.filter(
      (p) => p.name.toLowerCase().includes(term) || p.cpf.toLowerCase().includes(term)
    ));
  }, [search, patients]);

  const handleDelete = (patient: Patient) => {
    Alert.alert("Excluir paciente", `Deseja excluir ${patient.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir", style: "destructive",
        onPress: async () => {
          try {
            await deletePatient(patient.id!);
            fetchPatients();
          } catch {
            Alert.alert("Erro", "Não foi possível excluir o paciente.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 15 }}>
        <TouchableOpacity style={styles.NewPatientBtn} onPress={() => navigation.navigate("CreatePatient")}>
          <Text style={{ fontSize: 18, color: "#ffffff", fontWeight: "bold" }}>+ Novo Paciente</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.TextInput}
          placeholder="🔍 Buscar por nome ou CPF"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#155DFC" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              Nenhum paciente encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <PatientCard
              name={item.name}
              phone={item.phone}
              cpf={item.cpf}
              showButtons={true}
              onEdit={() => navigation.navigate("EditPatient", { patient: item })}
              onSchedule={() => navigation.navigate("MarkExam", { preSelectedPatient: item })}
              onDelete={() => handleDelete(item)}
            />
          )}
        />
      )}
    </View>
  );
}