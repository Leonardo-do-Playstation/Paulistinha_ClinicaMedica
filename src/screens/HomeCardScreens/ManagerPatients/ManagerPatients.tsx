import React from "react";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Button, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListPatient from "./ListPatient/ListPatient";

export default function ManagerPatients() {
  const navigation: any = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#E5ECFF" }}>
      <ScrollView>
        <TitleCard
          title="Clientes"
          subtitle="Gerenciar Pacientes"
          backgroundColor="#4F39F6"
          onBack={() => navigation.goBack()}
        />
        <ListPatient />
      </ScrollView>
    </View>
  );
}
