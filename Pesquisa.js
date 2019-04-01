import React, { Component } from 'react';

import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert, Image,FlatList, Button } from 'react-native';


export default class Pesquisa extends Component {
 
  constructor(props) {

    super(props);

    this.state = {

      isLoading: true,
      text: '',
      selecionado:'',
      pesquisar:false,
      pokemon:[]
    
    }

    this.arrayholder = [] ;
  }
 
  componentDidMount() {
    
 
    return fetch('https://pokeapi.co/api/v2/pokedex/2')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.pokemon_entries),
        }, function() {

          // In this block you can do something with new state.
          this.arrayholder = responseJson.pokemon_entries ;

        });
      })
      .catch((error) => {
        console.error(error);
      });
      
      
  }

  componentWillMount() {
  
    return fetch('https://pokeapi.co/api/v2/pokemon/' + this.state.selecionado )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          
          pokemon: responseJson,
        }, function(){
        });
        
        
        
      })
      
      .catch((error) =>{
        console.error(error);
      });
      
      
  }

  submeter = () => {
     this.setState({
          selecionado: '',
        });
  }

  GetListViewItem (pokemon_species) {
    
   Alert.alert(pokemon_species.name);
   let selecao = pokemon_species.name;
    this.setState({
      selecionado: pokemon_species.name,
      pokemon: pokemon_species
    })
    console.log("seleção",this.state.selecionado);
    console.log("atual",pokemon_species);

  }

  listaItems = () => {
    if (this.state.selecionado) {
      return (
        <View>
          <Button onPress = {() => this.submeter()} style={styles.attr} title={'Pesquisar'}/>
          <Text style={styles.attr}>{this.state.pokemon.name}</Text>
          <Image style={styles.attr} source={{uri:this.state.pokemon.sprites.front_default}}/>
          
            
            
          <FlatList
            style={styles.attr}
            data={this.state.pokemon.types}
            renderItem={({item}) => 
            <Text> {item.type.name} </Text>
            }
              keyExtractor={({id}, index) => id}
          />



          <Text style={styles.attr}>{this.state.pokemon.name}</Text>
          <Text style={styles.attr}>{this.state.pokemon.name}</Text>
        </View>
      );
    } else {

    

    return(
        <ListView
 
          dataSource={this.state.dataSource}
 
          renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => 
          
          <Text style={styles.rowViewContainer} 

          // onPress={this.GetListViewItem.bind(this, rowData.pokemon_species)}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Dedicada', {
              itemId: rowData.entry_number,
              otherParam: 'anything you want here',
            });
          }}
           >#{rowData.entry_number} {rowData.pokemon_species.name} </Text>}

          enableEmptySections={true}

          style={{marginTop: 10}}
 
        />
    );
    }
  }

  
   SearchFilterFunction(text){
     
     const newData = this.arrayholder.filter(function(item){
         const itemData = item.pokemon_species.name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 }
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 
 
  render() {
    
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return(
      
      <View style={styles.MainContainer}>

      <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Pesquisar"
        />
      
      {this.listaItems()}
 
      </View>
      );
    }
    

 
  }
}
 
const styles = StyleSheet.create({
 attr:{
   textAlign: 'center',
   height: 60,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF",
   marginTop:40,
   padding:15
 },
 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 27,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },

  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});