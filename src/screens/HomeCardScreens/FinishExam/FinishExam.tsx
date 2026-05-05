import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FinishExamStyle";

export default function FinishExam() {
  const navigation: any = useNavigation();

  const consultas = [
    {
      id: 1,
      name: "Maria Silva",
      time: "09:00",
      doctor: "Dr. Pedro Alves",
      specialty: "Cardiologia",
    },
    {
      id: 2,
      name: "João Pereira",
      time: "10:30",
      doctor: "Dra. Ana Souza",
      specialty: "Dermatologia",
    },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("FinishDetails", { exam: item })
      }
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info}>⏰ {item.time}</Text>
          <Text style={styles.info}>
            👨‍⚕️ {item.doctor} - {item.specialty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TitleCard
        title="Encerramento"
        subtitle="Consultas realizadas"
        backgroundColor="#F59E0B"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          💳 {consultas.length} consultas realizadas
        </Text>
        <Text style={styles.summaryText}>
          📌 {consultas.length} aguardando encerramento
        </Text>
      </View>

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}