// Import matchers from jest-native
import '@testing-library/jest-native/extend-expect';

// Mock expo-modules-core to prevent requireNativeModule issues
jest.mock('expo-modules-core', () => ({
    requireNativeModule: jest.fn(),
    NativeModulesProxy: {},
    Platform: { OS: 'ios' },
    // Add other mocks as necessary
}));

  // Mock expo-font to handle any font-specific native calls
jest.mock('expo-font', () => ({
    loadAsync: jest.fn(), // Mock the loadAsync function used in fonts
}));

// Mock @expo/vector-icons to prevent issues with icon components
jest.mock('@expo/vector-icons', () => {
    return {
      MaterialIcons: 'MaterialIcons',
      FontAwesome5: 'FontAwesome5',
      Entypo: 'Entypo',
      // Add other icons as needed
    };
  });
  // Mock react-native-gesture-handler to prevent errors in Jest environment
jest.mock('react-native-gesture-handler', () => {
  return {
      GestureHandlerRootView: jest.fn(),
      GestureHandler: jest.fn(),
  };
});