import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManagerPatients from "./src/screens/HomeCardScreens/ManagerPatients/ManagerPatients";
import CancelExam from "./src/screens/HomeCardScreens/CancelExam/CancelExam";
import FinishExam from "./src/screens/HomeCardScreens/FinishExam/FinishExam";
import MarkExam from "./src/screens/HomeCardScreens/MarkExam/MarkExam";
import RealizeExam from "./src/screens/HomeCardScreens/RealizeExam/RealizeExam";
import CreatePatient from "./src/screens/HomeCardScreens/ManagerPatients/CreatePatients/CreatePatient";

import Home from "./src/screens/Home/Home";
import ConfirmExam from "./src/screens/HomeCardScreens/ConfirmExam/ConfirmExam";
import CancelDetails from "./src/screens/HomeCardScreens/CancelExam/CancelDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //Routes

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        
        <Stack.Screen name="ManagerPatients" component={ManagerPatients} />
        <Stack.Screen name="MarkExam" component={MarkExam} />
        <Stack.Screen name="ConfirmExam" component={ConfirmExam} />
        <Stack.Screen name="RealizeExam" component={RealizeExam} />
        <Stack.Screen name="FinishExam" component={FinishExam} />
        <Stack.Screen name="CancelExam" component={CancelExam} />
        <Stack.Screen name="CancelDetails" component={CancelDetails} />
        <Stack.Screen name="CreatePatient" component={CreatePatient} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
