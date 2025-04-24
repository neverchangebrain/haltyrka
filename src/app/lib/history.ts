import axios from "axios";

export const APIHistory = async (): Promise<string> => {
  const { data } = await axios.get("/api/v1/history");

  if (data.status_code) {
    return data.status_code;
  }

  return data.result;
};
