import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { registerSheet } from "react-native-actions-sheet";

import MainSheet from "./src/components/MainSheet";
import MainTabNavigator from "./src/navigation/MainTabNavigator";

registerSheet("example", MainSheet);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
