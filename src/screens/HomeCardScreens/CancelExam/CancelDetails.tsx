import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./CancelDetailsStyle";
import { cancelConsult } from "../../../Services/ConsultService/consultService";
import { CancelReason } from "../../../data/types/consultTypes";

export default function CancelDetails({ route }: any) {
  const navigation: any = useNavigation();
  const { exam } = route.params;

  const [selectedReason, setSelectedReason] = useState<CancelReason | "">("");
  const [obs, setObs] = useState("");
  const [loading, setLoading] = useState(false);

  const reasons = [
    {
      id: "Solicitação do Paciente" as CancelReason,
      title: "Solicitação do Paciente",
      subtitle: "Paciente solicitou cancelamento",
    },
    {
      id: "Não Comparecimento" as CancelReason,
      title: "Não Comparecimento",
      subtitle: "Paciente não compareceu",
    },
    {
      id: "Indisponibilidade Médico" as CancelReason,
      title: "Indisponibilidade Médico",
      subtitle: "Médico não pode atender",
    },
    {
      id: "Outro Motivo" as CancelReason,
      title: "Outro Motivo",
      subtitle: "Especificar abaixo",
    },
  ];

  const handleCancel = async () => {
    if (!selectedReason) {
      Alert.alert("Atenção", "Selecione o motivo do cancelamento.");
      return;
    }
    const canceledBy =
      selectedReason === "Indisponibilidade Médico" ? "medico" : "secretaria";
    try {
      setLoading(true);
      await cancelConsult(exam.id, selectedReason, canceledBy, obs);
      Alert.alert("Cancelamento realizado", "A consulta foi cancelada.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível cancelar a consulta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cancelamento</Text>
          <Text style={styles.headerName}>{exam.patientName}</Text>
          <View style={styles.headerRow}>
            <Text style={styles.headerInfo}>📅 {exam.date}</Text>
            <Text style={styles.headerInfo}>⏰ {exam.time}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados da Consulta</Text>
          <Text>Paciente: {exam.patientName}</Text>
          <Text>Telefone: {exam.patientPhone}</Text>
          <Text>Data: {exam.date}</Text>
          <Text>Horário: {exam.time}</Text>
          <Text>Médico: {exam.doctorName}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>❌ Motivo do cancelamento</Text>
          {reasons.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.reasonCard,
                selectedReason === item.id && styles.reasonSelected,
              ]}
              onPress={() => setSelectedReason(item.id)}
            >
              <Text style={styles.reasonTitle}>{item.title}</Text>
              <Text style={styles.reasonSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.obsTitle}>Observações</Text>
          <TextInput
            placeholder="Digite o motivo..."
            value={obs}
            onChangeText={setObs}
            style={styles.textArea}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.alertCard}>
          <Text>
            ⚠️ <Text style={styles.bold}>Atenção:</Text> Ação irreversível. O
            horário ficará disponível.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleCancel}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmText}>Confirmar Cancelamento</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
