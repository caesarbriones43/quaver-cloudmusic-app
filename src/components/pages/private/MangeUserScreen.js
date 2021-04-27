import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Header,
  Icon,
  Avatar,
  Input,
  Button,
  Divider,
  Overlay,
} from "react-native-elements";

import axios from "axios";
import { quaverApi } from "../../../api/quaverApi";

const MangeUserScreen = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  const [state, setState] = useState(user);

  const {
    _id,
    name,
    username,
    active,
    admin,
    avatar,
    created_at,
    email,
    password,
    updated_at,
  } = state;

  console.log("Mi estado: ", state);

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlayDelete = () => {
    setVisible(!visible);
  };

  const updateUserById = async (_id, state) => {
    await axios({
      method: "put",
      url: `http://192.168.1.80:5000/api/v1/users/${_id}`,
      data: { ...state },
      config: { headers: { "Content-Type": "application/json" } },
    })
      .then((response) => {
        console.log(response.data.data);
        setState(response.data.data);
      })
      .catch((error) => {
        console.log("Error Login", error);
      });
  };

  const deleteUserById = async (_id) => {
    const resp = await quaverApi.delete(`/users/${_id}`);
    setState(resp.data.data);
    console.log(`Deleting user whit id:${_id}`);
  };

  return (
    <ScrollView>
      {/* //Update Overlay */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Are you sure you want to update this user?</Text>
        <View>
          <Button
            onPress={() => updateUserById(_id, state) && toggleOverlay()}
            title="Confirm"
            buttonStyle={{
              backgroundColor: "red",
            }}
          />
          <Button
            title="Cancel"
            buttonStyle={{
              backgroundColor: "green",
            }}
            onPress={() => {
              toggleOverlay();
            }}
          />
        </View>
      </Overlay>
      {/* //Update Overlay */}
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

          {user.admin === true ? (
            <Text style={{ fontSize: 18 }}>Role: Admin</Text>
          ) : (
            <Text style={{ fontSize: 18 }}>Role: User</Text>
          )}
          {user.active === true ? (
            <Text style={{ fontSize: 18 }}>Status: Active</Text>
          ) : (
            <Text style={{ fontSize: 18 }}>Status: Inactive</Text>
          )}
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
            value={name}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="name"
            onChangeText={(name) => setState({ ...state, name: name })}
          />
          <Text style={{ fontSize: 20 }}>Username</Text>
          <Input
            style={{ color: "#808080" }}
            value={username}
            leftIcon={
              <Icon type="ionicon" name="person" size={24} color="black" />
            }
            label="username"
            onChangeText={(username) =>
              setState({ ...state, username: username })
            }
          />
          <Text style={{ fontSize: 20 }}>E-mail</Text>
          <Input
            style={{ color: "#808080" }}
            value={email}
            leftIcon={
              <Icon type="ionicon" name="mail" size={24} color="black" />
            }
            label="email"
            onChangeText={(email) => setState({ ...state, email: email })}
          />
          <Text style={{ fontSize: 20 }}>Password</Text>
          <Input
            style={{ color: "#808080" }}
            value={password}
            leftIcon={
              <Icon type="ionicon" name="key" size={24} color="black" />
            }
            label="password"
            onChangeText={(password) =>
              setState({ ...state, password: password })
            }
          />
          <Text style={{ fontSize: 20 }}>Created on</Text>
          <Input
            disabled
            style={{ color: "#808080" }}
            value={created_at}
            leftIcon={
              <Icon type="ionicon" name="calendar" size={24} color="black" />
            }
            label="created_at"
            onChangeText={(created_at) =>
              setState({ ...state, created_at: created_at })
            }
          />
          <Text style={{ fontSize: 20 }}>Last Updated</Text>
          <Input
            disabled
            style={{ color: "#808080" }}
            value={updated_at}
            leftIcon={
              <Icon type="ionicon" name="calendar" size={24} color="black" />
            }
            label="created_at"
            onChangeText={(updated_at) =>
              setState({ ...state, updated_at: updated_at })
            }
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Button
              onPress={() => toggleOverlayDelete()}
              title="Delete User"
              buttonStyle={{
                backgroundColor: "red",
              }}
              icon={<Icon name="trash-outline" type="ionicon" color="#fff" />}
            />
            <View style={{ width: 10, height: 10 }}></View>
            <Button
              icon={
                <Icon type="ionicon" name="create" size={24} color="white" />
              }
              title="Submit"
              onPress={() => {
                toggleOverlay();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MangeUserScreen;
