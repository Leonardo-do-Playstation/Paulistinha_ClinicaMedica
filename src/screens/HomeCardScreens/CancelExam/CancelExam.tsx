import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./CancelExamStyle"; 

export default function CancelExam() {
  const navigation: any = useNavigation();
  const [search, setSearch] = useState("");

  const data = [
    {
      id: "1",
      name: "João Silva",
      phone: "(15) 99999-9999",
      date: "10/05/2026",
      time: "14:00",
      doctor: "Dr. Carlos",
      specialty: "Cardiologista",
      status: "Marcada",
      image: "https://i.pravatar.cc/100",
    },
    {
      id: "2",
      name: "Maria Souza",
      phone: "(15) 98888-8888",
      date: "11/05/2026",
      time: "09:30",
      doctor: "Dra. Ana",
      specialty: "Dermatologista",
      status: "Confirmada",
      image: "https://i.pravatar.cc/101",
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    const statusColor =
      item.status === "Confirmada"
        ? "#22C55E"
        : item.status === "Marcada"
        ? "#3B82F6"
        : "#EF4444";

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: item.image }} style={styles.avatar} />

          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.status, { color: statusColor }]}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text>📅 {item.date}</Text>
          <Text>⏰ {item.time}</Text>
        </View>

        <Text>
          👨‍⚕️ {item.doctor} - {item.specialty}
        </Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            navigation.navigate("CancelDetails", { exam: item })
          }
        >
          <Text style={styles.cancelText}>Cancelar Consulta</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false} 

        ListHeaderComponent={
          <>
            <TitleCard
              title="Cancelamentos"
              subtitle="Gerenciar cancelamentos"
              backgroundColor="#E7000B"
              onBack={() => navigation.goBack()}
            />

            <View style={styles.searchContainer}>
              <TextInput
                placeholder="🔍 Buscar consulta..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>
          </>
        }
      />
    </View>
  );
}