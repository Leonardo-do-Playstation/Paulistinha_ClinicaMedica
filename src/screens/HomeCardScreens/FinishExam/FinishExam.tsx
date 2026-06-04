import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getConsultsByStatus } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";
import { s } from "./FinishExamStyle";

export default function FinishExam() {
  const navigation: any = useNavigation();
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        try {
          setLoading(true);
          const data = await getConsultsByStatus("Confirmada");
          setConsults(data);
        } catch {
          Alert.alert("Erro", "Não foi possível carregar as consultas.");
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, []),
  );

  const renderItem = ({ item }: { item: Consult }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate("FinishExamDetail", { exam: item })}
    >
      <View style={s.left}>
        <View style={s.avatar}>
          <Text style={s.avatarTxt}>
            {item.patientName.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={s.body}>
        <Text style={s.name}>{item.patientName}</Text>
        <Text style={s.info}>
          📅 {item.date} às {item.time}
        </Text>
        <Text style={s.info}>👨‍⚕️ {item.doctorName}</Text>
        <Text style={s.info}>📞 {item.patientPhone}</Text>
      </View>
      <Text style={s.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard
        title="Encerrar Consulta"
        subtitle="Consultas prontas para encerramento"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#F59E0B"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={consults}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={{ padding: 15 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              Nenhuma consulta aguardando encerramento.
            </Text>
          }
          ListHeaderComponent={
            <View style={s.summaryCard}>
              <Text style={s.summaryTxt}>
                💳 {consults.length} consulta{consults.length !== 1 ? "s" : ""}{" "}
                aguardando encerramento
              </Text>
            </View>
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}
