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
          Modal,
          Platform } from 'react-native';
// because we're using mangaged apps version of expo (and not bare version):
import { ImagePicker,
         Permissions,
         Camera } from 'expo';
import GiveFeedbackIcon from '../components/GiveFeedbackIcon';
import { Buffer } from 'buffer';
import Collapsible from 'react-native-collapsible';
import ImageCarousel from 'react-native-image-carousel';
import Swiper from "react-native-swiper";

// PICK UP HERE
//TODO: change infrastructure of this file to make state hold multple values of what a concet is

export default class Concept extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      concept: props.concept,
      modalVisible: false,
      modalErrorMessage: '',
      iLike: '',
      iWish: '',
    };

}



//  componentDidMount() {
//    //this.updateConcept();
//  };

  async updateConcept() {
    const res = await fetch('http://104.40.20.156/api/getConceptByID?id=' + this.state.concept._id, {method: 'GET'});
    const resJson = await res.json();
    const conceptNew = resJson.data[0];
    conceptNew.isCollapsed = true;
    console.log("updatin");

   this.setState({concept: conceptNew});

  }




  render() {
      const concept = this.state.concept;
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
    return (
      <View key = {i} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          {finalImages.length > 0 && <Swiper height={200} width={200} >
            {finalImages.map(url => (
              <View key={url} style={styles.slideContainer}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{uri: url}}
                resizeMode="contain"
              />
              </View>
            ))}
           </Swiper>}

          <Text> {concept.name} </Text>
          <Text> {concept.description} </Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity style={styles.button}  onPress = {async () => { this._yes();}}>
               <GiveFeedbackIcon
                    name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                  />
               <Text>  {concept.yes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress = {() => { this._yesAnd();}}>
                <GiveFeedbackIcon
                  name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                /><Text>  and...</Text>
            </TouchableOpacity>
          </View>
          {concept.isCollapsed &&
              <Button title="View feedback" onPress={() => this._changeCollapse(false)}/>}
          <Collapsible collapsed={concept.isCollapsed}>
              <Button title="Close feedback" onPress={() => this._changeCollapse(true)}/>
              {yesAnds}
          </Collapsible>
          <Text>  {"\n\n"} </Text>

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
      </View>
    );
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
             id: this.state.concept._id,
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
             id: this.state.concept._id,
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
        this.updateConcept();
        //after user send feedback, close modal and reset state for iLike and iWish, as user has decided to cancel submission of feedback
        this.setState({ iLike: '',
                      modalErrorMessage: '',
                      iWish: '',
                      modalVisible:false,});
     }

    // else
    //   console.log('User did not input anything');


   }

  _changeCollapse = async (val) => {
        //console.log(val)
        conceptNew = this.state.concept;
        conceptNew.isCollapsed = val;
        this.setState({concepts: conceptNew});
  }

  _yes = async () => {
     let data = {
       method: 'POST',
       credentials: 'same-origin',
       mode: 'same-origin',
       body: JSON.stringify({
         id: this.state.concept._id
       }),
       headers: {
         'Accept':       'application/json',
         'Content-Type': 'application/json',
         // 'X-CSRFToken':  cookie.load('csrftoken')
         }
        }
       const res = await fetch('http://104.40.20.156/api/yes', data)
       this.updateConcept();
  }

// id here is the concept id
  _yesAnd = async (id) => {
    // console.log("we are in _yesand");
    // console.log("ID IS " + id);
    //interestingly, the order in which you update state variable in setState matters
    //thisConceptID must be updated before modalVisible
    this.setState({modalVisible: true});
  }
}


const styles = StyleSheet.create({
  button: {
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:10,
    marginRight:5,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
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
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});