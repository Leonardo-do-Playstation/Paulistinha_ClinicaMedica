import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Consult } from "../../../data/types/consultTypes";
import { KeyboardWrapper } from "../../../components/KeyboardWrapper/KeyboardWrapper";
import { s } from "./FinishExamDetailStyle";

export default function FinishExamDetail({ route }: any) {
  const navigation: any = useNavigation();
  const { exam }: { exam: Consult } = route.params;

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [otherProcedures, setOtherProcedures] = useState("");
  const [observations, setObservations] = useState("");
  const [returnConsult, setReturnConsult] = useState(false);
  const [loading, setLoading] = useState(false);

  const procedures = [
    "Consulta Médica",
    "Eletrocardiograma",
    "Exame Dermatológico",
    "Raio-X",
    "Ultrassom",
    "Aplicação de Medicamento",
  ];

  const toggleProcedure = (proc: string) =>
    setSelectedProcedures((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc],
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TitleCard
        title={exam.patientName}
        subtitle="Relatório da Consulta"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

      <KeyboardWrapper>
        <View style={s.card}>
          <Text style={s.cardTitle}>📋 Dados da Consulta</Text>
          <View style={s.row}>
            <Text style={s.label}>Paciente</Text>
            <Text style={s.value}>{exam.patientName}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Telefone</Text>
            <Text style={s.value}>{exam.patientPhone}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Médico</Text>
            <Text style={s.value}>{exam.doctorName}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Especialidade</Text>
            <Text style={s.value}>{exam.doctorSpecialty}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Data</Text>
            <Text style={s.value}>{exam.date}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Horário</Text>
            <Text style={s.value}>{exam.time}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Status</Text>
            <Text style={[s.value, { color: "#22C55E", fontWeight: "bold" }]}>
              {exam.status}
            </Text>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>🩺 Procedimentos Realizados</Text>
          {procedures.map((proc) => (
            <TouchableOpacity
              key={proc}
              style={s.checkRow}
              onPress={() => toggleProcedure(proc)}
            >
              <View
                style={[
                  s.checkbox,
                  selectedProcedures.includes(proc) && s.checkboxOn,
                ]}
              />
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

        <View style={s.card}>
          <TouchableOpacity
            style={s.checkRow}
            onPress={() => setReturnConsult(!returnConsult)}
          >
            <View style={[s.checkbox, returnConsult && s.checkboxOn]} />
            <Text>Agendar consulta de retorno (gratuita)</Text>
          </TouchableOpacity>
        </View>

        <View style={s.btns}>
          <TouchableOpacity
            style={s.backBtn}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={s.backTxt}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.payBtn}
            onPress={handleGoToPayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.payTxt}>Ir para Pagamento →</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardWrapper>
    </KeyboardAvoidingView>
  );
}
