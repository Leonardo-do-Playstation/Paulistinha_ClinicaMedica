import React, { useState, useCallback } from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { FlatList, View, Text, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ConsultCard } from "../../../components/ConsultCard/ConsultCard";
import { styles } from "./RealizeExamStyle";
import { getConsultsByStatus } from "../../../Services/ConsultService/consultService";
import { Consult } from "../../../data/types/consultTypes";

export default function RealizeExam() {
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

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard
        title="Realizar Consulta"
        subtitle="Pacientes confirmados"
        backgroundColor="#009689"
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#009689"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={consults}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              Nenhuma consulta confirmada no momento.
            </Text>
          }
          renderItem={({ item }) => (
            <ConsultCard
              data={item}
              onPress={() =>
                navigation.navigate("RealizeExamDetail", { exam: item })
              }
            />
          )}
        />
      )}
    </View>
  );
}
