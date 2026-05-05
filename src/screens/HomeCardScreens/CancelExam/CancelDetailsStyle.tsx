import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#EF4444",
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
  headerName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerInfo: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  reasonCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },

  reasonSelected: {
    borderColor: "#EF4444",
    backgroundColor: "#FEE2E2",
  },

  reasonTitle: {
    fontWeight: "bold",
  },

  reasonSubtitle: {
    color: "#6B7280",
  },

  obsTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },

  textArea: {
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    minHeight: 80,
  },

  alertCard: {
    backgroundColor: "#FEF9C3",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 10,
  },

  bold: {
    fontWeight: "bold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },

  backButton: {
    backgroundColor: "#D1D5DB",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },

  confirmButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  backText: {
    fontWeight: "bold",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },
});