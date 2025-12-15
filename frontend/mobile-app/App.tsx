import "react-native-gesture-handler";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  LinkingOptions,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import BookScreen from "./src/screens/BookScreen";
import CleanerApplyScreen from "./src/screens/CleanerApplyScreen";

import { colors } from "./src/theme/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { useState } from "react";

// Simple web navigation
function WebTabs() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { name: "Home", component: HomeScreen },
    { name: "Book", component: BookScreen },
    { name: "Apply as Cleaner", component: CleanerApplyScreen },
  ];

  const ActiveComponent =
    tabs.find((t) => t.name === activeTab)?.component || HomeScreen;

  // Create a fake navigation object for web
  const webNavigation = {
    navigate: (screenName: string) => {
      setActiveTab(screenName);
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <ActiveComponent navigation={webNavigation} />
      <View style={styles.webTabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.webTab,
              activeTab === tab.name && styles.webTabActive,
            ]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Text
              style={[
                styles.webTabText,
                activeTab === tab.name && styles.webTabTextActive,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Main Tabs for Mobile & Web
function MainTabs() {
  if (Platform.OS === "web") {
    return <WebTabs />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{
          tabBarLabel: "Book Service",
        }}
      />
      <Tab.Screen
        name="CleanerApply"
        component={CleanerApplyScreen}
        options={{
          tabBarLabel: "Apply as Cleaner",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  type RootStackParamList = {
    Main: undefined;
  };

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL("/"), "homepro://"],
    config: {
      screens: {
        Main: {
          screens: {
            Home: "home",
            Book: "book",
            CleanerApply: "cleaner-apply",
          },
        },
      },
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={linking}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.backgroundLight,
          },
        }}
      >
        <StatusBar style="dark" />
        <MainTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webTabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
  },
  webTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  webTabActive: {
    backgroundColor: colors.primaryLight,
  },
  webTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
  },
  webTabTextActive: {
    color: colors.primary,
  },
});
