import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FinishExamStyle";
import { ConsultCard } from "../../../components/ConsultCard/ConsultCard";
import { consults } from "../../../data/consults";

export default function FinishExam() {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <TitleCard
        title="Encerramento"
        subtitle="Consultas realizadas"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ConsultCard
            data={item}
            onPress={() =>
              navigation.navigate("FinishExamDetail", { exam: item })
            }
          />
        )}
      />
    </View>
  );
}
