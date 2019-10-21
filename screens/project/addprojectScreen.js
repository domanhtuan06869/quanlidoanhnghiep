import React, { Component } from 'react';
import {
  Text,Alert,
  View,Button,StyleSheet,
  Platform,TextInput,ScrollView,TouchableOpacity,KeyboardAvoidingView,TouchableHighlight,
} from 'react-native';
import TagInput from 'react-native-tag-input';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from "react-native-modal-datetime-picker";
import AutoTags from 'react-native-tag-autocomplete';
import url from '../url'



export default class AddprojectScreen extends React.Component {

  async getUser(){
    const result = await axios( url.url+'/users/getuser');

    this.setState({suggestions:result.data})
  }
  componentDidMount(){
    this.getUser()

  }
  static navigationOptions = ({ navigation }) => ({
    header:(
      <View style={{  justifyContent:"space-between",
      flexDirection:"row",
      backgroundColor:'#2f95dc',
      paddingVertical:10,
      paddingHorizontal:20,}}>
          <Ionicons onPress={()=>{navigation.goBack()}} color={'white'} size={Platform.OS==='ios'?40:35} name={Platform.OS=='ios'?'ios-arrow-back':'md-arrow-back'}/>
          <Text style={{fontSize:20,marginTop:5,color:'white',}}>Thêm dự án</Text>
          <Ionicons style={{marginTop:5}} size={30} color={'white'} name={Platform.OS=='ios'?'ios-search':'md-search'}/>
      </View>
    ),
  })


  state = {
  

 
    name:'',
    status:'',
    desire:'',
    description:'',
    company:'',
    load:false,
    isDateTimePickerVisible: false,
    isDateTimePickerVisible2: false,
    isDateTimePickerVisible3: false,
    isDateTimePickerVisible4: false,
    startdate:'',
    enddate:'',
    endtime:'',
    starttime:'',
    id:'',
    suggestions :[],
    tagsSelected : [],
  
  };


  
  customFilterData = query => {
    //override suggestion filter, we can search by specific attributes
    query = query.toUpperCase();
    let searchResults = this.state.suggestions.filter(s => {
      return (
     
        s.email.toUpperCase().includes(query)
      );
    });
    return searchResults;
  };

  customRenderTags = tags => {
    //override the tags render
    return (
      <View style={styles.customTagsContainer}>
        {this.state.tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={styles.customTag}
              onPress={() => this.handleDelete(i)}
            >
              <Text style={{ color: "white" }}>
                 { t.email}
              </Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  customRenderSuggestion = suggestion => {
    //override suggestion render the drop down
    const name = suggestion.email;
    return (
      <Text style={{marginVertical:4,fontSize:16}}>
        {name.substr(0, name.indexOf(" "))}  {suggestion.email}
      </Text>
    );
  };

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
    
  };

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
  };

  onCustomTagCreated = userInput => {
    //user pressed enter, create a new tag from their input
    const contact = {
      emailtag: userInput,
    
    };
    this.handleAddition(contact);
  };


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };




  showDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: true });
  };
 
  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: false });
  };
 



  handleDatePicked = date => {
    var month=date.getMonth()+1
     var day = date.getDate()
    var newtime;
    if(day<10 & month<10){
      newtime=''+date.getFullYear()+'-0'+(date.getMonth()+1)+'-0'+date.getDate()
    }else if (day<10){
    newtime=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-0'+date.getDate()

  }else if(month<10){
    newtime=''+date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate()
  }
  else{
    newtime=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()

  }
    this.setState({startdate:newtime})
    this.hideDateTimePicker()
    setTimeout(()=>{
this.showDateTimePicker3()
    },400)
    
  };
  handleDatePicked2 = date => {
    var month=date.getMonth()+1
    var day = date.getDate()
    var newtime;
   if(day<10 & month<10){
     newtime=''+date.getFullYear()+'-0'+(date.getMonth()+1)+'-0'+date.getDate()
   }else if (day<10){
   newtime=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-0'+date.getDate()
   }else if(month<10){
   newtime=''+date.getFullYear()+'-0'+(date.getMonth()+1)+'-'+date.getDate()
 } else{
   newtime=''+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
} 
    this.setState({enddate:newtime})
    this.hideDateTimePicker2();
    setTimeout(()=>{
      this.showDateTimePicker4()
          },400)
  
  };

  handleDatePicked3 = date => {
    var hours=date.getHours()
    var min=date.getMinutes()
    var sc=date.getSeconds()
    var newtime;
    if(hours<10 & min<10 & sc<10){
     newtime='0'+date.getHours()+':0'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours<10 & min<10){
     newtime='0'+date.getHours()+':0'+date.getMinutes()+':'+date.getSeconds()
    }else if( min<10 & sc<10){
      newtime=''+date.getHours()+':0'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours <10 & sc<10){
      newtime='0'+date.getHours()+':'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours<10){
      newtime='0'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }else if(min<10){
      newtime=''+date.getHours()+':0'+date.getMinutes()+':'+date.getSeconds()
    }else if(sc<10){
      newtime=''+date.getHours()+':'+date.getMinutes()+':0'+date.getSeconds()
    }else{
      newtime=''+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    
    this.setState({starttime:newtime})
  
    this.hideDateTimePicker3();
  };

  showDateTimePicker3 =()=> {
    this.setState({ isDateTimePickerVisible3: true });
 
  };
 
  hideDateTimePicker3 = () => {
    this.setState({ isDateTimePickerVisible3: false });
  };

  showDateTimePicker4 =()=> {
    this.setState({ isDateTimePickerVisible4: true });
 
  };
  hideDateTimePicker4 = () => {
    this.setState({ isDateTimePickerVisible4: false });
  };
  handleDatePicked4 = date => {
    var hours=date.getHours()
    var min=date.getMinutes()
    var sc=date.getSeconds()
    var newtime;
    if(hours<10 & min<10 & sc<10){
     newtime='0'+date.getHours()+':0'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours<10 & min<10){
     newtime='0'+date.getHours()+':0'+date.getMinutes()+':'+date.getSeconds()
    }else if( min<10 & sc<10){
      newtime=''+date.getHours()+':0'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours <10 & sc<10){
      newtime='0'+date.getHours()+':'+date.getMinutes()+':0'+date.getSeconds()
    }else if(hours<10){
      newtime='0'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }else if(min<10){
      newtime=''+date.getHours()+':0'+date.getMinutes()+':'+date.getSeconds()
    }else if(sc<10){
      newtime=''+date.getHours()+':'+date.getMinutes()+':0'+date.getSeconds()
    }else{
      newtime=''+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    }
    this.setState({endtime:newtime})
    this.hideDateTimePicker4();
  };
  ///Tạo mới 1 project
async createproject(){
  this.setState({load:true})

  let email = await SecureStore.getItemAsync('email');
  var emailArray = this.state.tagsSelected.map(function (obj) {
    return obj.email;
  });
  var tokenarr = this.state.tagsSelected.map(function (obj) {
    return obj.token;
  });



  const postData = {                                
    name:this.state.name,
    email:email,
    emailtag:emailArray,
    company:this.state.company,
    desire:this.state.desire,
    starttime:this.state.startdate+' '+this.state.starttime,
    endtime:this.state.enddate+' '+this.state.endtime,
    status:this.state.status,
    description:this.state.description,
    id:this.state.id,
    token:tokenarr
     };
  let axiosConfig = {
    headers: {
      'Content-Type' : 'application/json; charset=UTF-8',

    }
  };
  
 axios({
         method: 'post',
        url:  url.url+'/project/insertproject' ,
        headers: axiosConfig,
        data: postData
    })
    .then((res) => {
  
      if(res.data.originalError){
        console.log(res.data.originalError)
        setTimeout(() => {
          this.setState({load:false})
         }, 5000);
         setTimeout(() => {
          Alert.alert('Có lỗi kiểm tra lại')
         }, 5500);
      }else{
        this.setState({load:false})
        this.props.navigation.push('Home')
      }
 
    }).catch(err=>{
      console.log(err)
    })
}

alertshow(title){
Alert.alert(title)
}
 addAll=()=>{
  var date=new Date()

   var end= this.state.enddate+' '+this.state.endtime
   var day = new Date(end.replace(' ', 'T'));
   var start=new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds())
   console.log(day.getTime()-start)
if(this.state.id==''){
  this.alertshow('Vui lòng nhập mã')
}else if(this.state.name==''){
  this.alertshow('Vui lòng nhập tên')
} else if(this.state.company==''){
  this.alertshow('Vui lòng nhập tên công ty')
}else if(this.state.desire==''){
  this.alertshow('Vui lòng nhập mong muốn')
}else if(this.state.tagsSelected.length<=0){
  this.alertshow('Vui lòng thêm ít nhất một email tag')
}else if(this.state.status==null){
  this.alertshow('Hãy chọn trạng thái')
}else if(this.state.starttime==''||this.state.startdate==''){
  this.alertshow('Chọn thời gian bắt đầu')
}else if(this.state.endtime==''||this.state.enddate==''){
  this.alertshow('Chọn thời gian kết túc')
}else if(this.state.description==''){
  this.alertshow('Nhập mô tả')
}else if(day.getTime()-start<=25193000){
  this.alertshow('Vui lòng nhập thời gian lớn hơn thời gian hiện tại')
}
else{
  this.createproject()
}

}

