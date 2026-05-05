import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#6366F1",
    fontSize: 20,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  phone: {
    fontSize: 14,
    color: "#64748B",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoBox: {
    flex: 0.48,
    backgroundColor: "#f8fafce0",
    padding: 10,
    borderRadius: 10,
  },
  fullInfoBox: {
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#94A3B8",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  confirmBtn: {
    backgroundColor: "#00A843",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  callText: {
    color: "#475569",
    fontWeight: "600",
  },
  absentBtn: {
    flex: 1,
    backgroundColor: "#FEE2E2",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  absentText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
