import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  summaryCard: {
    backgroundColor: "#FEF9C3",
    borderColor: "#FACC15",
    borderWidth: 1,
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  summaryText: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  list: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  info: {
    color: "#6B7280",
  },
});