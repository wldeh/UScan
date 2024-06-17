import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { registerSheet } from "react-native-actions-sheet";

import ExampleSheet from "./src/components/examplesheet";
import MainTabNavigator from "./src/navigation/MainTabNavigator";

registerSheet("example", ExampleSheet);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
