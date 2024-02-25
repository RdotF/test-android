import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FirstScreen from './FirstScreen'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from './Utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CourseIntro from '../Components/CourseIntro'
import StartCourse from '../Components/StartCourse'
import LessonSection from '../Components/LessonSection'
import { ScrollView } from 'react-native'
import GlobalAPI from './Utils/GlobalAPI'
import { ReloadMethodsContext } from '../../App'
import { useContext } from 'react'


export default function CourseDetailScreen() {
  const {params}=useRoute();
  const [item, setItem] = useState();
  const navigation = useNavigation();
 const {reload, setReload} = useContext(ReloadMethodsContext);
  const [userEnrollment, setUserEnrollment] = useState();
  useEffect(()=>{
    setItem(params.item);
    params&&checkIsUserStartedTheCourse(params.item);
  },[params]);
  useEffect(()=>{
    reload&&checkIsUserStartedTheCourse();
  },[reload]);

  const checkIsUserStartedTheCourse=(item)=>{
     item&&GlobalAPI.checkUserCourseEnrollement(item?.slug)
     .then(resp=>{
      //  console.log("-checkIs-", resp);
         setUserEnrollment(resp.userEnrollCourses);
      })
      
  }
  const onStartPress=()=>{
       GlobalAPI.saveUserCourseEnrollment(item.slug)
       .then(resp => {
        if(resp){
          Alert.alert("Great!", 'You have just enrolled to new course!',
          [
            {text:'Ok',
            onPress:()=>console.log("Ok Press"),
            style:'cancel'}
          ])
         checkIsUserStartedTheCourse(item);
        }
       })
  }
  return (
   
    <ScrollView style={{padding: 20, marginTop:25}}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 55}}>
        <TouchableOpacity onPress={()=>{
            navigation.goBack();
        }}>  
      <Ionicons name="arrow-back-circle-sharp" size={50} color={Colors.PRIMARY} />
        </TouchableOpacity>
      <Text style={{fontSize:28, fontFamily:'Outfit-Bold', }}>
        Course Detail</Text>
      </View>
      {/* CourseIntro */}
      <CourseIntro item={item} /> 
      {/* StartButton */}
      <StartCourse  userEnrollment={userEnrollment} item={item} onStartPress={()=>onStartPress()}
      onContinuePress={()=>navigation.navigate('watch-lesson', {
        item:item,
        userEnrollment:userEnrollment
      })}
      />
      {/* List of Chapters */}
      <LessonSection item={item}
      userEnrollment={userEnrollment}/>
   
  </ScrollView>
  )
}