import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MarkExam() {
  const navigation = useNavigation();

  return (
    <View>
      <TitleCard
        title="Marcar consulta"
        subtitle={""}
        backgroundColor="#00A63E"
        onBack={() => navigation.goBack()}
      ></TitleCard>
    </View>
  );
}
