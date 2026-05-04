import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./TitleCardStyles";

type Props = {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  onBack?: () => void;
};

export function TitleCard({ title, subtitle, backgroundColor, onBack }: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.topRow}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}
