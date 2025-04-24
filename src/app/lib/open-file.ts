import axios from "axios";

interface Props {
  value: React.ChangeEvent<HTMLInputElement>;
}

export const APIOpenFile = async ({ value }: Props) => {
  try {
    const file = value.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post("/api/v1/open_file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.result;
  } catch ({ response }: any) {
    return response.data.status_code;
  }
};
