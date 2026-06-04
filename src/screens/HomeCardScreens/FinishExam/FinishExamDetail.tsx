import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, ActivityIndicator, Alert, StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { markAsRealized } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function FinishExamDetail({ route }: any) {
  const navigation: any = useNavigation();
  const { exam }: { exam: Consult } = route.params;

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [otherProcedures, setOtherProcedures] = useState("");
  const [observations, setObservations] = useState("");
  const [returnConsult, setReturnConsult] = useState(false);
  const [loading, setLoading] = useState(false);

  const procedures = [
    "Consulta Médica", "Eletrocardiograma", "Exame Dermatológico",
    "Raio-X", "Ultrassom", "Aplicação de Medicamento",
  ];

  const toggleProcedure = (proc: string) =>
    setSelectedProcedures((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc]
    );

  const handleGoToPayment = () => {
    if (selectedProcedures.length === 0) {
      Alert.alert("Atenção", "Selecione ao menos um procedimento realizado.");
      return;
    }
    navigation.navigate("Payment", {
      exam,
      procedures: selectedProcedures,
      otherProcedures,
      observations,
      hasReturn: returnConsult,
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard title={exam.patientName} subtitle="Relatório da Consulta" backgroundColor="#F59E0B" onBack={() => navigation.goBack()} />

      {/* Dados da Consulta */}
      <View style={s.card}>
        <Text style={s.cardTitle}>📋 Dados da Consulta</Text>
        <View style={s.row}><Text style={s.label}>Paciente</Text><Text style={s.value}>{exam.patientName}</Text></View>
        <View style={s.row}><Text style={s.label}>Telefone</Text><Text style={s.value}>{exam.patientPhone}</Text></View>
        <View style={s.row}><Text style={s.label}>Médico</Text><Text style={s.value}>{exam.doctorName}</Text></View>
        <View style={s.row}><Text style={s.label}>Especialidade</Text><Text style={s.value}>{exam.doctorSpecialty}</Text></View>
        <View style={s.row}><Text style={s.label}>Data</Text><Text style={s.value}>{exam.date}</Text></View>
        <View style={s.row}><Text style={s.label}>Horário</Text><Text style={s.value}>{exam.time}</Text></View>
        <View style={s.row}><Text style={s.label}>Status</Text><Text style={[s.value, { color: "#22C55E", fontWeight: "bold" }]}>{exam.status}</Text></View>
      </View>

      {/* Procedimentos */}
      <View style={s.card}>
        <Text style={s.cardTitle}>🩺 Procedimentos Realizados</Text>
        {procedures.map((proc) => (
          <TouchableOpacity key={proc} style={s.checkRow} onPress={() => toggleProcedure(proc)}>
            <View style={[s.checkbox, selectedProcedures.includes(proc) && s.checkboxOn]} />
            <Text>{proc}</Text>
          </TouchableOpacity>
        ))}
        <Text style={s.inputLabel}>Outros procedimentos</Text>
        <TextInput
          placeholder="Descreva outros procedimentos..."
          style={s.textArea}
          multiline
          value={otherProcedures}
          onChangeText={setOtherProcedures}
        />
      </View>

      {/* Observações */}
      <View style={s.card}>
        <Text style={s.cardTitle}>📝 Observações</Text>
        <TextInput
          placeholder="Observações clínicas adicionais..."
          style={s.textArea}
          multiline
          value={observations}
          onChangeText={setObservations}
        />
      </View>

      {/* Retorno */}
      <View style={s.card}>
        <TouchableOpacity style={s.checkRow} onPress={() => setReturnConsult(!returnConsult)}>
          <View style={[s.checkbox, returnConsult && s.checkboxOn]} />
          <Text>Agendar consulta de retorno (gratuita)</Text>
        </TouchableOpacity>
      </View>

      {/* Botões */}
      <View style={s.btns}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} disabled={loading}>
          <Text style={s.backTxt}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.payBtn} onPress={handleGoToPayment} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.payTxt}>Ir para Pagamento →</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: "#fff", margin: 15, padding: 15, borderRadius: 12, elevation: 2, marginBottom: 0, marginTop: 15 },
  cardTitle: { fontWeight: "bold", fontSize: 15, marginBottom: 12, color: "#1E293B" },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  label: { color: "#64748B", fontSize: 13 },
  value: { color: "#1E293B", fontSize: 13, fontWeight: "500", maxWidth: "60%", textAlign: "right" },
  checkRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: "#CBD5E1", borderRadius: 5, marginRight: 10 },
  checkboxOn: { backgroundColor: "#F59E0B", borderColor: "#F59E0B" },
  inputLabel: { marginTop: 12, fontWeight: "600", color: "#334155", marginBottom: 4 },
  textArea: { backgroundColor: "#F8FAFC", padding: 10, borderRadius: 10, minHeight: 80, textAlignVertical: "top" },
  btns: { flexDirection: "row", margin: 15, gap: 10, marginTop: 20, marginBottom: 30 },
  backBtn: { flex: 1, backgroundColor: "#E2E8F0", padding: 16, borderRadius: 12, alignItems: "center" },
  backTxt: { fontWeight: "bold", color: "#475569" },
  payBtn: { flex: 2, backgroundColor: "#F59E0B", padding: 16, borderRadius: 12, alignItems: "center" },
  payTxt: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});