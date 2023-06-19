import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  FormErrorMessage,
  Center,
  Container,
  SimpleGrid,
  Heading,
  VStack,
  GridItem,
  IconButton,
  Divider,
  useToast 
} from '@chakra-ui/react';
import React from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { addemployee } from "../schemas/addempform"
import {v4 as uuidv4} from 'uuid';



const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordagain: "",
  role: "",
  dateOfJoining: "",
  members: [{
    firstname: "",
    lastname: "",
    age: "",
    relation: "",
  }]
}



// console.log('UUID UNIQUE KEY',uuidv4());
// console.log('CREATED AT',new Date().toLocaleDateString());


const AddEmp = () => {
  const toast = useToast()
  const onSubmit = async(values,{ resetForm }) => {
 
    console.log('Form Values', values);
    let response = await fetch("http://localhost:3333/users", {method:"POST",
    body:JSON.stringify({
      id:uuidv4(),
      firstname:values.firstname,
      lastname:values.lastname,
      password:values.password,
      email:values.email,
      role:values.role,
      joiningDate:values.dateOfJoining,
      createAt:new Date().toLocaleDateString(),
      members:values.members,
  
    }),
    headers:{
        "Content-type":"application/json",
    }
    });
    if(response.ok){
      
      toast({
        position: 'bottom-right',
        title: 'Employee Added.',
        description: "Employee Information has been successfully added.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      resetForm();
    }
  }
  return (
    <>
      <Container maxW='1700px'>
        <Formik
          initialValues={initialValues}
          validationSchema={addemployee}
          onSubmit={onSubmit}
        >
          <Form>
            <VStack w='full' p={10} spacing={10} align='flex-start'>
              <VStack w='full' align='flex-start'>
                <Heading as='h2' fontSize='25px'>Basic Information</Heading>
                <Divider borderColor={'black'} />
              </VStack>
              <Box w='full'>
                <SimpleGrid minChildWidth='270px' spacingX={2} spacingY={10} >
                  <GridItem >
                    <Field name='firstname' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.firstname && form.touched.firstname} >
                                <FormLabel htmlFor='firstname' >First Name</FormLabel>
                                <Input id='firstname' placeholder='Enter First Name' {...field} />
                                <FormErrorMessage name='firstname' >{form.errors.firstname}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                  </GridItem>
                  <GridItem >
                    <Field name='lastname' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.lastname && form.touched.lastname} >
                                <FormLabel htmlFor='lastname' >Last Name</FormLabel>
                                <Input id='lastname' placeholder='Enter Last Name' {...field} />
                                <FormErrorMessage name='lastname' >{form.errors.lastname}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                  </GridItem>
                  <GridItem >
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
                  </GridItem>
                  <GridItem >
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
                  </GridItem>
                  <GridItem >
                    <Field name='passwordagain' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.passwordagain && form.touched.passwordagain} >
                                <FormLabel htmlFor='passwordagain' >Confirm Password</FormLabel>
                                <Input type='password' id='passwordagain' placeholder='Confirm Password' {...field} />
                                <FormErrorMessage name='passwordagain' >{form.errors.passwordagain}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                  </GridItem>
                  <GridItem >
                    <Field name='role' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.role && form.touched.role} >
                                <FormLabel htmlFor='role' >Role</FormLabel>
                                <Select name='role' id='role'
                                  {...field} >
                                  <option value="editor">Editor</option>
                                  <option value="admin">Admin</option>
                                  <option value="viewer">Viewer</option>
                                </Select>
                                <FormErrorMessage name='role' >{form.errors.role}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                  </GridItem>
                  <GridItem >
                    <Field name='dateOfJoining' >
                      {
                        (props) => {
                          const { field, form, meta } = props
                          // console.log(props)
                          return (
                            <>

                              <FormControl isInvalid={form.errors.dateOfJoining && form.touched.dateOfJoining} >
                                <FormLabel htmlFor='dateOfJoining' >Date Of Joining</FormLabel>
                                <Input type='date' id='dateOfJoining' name='dateofJoining' placeholder='Enter Date' {...field} />
                                <FormErrorMessage name='dateOfJoining' >{form.errors.dateOfJoining}</FormErrorMessage>
                              </FormControl>

                            </>
                          )
                        }
                      }
                    </Field>
                  </GridItem>
                </SimpleGrid>
              </Box>
              <Box w='full'>
                <VStack align='flex-start' w='full'>
                  <Heading as='h2' fontSize='25px'>Family Member Information</Heading>
                  <Divider borderColor={'black'} />


                  <FieldArray name='members'>
                    {
                      (fieldArrayProps) => {
                        const { push, remove, form } = fieldArrayProps
                        const { values } = form
                        const { members } = values
                        // console.log('Field Array props', fieldArrayProps)
                        return <Box w='full' >
                          {
                            members.map((member, index) => (
                              <Box key={index} >
                                  <SimpleGrid minChildWidth='200px' w='full' spacingX={2} spacingY={10} marginY={5} >

                                    <GridItem >
                                      <Field name={`members[${index}].firstname`} >
                                        {
                                          (props) => {
                                            const { field, form, meta } = props
                                            // console.log(props)
                                            return (
                                              <>
                                                <FormControl>
                                                  <FormLabel htmlFor='mfirstname' >First Name</FormLabel>
                                                  <Input id='mfirstname' placeholder='Enter First Name' {...field} />
                                                </FormControl>
                                              </>
                                            )
                                          }
                                        }
                                      </Field>

                                    </GridItem>
                                    <GridItem>
                                      <Field name={`members[${index}].lastname`} >
                                        {
                                          (props) => {
                                            const { field, form, meta } = props
                                            // console.log(props)
                                            return (
                                              <>
                                                <FormControl>
                                                  <FormLabel htmlFor='mlastname' >Last Name</FormLabel>
                                                  <Input id='mlastname' placeholder='Enter Last Name' {...field} />
                                                </FormControl>
                                              </>
                                            )
                                          }
                                        }
                                      </Field>
                                    </GridItem>
                                    <GridItem>
                                      <Field name={`members[${index}].age`} >
                                        {
                                          (props) => {
                                            const { field, form, meta } = props
                                            // console.log(props)
                                            return (
                                              <>
                                                <FormControl>
                                                  <FormLabel htmlFor='age' >Age</FormLabel>
                                                  <Input type='number' id='age' placeholder='Enter Age' {...field} />
                                                </FormControl>
                                              </>
                                            )
                                          }
                                        }
                                      </Field>
                                    </GridItem>
                                    <GridItem>
                                      <Field name={`members[${index}].relation`} >
                                        {
                                          (props) => {
                                            const { field, form, meta } = props
                                            // console.log(props)
                                            return (
                                              <>
                                                <FormControl>
                                                  <FormLabel htmlFor='relation' >Relationship</FormLabel>
                                                  <Input type='text' id='relation' placeholder='Enter Relationship' {...field} />
                                                </FormControl>
                                              </>
                                            )
                                          }
                                        }
                                      </Field>
                                    </GridItem>
                                    <GridItem>
                                      {
                                        index > 0 &&

                                        <IconButton
                                          aria-label='add'
                                          size='lg'
                                          mt={7}
                                          mr={4}
                                          icon={<CloseIcon />}
                                          justifyItems='flex-end'
                                          onClick={() => remove(index)}
                                        />

                                      }


                                      <IconButton
                                        aria-label='add'
                                        size='lg'
                                        mt={7}
                                        icon={<AddIcon />}
                                        justifyItems='flex-end'
                                        onClick={() => push('')}
                                      />

                                    </GridItem>
                                  </SimpleGrid>
                                </Box>
                            ))
                          }
                        </Box>
                      }
                    }
                  </FieldArray>


                </VStack>
              </Box>
              <Box w='full'>
                <Center>
                  <Button type='submit' colorScheme='purple'>Add Employee</Button>
                </Center>
              </Box>
            </VStack>
          </Form>
        </Formik>
      </Container>
    </>
  )
}

export default AddEmp