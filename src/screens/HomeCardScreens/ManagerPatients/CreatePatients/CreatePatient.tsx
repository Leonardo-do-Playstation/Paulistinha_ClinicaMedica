import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../../components/TitleCard/TitleCard";
import { styles } from "./CreatePatientStyle";

export default function CreatePatient() {
  const navigation: any = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#E5ECFF" }}>
      <TitleCard
        title="Novo Paciente"
        subtitle="Preencha os dados do paciente"
        backgroundColor="#155DFC"
        onBack={() => navigation.goBack()}
      ></TitleCard>

      <View style={{ padding: 15 }}>
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.inputStyle}
        />

        <TextInput
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          style={styles.inputStyle}
        />

        <TextInput
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          style={styles.inputStyle}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!name || !phone || !cpf) {
              alert("Preencha todos os campos!");
              return;
            }
            console.log({ name, phone, cpf });
            navigation.goBack();
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ccc", marginTop: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#333", fontWeight: "bold" }}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
