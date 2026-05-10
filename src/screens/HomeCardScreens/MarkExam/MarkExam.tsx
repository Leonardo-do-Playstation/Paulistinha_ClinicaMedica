import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { styles } from "./MarkExamStyle";
import { PatientCard } from "../../../components/PatientCard/PatientCard";
import { patients } from "../../../data/patients";

export default function MarkExam() {
  const navigation: any = useNavigation();

  const [step, setStep] = useState(1);

  const specialties = [
    "Cardiologia",
    "Dermatologia",
    "Ortopedia",
    "Pediatria",
    "Neurologia",
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Pedro Alves",
      specialty: "Cardiologia",
      image: "https://i.pravatar.cc/100?u=10",
    },
    {
      id: 2,
      name: "Dra. Ana Souza",
      specialty: "Dermatologia",
      image: "https://i.pravatar.cc/100?u=11",
    },
  ];

  const legends = [
    { label: "Livre", style: styles.greenCard },
    { label: "Não Atende", style: styles.blackCard },
    { label: "Marcado", style: styles.blueCard },
    {
      label: "Cancelado Pelo Paciente",
      style: styles.orangeCard,
    },
    {
      label: "Cancelado Pelo Médico",
      style: styles.redCard,
    },
  ];

  const days = Array.from({ length: 60 }, (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() + index);

    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return {
      id: index + 1,
      fullDate: formattedDate,

      schedules: Array.from({ length: 10 }, (_, hourIndex) => {
        const hour = 8 + hourIndex;

        const statuses = [
          "Livre",
          "Não Atende",
          "Marcado",
          "Cancelado Pelo Paciente",
          "Cancelado Pelo Médico",
        ];

        return {
          time: `${hour}:00`,
          status: statuses[(hour + index) % 4],
        };
      }),
    };
  });

  const renderSteps = () => {
    const steps = ["Paciente", "Especialidade", "Médico", "Agenda"];

    return (
      <View style={styles.stepsCard}>
        {steps.map((item, index) => (
          <View key={index} style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                step === index + 1 ? styles.stepActive : styles.stepInactive,
              ]}
            >
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>

            <Text
              style={[
                styles.stepText,
                step === index + 1 && styles.stepTextActive,
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TitleCard
        title="Marcar Consulta"
        subtitle={`Passo ${step} de 4`}
        backgroundColor="#22C55E"
        onBack={() => navigation.goBack()}
      />

      {renderSteps()}

      {/* ETAPA 1 */}
      {step === 1 && (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <PatientCard
              name={item.name}
              phone={item.phone}
              cpf={item.cpf}
              onPress={() => setStep(2)}
            />
          )}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.newPatientCard}
              onPress={() => navigation.navigate("CreatePatient")}
            >
              <Text style={styles.newPatientText}>
                + Cadastrar Novo Cliente
              </Text>
            </TouchableOpacity>
          }
        />
      )}

      {/* ETAPA 2 */}
      {step === 2 && (
        <ScrollView contentContainerStyle={styles.list}>
          {specialties.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.specialtyCard}
              onPress={() => setStep(3)}
            >
              <Text style={styles.specialtyText}>{item}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(1)}
          >
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ETAPA 3 */}
      {step === 3 && (
        <ScrollView contentContainerStyle={styles.list}>
          {doctors.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.doctorCard}
              onPress={() => setStep(4)}
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />

              <View>
                <Text style={styles.doctorName}>{item.name}</Text>

                <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(2)}
          >
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ETAPA 4 */}
      {step === 4 && (
        <View style={{ flex: 1 }}>
          <View style={styles.legendCard}>
            <Text style={styles.legendTitle}>📅 Agenda de 2 meses</Text>

            <View style={styles.legendRow}>
              {legends.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, item.style]} />

                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <FlatList
            data={days}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.dayCard}>
                <Text style={styles.dayText}>{item.fullDate}</Text>

                <View style={styles.scheduleContainer}>
                  {item.schedules.map((schedule: any, index: number) => (
                    <View
                      key={index}
                      style={[
                        styles.scheduleBadge,

                        schedule.status === "Livre" && styles.greenCard,

                        schedule.status === "Não Atende" && styles.blackCard,

                        schedule.status === "Marcado" && styles.blueCard,

                        schedule.status === "Cancelado Pelo Paciente" &&
                          styles.orangeCard,

                        schedule.status === "Cancelado Pelo Médico" &&
                          styles.redCard,
                      ]}
                    >
                      <Text
                        style={[
                          styles.scheduleText,

                          schedule.status === "Não Atende" && {
                            color: "#FFF",
                          },
                        ]}
                      >
                        {schedule.time}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.backButtonBottom}
              onPress={() => setStep(3)}
            >
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                console.log("Consulta agendada");
                navigation.goBack();
              }}
            >
              <Text style={styles.confirmText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
