define(['exports', 'react'], function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const FormContext = /*#__PURE__*/React.createContext(null);
  function FormProvider({
    initialValues,
    onSubmit,
    children
  }) {
    const [formValues, setFormValues] = React.useState(initialValues || {});
    const [formErrors, setFormErrors] = React.useState({});

    function updateFieldValue(fieldName, newValue) {
      setFormValues(prevFormValues => ({ ...prevFormValues,
        [fieldName]: newValue
      }));
    }

    function setFieldError(fieldName, error) {
      setFormErrors(prevFormErrors => ({ ...prevFormErrors,
        [fieldName]: error
      }));
    }

    function cleanFieldError(fieldName) {
      if (formErrors[fieldName]) {
        setFormErrors(prevFormErrors => {
          delete prevFormErrors[fieldName];
          return prevFormErrors;
        });
      }
    }

    function getValue(fieldName) {
      return formValues[fieldName] || '';
    }

    function getError(fieldName) {
      return formErrors[fieldName] || null;
    }

    function submit(e) {
      e.preventDefault();
      return onSubmit(formValues);
    }

    const formState = {
      values: formValues,
      errors: formErrors,
      getValue,
      getError,
      updateFieldValue,
      setFieldError,
      cleanFieldError,
      submit
    };
    return /*#__PURE__*/React__default['default'].createElement(FormContext.Provider, {
      value: formState
    }, children);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function useForm() {
    const formState = React.useContext(FormContext);
    return formState;
  }

  function useField(name, options) {
    const {
      getValue,
      getError,
      updateFieldValue,
      setFieldError,
      cleanFieldError
    } = useForm();

    function onChange(e, name, validations) {
      const value = e.target.value;
      updateFieldValue(name, value);

      if (validations) {
        cleanFieldError(name);

        for (const validate of validations) {
          try {
            validate(value);
          } catch (error) {
            setFieldError(name, error);
            return undefined;
          }
        }
      }
    }

    return {
      input: {
        name,
        onChange: e => onChange(e, name, options.validations),
        value: getValue(name),
        error: getError(name)
      }
    };
  }

  function Input({
    name,
    type = 'text',
    label,
    validations,
    ...props
  }) {
    const {
      input
    } = useField(name, {
      validations
    });
    return /*#__PURE__*/React__default['default'].createElement("fieldset", null, label ? /*#__PURE__*/React__default['default'].createElement(React.Fragment, null, /*#__PURE__*/React__default['default'].createElement("label", null, label), /*#__PURE__*/React__default['default'].createElement("br", null)) : null, /*#__PURE__*/React__default['default'].createElement("input", _extends({
      type: type,
      name: input.name,
      value: input.value,
      onChange: input.onChange
    }, props)), input.error ? /*#__PURE__*/React__default['default'].createElement(React.Fragment, null, /*#__PURE__*/React__default['default'].createElement("br", null), /*#__PURE__*/React__default['default'].createElement("div", null, input.error)) : null);
  }

  var Input$1 = {
    Text: props => /*#__PURE__*/React__default['default'].createElement(Input, props)
  };

  function Form({
    children
  }) {
    const {
      submit
    } = useForm();
    return /*#__PURE__*/React__default['default'].createElement("form", {
      onSubmit: submit
    }, children);
  }

  function FormSetup({
    onSubmit,
    initialValues,
    children
  }) {
    return /*#__PURE__*/React__default['default'].createElement(FormProvider, {
      onSubmit: onSubmit,
      initialValues: initialValues
    }, /*#__PURE__*/React__default['default'].createElement(Form, null, children));
  }

  exports.Form = FormSetup;
  exports.Input = Input$1;
  exports.useField = useField;
  exports.useForm = useForm;

  Object.defineProperty(exports, '__esModule', { value: true });

});
