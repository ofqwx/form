const validations = {
  string: {
    required: function (message) {
      return (value) => {
        if (value === '' || value === null) {
          throw message;
        }
      };
    },
    regex: function (message, expression) {
      return (value) => {
        if (!expression.test(value)) {
          throw message;
        }
      };
    },
  },
};

export default validations;
