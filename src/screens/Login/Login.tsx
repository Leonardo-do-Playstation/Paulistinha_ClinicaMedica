import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase";
import { styles } from "./LoginStyles";
import { KeyboardWrapper } from "../../components/KeyboardWrapper/KeyboardWrapper";

async function getUserRole(email: string): Promise<"medico" | "secretaria"> {
  const doctorsRef = collection(db, "doctors");
  const q = query(doctorsRef, where("email", "==", email.toLowerCase().trim()));
  const snapshot = await getDocs(q);
  return snapshot.empty ? "secretaria" : "medico";
}

export default function Login() {
  const navigation: any = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showRecuperar, setShowRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [loadingRecuperar, setLoadingRecuperar] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), senha);
      const role = await getUserRole(email.trim());
      navigation.navigate("Home", { tipoUsuario: role });
    } catch (err: any) {
      const code = err?.code ?? "";
      let msg = "Não foi possível fazer login.";
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        msg = "E-mail ou senha incorretos.";
      } else if (code === "auth/invalid-email") {
        msg = "E-mail inválido.";
      } else if (code === "auth/too-many-requests") {
        msg = "Muitas tentativas. Tente novamente mais tarde.";
      } else if (code === "auth/network-request-failed") {
        msg = "Sem conexão com a internet.";
      }
      Alert.alert("Erro ao entrar", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRecuperarSenha = async () => {
    if (!emailRecuperar.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail.");
      return;
    }
    try {
      setLoadingRecuperar(true);
      await sendPasswordResetEmail(auth, emailRecuperar.trim());
      Alert.alert(
        "E-mail enviado",
        "Verifique sua caixa de entrada para redefinir a senha.",
        [{ text: "OK", onPress: () => setShowRecuperar(false) }],
      );
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível enviar o e-mail. Verifique o endereço.",
      );
    } finally {
      setLoadingRecuperar(false);
    }
  };

  if (showRecuperar) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardWrapper contentContainerStyle={styles.container}>
          <Text style={styles.icon}>🔑</Text>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Enviaremos um link para seu e-mail
          </Text>

          <View style={styles.card}>
            <TextInput
              placeholder="seu@email.com"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailRecuperar}
              onChangeText={setEmailRecuperar}
            />

            <TouchableOpacity
              style={[styles.loginButton, loadingRecuperar && { opacity: 0.6 }]}
              onPress={handleRecuperarSenha}
              disabled={loadingRecuperar}
            >
              {loadingRecuperar ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginButtonText}>Enviar instruções</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowRecuperar(false)}
            >
              <Text style={styles.backButtonText}>← Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardWrapper>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardWrapper contentContainerStyle={styles.container}>
        <Text style={styles.icon}>🏥</Text>
        <Text style={styles.title}>Clínica Médica</Text>
        <Text style={styles.subtitle}>Sistema de Atendimento</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo!</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="seu@email.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Digite sua senha"
              style={styles.passwordInput}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setMostrarSenha((v) => !v)}
            >
              <Text style={styles.eyeText}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginBottom: 20, marginTop: 4 }}
            onPress={() => setShowRecuperar(true)}
          >
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardWrapper>
    </KeyboardAvoidingView>
  );
}