click=()=>{

  console.log(this.state.token)
}
  render() {

    return (
      <KeyboardAvoidingView style={{flex: 1,alignItems:'center'}} behavior='height'>
                 <Spinner visible={this.state.load}
                   color='blue'>                  
                   </Spinner>
                   <ScrollView style={{width:'100%'}}>
      <View style={{ width:'100%', marginTop: 30,paddingBottom:40 }}>
      
        
        <View style={{flexDirection:'column',width:'100%',alignItems:'center'}}>

        
        <TextInput  style={styles.textinput} onChangeText={(id) => this.setState({id})} value={this.state.id} placeholder='mã'></TextInput>  

<TextInput  style={styles.textinput} onChangeText={(name) => this.setState({name})} value={this.state.name} placeholder='Tên dự án'></TextInput>  

 <TextInput style={styles.textinput}  onChangeText={(company) => this.setState({company})} value={this.state.company} placeholder='Tên công ty'></TextInput>    

<TextInput style={styles.textinput}  onChangeText={(desire) => this.setState({desire})} value={this.state.desire} placeholder='Mong muốn'></TextInput>
<TextInput style={styles.textinput}  onChangeText={(description) => this.setState({description})} value={this.state.description} placeholder='Mô tả'></TextInput>

</View>
       
        <View style={styles.autocompleteContainer}>
        <AutoTags
            //required
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
            //optional
            placeholder="Add a Email.."
            filterData={this.customFilterData}
            renderSuggestion={this.customRenderSuggestion}
            renderTags={this.customRenderTags}
            onCustomTagCreated={this.onCustomTagCreated}
            autoFocus={false}
         
         
          />

        </View>
   <View style={{width:'90%', borderColor: 'gray',marginLeft:'5%',marginTop:10,borderRadius:4,justifyContent:'center',alignItems:'center',
   borderWidth: 1, height: 40,}}>
        <RNPickerSelect
        color='black'
        style={{color:'black'}}
      onValueChange={(value) => this.setState({status:value})}
      placeholder={{
        label: 'Chọn trạng thái...',
        value: null,color:'black'
    }}
      items={[
        { label: 'Đang làm', value: 'Đang làm' ,color:'black'},
        { label: 'Hoàn Thành', value: 'Hoàn Thành' },
        { label: 'Đình chỉ', value: 'Đình chỉ' },
      ]}
    />
    </View>
    <View style={{flexDirection:'row',marginTop:10, width:'100%',marginLeft:'4%',alignItems:'center'}}>
       <TouchableOpacity style ={styles.textinputop} onPress={this.showDateTimePicker} >
      <Text style={styles.textbtn2}>Thời gian bắt đầu </Text>
       </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'date'}
        />
           <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible3}
          onConfirm={this.handleDatePicked3}
          onCancel={this.hideDateTimePicker3}
          mode={'time'}
        />
        
             <Text style={{textAlignVertical:'center',paddingLeft:'10%',paddingTop:13,width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,borderRadius:4,marginHorizontal:3,}}>{this.state.startdate+' '+this.state.starttime}</Text>

       </View>
       <View style={{flexDirection:'row',marginTop:10, width:'100%',marginLeft:'4%',alignItems:'center'}}>
       <TouchableOpacity style ={styles.textinputop} onPress={this.showDateTimePicker2} >
      <Text style={styles.textbtn2}>Thời gian kết thúc </Text>
       </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={this.handleDatePicked2}
          onCancel={this.hideDateTimePicker2}
          mode={'date'}
        />
           <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible4}
          onConfirm={this.handleDatePicked4}
          onCancel={this.hideDateTimePicker4}
          mode={'time'}
        />
       <Text style={{textAlignVertical:'center',paddingLeft:'10%',paddingTop:13,width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,borderRadius:4,marginHorizontal:3,}}>{this.state.enddate+' '+this.state.endtime}</Text>

       </View>
 
      </View>
      </ScrollView>
      <TouchableOpacity onPress={this.addAll} style={styles.containerview} >
          <Text style={styles.textbtn}>TẠO DỰ ÁN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
textinput:{
  width:'90%',  borderColor: 'gray',
   borderWidth: 1, height: 50,marginVertical:6,borderRadius:4
},
textinputnumber:{
  width:'18.5%',  borderColor: 'gray',
   borderWidth: 1, height: 40,marginVertical:6,borderRadius:4,marginHorizontal:3
},
textinputnumbeyear:{
  width:'50%',  borderColor: 'gray',
   borderWidth: 1, height: 40,borderRadius:4,marginHorizontal:3,
},
textinputdescription:{
  width:'90%',  borderColor: 'gray',
   borderWidth: 1, height: 50,marginVertical:6,borderRadius:4, marginLeft:'5%'
},
containerview:{
  width:'100%',alignItems:'center',borderRadius:4,height:45,justifyContent:'center'
},
textbtn:{
 width:'100%',height:'100%',backgroundColor:'red',textAlign:'center',color:'#fff',paddingTop:15,fontSize:17
},
textinputop:{
  width:'38.5%', borderColor:'#fff', height: 40,marginVertical:6,borderRadius:4,marginHorizontal:3
},textbtn2:{
  width:'100%',height:'100%',backgroundColor:'red',textAlign:'center',color:'#fff',paddingTop:5,fontSize:17,borderRadius:4
 }, customTagsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  backgroundColor: "#efeaea",
  width:'85%'
 
},
customTag: {
  backgroundColor: "#9d30a5",
  justifyContent: "center",
  alignItems: "center",
  height: 30,
  marginLeft: 5,
  marginTop: 5,
  borderRadius: 30,
  padding: 8
},


autocompleteContainer: {
  flex: 1,
  left: 20,

  right: 20,
  zIndex: 1
},
label: {
  color: "#614b63",
  fontWeight: "bold",
  marginBottom: 10
},

})