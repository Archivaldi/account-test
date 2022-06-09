import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"
import { refreshToken } from "../utils/auth";
import CustomAxios from "../utils/axiosJWT";


const Index = (props) => {

    const { value, setValue } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let loading = true;
        if (loading) {
            const persistLogin = async () => {
                try {
                    const response = await refreshToken(value, setValue, setError);
                    if (!response.success) {
                        console.log("Here");
                        navigate("/login");
                    } else {
                        setValue({
                            id: response.data.user.id,
                            email: response.data.user.email,
                            isGoogleAccount: response.data.user.isGoogleAccount,
                            accessToken: response.data.accessToken
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            };
            persistLogin();
        };
        return () => {
            loading = false;
        }

    }, []);

    const logout = async () => {
        try {
            if (value) {
                const response = await CustomAxios(value, setValue).post("http://localhost:8080/user/logout", {
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${value.accessToken}`
                    },
                });
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    setValue(null);
                };
            }
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <div>
            INDEX PAGE
        </div>
    )
};

export default Index;