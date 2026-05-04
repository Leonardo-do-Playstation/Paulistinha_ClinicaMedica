import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    width: 400,
    backgroundColor: "#155DFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;
