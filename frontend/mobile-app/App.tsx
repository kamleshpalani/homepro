import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  LinkingOptions,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import BookScreen from "./src/screens/BookScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import CleanerApplyScreen from "./src/screens/CleanerApplyScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { colors } from "./src/theme/colors";
import { loadStoredToken } from "./src/api/client";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="CleanerApply"
        component={CleanerApplyScreen}
        options={{ title: "Apply" }}
      />
    </Tab.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Push notifications permission not granted");
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log("Expo push token", token.data);
  return token.data;
}

export default function App() {
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const bootstrap = async () => {
      const stored = await loadStoredToken();
      setHasToken(!!stored);
      await registerForPushNotificationsAsync();
      setTokenLoaded(true);
    };

    bootstrap();
  }, []);

  type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
  };

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL("/"), "homepro://"],
    config: {
      screens: {
        Auth: "auth",
        Main: {
          screens: {
            Home: "home",
            Book: "book",
            Dashboard: "dashboard",
            CleanerApply: "cleaner-apply",
          },
        },
      },
    },
  };

  if (!tokenLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={linking}
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: colors.background },
        }}
      >
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={hasToken ? "Main" : "Auth"}
        >
          <Stack.Screen name="Auth" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
