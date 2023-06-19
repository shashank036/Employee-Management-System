import React, { useContext, useState } from 'react'
import { Box, Heading, VStack, Card, FormControl, FormLabel, Input, Button, Stack, CardBody, Center,FormErrorMessage,Toast, useToast } from '@chakra-ui/react'
import Logo from '../components/Logo'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { Login } from "../schemas/login"
import {UserContext} from "../UserContext";
import { useNavigate } from 'react-router-dom'

const initialValues = {
  email: "",
  password: "",
}


const Home = () => {
  const toast = useToast()  
  const navigate = useNavigate();
  let userContext = useContext(UserContext);

  const onSubmit = async(value) =>{
    // console.log(value)
    let response = await fetch(
      `http://localhost:3333/users?email=${value.email}&password=${value.password}`,
      { method: "GET" }
    );
    if (response.ok) {
      //Status code is 200
      let responseBody = await response.json();
      if (responseBody.length > 0) {
          userContext.setUser({
              ...userContext.user,
              isLoggedIn:true,
              currentUserName: responseBody[0].firstname,
              currentUserRole: responseBody[0].role,
              currentUserId: responseBody[0].id
          });
            navigate("/all-emp");
      } else {
        toast({
          position: 'bottom-center',
          title: 'Invalid Login.',
          description: "Invalid Login, please try again",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        position: 'bottom-center',
        title: 'server not responding',
        description: "Unable to connect to server",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  console.log('userContext', userContext)
  return (

    <Box>
      <Center axis='both'>
        <Stack spacing='5'>
          <VStack as="div" spacing="2" mt='8'>
            {<Logo />}
            <Heading
              as='h1'
              fontWeight='300'
              fontSize='24px'
              letterSpacing='-0.5px'
            >
              Sign in to EMS App
            </Heading>

          </VStack>
          <Card borderColor='gray.800' colorScheme='purple' w={[300, 400, 500]} py='2'>
            <Stack>
              <CardBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Login}
                  onSubmit={onSubmit}
                >
                  <Form>
                    
                      <Field name='email' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.email && form.touched.email} >
                                <FormLabel htmlFor='email' >Email ID</FormLabel>
                                <Input type='email' id='email' autoComplete='false' placeholder='Enter Email' {...field} />
                                <FormErrorMessage name='email' >{form.errors.email}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                   
                    <Field name='password' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.password && form.touched.password} >
                                <FormLabel htmlFor='password' >Password</FormLabel>
                                <Input type='password' id='password' placeholder='Enter Password' {...field} />
                                <FormErrorMessage name='password' >{form.errors.password}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                    <Button type='submit'
                      display='flex'
                      colorScheme='purple'
                      size='sm'
                      mt='4'
                    >
                      Login
                    </Button>
                  </Form>
                </Formik>
              </CardBody>
            </Stack>
          </Card>
        </Stack>
      </Center>
    </Box>
  )
}

export default Home