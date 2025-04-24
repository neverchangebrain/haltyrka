import axios from "axios";

export const APIHistory = async (): Promise<string> => {
  const res = await axios.get("/api/v1/history");
  return res.data.result;
};
