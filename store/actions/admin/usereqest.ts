import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/axiosInstance";  // Make sure your axios instance is properly set up
import { registerError } from "@/store/slices/authSlice";  // Your error handling action
import { listResponse } from "@/helpers/interfaces";  // Assuming the interface exists
import { FormData } from "@/helpers/interfaces";

export const getuserList = createAsyncThunk<listResponse,FormData>(
  "v1/wholesale_request/list",
  async (data:any, { dispatch, rejectWithValue }) => {
    try {
      // Corrected the URL to dynamically use the `uuid`
      const res = await api.get<listResponse>(`/v1/wholesale_request/list/${data?.uuid}`);
      console.log("Response:", res);
      return res.data;  // Returning the response data to be used in the reducer
    } catch (error: any) {
      console.error("Error response:", error.response?.data || error.message);
      // Dispatching registerError to update the state with the error
      dispatch(registerError(error.response?.data));

      // Handling errors with rejectWithValue
      return rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "An error occurred",
          errors: [],
        }
      );
    }
  }
);
export const updateUser = createAsyncThunk<
  any,
  { uuid: any; data: any },
  { rejectValue: any }
>("v1/wholesale_request/update", async ({ uuid, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/v1/wholesale_request/update_my_request/${uuid}`, data);
    return res.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return rejectWithValue(
      error.response?.data ?? {
        success: false,
        message: "An error occurred",
      }
    );
  }
});
