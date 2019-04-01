import React from 'react';
import {StyleSheet, Image, FlatList,Button, View, Text, ActivityIndicator } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

export default class Dashboard extends React.Component {
    render() {

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        
            <Button
                style={styles.attr}
                title="Pesquisar pokemon"
                onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Pesquisa', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                });
                }}
            />
        
            <Text style={styles.botSep}></Text>

            <Button
                style={styles.attr}
                title="Adicionar pokemon"
                // onPress={() => {
                // /* 1. Navigate to the Details route with params */
                // this.props.navigation.navigate('Home', {
                //     itemId: 86,
                //     otherParam: 'anything you want here',
                // });
                // }}
            />
          
          
        </View>
      );
    
  }
}

 
const styles = StyleSheet.create({
 attr:{
   justifyContent: 'center',
   textAlign: 'center',
   height: 160,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF",
   marginTop:40,
   padding:15,
   flex:1
 },
 botSep:{
    margin: 20,
 },
 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 27,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
  //  padding: 10,
   margin: 20
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