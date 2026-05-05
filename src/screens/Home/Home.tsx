import React from "react";
import { View, ScrollView, Text } from "react-native";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomeCard from "../../components/HomeCard/HomeCard";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 200,
          flexGrow: 1,
        }}
      >
        <Header />
        <View style={{ width: "100%", alignItems: "center" }}>
          <HomeCard
            icon="👥"
            title="Clientes"
            subtitle="Gerenciar pacientes"
            color="#3B82F6" 
          />

          <HomeCard
            icon="📅"
            title="Marcar Consulta"
            subtitle="Agendar novo atendimento"
            color="#22C55E" 
          />

          <HomeCard
            icon="✔️"
            title="Confirmar Consultas"
            subtitle="Consultas do dia"
            color="#6366F1" 
          />

          <HomeCard
            icon="🩺"
            title="Realizar Consulta"
            subtitle="Atender paciente"
            color="#14B8A6"
          />

          <HomeCard
            icon="💳"
            title="Encerrar Consulta"
            subtitle="Pagamento e procedimentos"
            color="#F59E0B" 
          />

          <HomeCard
            icon="❌"
            title="Cancelar Consulta"
            subtitle="Gerenciar cancelamentos"
            color="#EF4444" 
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}
