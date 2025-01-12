import axios from "axios";
import { API_KEY_ENV } from "@/constants/api";

export const sushiApi = {
    getSushiSets: async (page: number, limit: number) => {
        const response = await axios.get(
            `https://${API_KEY_ENV}.mockapi.io/Sets/?page=${page}&limit=${limit}`
        );
        return response.data;
    },
};
