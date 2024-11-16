import { createSlice } from '@reduxjs/toolkit';
import uuid from "react-native-uuid";

// initial state with prefab butons
const initialState = {
    buttons: {
        1 : {id: 1, title : 'Predefined Emergency', message: 'Predefined Emergency Message', bgColor: 'bg-red-500', isPermanent: true},
        2 : {id: 2, title: 'Test Emergency', message: 'Test emergency message', bgColor: 'bg-green-500', isPermanent: false},
    }
};

const emergencyButtonSlice = createSlice({
    name: 'emergency',
    initialState,
    reducers: {
        addEmergencyButton: (state, action) => {
            const { title, message, bgColor } = action.payload;
            const id = uuid.v4();  //give each button a unique ID
            state.buttons[id] = {id: id, title: title, message: message, bgColor: bgColor};

            //debugging - print all buttons
            Object.entries(state.buttons).forEach(([id, button]) => {
                console.log(`Button ID: ${id}`);
                console.log(`Title: ${button.title}`);
                console.log(`Message: ${button.message}`);
                console.log(`Background Color: ${button.bgColor}`);
                console.log('---');
            });
        },
        editEmergencyButton: (state, action) => {
            const { buttonId, title, message, color } = action.payload;
            if (state.buttons[buttonId]) {
                state.buttons[buttonId] = { id: buttonId, title: title, message: message, bgColor: color };
            }
            console.log(`Edit called on button ${buttonId}, with title changed to ${title}, and message changed to ${message}`);
        },
        deleteEmergencyButton: (state, action) => {
            const { buttonId } = action.payload;
            if (state.buttons[buttonId]) {
                delete state.buttons[buttonId];
            }
        }
    }
});

export const { addEmergencyButton, editEmergencyButton, deleteEmergencyButton } = emergencyButtonSlice.actions;

export default emergencyButtonSlice.reducer;