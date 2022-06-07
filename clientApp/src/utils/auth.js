import axios from "axios";

export const refreshToken = async (user, setUser) => {
    try {
            const response = await axios.post("http://localhost:8080/user/refresh", { refreshToken: user.refreshToken });
            setUser({
                ...user,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken
            })
            return response.data;
    } catch (e) {
        console.log(e);
    }
};

