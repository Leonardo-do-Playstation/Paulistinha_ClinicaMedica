import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#FEF9C3",
    borderColor: "#FACC15",
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  summaryTxt: { fontWeight: "bold", color: "#78350F" },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    alignItems: "center",
    elevation: 2,
  },
  left: { marginRight: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTxt: { fontSize: 20, fontWeight: "bold", color: "#F59E0B" },
  body: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  info: { fontSize: 13, color: "#64748B" },
  arrow: { fontSize: 24, color: "#CBD5E1" },
});
