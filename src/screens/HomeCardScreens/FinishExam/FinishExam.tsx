import React, { useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "./FinishExamStyle";
import { ConsultCard } from "../../../components/ConsultCard/ConsultCard";
import { getConsultsByStatus } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function FinishExam() {
  const navigation: any = useNavigation();

  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        try {
          setLoading(true);
          const data = await getConsultsByStatus("Realizada");
          setConsults(data);
        } catch {
          Alert.alert("Erro", "Não foi possível carregar as consultas.");
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TitleCard
        title="Encerramento"
        subtitle="Consultas realizadas"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#F59E0B" style={{ marginTop: 40 }} />
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              💳 {consults.length} consultas realizadas
            </Text>
            <Text style={styles.summaryText}>
              📌 {consults.length} aguardando encerramento
            </Text>
          </View>

          <FlatList
            data={consults}
            keyExtractor={(item) => item.id!}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
                Nenhuma consulta aguardando encerramento.
              </Text>
            }
            renderItem={({ item }) => (
              <ConsultCard
                data={item}
                onPress={() =>
                  navigation.navigate("FinishExamDetail", { exam: item })
                }
              />
            )}
          />
        </>
      )}
    </View>
  );
}
