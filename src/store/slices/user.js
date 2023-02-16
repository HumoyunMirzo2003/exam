import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    bio:null, 
    company:null,
    date:null,
    education:[],
    experience:[],
  },
  user: [],
  experience: [],
  education: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.user.push(action.payload);
    },
    addExperience(state, action) {
      state.experience.push(action.payload);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
    },

    removeUser(state, action) {
      state.user;
    },
  },
});

const marketSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateMarketInfo(
      state,
      {
        payload: {
          bio, 
          company,
          date,
          education,
          experience,
        },
      }
    ) {
      state.info = { bio, 
        company,
        date,
        education,
        experience,
      };
    },
  },
});

export const { addUser, addExperience, addEducation } = userSlice.actions;
export default userSlice.reducer;
