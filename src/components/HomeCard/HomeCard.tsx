import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './HomeCardStyle';

type HomeCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  color?: string;
  onPress?: () => void; 
};

export default function HomeCard({ icon, title, subtitle, color, onPress }: HomeCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}   style={{ width: "100%", alignItems: "center" }}>
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: color || "#3B82F6" }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}