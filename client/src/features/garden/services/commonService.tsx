import api from "../../../services/api";

const COMMON_URL = "/localisations";

const realApi = {
    async getLocalisations() {
        const res = await api.get(COMMON_URL);
        return res.data;
    }
    ,
    async getExpositions() {
        const res = await api.get('/expositions');
        return res.data;
    }
};

export const commonService = realApi;
