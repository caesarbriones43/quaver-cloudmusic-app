import React, { Fragment } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, Avatar } from "react-native-elements";

const ManageScreen = ({ navigation }) => {
  return (
    <Fragment>
      <View>
        <View style={{ paddingTop: 30 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:
                  "https://res.cloudinary.com/dslc2vjcz/image/upload/v1618681932/Users/avataaars_29_dvgbdh.png",
              }}
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
              Caesar Briones
            </Text>
            <Text style={{ color: "#696969" }}>s7r4u55@gmail.com</Text>
            <Text style={{ color: "#696969" }}>607bc4e6d2e950328c3d5210</Text>
          </View>
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
              <Button title="Artists" />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button title="Albums" />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button title="Tracks" />
            </View>
            <View
              style={{ paddingBottom: 15, paddingRight: 15, paddingLeft: 15 }}
            >
              <Button title="Genres" />
            </View>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default ManageScreen;
