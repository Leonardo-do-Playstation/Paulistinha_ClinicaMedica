import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./CancelDetailsStyle";

export default function CancelDetails({ route }: any) {
  const navigation: any = useNavigation();
  const { exam } = route.params;

  const [selectedReason, setSelectedReason] = useState("");
  const [obs, setObs] = useState("");

  const reasons = [
    {
      id: "1",
      title: "Solicitação do Paciente",
      subtitle: "Paciente solicitou cancelamento",
    },
    {
      id: "2",
      title: "Não Comparecimento",
      subtitle: "Paciente não compareceu",
    },
    {
      id: "3",
      title: "Indisponibilidade Médico",
      subtitle: "Médico não pode atender",
    },
    {
      id: "4",
      title: "Outro Motivo",
      subtitle: "Especificar abaixo",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cancelamento</Text>
        <Text style={styles.headerName}>{exam.name}</Text>

        <View style={styles.headerRow}>
          <Text style={styles.headerInfo}>📅 {exam.date}</Text>
          <Text style={styles.headerInfo}>⏰ {exam.time}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dados da Consulta</Text>

        <Text>Paciente: {exam.name}</Text>
        <Text>Telefone: {exam.phone}</Text>
        <Text>Data: {exam.date}</Text>
        <Text>Horário: {exam.time}</Text>
        <Text>Médico: {exam.doctor}</Text>
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
        />
      </View>

      <View style={styles.alertCard}>
        <Text>
          ⚠️ <Text style={styles.bold}>Atenção:</Text> Ação irreversível. O horário ficará disponível.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            console.log("Cancelado:", selectedReason, obs);
            navigation.goBack();
          }}
        >
          <Text style={styles.confirmText}>Confirmar Cancelamento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}