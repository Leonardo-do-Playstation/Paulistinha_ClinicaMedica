import { View, Text } from 'react-native';
import HeaderStyle from './HeaderStyles';

export default function Header() {
  return (
    <View style={HeaderStyle.header}>
      <Text style={{fontSize: 40}}>🏥</Text>
      <Text style={HeaderStyle.headerText}>Clínica Médica</Text>
      <Text style={{ color: '#fff', fontSize: 13, marginTop: 8 }}>Sistema de Atendimento</Text>
    </View>
  );
}