export const loginUserAPI=async (data) => {
    const res=await api.post("/login",data);
    return res.data;
};

export const registerUserAPI=async (data) => {
    const res=await api.post("/register",data);
    return res.data;
};