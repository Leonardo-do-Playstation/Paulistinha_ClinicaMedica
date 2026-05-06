import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreatePatient() {
  const navigation: any = useNavigation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#E5ECFF" }}>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Novo Paciente
      </Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={inputStyle}
      />

      <TextInput
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        style={inputStyle}
      />

      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={inputStyle}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          console.log({ name, phone, cpf });
          navigation.goBack();
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Salvar
        </Text>
      </TouchableOpacity>

        <TouchableOpacity
        style={[styles.button, { backgroundColor: "#ccc", marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#333", fontWeight: "bold" }}>
          Cancelar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const inputStyle = {
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F39F6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
});