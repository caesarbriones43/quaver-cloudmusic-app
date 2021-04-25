import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Pages
//private
//public
import HomeTabScreen from "./src/components/pages/public/HomeTabScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
