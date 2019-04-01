import React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Button,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation"; // Version can be specified in package.json

export default class Dedicada extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: "",
      selecionado: "",
      pesquisar: false,
      pokemon: []
    };
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");

    this.pk = itemId;

    this.arrayholder = [];
    console.log("hmm", itemId);
  }

  componentWillMount() {
    console.log("q", this.pk);

    return fetch("https://pokeapi.co/api/v2/pokemon/" + this.pk)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            pokemon: responseJson,
            isLoading: false
          },
          function() {}
        );
        console.log("alou", this.state.pokemon);
        console.log("oi?", this.pk);
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else {
      const { pokemon } = this.state;

      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View>
            <Text />
            <Text>Nome: {pokemon.name}</Text>
            <Image
              style={styles.attr}
              source={{ uri: pokemon.sprites.front_default }}
            />
            <Text>Tipos </Text>
            <FlatList
              //  style={styles.attr}
              data={this.state.pokemon.types}
              renderItem={({ item }) => <Text>tipo: {item.type.name} </Text>}
              keyExtractor={({ id }, index) => id}
            />

            <Text>Evolução</Text>
            <Text />
            <Text>Ante Evolução</Text>
            <Button
              style={styles.attr}
              title="Pesquisar pokemon"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate("Pesquisa", {
                  itemId: 86,
                  otherParam: "anything you want here"
                });
              }}
            />
          </View>

          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  attr: {
    textAlign: "center",
    height: 160,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    padding: 15
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 27
  },

  rowViewContainer: {
    fontSize: 17,
    //  padding: 10,
    margin: 20
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#FFFFFF"
  }
});
