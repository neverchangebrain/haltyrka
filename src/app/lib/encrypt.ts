import axios, { AxiosResponse } from "axios";

interface Props {
  method: string;
  text: string;
  param: string | number;
  decrypt: boolean;
}

export const APIEncrypt = async ({ method, text, param, decrypt }: Props) => {
  try {
    const { data } = await axios.post("/api/v1/encrypt", {
      method,
      text,
      param,
      decrypt,
    });

    return data.result;
  } catch ({ response }: any) {
    return response.data.status_code;
  }
};
