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
    modalErrorMessage: '',
    thisConceptID: null,
    iLike: '',
    iWish: '',
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
    this.setState({concepts: concepts});

  }

  render() {
    var conceptViews = [];
    //console.log("here");
    //console.log("MODAL VISIBLE IS " + this.state.modalVisible);
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
          <Text>  {"\n\n"} </Text>
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
            console.log('Modal is closed'); //onRequestClose is a required parameter of the Modal component
          }}>
          <View style={{marginTop: 100, alignItems:'center'}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}> {this.state.modalErrorMessage} </Text>
              <Text style={styles.getStartedText}>Enter your feedback:</Text>
              <View style={{flexDirection: 'row'}}> 
                <TextInput
                  style={{height: 40, flex: 0.5, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(text) => this.setState({iLike: text})}
                  placeholder="I like..."
                />
              </View>
              <View style={{flexDirection: 'row'}}> 
                <TextInput
                  style={{height: 40, flex: 0.5, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(text) => this.setState({iWish: text})}
                  placeholder="I wish..."
                />
              </View>
              <Button raised 
                onPress={() =>  
                    {
                      this._sendFeedback(this.state.iLike, this.state.iWish);

                    }
                }
                title="Submit feedback"
                color="#841584"
                accessibilityLabel="Submit feedback"
              />
              <TouchableHighlight
                onPress={() => {
                  //if user decides to cancel, close modal and reset state for iLike and iWish, as user has decided to cancel submission of feedback
                  this.setState({ modalErrorMessage: '',
                                  iLike: '',
                                  iWish: '',
                                  modalVisible:false,});
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
        </Modal>
      }
      </ScrollView>
    );
  }

   _rerenderConcepts = async () => {
     const {navigation} = this.props;
     const groupID = navigation.getParam('groupID', '5cc211a9a158040015716bac');
     const res = await fetch('http://104.40.20.156/api/getConceptsByGroup?groupID=' + groupID, {method: 'GET'});  // to test locally, change to your machines IP address and append :3000
     const resJson = await res.json();
     concepts = resJson.data
     for (i = 0; i < resJson.data.length; i++) {
         concepts[i].isCollapsed = true;
     }
     this.setState({concepts: concepts});
   }

  _sendFeedback = async (iLike, iWish) => {

      var update = false;

     if (iLike.length > 0) {
       if (!iLike.startsWith("I like")){
            this.setState({ modalErrorMessage: 'Feedback in first spot must start with I like'});
            return;

       }else{
           let data = {
           method: 'POST',
           credentials: 'same-origin',
           mode: 'same-origin',
           body: JSON.stringify({
             id: this.state.thisConceptID,
             text: iLike,
           }),
           headers: {
             'Accept':       'application/json',
             'Content-Type': 'application/json',
             // 'X-CSRFToken':  cookie.load('csrftoken')
             }
            }
           const res = await fetch('http://104.40.20.156/api/yesand', data)
            updated = true;
        }//if testing locally, insert your machines IP along with the port number set in server.js e.g. :3000

     }

     if (iWish.length > 0) {
        if (!iWish.startsWith("I wish")){
            this.setState({ modalErrorMessage: 'Feedback in second spot must start with I wish'});
            return;
       }else{
           let data2 = {
           method: 'POST',
           credentials: 'same-origin',
           mode: 'same-origin',
           body: JSON.stringify({
             id: this.state.thisConceptID,
             text: iWish,
           }),
           headers: {
             'Accept':       'application/json',
             'Content-Type': 'application/json',
             // 'X-CSRFToken':  cookie.load('csrftoken')
             }
            }

           const res = await fetch('http://104.40.20.156/api/yesand', data2);
            updated = true;
         }//if testing locally, insert your machines IP along with the port number set in server.js e.g. :3000
     }
     if (updated){
        this._rerenderConcepts();
        //after user send feedback, close modal and reset state for iLike and iWish, as user has decided to cancel submission of feedback
        this.setState({ iLike: '',
                      modalErrorMessage: '',
                      iWish: '',
                      modalVisible:false,});
     }

    // else
    //   console.log('User did not input anything');


   }

  _changeCollapse = async (index, val) => {
        //console.log(val)
        concepts2 = this.state.concepts;
        concepts2[index].isCollapsed = val;
        this.setState({concepts: concepts2});
  }

  _yes = async (id) => {
     let data = {
       method: 'POST',
       credentials: 'same-origin',
       mode: 'same-origin',
       body: JSON.stringify({
         id: id
       }),
       headers: {
         'Accept':       'application/json',
         'Content-Type': 'application/json',
         // 'X-CSRFToken':  cookie.load('csrftoken')
         }
        }
       const res = await fetch('http://104.40.20.156/api/yes', data)
       this._rerenderConcepts();
  }

// id here is the concept id
  _yesAnd = async (id) => {
    // console.log("we are in _yesand");
    // console.log("ID IS " + id);
    //interestingly, the order in which you update state variable in setState matters
    //thisConceptID must be updated before modalVisible
    this.setState({thisConceptID: id,
                   modalVisible: true});
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30, 
    flex: 1, 
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