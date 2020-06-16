import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Toast, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { registerNewUser } from "../redux/actions/auth-actions/registerNewUser";

// form validation useing Yup
const validate = () =>
  Yup.object({
    username: Yup.string()
      .min(2, "Must be more than one character")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required"),
    name: Yup.string()
      .min(2, "Must be more than one character")
      .required("This field is required"),
    email: Yup.string()
      .email("Please enter a vaild email")
      .required("This field is required")
  });

function SignUpForm(props) {
  const dispatch = useDispatch();

  const signUp = user => {
    dispatch(registerNewUser(user))
      .then(res => {
        toast.success(res, {
          position: toast.POSITION.BOTTOM_LEFT,
          transition: Slide
        });
        props.history.push("/");
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false
        });
      });
  };
  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          password: "",
          name: "",
          email: ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const newUser = {
            username: values.username,
            password: values.password,
            name: values.name,
            email: values.email
          };

          signUp(newUser);

          setSubmitting(false);
        }}>
        <Form>
          <div className='form-group'>
            <Field
              name='username'
              className='form-control'
              placeholder='Enter username'
              required
            />
            <ErrorMessage component={Toast} name='username' />
          </div>
          <div className='form-group'>
            <Field
              type='password'
              name='password'
              className='form-control'
              placeholder='Enter password'
              required
            />
            <ErrorMessage component={Toast} name='password' />
          </div>
          <div className='form-group'>
            <Field
              name='name'
              className='form-control'
              placeholder='Enter your name'
              required
            />
            <ErrorMessage component={Toast} name='name' />
          </div>
          <div className='form-group'>
            <Field
              name='email'
              className='form-control'
              placeholder='Enter a valid email'
              required
            />
            <ErrorMessage component={Toast} name='email' />
          </div>
          <Button variant='primary' type='submit'>
            Register{" "}
          </Button>{" "}
        </Form>
      </Formik>
      <div className='mt-3'>
        <span>Already have account, </span>
        <Link to='/login'>Log in</Link>
      </div>
    </Container>
  );
}

export default SignUpForm;