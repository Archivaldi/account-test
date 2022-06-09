import axios from "axios";
axios.defaults.withCredentials = true;

export const refreshToken = async (setUser, setError) => {
    try {
        const response = await axios.post("http://localhost:8080/user/refresh", { withCredentials: true });
        console.log(response.data)
            setUser({
                email: response.data.user.email,
                id: response.data.user.id,
                isGoogleAccount: response.data.user.isGoogleAccount,
                accessToken: response.data.accessToken
            });
            return response.data;
    } catch (e) {
        setError(e.response.data.error);
        return {success: false}
    }
};

