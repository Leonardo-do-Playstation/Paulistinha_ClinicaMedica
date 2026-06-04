import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../../components/TitleCard/TitleCard";
import { styles } from "./CreatePatientStyle";
import { createPatient } from "../../../../Services/PatientService/patientService";

export default function CreatePatient() {
  const navigation: any = useNavigation();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name || !cpf || !birthDate || !phone) {
      Alert.alert("Campos obrigatórios", "Preencha nome, CPF, data de nascimento e telefone.");
      return;
    }

    try {
      setLoading(true);
      await createPatient({ name, cpf, birthDate, phone, email, address, city, uf, observations: notes });
      Alert.alert("Sucesso", "Paciente cadastrado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o paciente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <TitleCard
        title="Cadastro de Cliente"
        subtitle="Dados básicos do paciente"
        backgroundColor="#155DFC"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            placeholder="Digite o nome completo"
            value={name}
            onChangeText={setName}
            style={styles.inputStyle}
          />

          <Text style={styles.label}>CPF *</Text>
          <TextInput
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCpf}
            style={styles.inputStyle}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Data de Nascimento *</Text>
          <TextInput
            placeholder="dd/mm/aaaa"
            value={birthDate}
            onChangeText={setBirthDate}
            style={styles.inputStyle}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Telefone *</Text>
          <TextInput
            placeholder="(00) 00000-0000"
            value={phone}
            onChangeText={setPhone}
            style={styles.inputStyle}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            style={styles.inputStyle}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            placeholder="Rua, número, bairro"
            value={address}
            onChangeText={setAddress}
            style={styles.inputStyle}
          />

          <View style={styles.row}>
            <View style={styles.cityContainer}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                placeholder="Cidade"
                value={city}
                onChangeText={setCity}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.ufContainer}>
              <Text style={styles.label}>UF</Text>
              <TextInput
                placeholder="UF"
                value={uf}
                onChangeText={(v) => setUf(v.toUpperCase())}
                style={styles.inputStyle}
                maxLength={2}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <Text style={styles.label}>Observações</Text>
          <TextInput
            placeholder="Alergias, condições especiais..."
            value={notes}
            onChangeText={setNotes}
            style={styles.textArea}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
