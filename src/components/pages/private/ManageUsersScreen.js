import React, { useState, useEffect, Fragment } from "react";
import { View } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  SearchBar,
  Header,
} from "react-native-elements";
import { ScrollView } from "react-native";

import { quaverApi } from "../../../api/quaverApi";

const ManageUsersScreen = ({ navigation: { goBack } }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    quaverApi
      .get("/users")
      .then((resp) => {
        setUsers(resp.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(users);

  return (
    <Fragment>
      <ScrollView style={{ flexGrow: 1 }}>
        <View>
          <Header
            leftComponent={
              <Icon
                name="arrow-back-outline"
                type="ionicon"
                color="#fff"
                onPress={() => goBack()}
              />
            }
            centerComponent={{ text: "Manage Users", style: { color: "#fff" } }}
          />

          <View style={{ flex: 1 }}>
            {users.map((user) => (
              <ListItem key={user._id} bottomDivider>
                <Avatar source={{ uri: user.avatar }} />
                <ListItem.Content>
                  <ListItem.Title>{user.name}</ListItem.Title>
                  <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="chevron-forward-outline" type="ionicon" />
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};

export default ManageUsersScreen;
