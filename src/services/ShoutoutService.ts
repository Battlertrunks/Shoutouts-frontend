import axios from "axios";
import QueryStringParams from "../Models/QueryStringParams";
import Shoutout from "../Models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Shoutout[]> => {
  return (await axios.get(baseURL, { params })).data;
};

export const addShoutout = async (
  shoutoutPost: Shoutout
): Promise<Shoutout> => {
  return (await axios.post(baseURL, shoutoutPost)).data;
};

export const deleteShoutout = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};

export const deleteAllShoutouts = async (): Promise<Shoutout> => {
  return (await axios.delete(baseURL)).data;
};
