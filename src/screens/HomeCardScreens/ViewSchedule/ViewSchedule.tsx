import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../Config/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { TitleCard } from "../../../components/TitleCard/TitleCard";
import { Consult } from "../../../data/types/consultTypes";

const STATUS_COLORS: Record<string, string> = {
  Marcada: "#22C55E",
  Confirmada: "#6366F1",
  Realizada: "#14B8A6",
  "Cancelada Pelo Paciente": "#F97316",
  "Cancelada Pelo Médico": "#EF4444",
};

export default function ViewSchedule() {
  const navigation: any = useNavigation();
  const [consults, setConsults] = useState<Consult[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "hoje" | "futuras">("hoje");

  useEffect(() => {
    const findDoctor = async () => {
      try {
        const email = auth.currentUser?.email ?? "";
        const q = query(
          collection(db, "doctors"),
          where("email", "==", email.toLowerCase().trim())
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const doc = snap.docs[0];
          setDoctorId(doc.id);
          setDoctorName(doc.data().name ?? "Médico");
        } else {
          Alert.alert("Erro", "Médico não encontrado no sistema.");
        }
      } catch (err: any) {
        Alert.alert("Erro", err?.message ?? "Erro ao identificar médico.");
      }
    };
    findDoctor();
  }, []);

  const parseDate = (str: string) => {
    const [d, m, y] = str.split("/");
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  useEffect(() => {
    if (!doctorId) return;
    const load = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "consults"),
          where("doctorId", "==", doctorId),
        );
        const snap = await getDocs(q);
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
        all.sort((a, b) => {
          const dateA = parseDate(a.date).getTime();
          const dateB = parseDate(b.date).getTime();
          if (dateA !== dateB) return dateA - dateB;
          return a.time.localeCompare(b.time);
        });
        setConsults(all);
      } catch (err: any) {
        Alert.alert("Erro", err?.message ?? "Erro ao carregar consultas.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [doctorId]);

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const filtered = consults.filter((c) => {
    if (filtro === "hoje") return c.date === today;
    if (filtro === "futuras") return parseDate(c.date) >= parseDate(today);
    return true;
  });

  const renderItem = ({ item }: { item: Consult }) => {
    const cor = STATUS_COLORS[item.status] ?? "#94A3B8";
    return (
      <View style={styles.card}>
        <View style={[styles.statusBar, { backgroundColor: cor }]} />
        <View style={styles.cardContent}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.info}>📅 {item.date} às {item.time}</Text>
          <Text style={styles.info}>📞 {item.patientPhone}</Text>
          <View style={[styles.badge, { backgroundColor: cor }]}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TitleCard
        title="Minha Agenda"
        subtitle={doctorName}
        backgroundColor="#14B8A6"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.filterRow}>
        {(["hoje", "futuras", "todas"] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filtro === f && styles.filterBtnActive]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.filterText, filtro === f && styles.filterTextActive]}>
              {f === "hoje" ? "Hoje" : f === "futuras" ? "Próximas" : "Todas"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#14B8A6" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id!}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {filtro === "hoje"
                ? "Nenhuma consulta para hoje."
                : "Nenhuma consulta encontrada."}
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },
  filterBtnActive: { backgroundColor: "#14B8A6" },
  filterText: { fontWeight: "600", color: "#475569", fontSize: 13 },
  filterTextActive: { color: "#FFF" },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
  },
  statusBar: { width: 5 },
  cardContent: { flex: 1, padding: 14, gap: 4 },
  patientName: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  info: { fontSize: 13, color: "#64748B" },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  badgeText: { color: "#FFF", fontSize: 11, fontWeight: "600" },
  empty: { textAlign: "center", color: "#94A3B8", marginTop: 40, fontSize: 15 },
});