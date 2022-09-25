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
        async postCreateSpecialist(infoSpecialist) {
            const respon = await axios.post('api/create-specialist', { ...infoSpecialist });
            return respon;
        },
        async putEditSpecialist(infoSpecialist) {
            const respon = await axios.put('api/edit-specialist', { ...infoSpecialist });
            return respon;
        },
        async deleteSpecialist(id) {
            const respon = await axios.delete('api/delete-specialist', { data: { id } });
            return respon;
        },
        async getAllDoctorByIdOfSpecialist(id) {
            const respon = await axios.get(`api/get-doctor-by-specialist?id=${id}`);
            return respon;
        },
    };
})();

export default appService;
