import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { styles } from "./MarkExamStyle";
import { PatientCard } from "../../../components/PatientCard/PatientCard";
import { getPatients } from "../../../Services/PatientService/patientService";
import {
  getDoctors,
  getSpecialties,
  getAvailableHours,
} from "../../../Services/DoctorService/doctorService";
import {
  getConsultsByDoctorAndDate,
  createConsult,
} from "../../../Services/ConsultService/consultService";
import { Patient } from "../../../data/types/patientTypes";
import { Doctor } from "../../../data/types/doctorTypes";

export default function MarkExam() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const preSelectedPatient: Patient | undefined =
    route.params?.preSelectedPatient;

  const [step, setStep] = useState(preSelectedPatient ? 2 : 1);

  const [loadingScreen, setLoadingScreen] = useState(false);
  const [loadingHours, setLoadingHours] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    preSelectedPatient ?? null,
  );
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  const scrollRef = useRef<ScrollView>(null);
  const rowHeights = useRef<number[]>([]);

  const days = Array.from({ length: 60 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  });

  const legends = [
    { label: "Livre", style: styles.greenCard },
    { label: "Não Atende", style: styles.blackCard },
    { label: "Marcado", style: styles.blueCard },
    { label: "Cancelado Pelo Paciente", style: styles.orangeCard },
    { label: "Cancelado Pelo Médico", style: styles.redCard },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingScreen(true);
        setLoadError(null);
        const [patientsData, specialtiesData] = await Promise.all([
          getPatients(),
          getSpecialties(),
        ]);
        setPatients(patientsData);
        setSpecialties(specialtiesData);
      } catch (err: any) {
        setLoadError(err?.message ?? "Erro desconhecido");
        Alert.alert(
          "Erro",
          `Não foi possível carregar os dados.\n\n${err?.message ?? err}`,
        );
      } finally {
        setLoadingScreen(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedSpecialty) return;
    const load = async () => {
      try {
        setLoadingScreen(true);
        const all = await getDoctors();
        setFilteredDoctors(
          all.filter(
            (d) =>
              d.specialty.trim().toLowerCase() ===
              selectedSpecialty.trim().toLowerCase(),
          ),
        );
      } catch (err: any) {
        Alert.alert(
          "Erro",
          `Não foi possível carregar os médicos.\n\n${err?.message ?? err}`,
        );
      } finally {
        setLoadingScreen(false);
      }
    };
    load();
  }, [selectedSpecialty]);

  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;
    const load = async () => {
      try {
        setLoadingHours(true);
        const takenConsults = await getConsultsByDoctorAndDate(
          selectedDoctor.id!,
          selectedDate,
        );
        const takenHours = takenConsults.map((c) => c.time);
        setAvailableHours(getAvailableHours(selectedDoctor, takenHours));
      } catch {
        Alert.alert("Erro", "Não foi possível carregar os horários.");
      } finally {
        setLoadingHours(false);
      }
    };
    load();
  }, [selectedDoctor, selectedDate]);

  const handleConfirm = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedTime) {
      Alert.alert("Atenção", "Selecione paciente, médico, data e horário.");
      return;
    }
    try {
      setLoadingScreen(true);
      await createConsult({
        patientId: selectedPatient.id!,
        patientName: selectedPatient.name,
        patientPhone: selectedPatient.phone,
        doctorId: selectedDoctor.id!,
        doctorName: selectedDoctor.name,
        doctorSpecialty: selectedDoctor.specialty,
        date: selectedDate,
        time: selectedTime,
      });
      Alert.alert("Sucesso", "Consulta agendada com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível agendar a consulta.");
    } finally {
      setLoadingScreen(false);
    }
  };

  const handleSelectDate = (date: string, rowIndex: number) => {
    setSelectedTime("");
    setSelectedDate(date);

    setTimeout(() => {
      const y = rowHeights.current
        .slice(0, rowIndex)
        .reduce((acc, h) => acc + h, 0);
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 10), animated: true });
    }, 80);
  };

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
        subtitle={
          selectedPatient
            ? `Paciente: ${selectedPatient.name}`
            : `Passo ${step} de 4`
        }
        backgroundColor="#22C55E"
        onBack={() => navigation.goBack()}
      />
      {renderSteps()}
      {loadingScreen && (
        <ActivityIndicator
          size="large"
          color="#22C55E"
          style={{ marginTop: 20 }}
        />
      )}

      {!loadingScreen && step === 1 && (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", color: "#888" }}>
              Nenhum paciente cadastrado.
            </Text>
          }
          renderItem={({ item }) => (
            <PatientCard
              name={item.name}
              phone={item.phone}
              cpf={item.cpf}
              onPress={() => {
                setSelectedPatient(item);
                setStep(2);
              }}
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

      {!loadingScreen && step === 2 && (
        <ScrollView contentContainerStyle={styles.list}>
          {loadError ? (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 10 }}
            >
              ⚠️ Erro: {loadError}
            </Text>
          ) : specialties.length === 0 ? (
            <Text
              style={{ color: "#888", textAlign: "center", marginBottom: 10 }}
            >
              Nenhuma especialidade encontrada.{"\n"}Verifique a coleção
              "doctors" no Firestore.
            </Text>
          ) : null}
          {specialties.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.specialtyCard}
              onPress={() => {
                setSelectedSpecialty(item);
                setStep(3);
              }}
            >
              <Text style={styles.specialtyText}>{item}</Text>
            </TouchableOpacity>
          ))}
          {!preSelectedPatient && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setStep(1)}
            >
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      {!loadingScreen && step === 3 && (
        <ScrollView contentContainerStyle={styles.list}>
          {filteredDoctors.length === 0 && (
            <Text
              style={{ color: "#888", textAlign: "center", marginBottom: 10 }}
            >
              Nenhum médico encontrado para "{selectedSpecialty}".
            </Text>
          )}
          {filteredDoctors.map((item, index) => (
            <TouchableOpacity
              key={item.id ?? `doctor-${index}`}
              style={styles.doctorCard}
              onPress={() => {
                setSelectedDoctor(item);
                setStep(4);
              }}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.avatar} />
              ) : null}
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

      {step === 4 && (
        <View style={{ flex: 1, display: loadingScreen ? "none" : "flex" }}>
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

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={[styles.list, { paddingBottom: 20 }]}
            showsVerticalScrollIndicator={false}
          >
            {Array.from(
              { length: Math.ceil(days.length / 2) },
              (_, rowIndex) => {
                const left = days[rowIndex * 2];
                const right = days[rowIndex * 2 + 1];
                return (
                  <View
                    key={rowIndex}
                    style={{ flexDirection: "row" }}
                    onLayout={(e) => {
                      rowHeights.current[rowIndex] =
                        e.nativeEvent.layout.height;
                    }}
                  >
                    {[left, right].map((date) =>
                      date ? (
                        <TouchableOpacity
                          key={date}
                          style={[
                            styles.dayCard,
                            selectedDate === date && {
                              borderColor: "#22C55E",
                              borderWidth: 2,
                            },
                          ]}
                          onPress={() => handleSelectDate(date, rowIndex)}
                        >
                          <Text style={styles.dayText}>{date}</Text>
                          {selectedDate === date && (
                            <View style={styles.scheduleContainer}>
                              {loadingHours ? (
                                <ActivityIndicator
                                  size="small"
                                  color="#22C55E"
                                />
                              ) : availableHours.length === 0 ? (
                                <Text style={{ fontSize: 11, color: "#888" }}>
                                  Sem horários
                                </Text>
                              ) : (
                                availableHours.map((hour) => (
                                  <TouchableOpacity
                                    key={hour}
                                    style={[
                                      styles.scheduleBadge,
                                      selectedTime === hour
                                        ? styles.blueCard
                                        : styles.greenCard,
                                    ]}
                                    onPress={() => setSelectedTime(hour)}
                                  >
                                    <Text style={styles.scheduleText}>
                                      {hour}
                                    </Text>
                                  </TouchableOpacity>
                                ))
                              )}
                            </View>
                          )}
                        </TouchableOpacity>
                      ) : (
                        <View
                          key="empty"
                          style={[styles.dayCard, { opacity: 0 }]}
                        />
                      ),
                    )}
                  </View>
                );
              },
            )}
          </ScrollView>

          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.backButtonBottom}
              onPress={() => setStep(3)}
            >
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                (!selectedDate || !selectedTime) && { opacity: 0.5 },
              ]}
              onPress={handleConfirm}
              disabled={!selectedDate || !selectedTime || loadingScreen}
            >
              <Text style={styles.confirmText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
