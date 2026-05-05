import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CancelExam() {
  const navigation = useNavigation();

  return (
    <View>
      <TitleCard
        title="Cancelamento"
        subtitle={"Gerenciar cancelamentos"}
        backgroundColor="#E7000B"
        onBack={() => navigation.goBack()}
      ></TitleCard>
    </View>
  );
}
