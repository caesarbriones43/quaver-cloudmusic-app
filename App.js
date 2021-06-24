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
import ManageArtistsScreen from "./src/components/pages/private/ManageArtistsScreen";
import ManageArtistScreen from "./src/components/pages/private/ManageArtistScreen";
import ManageAlbumsScreen from "./src/components/pages/private/ManageAlbumsScreen";
import ManageTracksScreen from "./src/components/pages/private/ManageTracksScreen";
import CreateGenreScreen from "./src/components/pages/private/CreateGenreScreen";
import CreateArtistScreen from "./src/components/pages/private/CreateArtistScreen";
import CreateAlbumScreen from "./src/components/pages/private/CreateAlbumScreen";
import ManageAlbumScreen from "./src/components/pages/private/ManageAlbumScreen";
import ManageTrackScreen from "./src/components/pages/private/ManageTrackScreen";
import CreateTrackScreen from "./src/components/pages/private/CreateTrackScreen";

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
          <Stack.Screen
            name="ManageArtistsScreen"
            component={ManageArtistsScreen}
          />
          <Stack.Screen
            name="ManageArtistScreen"
            component={ManageArtistScreen}
          />
          <Stack.Screen
            name="ManageAlbumsScreen"
            component={ManageAlbumsScreen}
          />
          <Stack.Screen
            name="ManageTracksScreen"
            component={ManageTracksScreen}
          />
          <Stack.Screen
            name="CreateGenreScreen"
            component={CreateGenreScreen}
          />
          <Stack.Screen
            name="CreateArtistScreen"
            component={CreateArtistScreen}
          />
          <Stack.Screen
            name="CreateAlbumScreen"
            component={CreateAlbumScreen}
          />
          <Stack.Screen
            name="ManageAlbumScreen"
            component={ManageAlbumScreen}
          />
          <Stack.Screen
            name="ManageTrackScreen"
            component={ManageTrackScreen}
          />
          <Stack.Screen
            name="CreateTrackScreen"
            component={CreateTrackScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
