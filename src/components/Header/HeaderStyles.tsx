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
    backgroundColor: "#155DFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    zIndex: 10,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default styles;
