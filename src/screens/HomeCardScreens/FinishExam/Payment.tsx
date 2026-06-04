import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, ActivityIndicator, Alert, StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { finishConsult } from "../../../Services/ConsultService/consultService";

const METHODS = ["Dinheiro", "Cartão", "Pix", "Plano de Saúde"] as const;
const PLANS = ["Unimed", "Amil", "Bradesco Saúde", "SulAmérica", "Outro"];
type Method = typeof METHODS[number];

export default function Payment({ route }: any) {
  const navigation: any = useNavigation();
  const { exam, procedures, otherProcedures, observations, hasReturn } = route.params;

  const [method, setMethod] = useState<Method | "">("");
  const [value, setValue] = useState("");
  const [healthPlan, setHealthPlan] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const parsedValue = parseFloat(value.replace(",", ".")) || 0;

  const handleSimulate = () => {
    if (!method) { Alert.alert("Atenção", "Selecione a forma de pagamento."); return; }
    if (!value) { Alert.alert("Atenção", "Informe o valor."); return; }
    if (method === "Plano de Saúde" && !healthPlan) { Alert.alert("Atenção", "Selecione o plano de saúde."); return; }

    Alert.alert(
      "Simulação de Pagamento",
      method === "Pix"
        ? `Chave PIX: clinica@mariaauxiliadora.com\nValor: R$ ${parsedValue.toFixed(2).replace(".", ",")}\n\nApós o pagamento, confirme abaixo.`
        : method === "Cartão"
        ? `Insira o cartão na maquininha.\nValor: R$ ${parsedValue.toFixed(2).replace(".", ",")}\n\nApós a aprovação, confirme abaixo.`
        : method === "Plano de Saúde"
        ? `Plano: ${healthPlan}\nAutorização: ${authCode || "—"}\n\nConfirme o processamento.`
        : `Receba R$ ${parsedValue.toFixed(2).replace(".", ",")} em dinheiro e confirme o troco.`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "✅ Confirmar Pagamento", onPress: () => setPaid(true) },
      ]
    );
  };

  const handleFinish = async () => {
    if (!paid) { Alert.alert("Atenção", "Simule o pagamento antes de finalizar."); return; }
    try {
      setLoading(true);
      await finishConsult(exam.id, {
        procedures,
        otherProcedures,
        paymentMethod: method as any,
        paymentValue: parsedValue,
        healthPlan: method === "Plano de Saúde" ? healthPlan : undefined,
        authorizationNumber: authCode || undefined,
        observations,
        hasReturn,
      });
      Alert.alert("✅ Consulta Encerrada", "Pagamento registrado e consulta finalizada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Home", { tipoUsuario: "secretaria" }) },
      ]);
    } catch (err: any) {
      Alert.alert("Erro", err?.message ?? "Não foi possível finalizar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard title="Pagamento" subtitle={exam.patientName} backgroundColor="#10B981" onBack={() => navigation.goBack()} />

      <View style={s.card}>
        <Text style={s.cardTitle}>🧾 Resumo da Consulta</Text>
        <View style={s.row}><Text style={s.lbl}>Paciente</Text><Text style={s.val}>{exam.patientName}</Text></View>
        <View style={s.row}><Text style={s.lbl}>Médico</Text><Text style={s.val}>{exam.doctorName}</Text></View>
        <View style={s.row}><Text style={s.lbl}>Data</Text><Text style={s.val}>{exam.date} às {exam.time}</Text></View>
        <View style={s.row}>
          <Text style={s.lbl}>Procedimentos</Text>
          <Text style={[s.val, { maxWidth: "60%", textAlign: "right" }]}>{procedures.join(", ")}</Text>
        </View>
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>💰 Valor</Text>
        <TextInput
          placeholder="0,00"
          style={s.input}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={setValue}
        />
        {parsedValue > 0 && (
          <Text style={s.valueDisplay}>R$ {parsedValue.toFixed(2).replace(".", ",")}</Text>
        )}
      </View>

      <View style={s.card}>
        <Text style={s.cardTitle}>💳 Forma de Pagamento</Text>
        <View style={s.methodGrid}>
          {METHODS.map((m) => (
            <TouchableOpacity
              key={m}
              style={[s.methodBtn, method === m && s.methodBtnActive]}
              onPress={() => setMethod(m)}
            >
              <Text style={[s.methodTxt, method === m && s.methodTxtActive]}>
                {m === "Dinheiro" ? "💵" : m === "Cartão" ? "💳" : m === "Pix" ? "📱" : "🏥"} {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {method === "Pix" && (
          <View style={s.pixBox}>
            <Text style={s.pixKey}>📱 Chave PIX:</Text>
            <Text style={s.pixValue}>clinica@mariaauxiliadora.com</Text>
          </View>
        )}

        {method === "Plano de Saúde" && (
          <>
            <Text style={s.sublabel}>Selecione o Plano</Text>
            {PLANS.map((plan) => (
              <TouchableOpacity key={plan} style={s.checkRow} onPress={() => setHealthPlan(plan)}>
                <View style={[s.radio, healthPlan === plan && s.radioOn]} />
                <Text>{plan}</Text>
              </TouchableOpacity>
            ))}
            <Text style={s.sublabel}>Nº de Autorização</Text>
            <TextInput placeholder="Digite o número de autorização" style={s.input} value={authCode} onChangeText={setAuthCode} />
          </>
        )}
      </View>

      {paid && (
        <View style={s.paidBanner}>
          <Text style={s.paidTxt}>✅ Pagamento confirmado!</Text>
        </View>
      )}

      <View style={s.btns}>
        {!paid ? (
          <TouchableOpacity style={s.simulateBtn} onPress={handleSimulate}>
            <Text style={s.simulateTxt}>▶ Simular Pagamento</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.finishBtn} onPress={handleFinish} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.finishTxt}>✔ Finalizar e Registrar</Text>}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: "#fff", margin: 15, marginBottom: 0, marginTop: 15, padding: 15, borderRadius: 14, elevation: 2 },
  cardTitle: { fontWeight: "bold", fontSize: 15, color: "#1E293B", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  lbl: { color: "#64748B", fontSize: 13 },
  val: { color: "#1E293B", fontSize: 13, fontWeight: "500" },
  input: { backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0", padding: 12, borderRadius: 10, fontSize: 16 },
  valueDisplay: { textAlign: "right", fontSize: 22, fontWeight: "bold", color: "#10B981", marginTop: 6 },
  methodGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },
  methodBtn: { flexBasis: "47%", padding: 14, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center" },
  methodBtnActive: { backgroundColor: "#10B981" },
  methodTxt: { fontWeight: "600", color: "#475569" },
  methodTxtActive: { color: "#FFF" },
  pixBox: { backgroundColor: "#ECFDF5", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 8 },
  pixKey: { color: "#065F46", fontWeight: "600", fontSize: 13 },
  pixValue: { color: "#047857", fontSize: 16, fontWeight: "bold", marginTop: 4 },
  sublabel: { fontWeight: "600", color: "#334155", marginTop: 12, marginBottom: 6 },
  checkRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#CBD5E1", marginRight: 10 },
  radioOn: { backgroundColor: "#10B981", borderColor: "#10B981" },
  paidBanner: { margin: 15, backgroundColor: "#DCFCE7", padding: 14, borderRadius: 12, alignItems: "center" },
  paidTxt: { color: "#15803D", fontWeight: "bold", fontSize: 15 },
  btns: { margin: 15, marginTop: 20, marginBottom: 40 },
  simulateBtn: { backgroundColor: "#F59E0B", padding: 16, borderRadius: 14, alignItems: "center" },
  simulateTxt: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  finishBtn: { backgroundColor: "#10B981", padding: 16, borderRadius: 14, alignItems: "center" },
  finishTxt: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});