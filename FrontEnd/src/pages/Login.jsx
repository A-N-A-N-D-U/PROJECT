import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import React from 'react'
import { loginUserAPI } from "../services/userServices";
import { loginUserAction } from "../redux/authSlice";

const Login = () => {
    const dispatch=useDispatch();

    const mutation=useMutation({
        mutationFn:loginUserAPI
    });

    const formik=useFormik({
        initialValues:{email:"",password:""},
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        }),
        onSubmit:async (values) => {
            const data=await mutation.mutateAsync(values);
            dispatch(loginUserAction(data));
        },
    });
  return (
    <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps("email")} placeholder="Email" />
        <input type="password" {...formik.getFieldProps("password")} placeholder="Password" />
        <button type="submit">Login</button>
    </form>
  );
}

export default Login