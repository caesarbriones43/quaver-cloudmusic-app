import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Pages
//private
//public
import HomeTabScreen from "./src/components/pages/public/HomeTabScreen";
import LoginScreen from "./src/components/pages/public/LoginScreen";
import RegisterScreen from "./src/components/pages/public/RegisterScreen";
import HomeTabScreenAdmin from "./src/components/pages/private/HomeTabScreenAdmin";
import ManageUsersScreen from "./src/components/pages/private/ManageUsersScreen";
import MangeUserScreen from "./src/components/pages/private/MangeUserScreen";
import ManageGenresScreen from "./src/components/pages/private/ManageGenresScreen";
import ManageGenreScreen from "./src/components/pages/private/ManageGenreScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="HomeTabScreen" component={HomeTabScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="HomeTabScreenAdmin"
            component={HomeTabScreenAdmin}
          />
          <Stack.Screen
            name="ManageUsersScreen"
            component={ManageUsersScreen}
          />
          <Stack.Screen name="MangeUserScreen" component={MangeUserScreen} />
          <Stack.Screen
            name="ManageGenresScreen"
            component={ManageGenresScreen}
          />
          <Stack.Screen
            name="ManageGenreScreen"
            component={ManageGenreScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
