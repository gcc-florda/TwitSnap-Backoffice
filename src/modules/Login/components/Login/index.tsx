"use client";

import { login } from "@/services/auth";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values);
      if (response) {
        document.cookie = `token=${response.data.token}; path=/;`;
        localStorage.setItem("user", JSON.stringify(response.data.admin.name));

        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setLoginError("The email or password are not valid");
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box width="400px" p={6} boxShadow="lg" borderRadius="md">
        <Heading mb={6} textAlign="center">Login</Heading>
        {loginError && (
          <Text color="red.500" textAlign="center" mb={4}>
            {loginError}
          </Text>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl mb={4} isInvalid={!!loginError}>
                <FormLabel>Email</FormLabel>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <Input {...field} type="email" placeholder="Enter your email" />
                  )}
                </Field>
                <ErrorMessage name="email" component={FormErrorMessage} />
              </FormControl>
              <FormControl mb={6} isInvalid={!!loginError}>
                <FormLabel>Password</FormLabel>
                <Field name="password">
                  {({ field }: FieldProps) => (
                    <Input {...field} type="password" placeholder="Enter your password" />
                  )}
                </Field>
                <ErrorMessage name="password" component={FormErrorMessage} />
              </FormControl>
              <Button colorScheme="teal" width="full" type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
