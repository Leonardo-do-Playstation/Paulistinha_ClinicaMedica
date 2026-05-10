import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  stepsCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },

  stepItem: {
    alignItems: "center",
  },

  stepCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  stepActive: {
    backgroundColor: "#22C55E",
  },

  stepInactive: {
    backgroundColor: "#D1D5DB",
  },

  stepNumber: {
    color: "#fff",
    fontWeight: "bold",
  },

  stepText: {
    color: "#6B7280",
    fontSize: 12,
  },

  stepTextActive: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  list: {
    padding: 15,
    paddingBottom: 30,
  },

  patientCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },

  patientName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  newPatientCard: {
    backgroundColor: "#DCFCE7",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#22C55E",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  newPatientText: {
    color: "#15803D",
    fontWeight: "bold",
  },

  specialtyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  specialtyText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  doctorCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  doctorName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  doctorSpecialty: {
    color: "#6B7280",
  },

  backButton: {
    backgroundColor: "#D1D5DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  backText: {
    fontWeight: "bold",
  },

  legendCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },

  legendTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dayCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    margin: 5,

    backgroundColor: "#fff",

    borderWidth: 1.5,
    borderColor: "#D1D5DB",

    elevation: 2,
  },

  greenCard: {
    backgroundColor: "#BBF7D0",
  },

  blueCard: {
    backgroundColor: "#BFDBFE",
  },

  yellowCard: {
    backgroundColor: "#FEF08A",
  },

  redCard: {
    backgroundColor: "#FECACA",
  },

  dayText: {
    fontWeight: "bold",
  },

  dayTime: {
    marginTop: 5,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },

  backButtonBottom: {
    backgroundColor: "#D1D5DB",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  confirmButton: {
    backgroundColor: "#22C55E",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "bold",
  },

  scheduleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  scheduleBadge: {
    minWidth: 75,
    height: 45,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,

    justifyContent: "center",
    alignItems: "center",
  },

  scheduleText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});