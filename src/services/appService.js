import axios from '../axios';

const appService = (function appService(props) {
    return {
        async getSpecialist() {
            const respon = await axios.get('/api/get-specialist');
            return respon;
        },
        async getCommodities() {
            const respon = await axios.get('/api/get-commodities');
            return respon;
        },
        async postEditDetailDoctor(user) {
            const respon = await axios.put('api/update-detail-doctor', { ...user });
            return respon;
        },
        async getInfoDetailDoctor(id) {
            const respon = await axios.get(`api/get-info-detail-doctor?id=${id}`);
            return respon;
        },
    };
})();

export default appService;
