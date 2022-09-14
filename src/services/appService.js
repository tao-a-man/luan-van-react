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
    };
})();

export default appService;
