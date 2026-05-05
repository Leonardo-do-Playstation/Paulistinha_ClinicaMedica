import React from "react";
import { TitleCard } from "../../components/TitleCard/TitleCard";
import { FlatList, View } from "react-native";
import { styles } from "./ConfirmExamStyles";
import { ConfirmCard } from "../../components/ConfirmCard/ConfirmCard";
import { consultas } from "../../data/consulta";

export default function ConfirmExam() {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR");

  return (
    <View style={styles.container}>
      <TitleCard
        title="Confirmação de Exame"
        subtitle={`Hoje, ${dataFormatada}`}
        backgroundColor="#4F39F6"
        onBack={() => navigation.back()}
      ></TitleCard>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <ConfirmCard
            name={item.name}
            phone={item.phone}
            time={item.time}
            doctor={item.doctor}
            specialty={item.specialty}
          />
        )}
      />
    </View>
  );
}
