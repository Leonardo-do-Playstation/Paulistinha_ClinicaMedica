import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 25,
  },

  line: {
    width: 3,
    backgroundColor: "#14B8A6",
    borderRadius: 10,
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  date: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 3,
  },

  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },

  doctor: {
    color: "#334155",
    marginTop: 2,
  },

  description: {
    color: "#64748B",
    marginTop: 2,
  },
});
