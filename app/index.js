import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
function HomeScreen({ navigation }) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Home Screen</Text>
    //   <Button title="Open Details" onPress={() => {
    //     navigation.navigate('Details')
    //   }} />
    // </View>
    <View>
      <Button
        title="Store Data"
        onPress={() => {
          storeData('my name', 'triet')
        }}
      />
      <Button
        title="Get Data"
        onPress={() => {
          getdata('my name')
        }}
      />
    </View>
  )
}
function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Screen</Text>
      <Button title="Open Home" onPress={() => {
        navigation.navigate('Home')
      }} />
    </View>
  )
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log('data is stored successfully');
  } catch (error) {
    console.log('erorr when store date', error);
  }
}

const getdata = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log('get data succcessfully:', value);
  } catch (error) {
    console.log('error when get data', error);
  }
}


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home'
            }
            else {
              iconName = 'list'
            }
            return <Icon name={iconName} color={color} size={20} />
          }
        })}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}
