import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 24,
  },

  icon: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E293B",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 20,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  typeButton: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#2563EB",
  },

  buttonText: {
    color: "#475569",
    fontWeight: "600",
  },

  activeButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rememberText: {
    color: "#475569",
  },

  forgotText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  loginButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  backButton: {
    marginTop: 12,
    backgroundColor: "#E2E8F0",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  backButtonText: {
    color: "#334155",
    fontWeight: "600",
  },
});
