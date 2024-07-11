import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import StudentHome from "../screens/student/Home";
import StudentProfile from "../screens/student/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "../screens/common/Header";
import CustomDrawer from "../screens/common/Drawer/Drawer";
import StudentsAssignments from "../screens/student/Assignments";
import StudentTimeTable from "../screens/student/TimeTable";
import StudentAttendence from "../screens/student/Attendence";
import StudentTakeLeave from "../screens/student/TakeLeave";
import StudentFees from "../screens/student/Fees";
import StudentGrade from "../screens/student/Grade";
import StudentNoticesAndEvennts from "../screens/student/NoticesEvents";
import StudentNotification from "../screens/student/Notifications";
import AssignmentDisplay from "../screens/student/Assignments/AssignmentDisplay";
import DisplayComletedAssignment from "../screens/student/Assignments/DisplayComletedAssignment";
import AttendenceDisplay from "../screens/student/Attendence/AttendenceDisplay";
import HelpSupport from "../screens/common/Helpsupport";
import ResetPassword from "../screens/common/ResetPassword";
import Settings from "../screens/common/Settings";
import DigitalId from "../screens/student/DigitalId";
import PersonalDetail from "../screens/common/PersonalDetail";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StudentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="StudentHome" component={StudentHome} />
      <Stack.Screen name="Profile" component={StudentProfile} />
      <Stack.Screen name="Assignments" component={StudentsAssignments} />
      <Stack.Screen name="TimeTable" component={StudentTimeTable} />
      <Stack.Screen name="Attendence" component={StudentAttendence} />
      <Stack.Screen name="Leave" component={StudentTakeLeave} />
      <Stack.Screen name="Fees" component={StudentFees} />
      <Stack.Screen name="Grade" component={StudentGrade} />
      <Stack.Screen name="NoticesEvents" component={StudentNoticesAndEvennts} />
      <Stack.Screen name="Notification" component={StudentNotification} />
      <Stack.Screen name="AssignmentDisplay" component={AssignmentDisplay} />
      <Stack.Screen name="AttendenceDisplay" component={AttendenceDisplay} />
      <Stack.Screen name="PersonalDetail" component={PersonalDetail} />
      <Stack.Screen
        name="CompletedAssignment"
        component={DisplayComletedAssignment}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HelpAndsupport" component={HelpSupport} />
      <Stack.Screen name="DigitalId" component={DigitalId} />
    </Stack.Navigator>
  );
};

const StudentNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={StudentStack} />
    </Drawer.Navigator>
  );
};

export default StudentNavigator;
