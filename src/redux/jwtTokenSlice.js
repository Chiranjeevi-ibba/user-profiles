import { createSlice } from "@reduxjs/toolkit";
import jsCookie from "js-cookie"

const initialState = {
    jwtToken: jsCookie.get("jwt_token"),
}
console.log(jsCookie.get("jwt_token"));
const jwtTokenSlice = createSlice({
    name: "jwtToken",
    initialState,
    reducers: {
      onChangeJwtToken: (state, actions) => {
        state.jwtToken = actions.payload;
      },
    }
  })
  
  export const { onChangeJwtToken } = jwtTokenSlice.actions;
  
  export default jwtTokenSlice.reducer;