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
import { styles } from "./FinishExamDetailStyle";

export default function FinishExamDetail({ route }: any) {
  const navigation: any = useNavigation();
  const { exam } = route.params;

  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [healthPlan, setHealthPlan] = useState("");

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
      setSelectedProcedures((prev) =>
        prev.filter((p) => p !== proc)
      );
    } else {
      setSelectedProcedures((prev) => [...prev, proc]);
    }
  };

  const [returnConsult, setReturnConsult] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <TitleCard
        title={exam.name}
        subtitle="Encerramento de consulta"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          📋 Procedimentos Realizados
        </Text>

        {procedures.map((proc) => (
          <TouchableOpacity
            key={proc}
            style={styles.checkboxRow}
            onPress={() => toggleProcedure(proc)}
          >
            <View
              style={[
                styles.checkbox,
                selectedProcedures.includes(proc) &&
                  styles.checkboxSelected,
              ]}
            />
            <Text>{proc}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.inputLabel}>Outros Procedimentos</Text>
        <TextInput
          placeholder="Descreva outros procedimentos..."
          style={styles.textArea}
          multiline
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💰 Pagamento</Text>

        <Text style={styles.inputLabel}>Valor (R$)</Text>
        <TextInput placeholder="0,00"
        style={styles.input} keyboardType="numeric" />

        <Text style={styles.inputLabel}>Forma de Pagamento</Text>
        {["Dinheiro", "Cartão", "Pix", "Plano de Saúde"].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.checkboxRow}
            onPress={() => setPaymentMethod(item)}
          >
            <View
              style={[
                styles.checkbox,
                paymentMethod === item &&
                  styles.checkboxSelected,
              ]}
            />
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}

        {paymentMethod === "Plano de Saúde" && (
          <>
            <Text style={styles.inputLabel}>Plano de Saúde</Text>

            {["Unimed", "Amil", "Bradesco Saúde"].map((plan) => (
              <TouchableOpacity
                key={plan}
                style={styles.checkboxRow}
                onPress={() => setHealthPlan(plan)}
              >
                <View
                  style={[
                    styles.checkbox,
                    healthPlan === plan &&
                      styles.checkboxSelected,
                  ]}
                />
                <Text>{plan}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.inputLabel}>
              Nº Autorização
            </Text>
            <TextInput placeholder="Digite o número de autorização..." 
            style={styles.input} />
          </>
        )}

        <Text style={styles.inputLabel}>Observações</Text>
        <TextInput placeholder="Observações adicionais..."
        style={styles.textArea} multiline />
      </View>

        <View style={styles.card}>
            <TouchableOpacity
                style={styles.checkboxRow}
                    onPress={() => setReturnConsult(!returnConsult)}
            >
        <View
                style={[
                    styles.checkbox,
                    returnConsult && styles.checkboxSelected,
                    ]}
                />
                <Text>Agendar consulta de retorno (gratuita)</Text>
            </TouchableOpacity>
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
            console.log("Finalizado");
            navigation.goBack();
          }}
        >
          <Text style={styles.finishText}>
            Finalizar e Gerar Recibo
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}