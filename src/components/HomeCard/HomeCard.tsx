import { View, Text } from 'react-native';
import React from 'react';
import styles from './HomeCardStyle';

type HomeCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  color?: string; 
};

export default function HomeCard({ icon, title, subtitle, color }: HomeCardProps) {
  return (
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
  );
}