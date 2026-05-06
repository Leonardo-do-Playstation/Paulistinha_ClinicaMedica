import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    marginRight: 10,
    borderRadius: 4,
  },

  checkboxSelected: {
    backgroundColor: "#F59E0B",
    borderColor: "#F59E0B",
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  textArea: {
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    minHeight: 100,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },

  cancelButton: {
    backgroundColor: "#D1D5DB",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },

  finishButton: {
    backgroundColor: "#F59E0B",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },

  cancelText: {
    fontWeight: "bold",
  },

  finishText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
