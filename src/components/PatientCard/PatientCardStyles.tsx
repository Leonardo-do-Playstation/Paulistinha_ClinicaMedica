import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#cbd5e1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editBtn: {
    backgroundColor: "#cbd5e1",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  scheduleBtn: {
    backgroundColor: "#d1fae5",
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  editText: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  scheduleText: {
    color: "#15803d",
    fontWeight: "bold",
  },
});
