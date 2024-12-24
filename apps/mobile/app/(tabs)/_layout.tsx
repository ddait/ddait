import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

// Screens
import ButtonScreen from './buttons';
import InputScreen from './inputs';
import CardScreen from './cards';
import ProgressScreen from './progress';
import ExerciseScreen from './exercise';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="buttons"
        component={ButtonScreen}
        options={{
          title: 'Buttons',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="radio-button-on" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="inputs"
        component={InputScreen}
        options={{
          title: 'Inputs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cards"
        component={CardScreen}
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="progress"
        component={ProgressScreen}
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="exercise"
        component={ExerciseScreen}
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
