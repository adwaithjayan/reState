import {ActivityIndicator} from 'react-native'
import React from 'react'
import {useGlobalContext} from "@/lib/globalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import {Redirect, Slot} from "expo-router";

export default function AppLayout() {
      const {isLoggedIn,loading} = useGlobalContext()
      if(loading){
            return <SafeAreaView className='bg-white h-full justify-center items-center'>
                  <ActivityIndicator className='text-primary-300' size='large' />
            </SafeAreaView>
      }
      if(!isLoggedIn){
            return <Redirect href='/sign-in' />
      }
      return <Slot/>
}
