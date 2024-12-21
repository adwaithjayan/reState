import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/search";
import {Card, FeaturedCard} from "@/components/cards";
import Filters from "@/components/filters";
import {useGlobalContext} from "@/lib/globalProvider";
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/noResults";

export default function Explore() {
      const params = useLocalSearchParams<{query?:string;filter?:string}>();

      const {data,loading,refetch} = useAppwrite({
            fn:getProperties,
            params:{
                  filter:params.filter!,
                  query:params.query!,
                  limit:20
            },
            skip:true,
      })

      useEffect(() => {
            refetch({
                  filter:params.filter!,
                  query:params.query!,
                  limit:20
            })
      },[params.query,params.filter]);

      const handleCardPress = (id:string)=>{
            router.push(`/properties/${id}`)
      }
      return (
          <SafeAreaView className='bg-white h-full'>
                <FlatList data={data}
                          ListEmptyComponent={loading ?<ActivityIndicator size='large' className='text-primary-300 mt-5'/> :<NoResults/> }
                          renderItem={({item})=><Card item={item} onPress={()=>handleCardPress(item.$id)}/>}  keyExtractor={(item)=>item.$id} numColumns={2} contentContainerClassName='pb-32' columnWrapperClassName='gap-5 px-5' showsVerticalScrollIndicator={false} ListHeaderComponent={
                      <View className='px-5'>
                            <View className='flex-row items-center justify-between mt-5'>
                                  <TouchableOpacity onPress={()=>router.back()} className='flex-row bg-primary-200 rounded-full size-11 items-center justify-center'>
                                        <Image source={icons.backArrow} className='size-5'/>
                                  </TouchableOpacity>
                                  <Text className='text-center text-base mr-2 font-rubik-medium text-black-300'>Search for Your Ideal Home</Text>
                                  <Image source={icons.bell} className='size-6'/>
                            </View>
                            <Search/>
                            <View className='mt-5'>
                                  <Filters/>
                                  <Text className='text-xl font-rubik-bold text-black-300 mt-5'>Fount {data?.length} Properties</Text>
                            </View>
                      </View>

                }/>

          </SafeAreaView>
      );
}
