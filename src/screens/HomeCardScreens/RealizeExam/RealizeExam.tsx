import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ConsultCard } from "../../../components/ConsultCard/ConsultCard";
import { consults } from "../../../data/consults";
import { styles } from "./RealizeExamStyle";

export default function RealizeExam() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard
        title="Realizar Consulta"
        subtitle={"Pacientes confirmados"}
        backgroundColor="#009689"
        onBack={() => navigation.goBack()}
      ></TitleCard>
      <View style={{ marginTop: 15 }}>
        <FlatList
          data={consults}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ConsultCard
              data={item}
              onPress={() =>
                (navigation as any).navigate("RealizeExamDetail", {
                  exam: item,
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
}
