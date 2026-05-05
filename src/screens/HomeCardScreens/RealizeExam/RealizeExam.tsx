import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RealizeExam() {
  const navigation = useNavigation();

  return (
    <View>
      <TitleCard
        title="Realizar Consulta"
        subtitle={"Pacientes confirmados"}
        backgroundColor="#009689"
        onBack={() => navigation.goBack()}
      ></TitleCard>
    </View>
  );
}
