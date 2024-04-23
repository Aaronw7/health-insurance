import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  FormErrorMessage,
  Button
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

function App() {
  const format = (val) => `$` + val
  const parse = (val) => val.replace(/(\.\d+)?$/, '')

  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <Box className="App">
      <Heading mb={2}>Solidity Insurance</Heading>
      <Flex justify='center'>
        <Box w='55%' p={4} border='1px' borderRadius='md'>
          <Formik
            initialValues={{ firstName: '', lastName: '', weight: 0, age: 0, tobacco: null, salary: 0 }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                actions.setSubmitting(false)
              }, 1000)
            }}
          >
            {(props) => (
              <Form>
                <Flex gap={2} mb={2}>
                  <Field name='firstName' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                        <FormLabel>First Name</FormLabel>
                        <Input {...field} placeholder='First Name' />
                        <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='lastName' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                        <FormLabel>Last Name</FormLabel>
                        <Input {...field} placeholder='Last Name' />
                        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Grid templateColumns='repeat(4, 1fr)' gap={2} mb={2}>
                  <Field name='age'>
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel>Age</FormLabel>
                        <NumberInput
                          value={field.value}
                          onChange={(valueString) => form.setFieldValue(field.name, valueString)}
                          defaultValue={0}
                          w='60%'
                          min={0}
                          max={110}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    )}
                  </Field>

                  <Field name='weight' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.weight && form.touched.weight}>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <NumberInput
                          value={field.value}
                          onChange={(valueString) => form.setFieldValue(field.name, valueString)}
                          defaultValue={0}
                          w='75%'
                          min={0}
                          max={600}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{form.errors.weight}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <GridItem colSpan={2}>
                    <Field name='tobacco' validate={validateName}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.tobacco && form.touched.tobacco}>
                          <FormLabel>Are you a Tobacco User?</FormLabel>
                          <Select {...field} placeholder='Select option' w='65%'>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Select>
                          <FormErrorMessage>{form.errors.tobacco}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>
                </Grid>

                <Flex w='50%'>
                  <Field name='salary' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.salary && form.touched.salary}>
                        <FormLabel>Annual Salary</FormLabel>
                        <NumberInput
                          value={format(field.value)}
                          onChange={(valueString) => form.setFieldValue(field.name, parse(valueString))}
                          defaultValue={0}
                          w='100%'
                          step={1000}
                          min={0}
                          max={999999999}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{form.errors.salary}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box w='35%'>Results Area</Box>
      </Flex>
    </Box>
  );
}

export default App;
