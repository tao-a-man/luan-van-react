import axios from '../axios';

const userService = (function userService(props) {
    return {
        async userServiceLogin(email, password) {
            const respon = await axios.post('/api/login', { email, password });
            return respon;
        },
        async userServiceGetAllUser(token) {
            const respon = await axios.get('/api/get-all-user', {
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async userServiceCreateUser(data) {
            const respon = await axios.post('/api/create-user', { ...data });
            return respon;
        },
        async userServiceDeleteUser(id, token) {
            const respon = await axios.delete('/api/delete-user', {
                data: { id },
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
        async userServiceEditUser(data, token) {
            const respon = await axios.put('/api/update-user', {
                ...data,
                headers: {
                    authorization: token,
                },
            });
            return respon;
        },
    };
})();

export default userService;
