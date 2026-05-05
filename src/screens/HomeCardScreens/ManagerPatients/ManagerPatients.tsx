import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ManagerPatients() {
  const navigation = useNavigation();

  return (
    <View>
      <TitleCard
        title="Clientes"
        subtitle={"Gerenciar Pacientes"}
        backgroundColor="#4F39F6"
        onBack={() => navigation.goBack()}
      ></TitleCard>
    </View>
  );
}
