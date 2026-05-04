import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home/Home';

export default function App() {
  return (
    <View>
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
