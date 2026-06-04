import React, { useState, useCallback } from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { FlatList, View, Text, ActivityIndicator, Alert } from "react-native";
import { styles } from "./ConfirmExamStyles";
import { ConfirmCard } from "../../../components/ConfirmCard/ConfirmCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  getTodayConsultsByStatus,
  confirmConsult,
} from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function ConfirmExam() {
  const navigation = useNavigation();

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR");

  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConsults = async () => {
    try {
      setLoading(true);
      const data = await getTodayConsultsByStatus("Marcada", dataFormatada);
      setConsults(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchConsults();
    }, [])
  );

  const handleConfirm = async (id: string) => {
    try {
      await confirmConsult(id);
      setConsults((prev) => prev.filter((c) => c.id !== id));
    } catch {
      Alert.alert("Erro", "Não foi possível confirmar a consulta.");
    }
  };

  return (
    <View style={styles.container}>
      <TitleCard
        title="Confirmação de Consulta"
        subtitle={`Hoje, ${dataFormatada}`}
        backgroundColor="#4F39F6"
        onBack={() => (navigation as any).goBack()}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4F39F6" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={consults}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              Nenhuma consulta aguardando confirmação hoje.
            </Text>
          }
          renderItem={({ item }) => (
            <ConfirmCard
              name={item.patientName}
              phone={item.patientPhone}
              time={item.time}
              doctor={item.doctorName}
              specialty={item.doctorSpecialty}
              onConfirm={() => handleConfirm(item.id!)}
            />
          )}
        />
      )}
    </View>
  );
}
