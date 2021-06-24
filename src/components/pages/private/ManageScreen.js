import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, Avatar, Header } from "react-native-elements";
import { quaverApi } from "../../../api/quaverApi";

const ManageScreen = ({ navigation, route }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    quaverApi
      .get(`/users?email=${route.params.email}`)
      .then((resp) => {
        setUser(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log("ASDASDASD", user.avatar);

  return (
    <Fragment>
      <View>
        <Header
          centerComponent={{
            text: "Create Genre",
            style: { color: "#fff" },
          }}
          containerStyle={{
            backgroundColor: "#181818",
            justifyContent: "space-around",
          }}
        />
        <View style={{ paddingTop: 30 }}>
          {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_29_dvgbdh.png",
              }}
            />
          </View> */}
          {/* <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
              Caesar Briones
            </Text>
            <Text style={{ color: "#696969" }}>s7r4u55@gmail.com</Text>
            <Text style={{ color: "#696969" }}>607bc4e6d2e950328c3d5210</Text>
          </View> */}
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Manage
          </Text>
        </View>
        <ScrollView style={{ flexGrow: 1, padding: 10 }}>
          <View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button
                title="Users"
                onPress={() => {
                  navigation.navigate("ManageUsersScreen");
                }}
              />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button
                title="Artists"
                onPress={() => {
                  navigation.navigate("ManageArtistsScreen");
                }}
              />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button
                title="Genres"
                onPress={() => {
                  navigation.navigate("ManageGenresScreen");
                }}
              />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button
                title="Tracks"
                onPress={() => {
                  navigation.navigate("ManageTracksScreen");
                }}
              />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button
                title="Albums"
                onPress={() => {
                  navigation.navigate("ManageAlbumsScreen");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default ManageScreen;
