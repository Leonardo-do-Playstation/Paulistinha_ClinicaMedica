import React from "react";
import { View, ScrollView, Text } from "react-native";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomeCard from "../../components/HomeCard/HomeCard";

export default function Home() {
  return (
    <View style={{ flex: 1 }}>

      <Header />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 200,
          paddingBottom: 60,
          flexGrow: 1,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <HomeCard></HomeCard>
        </View>
      </ScrollView>

      <Footer />

    </View>
  );
}