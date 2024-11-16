import React from 'react';
import { ScrollView, View } from 'react-native';
import EmergencyButton from '../EmergencyButton';

// Helper function to split array into chunks of two
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function ButtonGrid( {buttonData} ) {
  // Split button data into rows of two
  const buttonRows = chunkArray(Object.values(buttonData), 2);  //use Object.values to convert dict --> list

  return (
    <ScrollView className="p-4 bg-[#4a154b]">
      {buttonRows.map((row, index) => (
        <View key={index} className="flex-row justify-center mb-4">
          {row.map((button, btnIndex) => (
            <EmergencyButton
              key={btnIndex}
              title={button.title}
              message={button.message}
              bgColor={button.bgColor}
              isPermanent={button.is}
              buttonObject={button}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};