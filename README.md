# Wooga Form

A simple library to create generic React controlled forms.

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

[Here](https://codesandbox.io/s/serene-curie-rk56v) you can check out a real implementation. If you find any bugs, feel free to report them :).

## API

### **Form**

`<Form />` component wraps your form and handles the state of it.

**Props**

`onSubmit` (required): A function to handle the values when a form is submitted. This function will receive the values from the form in the shape of an object where the keys will be the name of each field and the event of the submit if you need to use it.

`initialValues` (optional): An object containing initial values if you want to show the form pre-filled. Keys in this object need to be the same as the names of the fields.

### **Input**

`<Input />` component will generate an input connected with the form state.

**Props**

`name` (required): A string that defines the name of the input. This prop is what connects your input with the form state. If you're using initialValues, the name of the input and its initialValues key must the same. Otherwise, this value will not be controlled by the Form component.

`type` (optional): A string that defines the type of the input element.  
The default value is **_"text"_**. 
`label` (optional): A string for the label of your input.

`validations` (optional): A list of validation functions. You can use the included validators or you can [implement your own validation function](#custom-validations). Currently, `required` and `regex` validations are supported. Read [how to use validations](#using-validations) for more information.

## Validations

To use the validator functions just import them and send them to the `<Input />` component in the `validations` array prop.
Since the validations argument is a list, you can send more that one validation (see Multiple Validations Example). The validations will be executed from top to bottom.

### Required validation

*Required* validation requires only one argument: the message to display when the validation fails.

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

*Regex* validation requires two arguments: the message to display when the validation fails and a regex expression.

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

### Multiple Validations Example

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

### Custom Validations

If you want to create your validation function, create a function that receives the message you want to show when validation fails and returns a function that receives the value to evaluate and `throw`s the message if the validation fails.

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
