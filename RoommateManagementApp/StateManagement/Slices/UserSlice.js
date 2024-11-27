import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase.config";

// Thunk for user sign-up
export const signUp = createAsyncThunk(
    "user/signUp",
    async ({ uid, email, username, groupID }, { rejectWithValue }) => {
        try {
            // Save user data in Firestore
            await setDoc(doc(db, "users", uid), {
                email,
                username,
                groupID,
            });

            // Check if the group exists
            const groupDocRef = doc(db, "groups", groupID);
            const groupDoc = await getDoc(groupDocRef);

            if (groupDoc.exists()) {
                // If the group exists, add the user to the group
                await updateDoc(groupDocRef, {
                    members: arrayUnion(uid),
                });
                console.log(`User added to existing group ${groupID}`);
            } else {
                // If the group does not exist, create a new group
                await setDoc(groupDocRef, {
                    groupID,
                    createdAt: new Date(),
                    members: [uid],
                });
                console.log(`New group ${groupID} created with user as a member`);
            }

            return { uid, email, username, groupID };
        } catch (error) {
            console.error("Failed to sign up:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const saveFCMToken = createAsyncThunk(
    "user/saveFCMToken",
    async ({ uid, fcmToken }, { rejectWithValue }) => {
        try {
            const userDocRef = doc(db, "users", uid);

            // Update the document, merging the fcmToken into an array
            await updateDoc(userDocRef, {
                fcmToken: fcmToken,
            });

            console.log("FCM token saved:", fcmToken);
            return fcmToken;
        } catch (error) {
            // console.error("Failed to save FCM token:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to fetch user details from Firestore
export const fetchUserDetails = createAsyncThunk(
    "user/fetchUserDetails",
    async (uid, { rejectWithValue }) => {
        try {
            console.log("Fetching user details for:", uid);

            const userRef = doc(db, "users", uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                console.log("Fetched user details:", userData);
                return userData; // Contains groupID
            } else {
                throw new Error("User not found.");
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
            return rejectWithValue(error.message);
        }
    }
);


// Thunk to fetch roommates from Firestore
export const fetchRoommateDetails = createAsyncThunk(
    "user/fetchRoommateDetails",
    async ({ uid, groupID }, { rejectWithValue }) => {
        try {
            console.log(`Fetching roommate details for group: ${groupID}`);

            // Reference to the group document
            const groupRef = doc(db, "groups", groupID);
            const groupSnapshot = await getDoc(groupRef);

            if (!groupSnapshot.exists()) {
                throw new Error("Group not found.");
            }

            // Fetch group members
            const groupData = groupSnapshot.data();
            const members = groupData.members || [];

            console.log(`Group members: ${members}`);

            // Exclude the current user from roommates
            const roommateIDs = members.filter((memberUID) => memberUID !== uid);

            // Fetch details for each roommate
            const roommateDetails = await Promise.all(
                roommateIDs.map(async (roommateUID) => {
                    const roommateRef = doc(db, "users", roommateUID);
                    const roommateSnapshot = await getDoc(roommateRef);

                    if (roommateSnapshot.exists()) {
                        // Return only the uid and username (name) of each roommate
                        const { username } = roommateSnapshot.data(); // assuming "username" is the name field
                        return { id: roommateUID, username }; // only store the name and id
                    } else {
                        console.warn(`Roommate with UID ${roommateUID} not found.`);
                        return null;
                    }
                })
            );

            // Filter out any null entries (roommates not found)
            const validRoommates = roommateDetails.filter(Boolean);
            return validRoommates;
        } catch (error) {
            console.error("Failed to fetch roommate details:", error);
            return rejectWithValue(error.message);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: null,
        groupID: null,
        roommates: [],
        error: null,
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.groupID = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle sign-up
            .addCase(signUp.fulfilled, (state, action) => {
                const { uid, username, groupID } = action.payload;
                state.id = uid;
                state.username = username;
                state.groupID = groupID;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Handle fetching user details
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                const { email, username, groupID } = action.payload;
                state.username = username;
                state.groupID = groupID;
                state.error = null;
                console.log("Group id set", state.groupID)
                // fetchRoommateDetailsfetchRoommateDetails({ uid, groupID: updatedGroupID })
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.error = action.payload;
            })
            //handle fetching roommate group details
            .addCase(fetchRoommateDetails.fulfilled, (state, action) => {
                state.roommates = action.payload;
                console.log("Roommates fetched: ", state.roommates)
                state.error = null;
            })
            .addCase(fetchRoommateDetails.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setId, logout } = userSlice.actions;

export default userSlice.reducer;
