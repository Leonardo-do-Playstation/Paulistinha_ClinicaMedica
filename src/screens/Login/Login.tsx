import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LoginStyles";

export default function Login() {
  const navigation: any = useNavigation();

  const [tipoUsuario, setTipoUsuario] = useState<"cpf" | "crm">("cpf");
  const [lembrar, setLembrar] = useState(false);
  const [showRecuperarSenha, setShowRecuperarSenha] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Home", {
      tipoUsuario,
    });
  };

  if (showRecuperarSenha) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.icon}>🔑</Text>

        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.subtitle}>
          Digite seu {tipoUsuario === "cpf" ? "CPF" : "CRM"}
        </Text>

        <View style={styles.card}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                tipoUsuario === "cpf" && styles.activeButton,
              ]}
              onPress={() => setTipoUsuario("cpf")}
            >
              <Text
                style={
                  tipoUsuario === "cpf"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                CPF
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                tipoUsuario === "crm" && styles.activeButton,
              ]}
              onPress={() => setTipoUsuario("crm")}
            >
              <Text
                style={
                  tipoUsuario === "crm"
                    ? styles.activeButtonText
                    : styles.buttonText
                }
              >
                CRM
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder={tipoUsuario === "cpf" ? "000.000.000-00" : "000000"}
            style={styles.input}
          />

          <TextInput placeholder="seu@email.com" style={styles.input} />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Enviar instruções</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowRecuperarSenha(false)}
          >
            <Text style={styles.backButtonText}>← Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.icon}>🏥</Text>

      <Text style={styles.title}>Clínica Médica</Text>

      <Text style={styles.subtitle}>Sistema de Atendimento</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bem-vindo!</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              tipoUsuario === "cpf" && styles.activeButton,
            ]}
            onPress={() => setTipoUsuario("cpf")}
          >
            <Text
              style={
                tipoUsuario === "cpf"
                  ? styles.activeButtonText
                  : styles.buttonText
              }
            >
              👤 CPF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              tipoUsuario === "crm" && styles.activeButton,
            ]}
            onPress={() => setTipoUsuario("crm")}
          >
            <Text
              style={
                tipoUsuario === "crm"
                  ? styles.activeButtonText
                  : styles.buttonText
              }
            >
              👨‍⚕️ CRM
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder={tipoUsuario === "cpf" ? "000.000.000-00" : "000000"}
          style={styles.input}
        />

        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.rememberContainer}>
          <View style={styles.switchRow}>
            <Switch value={lembrar} onValueChange={setLembrar} />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>

          <TouchableOpacity onPress={() => setShowRecuperarSenha(true)}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
