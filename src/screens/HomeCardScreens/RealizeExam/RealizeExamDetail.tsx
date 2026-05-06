import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { styles } from "./RealizeExamDetailStyle";
import { PatientHistory } from "../../../components/PatientHistory/PatientHistory";

export default function RealizeExamDetails({ route }: any) {
  const navigation: any = useNavigation();
  const { exam } = route.params;

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const procedures = [
    "Consulta Médica",
    "Eletrocardiograma",
    "Exame Dermatológico",
    "Raio-X",
    "Ultrassom",
    "Aplicação de Medicamento",
  ];

  const toggleProcedure = (proc: string) => {
    if (selectedProcedures.includes(proc)) {
      setSelectedProcedures((prev) => prev.filter((p) => p !== proc));
    } else {
      setSelectedProcedures((prev) => [...prev, proc]);
    }
  };

  const history = [
    {
      id: 1,
      date: "15/03/2026",
      type: "Consulta",
      doctor: "Dr. Pedro Alves",
      description: "Pressão controlada",
    },
    {
      id: 2,
      date: "10/01/2026",
      type: "Exame",
      doctor: "Dr. Pedro Alves",
      description: "Eletrocardiograma normal",
    },
    {
      id: 3,
      date: "05/11/2025",
      type: "Consulta",
      doctor: "Dr. Pedro Alves",
      description: "Iniciado tratamento",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TitleCard
        title={exam.name}
        subtitle="Detalhes da Consulta"
        backgroundColor="#009689"
        onBack={() => navigation.goBack()}
      />

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
        <Text style={styles.cardTitle}>Histórico do paciente</Text>
        {history.map((item) => (
          <PatientHistory
            key={item.id}
            date={item.date}
            type={item.type}
            doctor={item.doctor}
            description={item.description}
          />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Laudo</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Laudo do paciente"
          multiline
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Receita</Text>
        <TextInput
          placeholder="Remédios a serem tomados"
          style={styles.textArea}
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.finishText}>Finalizar consulta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
