import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filters = () => {
      const params =useLocalSearchParams<{filter?:string}>();
      const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

      const handleCat = (cat:string)=>{
            if(selectedCategory ===cat){
                  setSelectedCategory('All');
                  router.setParams({filter:'All'});
                  return;
            }
            setSelectedCategory(cat);
            router.setParams({filter:cat});
      }

      return (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-3 mb-2'>
                {categories.map((item,i)=>(
                    <TouchableOpacity key={`$id-${i}`} className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${item.category === selectedCategory ? 'bg-primary-300':'bg-primary-100 border border-primary-200'}`} onPress={()=>handleCat(item.category)}>
                        <Text className={`text-sm ${selectedCategory === item.category ? 'text-white font-rubik-bold mt-0.5':'text-black-300'}`}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
          </ScrollView>
      )
}
export default Filters
