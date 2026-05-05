import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  searchContainer: {
    padding: 15,
  },

  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
  },

  cardHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },

  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  status: {
    fontWeight: "bold",
  },

  phone: {
    color: "#6B7280",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  cancelButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },
});