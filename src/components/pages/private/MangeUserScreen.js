import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Header,
  Icon,
  Avatar,
  Input,
  Button,
  Divider,
} from "react-native-elements";

const MangeUserScreen = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  console.log("Me llega", user);
  return (
    <ScrollView>
      <View>
        <Header
          leftComponent={
            <Icon name="arrow-back-outline" type="ionicon" color="#fff" />
          }
          centerComponent={{
            text: `Manage: ${user.name}`,
            style: { color: "#fff" },
          }}
        />
        <View
          style={{
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: user.avatar,
            }}
          />
          <Text style={{ fontSize: 18, padding: 10 }}>Role:</Text>
          <Text style={{ fontSize: 18, padding: 10 }}>Status:</Text>
        </View>
        <Divider />
        <View
          style={{
            alignItems: "flex-start",
            ustifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Name</Text>
          <Input
            style={{ color: "#808080" }}
            value={user.name}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
          />
          <Text style={{ fontSize: 20 }}>Username</Text>
          <Input
            style={{ color: "#808080" }}
            value={user.username}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
          />
          <Text style={{ fontSize: 20 }}>E-mail</Text>
          <Input
            style={{ color: "#808080" }}
            value={user.email}
            leftIcon={
              <Icon type="ionicon" name="mail" size={24} color="black" />
            }
          />
          <Text style={{ fontSize: 20 }}>Password</Text>
          <Input
            style={{ color: "#808080" }}
            value={user.password}
            leftIcon={
              <Icon type="ionicon" name="key" size={24} color="black" />
            }
          />
          <Text style={{ fontSize: 20 }}>Created on</Text>
          <Input
            disabled
            style={{ color: "#808080" }}
            value={user.created_at}
            leftIcon={
              <Icon type="ionicon" name="calendar" size={24} color="black" />
            }
          />
          <Text style={{ fontSize: 20 }}>Last Updated</Text>
          <Input
            disabled
            style={{ color: "#808080" }}
            value={user.updated_at}
            leftIcon={
              <Icon type="ionicon" name="calendar" size={24} color="black" />
            }
          />
          <View>
            <Button
              icon={
                <Icon type="ionicon" name="trash" size={24} color="white" />
              }
              title="Delete"
            />
            <Button
              icon={
                <Icon type="ionicon" name="create" size={24} color="white" />
              }
              title="Edit"
            />
            <Button
              icon={
                <Icon type="ionicon" name="trash-bin" size={24} color="white" />
              }
              title="Soft Delete"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MangeUserScreen;
