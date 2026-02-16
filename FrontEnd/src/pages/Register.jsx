import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { registerUserAPI } from '../services/userServices'
import { useFormik } from 'formik'
import * as Yup from "yup"

const Register = () => {
    const mutation=useMutation({
        mutationFn:registerUserAPI
    })

    const formik=useFormik({
        initialValues:{name:"",email:"",password:""},
        validationSchema:Yup.object({
            name: Yup.string().min(2).required(),
            email:Yup.string().email().required(),
            password:Yup.string().min(6).required(),
        }),
        onSubmit:async (values) => {
            await mutation.mutateAsync(values);
            alert("Registered successfully")
        },
    })
  return (
    <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps("name")} placeholder='Name' />
        <input {...formik.getFieldProps("email")} placeholder='Email' />
        <input type='password' {...formik.getFieldProps("password")} placeholder='Password' />
        <button type='submit'>Register</button>
    </form>
  );
}

export default Register