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

export default function Index() {
      const {user} = useGlobalContext();
      const params = useLocalSearchParams<{query?:string;filter?:string}>();
      const {data:latestProperties,loading:leatestPropertiesLoading} = useAppwrite({
            fn:getLatestProperties
      })
      const {data,loading,refetch} = useAppwrite({
            fn:getProperties,
            params:{
                  filter:params.filter!,
                  query:params.query!,
                  limit:6
            },
            skip:true,
      })

      useEffect(() => {
            refetch({
                  filter:params.filter!,
                  query:params.query!,
                  limit:6
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
                            <View className='flex-row items-center'>
                                  <Image source={{uri:user?.avatar}} className='size-12 rounded-full'/>
                                  <View className='flex-col items-start ml-2 justify-center'>
                                        <Text className='text-xs font-rubik text-black-100'>Good Morning</Text>
                                        <Text className={'text-base text-black-300 font-rubik-medium'}>{user?.name}</Text>
                                  </View>
                            </View>
                            <Image source={icons.bell} className={'size-6'}/>
                      </View>
                      <Search/>
                      <View className='my-5'>
                            <View className='flex-row items-center justify-between'>
                                  <Text className='text-xl font-rubik-bold text-black-300'>Featured</Text>
                                  <TouchableOpacity>
                                        <Text className='text-base text-primary-300 font-rubik-bold'>See All</Text>
                                  </TouchableOpacity>
                            </View>
                            {leatestPropertiesLoading ? <ActivityIndicator size='large' className='text-primary-300'/> : !latestProperties || latestProperties.length ===0 ?<NoResults/> :
                            <FlatList data={latestProperties} renderItem={({item})=><FeaturedCard item={item} onPress={()=>handleCardPress(item.$id)}/>} keyExtractor={item => item.$id} horizontal bounces={false} showsHorizontalScrollIndicator={false} contentContainerClassName='gap-5 mt-5' />
                            }

                      </View>
                      <View className='flex-row items-center justify-between'>
                            <Text className='text-xl font-rubik-bold text-black-300'>Our Recomondation</Text>
                            <TouchableOpacity>
                                  <Text className='text-base text-primary-300 font-rubik-bold'>See All</Text>
                            </TouchableOpacity>
                      </View>
                      <Filters/>
                </View>
          }/>

    </SafeAreaView>
  );
}
