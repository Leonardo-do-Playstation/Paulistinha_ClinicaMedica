import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FinishExam() {
  const navigation = useNavigation();

  return (
    <View>
      <TitleCard
        title="Encerramento"
        subtitle={"Consultas realizadas"}
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      ></TitleCard>
    </View>
  );
}
