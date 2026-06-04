import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "./CancelExamStyle";
import { getConsultsByStatus } from "../../../Services/ConsultService/consultService";
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
      // Busca consultas que ainda podem ser canceladas
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

  useFocusEffect(
    useCallback(() => {
      fetchConsults();
    }, [])
  );

  // Filtro local por nome do paciente
  const handleSearch = (text: string) => {
    setSearch(text);
    const term = text.toLowerCase();
    setFiltered(
      consults.filter((c) => c.patientName.toLowerCase().includes(term))
    );
  };

  const statusColor = (status: string) => {
    if (status === "Confirmada") return "#22C55E";
    if (status === "Marcada") return "#3B82F6";
    return "#EF4444";
  };

  const renderItem = ({ item }: { item: Consult }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{item.patientName}</Text>
            <Text style={[styles.status, { color: statusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
          <Text style={styles.phone}>{item.patientPhone}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text>📅 {item.date}</Text>
        <Text>⏰ {item.time}</Text>
      </View>

      <Text>
        👨‍⚕️ {item.doctorName} - {item.doctorSpecialty}
      </Text>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("CancelDetails", { exam: item })}
      >
        <Text style={styles.cancelText}>Cancelar Consulta</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id!}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              Nenhuma consulta encontrada.
            </Text>
          ) : null
        }
        ListHeaderComponent={
          <>
            <TitleCard
              title="Cancelamentos"
              subtitle="Gerenciar cancelamentos"
              backgroundColor="#E7000B"
              onBack={() => navigation.goBack()}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#E7000B" style={{ marginTop: 40 }} />
            ) : (
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="🔍 Buscar consulta..."
                  value={search}
                  onChangeText={handleSearch}
                  style={styles.searchInput}
                />
              </View>
            )}
          </>
        }
      />
    </View>
  );
}
