import React, { Component } from 'react';
import { Button, 
          Image, 
          View, 
          StyleSheet, 
          Text, 
          TouchableOpacity, 
          TouchableHighlight, 
          TextInput, 
          Alert, 
          ScrollView, 
          Modal } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker, 
         Permissions, 
         Camera } from 'expo';
import { Buffer } from 'buffer';
import Collapsible from 'react-native-collapsible';
import ImageCarousel from 'react-native-image-carousel';

// PICK UP HERE
//TODO: change infrastructure of this file to make state hold multple values of what a concet is 

export default class GiveFeedback extends React.Component {
  state = {
    author: null,
    group_id: null,
    concepts: [],
    modalVisible: false,
    thisConceptID: null,
  };




  async componentDidMount() {
    const {navigation} = this.props;
    const screenName = navigation.getParam('name', 'NO NAME');
    console.log(screenName);
    const groupID = navigation.getParam('groupID', '5cc211a9a158040015716bac');
    console.log(groupID);
    this.setState({author: screenName, group_id: groupID});
    const res = await fetch('http://104.40.20.156/api/getConceptsByGroup?groupID=' + groupID, {method: 'GET'});  // to test locally, change to your machines IP address and append :3000
    const resJson = await res.json();
    concepts = resJson.data
    for (i = 0; i < resJson.data.length; i++) {
        concepts[i].isCollapsed = true;
    }
    // for (i = 0; i < resJson.data.length; i++) {
    //     concepts[i].showModal = false;
    // }
    this.setState({concepts: concepts});

  }





  render() {
    var conceptViews = [];
    console.log("here");
    console.log("MODAL VISIBLE IS " + this.state.modalVisible);


      //render all concepts w/ appended interactions
	    for (i = 0; i < this.state.concepts.length; i++) {
        const concept = this.state.concepts[i];
        const index = i;
        var yesAndViews = []
        for (j = 0; j < concept.yesand.length; j++){
            const yesandText = concept.yesand[j];
            yesAndViews.push(
				      <Text key = {j}> {yesandText} </Text>
            )
        }
        const yesAnds = yesAndViews;
        var images = [];
        for (imageI = 0; imageI < concept.media.length; imageI++){
            const buff = new Buffer(concept.media[imageI].data);
            const base64data = buff.toString('base64');
            const uriString = `data:image/gif;base64,${base64data}`;
            images.push(uriString);
        }
        const finalImages = images;
		  conceptViews.push(
			<View key = {i} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{flex: 1}}>
                  <ImageCarousel
                        renderContent={(idx: number) => (
                            <Image
                              style={StyleSheet.absoluteFill}
                              resizeMode="contain"
                              source={{uri: finalImages[idx]}}
                            />
                          )}>
                        {finalImages.map(url => (
                          <Image
                            style={{ width: 200, height: 200 }}
                            key={url}
                            source={{uri: url}}
                            resizeMode="contain"
                          />
                        ))}
                 </ImageCarousel>
              </View>
                <Text> {concept.name} </Text>
                <Text> {concept.description} </Text>
                <TouchableOpacity style={styles.btn}  onPress = {() => { this._yes(concept._id);}}>
                   <Text>Yes {concept.yes}</Text>
                   <Image source={require('../assets/images/heart.png')}  style={{width: 20, height: 20}}/>

                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress = {() => { this._yesAnd(concept._id);}}>
                    <Text>Yes And</Text>
                    <Image source={require('../assets/images/heart.png')}  style={{ width: 20, height: 20}}/>


                </TouchableOpacity>
                {concept.isCollapsed &&
                    <Button title="Expand" onPress={() => this._changeCollapse(index, false)}/>}
                <Collapsible collapsed={concept.isCollapsed}>
                    <Button title="Collapse" onPress={() => this._changeCollapse(index, true)}/>
                    {yesAnds}
                </Collapsible>
			</View>
		)
	}
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.getStartedText}>Review Group Concepts</Text>
        { conceptViews }
      </View>
      {this.state.modalVisible && <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
              <Text>Hello World!</Text>
          </View>
             <TouchableHighlight
                onPress={() => {
                  this.setState({modalVisible:false});
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
        </Modal>
      }
      </ScrollView>
    );
  }

  _changeCollapse = async (index, val) => {
        console.log(val)
        concepts2 = this.state.concepts;
        concepts2[index].isCollapsed = val;
        this.setState({concepts: concepts2});
  }

  _yes = async (id) => {
        Alert.alert('Yes ' + id );
  }

  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }

// id here is the concept id
  _yesAnd = async (id) => {
    console.log("we are in _yesand");
    this.setState({modalVisible: true});
    this.setState({thisConceptID: id});
    console.log("THIS CONCEPT ID IS " + thisConceptID);
    //Update state for whether modal is visible
  }

//this is called on Modal's onRequest close
  // _closeYesAnd = async (id) => {
  //   console.log("we are in _closeyesand");
  //   this.setState({modalVisible: false);
  //   //fire post request
  //   //Update state for whether modal is visible
  // }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
   absoluteView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});