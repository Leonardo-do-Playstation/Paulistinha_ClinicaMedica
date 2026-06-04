import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getConsultsByStatus } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function FinishExam() {
  const navigation: any = useNavigation();
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        // Encerramento: consultas confirmadas que já foram realizadas (marcAsRealized) ficam como "Realizada"
        // Aqui mostramos "Confirmada" pois são as que estão prontas para encerrar
        const data = await getConsultsByStatus("Confirmada");
        setConsults(data);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar as consultas.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []));

  const renderItem = ({ item }: { item: Consult }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate("FinishExamDetail", { exam: item })}
    >
      <View style={s.left}>
        <View style={s.avatar}>
          <Text style={s.avatarTxt}>{item.patientName.charAt(0).toUpperCase()}</Text>
        </View>
      </View>
      <View style={s.body}>
        <Text style={s.name}>{item.patientName}</Text>
        <Text style={s.info}>📅 {item.date} às {item.time}</Text>
        <Text style={s.info}>👨‍⚕️ {item.doctorName}</Text>
        <Text style={s.info}>📞 {item.patientPhone}</Text>
      </View>
      <Text style={s.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard title="Encerrar Consulta" subtitle="Consultas prontas para encerramento" backgroundColor="#F59E0B" onBack={() => navigation.goBack()} />

      {loading ? (
        <ActivityIndicator size="large" color="#F59E0B" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={consults}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={<Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>Nenhuma consulta aguardando encerramento.</Text>}
          ListHeaderComponent={
            <View style={s.summaryCard}>
              <Text style={s.summaryTxt}>💳 {consults.length} consulta{consults.length !== 1 ? "s" : ""} aguardando encerramento</Text>
            </View>
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  summaryCard: { backgroundColor: "#FEF9C3", borderColor: "#FACC15", borderWidth: 1, padding: 14, borderRadius: 12, marginBottom: 15 },
  summaryTxt: { fontWeight: "bold", color: "#78350F" },
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 14, marginBottom: 12, padding: 14, alignItems: "center", elevation: 2 },
  left: { marginRight: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#FEF3C7", justifyContent: "center", alignItems: "center" },
  avatarTxt: { fontSize: 20, fontWeight: "bold", color: "#F59E0B" },
  body: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  info: { fontSize: 13, color: "#64748B" },
  arrow: { fontSize: 24, color: "#CBD5E1" },
});