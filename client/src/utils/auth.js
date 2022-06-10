import axios from "axios";
axios.defaults.withCredentials = true;

export const refreshToken = async (setUser, setError) => {
    try {
        const response = await axios.post("/user/refresh", { withCredentials: true });
            setUser({
                accessToken: response.data.accessToken,
                user: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    picture: response.data.user.picture,
                    name: response.data.user.name,
                }
            });
            return response.data;
    } catch (e) {
        setError(e.response.data.error);
        return {success: false}
    }
};

