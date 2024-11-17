import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfileModal from '../src/Pages/Setting/Components/ProfileModal';
import Tabs from '../src/Components/Tabs';
import Setting from '../src/Pages/Setting'
import { SettingsProvider } from '../src/Pages/Setting/Context';

// Mock Ionicons
jest.mock('@expo/vector-icons', () => {
    return {
      Ionicons: 'Ionicons', // Mocked version of Ionicons
    };
  });


// Set up the mock store
const mockStore = configureStore([]);
const initialState = {
  emergency: {},
  user: { id: '123' },
  calendar: {},
};
const store = mockStore(initialState);

// Mock the Alert.alert function
jest.spyOn(Alert, 'alert');

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('ST-1: Attempt to edit profile section', () => {
  test('Profile name updates for valid inputs', async () => {
    const { getByText, getByPlaceholderText } = render(
        <Provider store={store}>
            <SettingsProvider>
                <Setting />
            </SettingsProvider>
        </Provider>
    )

    //get the profile button
    const profileButton = getByText('Profile');
    expect(profileButton).toBeTruthy();

    fireEvent.press(profileButton);

    await waitFor(() => {
        expect(screen.queryByText('Edit Profile')).toBeTruthy(); // Ensure modal is displayed
    }) 

    // Check if the modal renders correctly
    const title = getByText('Edit Profile');
    expect(title).toBeTruthy();

    // Interact with the input field
    const input = getByPlaceholderText('Enter your name');
    fireEvent.changeText(input, 'New Name');

    // Interact with the Save button
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    // Expect Alert to be called
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Saved', 'Your profile has been updated.'));
  });

  test('Name change does not submit if no changes made', async () => {
    const { getByText, getByPlaceholderText } = render(
        <Provider store={store}>
            <SettingsProvider>
                <Setting />
            </SettingsProvider>
        </Provider>
    )

    //get the profile button
    const profileButton = getByText('Profile');
    expect(profileButton).toBeTruthy();

    fireEvent.press(profileButton);

    await waitFor(() => {
        expect(screen.queryByText('Edit Profile')).toBeTruthy(); // Ensure modal is displayed
    }) 

    // Check if the modal renders correctly
    const title = getByText('Edit Profile');
    expect(title).toBeTruthy();

    // Interact with the Save button
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    // Expect Alert to be called
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please change the name before saving.'));
  });
});

describe('ST-2: Attempt to change password', () => {
    test('Attempt submit password change with no inputs', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <SettingsProvider>
                    <Setting />
                </SettingsProvider>
            </Provider>
        )
    
        //get the profile button
        const changePasswordButton = getByText('Change Password');
        expect(changePasswordButton).toBeTruthy();
    
        fireEvent.press(changePasswordButton);
    
        await waitFor(() => {
            const elements = screen.queryAllByText('Change Password'); // Get all instances of the text
            expect(elements).toHaveLength(2); // Ensure there are exactly two occurrences (modal title and button from main page)
        }) 
    
        // Interact with the input field
        const newPassword = getByPlaceholderText('Enter new password');
        const confirmNewPassword = getByPlaceholderText('Confirm new password');
        fireEvent.changeText(newPassword, '');
        fireEvent.changeText(confirmNewPassword, '');
    
        // Interact with the Save button
        const saveButton = getByText('Save');
        fireEvent.press(saveButton);
    
        // Expect Alert to be called
        await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter and confirm your new password.'));
    });

    test('Attempt submit password change with non matching passwords', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <SettingsProvider>
                    <Setting />
                </SettingsProvider>
            </Provider>
        )
    
        //get the profile button
        const changePasswordButton = getByText('Change Password');
        expect(changePasswordButton).toBeTruthy();
    
        fireEvent.press(changePasswordButton);
    
        await waitFor(() => {
            const elements = screen.queryAllByText('Change Password'); // Get all instances of the text
            expect(elements).toHaveLength(2); // Ensure there are exactly two occurrences (modal title and button from main page)
        }) 
    
        // Interact with the input field
        const newPassword = getByPlaceholderText('Enter new password');
        const confirmNewPassword = getByPlaceholderText('Confirm new password');
        fireEvent.changeText(newPassword, 'password');
        fireEvent.changeText(confirmNewPassword, 'not password');
    
        // Interact with the Save button
        const saveButton = getByText('Save');
        fireEvent.press(saveButton);
    
        // Expect Alert to be called
        await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match.'));
    });

    test('Attempt submit password change with matching passwords', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <SettingsProvider>
                    <Setting />
                </SettingsProvider>
            </Provider>
        )
    
        //get the profile button
        const changePasswordButton = getByText('Change Password');
        expect(changePasswordButton).toBeTruthy();
    
        fireEvent.press(changePasswordButton);
    
        await waitFor(() => {
            const elements = screen.queryAllByText('Change Password'); // Get all instances of the text
            expect(elements).toHaveLength(2); // Ensure there are exactly two occurrences (modal title and button from main page)
        }) 
    
        // Interact with the input field
        const newPassword = getByPlaceholderText('Enter new password');
        const confirmNewPassword = getByPlaceholderText('Confirm new password');
        fireEvent.changeText(newPassword, 'password');
        fireEvent.changeText(confirmNewPassword, 'password');
    
        // Interact with the Save button
        const saveButton = getByText('Save');
        fireEvent.press(saveButton);
    
        // Expect Alert to be called
        await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Saved', 'Your password has been updated.'));
    });
})

describe('ST-3: Test Open terms of service', () => {
    test('Attempt open terms of service', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <SettingsProvider>
                    <Setting />
                </SettingsProvider>
            </Provider>
        )
    
        //get the terms of service button
        const termsOfServiceButton = getByText('Terms of Service');
        expect(termsOfServiceButton).toBeTruthy();
    
        fireEvent.press(termsOfServiceButton);
    
        await waitFor(() => {
            const elements = screen.queryAllByText('Terms of Service'); // Get all instances of the text
            expect(elements).toHaveLength(2); // Ensure there are exactly two occurrences (modal title and button from main page)
        }) 
    
        // check that the modal displays properly
        const termsContentPiece = getByText(/Roommate Management App, you agree to follow/);
        expect(termsContentPiece).toBeTruthy();
    });
})

describe('ST-4: Test Open privacy policy', () => {
    test('Attempt open privacy policy', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <SettingsProvider>
                    <Setting />
                </SettingsProvider>
            </Provider>
        )
    
        //get the terms of service button
        const privacyPolicyButton = getByText('Privacy Policy');
        expect(privacyPolicyButton).toBeTruthy();
    
        fireEvent.press(privacyPolicyButton);
    
        await waitFor(() => {
            const elements = screen.queryAllByText('Privacy Policy'); // Get all instances of the text
            expect(elements).toHaveLength(2); // Ensure there are exactly two occurrences (modal title and button from main page)
        }) 
    
        // check that the modal displays properly
        const termsContentPiece = getByText(/We respect your privacy./);
        expect(termsContentPiece).toBeTruthy();
    });
})

describe('ST-5: Test log out', () => {

})