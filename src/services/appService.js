import axios from '../axios';

const appService = (function appService(props) {
    return {
        async getSpecialist() {
            const respon = await axios.get('/api/get-specialist');
            return respon;
        },
        async putEditDetailDoctor(user) {
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
        async getScheduleByDoctorId(id) {
            const respon = await axios.get(`/api/get/schedule-by-doctor-id?id=${id}`);
            return respon;
        },
        async runScheduleAutomatic() {
            await axios.post(`/api/create-schedule-automatic`);
        },
        async getAllcodeByTime() {
            const respon = await axios.get('/api/get-all-code-type-time');
            return respon;
        },
        async patchBulkUpdateSchedule(data) {
            const respon = await axios.patch('/api/bulk-update-schedule', { ...data });
            return respon;
        },
        async postCreateBooking(infoBooking, token) {
            const respon = await axios.post(
                '/api/post-create-booking',
                {
                    ...infoBooking,
                },
                {
                    headers: {
                        authorization: token,
                    },
                },
            );
            return respon;
        },
        async getBookingByUserId(token) {
            const respon = await axios.get(`api/get-booking-by-user-id`, {
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async acceptBooking(id) {
            const respon = await axios.put('/api/accept-booking', { id });
            return respon;
        },
        async deleteBooking(scheduleId) {
            await axios.delete(`api/delete-booking`, { data: { scheduleId } });
        },
        async postCreateHistoryCare(dataExam, token) {
            await axios.post(
                `/api/post-create-historycare`,
                { ...dataExam },
                {
                    headers: {
                        authorization: token,
                    },
                },
            );
        },
        async getHistoryCare(token) {
            const respon = await axios.get('/api/get-historycare-by-doctor-id', {
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async getHistoryCareByBookingId(token, bookingId) {
            const respon = await axios.get(`/api/get-historycare-by-booking-id?bookingId=${bookingId}`, {
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async getHistoryCareHaveReExam(token) {
            const respon = await axios.get(`/api/get-historycare-have-re-exam`, {
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async deleteHistoryCareHaveReExam(id, idTime, token) {
            const respon = await axios.delete(`/api/delete-hisrories-care`, {
                data: { id, idTime },
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
    };
})();

export default appService;
