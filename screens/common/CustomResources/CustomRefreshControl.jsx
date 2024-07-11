import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const CustomRefreshControl = ({ refreshing }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
    {refreshing ? (
      <>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={{ marginLeft: 10 }}>Refreshing...</Text>
      </>
    ) : null}
  </View>
);

export default CustomRefreshControl;