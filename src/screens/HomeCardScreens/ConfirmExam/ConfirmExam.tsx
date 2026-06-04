import React, { useState, useCallback } from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { FlatList, View, Text, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  getConsultsByStatus,
  confirmConsult,
  cancelConsult,
} from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

const STATUS_COLOR: Record<string, string> = {
  Marcada: "#3B82F6",
  Confirmada: "#22C55E",
};

export default function ConfirmExam() {
  const navigation: any = useNavigation();
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todas" | "hoje">("hoje");

  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  const fetchConsults = async () => {
    try {
      setLoading(true);
      const [marcadas, confirmadas] = await Promise.all([
        getConsultsByStatus("Marcada"),
        getConsultsByStatus("Confirmada"),
      ]);
      setConsults([...marcadas, ...confirmadas]);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchConsults(); }, []));

  const handleConfirm = async (id: string) => {
    try {
      await confirmConsult(id);
      setConsults((prev) => prev.map((c) => c.id === id ? { ...c, status: "Confirmada" } : c));
      Alert.alert("✅ Confirmada", "Consulta confirmada com sucesso!");
    } catch {
      Alert.alert("Erro", "Não foi possível confirmar a consulta.");
    }
  };

  const handleCancel = (item: Consult) => {
    navigation.navigate("CancelDetails", { exam: item });
  };

  const filtered = filtro === "hoje" ? consults.filter((c) => c.date === hoje) : consults;

  const renderItem = ({ item }: { item: Consult }) => (
    <View style={s.card}>
      <View style={[s.statusStripe, { backgroundColor: STATUS_COLOR[item.status] ?? "#94A3B8" }]} />
      <View style={s.cardBody}>
        <View style={s.topRow}>
          <Text style={s.patientName}>{item.patientName}</Text>
          <View style={[s.badge, { backgroundColor: STATUS_COLOR[item.status] ?? "#94A3B8" }]}>
            <Text style={s.badgeText}>{item.status}</Text>
          </View>
        </View>
        <Text style={s.info}>📅 {item.date} às {item.time}</Text>
        <Text style={s.info}>👨‍⚕️ {item.doctorName} — {item.doctorSpecialty}</Text>
        <Text style={s.info}>📞 {item.patientPhone}</Text>

        <View style={s.actions}>
          {item.status === "Marcada" && (
            <TouchableOpacity style={s.confirmBtn} onPress={() => handleConfirm(item.id!)}>
              <Text style={s.confirmTxt}>✔ Confirmar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={s.cancelBtn} onPress={() => handleCancel(item)}>
            <Text style={s.cancelTxt}>✕ Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard title="Confirmar Consultas" subtitle="Gerencie as consultas agendadas" backgroundColor="#6366F1" onBack={() => navigation.goBack()} />

      <View style={s.filterRow}>
        {(["hoje", "todas"] as const).map((f) => (
          <TouchableOpacity key={f} style={[s.filterBtn, filtro === f && s.filterActive]} onPress={() => setFiltro(f)}>
            <Text style={[s.filterTxt, filtro === f && s.filterActiveTxt]}>
              {f === "hoje" ? "Hoje" : "Todas"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              {filtro === "hoje" ? "Nenhuma consulta para hoje." : "Nenhuma consulta encontrada."}
            </Text>
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  filterRow: { flexDirection: "row", gap: 8, padding: 12, backgroundColor: "#FFF", borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  filterBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: "#E2E8F0", alignItems: "center" },
  filterActive: { backgroundColor: "#6366F1" },
  filterTxt: { fontWeight: "600", color: "#475569" },
  filterActiveTxt: { color: "#FFF" },
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 14, marginBottom: 12, overflow: "hidden", elevation: 2 },
  statusStripe: { width: 5 },
  cardBody: { flex: 1, padding: 14, gap: 4 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  patientName: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: "#FFF", fontSize: 11, fontWeight: "600" },
  info: { fontSize: 13, color: "#64748B" },
  actions: { flexDirection: "row", gap: 8, marginTop: 10 },
  confirmBtn: { flex: 1, backgroundColor: "#22C55E", padding: 10, borderRadius: 10, alignItems: "center" },
  confirmTxt: { color: "#FFF", fontWeight: "bold" },
  cancelBtn: { flex: 1, backgroundColor: "#FEE2E2", padding: 10, borderRadius: 10, alignItems: "center" },
  cancelTxt: { color: "#EF4444", fontWeight: "bold" },
});