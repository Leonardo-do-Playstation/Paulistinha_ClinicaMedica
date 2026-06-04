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
import { styles } from "./RealizeExamDetailStyle";
import { markAsRealized } from "../../../Services/ConsultService/consultService";
import { KeyboardWrapper } from "../../../components/KeyboardWrapper/KeyboardWrapper";

export default function RealizeExamDetails({ route }: any) {
  const navigation: any = useNavigation();
  const { exam } = route.params;

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [laudo, setLaudo] = useState("");
  const [receita, setReceita] = useState("");
  const [loading, setLoading] = useState(false);

  const procedures = [
    "Consulta Médica",
    "Eletrocardiograma",
    "Exame Dermatológico",
    "Raio-X",
    "Ultrassom",
    "Aplicação de Medicamento",
  ];

  const toggleProcedure = (proc: string) => {
    setSelectedProcedures((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc],
    );
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      await markAsRealized(exam.id);
      Alert.alert("Consulta finalizada", "O atendimento foi registrado.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível finalizar a consulta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TitleCard
        title={exam.patientName}
        subtitle="Detalhes da Consulta"
        backgroundColor="#009689"
        onBack={() => navigation.goBack()}
      />

      <KeyboardWrapper contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Procedimentos Realizados</Text>
          {procedures.map((proc) => (
            <TouchableOpacity
              key={proc}
              style={styles.checkboxRow}
              onPress={() => toggleProcedure(proc)}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedProcedures.includes(proc) && styles.checkboxSelected,
                ]}
              />
              <Text>{proc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Laudo</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Laudo do paciente"
            value={laudo}
            onChangeText={setLaudo}
            multiline
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Receita</Text>
          <TextInput
            placeholder="Remédios a serem tomados"
            style={styles.textArea}
            value={receita}
            onChangeText={setReceita}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.finishText}>Finalizar consulta</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardWrapper>
    </KeyboardAvoidingView>
  );
}
