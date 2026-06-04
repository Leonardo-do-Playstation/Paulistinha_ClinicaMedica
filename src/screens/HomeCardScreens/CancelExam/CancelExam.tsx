import React, { useState, useCallback } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, ActivityIndicator, Alert, StyleSheet,
} from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getConsultsByStatus, cancelConsult } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function CancelExam() {
  const navigation: any = useNavigation();
  const [consults, setConsults] = useState<Consult[]>([]);
  const [filtered, setFiltered] = useState<Consult[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConsults = async () => {
    try {
      setLoading(true);
      const [marcadas, confirmadas] = await Promise.all([
        getConsultsByStatus("Marcada"),
        getConsultsByStatus("Confirmada"),
      ]);
      const data = [...marcadas, ...confirmadas];
      setConsults(data);
      setFiltered(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as consultas.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchConsults(); }, []));

  const handleSearch = (text: string) => {
    setSearch(text);
    setFiltered(consults.filter((c) => c.patientName.toLowerCase().includes(text.toLowerCase())));
  };

  const handleCancel = (item: Consult) => {
    navigation.navigate("CancelDetails", { exam: item });
  };

  const statusColor = (s: string) => s === "Confirmada" ? "#22C55E" : "#3B82F6";

  const renderItem = ({ item }: { item: Consult }) => (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <View style={{ flex: 1 }}>
          <View style={s.nameRow}>
            <Text style={s.name}>{item.patientName}</Text>
            <Text style={[s.status, { color: statusColor(item.status) }]}>{item.status}</Text>
          </View>
          <Text style={s.phone}>{item.patientPhone}</Text>
        </View>
      </View>
      <View style={s.infoRow}>
        <Text>📅 {item.date}</Text>
        <Text>⏰ {item.time}</Text>
      </View>
      <Text>👨‍⚕️ {item.doctorName} — {item.doctorSpecialty}</Text>
      <TouchableOpacity style={s.cancelButton} onPress={() => handleCancel(item)}>
        <Text style={s.cancelText}>Cancelar Consulta</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id!}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>Nenhuma consulta encontrada.</Text>
          ) : null
        }
        ListHeaderComponent={
          <>
            <TitleCard title="Cancelamentos" subtitle="Gerenciar cancelamentos" backgroundColor="#EF4444" onBack={() => navigation.goBack()} />
            {loading ? (
              <ActivityIndicator size="large" color="#EF4444" style={{ marginTop: 40 }} />
            ) : (
              <View style={{ padding: 15 }}>
                <TextInput
                  placeholder="🔍 Buscar por nome do paciente..."
                  value={search}
                  onChangeText={handleSearch}
                  style={s.searchInput}
                />
              </View>
            )}
          </>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  searchInput: { backgroundColor: "#fff", padding: 12, borderRadius: 10 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginHorizontal: 15, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: "row", marginBottom: 10 },
  nameRow: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontWeight: "bold", fontSize: 16 },
  status: { fontWeight: "bold" },
  phone: { color: "#6B7280" },
  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  cancelButton: { backgroundColor: "#EF4444", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
  cancelText: { color: "#fff", fontWeight: "bold" },
});