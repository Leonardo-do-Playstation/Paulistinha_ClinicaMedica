import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomeCard from "../../components/HomeCard/HomeCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/Firebase";

export default function Home() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const { tipoUsuario } = route.params;
  const isMedico = tipoUsuario === "medico";

  const handleDeslogar = async () => {
    await signOut(auth);
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 200, flexGrow: 1 }}
      >
        <Header />

        <View style={{ width: "100%", alignItems: "center" }}>

          {isMedico && (
            <HomeCard
              icon="📋"
              title="Minha Agenda"
              subtitle="Visualizar consultas agendadas"
              color="#14B8A6"
              onPress={() => navigation.navigate("ViewSchedule")}
            />
          )}

          {!isMedico && (
            <>
              <HomeCard
                icon="👥"
                title="Clientes"
                subtitle="Gerenciar pacientes"
                color="#3B82F6"
                onPress={() => navigation.navigate("ManagerPatients")}
              />
              <HomeCard
                icon="📅"
                title="Marcar Consulta"
                subtitle="Agendar novo atendimento"
                color="#22C55E"
                onPress={() => navigation.navigate("MarkExam")}
              />
              <HomeCard
                icon="✔️"
                title="Confirmar Consultas"
                subtitle="Consultas do dia"
                color="#6366F1"
                onPress={() => navigation.navigate("ConfirmExam")}
              />
              <HomeCard
                icon="💳"
                title="Encerrar Consulta"
                subtitle="Pagamento e procedimentos"
                color="#F59E0B"
                onPress={() => navigation.navigate("FinishExam")}
              />
              <HomeCard
                icon="❌"
                title="Cancelar Consulta"
                subtitle="Gerenciar cancelamentos"
                color="#EF4444"
                onPress={() => navigation.navigate("CancelExam")}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          onPress={handleDeslogar}
          style={{
            marginTop: 20,
            backgroundColor: "#DC2626",
            paddingVertical: 14,
            paddingHorizontal: 30,
            borderRadius: 14,
            alignSelf: "center",
            width: "85%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>
            🚪 Sair
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}