# Wooga Form

Library to create generic React controlled forms

# Table of Contents

- [Getting started](#getting-started)
- [Playground](#playground)
- [API](#api)
  - [Form](#form)
  - [Input](#input)
- [Validations](#validations)
  - [Required](#required-validation)
  - [Regex](#regex-validation)
  - [Mutiple validations](#multiple-validations)
  - [Custom validations](#custom-validations)


## Getting started.

With yarn:

```bash
yarn add @ofqwx/form
```

With npm:

```bash
npm install @ofqwx/form
```

## Playground

[Here](https://codesandbox.io/s/serene-curie-rk56v) you can take a look and play with a real implementation. You can also use it to find bugs and report it to me :).

## API

### **Form**

`<Form />` component wraps your form and handle the state of it.

**Props**

`onSubmit` (required): A function to handle the values when a form is submitted. This function will receive the values from the form in the shape of an object where the keys will be the name of each field and the event of the submit if you need to use it.

`initialValues` (optional): An object containing initial values if you want to show the form pre-filled. Keys in this object need to be the same as the names of the fields.

### **Input**

`<Input />` component will generate an input connected with the form state.

**Props**

`name` (required): A string that defines the name of the input, this prop is what connects your input with the form state, so be sure in case you're using initialValues that names and initialValues keys are the same, otherwise this value will not be controlled by the Form component.

`type` (optional): A string that defines the type of the input element.  
Currently, we only support type **_"text"_** and it's the default value so you can commit this prop for now.

`label` (optional): A string for the label of your input.

`validations` (optional): A list of validation functions, you can use our validators or you can [implement your own validation function](#custom-validations). Currently we support `required` and `regex` validation. Please read [how to use validations](#using-validations) for more information

## Validations

To use our validator functions just import them and send it to the `<Input />` component in the `validations` array prop.

### Required validation

Required validation only needs one argument with the message to show when validation fails.

`validations.string.required(validationMessage)`

```JSX
import {Form, Input, validations} from '@ofqwx/form`


function MyForm() {
  return
    <Form onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[
          validations.string.required('First name is required'),
        ]}
      />

      <button type="submit">Submit</button>
    </Form>
}
```

### Regex validation

Regex validation needs one argument with the message to show when validation fails and a regex expression.

`validations.string.required(validationMessage, regexExpression)`

```JSX
import {Form, Input, validations} from '@ofqwx/form`

const regex = /^(?:wooga\.name).[\w|\W]{1,}/;

function MyForm() {
  return
    <Form onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[
          validations.string.regex(
            'First name must start with "wooga.name"',
            regex
          ),
        ]}
      />

      <button type="submit">Submit</button>
    </Form>
}
```

### Multiple validations

For multiple validations just add the validation functions in the validations props, the validations will be executed from top to bottom.

```JSX
import {Form, Input, validations} from '@ofqwx/form`

const regex = /^(?:wooga\.name).[\w|\W]{1,}/;

function MyForm() {
  return
    <Form onSubmit={() => undefined}>
      <Input
        label="First name"
        name="firstName"
        validations={[
          validations.string.required('First name is required'),
          validations.string.regex(
            'First name must start with "wooga.name"',
            regex
          ),
        ]}
      />

      <button type="submit">Submit</button>
    </Form>
}
```

### Custom validations

If you want to create your validation function, just create a function that receives the message you want to show when validation fails and returns a function that receives the value to evaluate and **throw** the message in case of validation fails.

```JSX
function numberValidation(validationMessage) {
  return (valueToEvaluate) {
    if (typeof valueToEvaluate !== 'number') {
      throw validationMessage
    }
  }
}

<Form onSubmit={() => undefined}>
  <Input
    label="First name"
    name="firstName"
    validations={[
      numberValidation('Value must be a number'),
    ]}
  />

  <button type="submit">Submit</button>
</Form>
```
