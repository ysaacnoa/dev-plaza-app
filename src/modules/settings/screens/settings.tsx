import { StyleSheet, Text, View } from "react-native";
import { theme } from "react-native-hooks";


export function SettingsScreen () {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings Screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: theme.typography.title.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
});