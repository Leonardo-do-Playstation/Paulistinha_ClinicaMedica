import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,

    elevation: 3,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  icon: {
    fontSize: 25,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 3,
  },

  arrow: {
    fontSize: 25,
    color: "#999",
  },
});

export default styles;