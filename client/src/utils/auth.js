import axios from "axios";
axios.defaults.withCredentials = true;

export const refreshToken = async (user, setUser, setError) => {
    try {
        const response = await axios.post("http://localhost:8080/user/refresh", { withCredentials: true });
        console.log("DATAAAAAAA", response.data)
        if (response.data.success) {
            setUser({
                email: response.data.user.email,
                id: response.data.user.id,
                accessToken: response.data.accessToken
            });
            return response.data;
        } else {
            setError(response.data.error);
            return response.data.success
        };
    } catch (e) {
        setError(e);
        return {success: false}
    }
};

