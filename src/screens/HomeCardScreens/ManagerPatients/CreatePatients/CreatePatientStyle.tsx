import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "500",
  },

  inputStyle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 14,
  },

  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 14,
    height: 100,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cityContainer: {
    width: "68%",
  },

  ufContainer: {
    width: "28%",
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  cancelButton: {
    backgroundColor: "#E2E8F0",
    width: "48%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  saveButton: {
    backgroundColor: "#155DFC",
    width: "48%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    color: "#475569",
    fontWeight: "bold",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});