function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const rules = [
    {
        field: 'first_name',
        validator: value => value && value.length,
        errorMessage: 'Field "First name" is required',
    },
    {
        field: 'last_name',
        validator: value => value && value.length,
        errorMessage: 'Field "Last name" is required',
    },
    {
        field: 'email',
        validator: validateEmail,
        errorMessage: 'Field "Email" must be valid email address',
    },
    {
        field: 'password',
        validator: value => value && value.length > 5,
        errorMessage: 'Field "Password" is required and must be 6 or more characters length',
    },
    {
        field: 'confirm_password',
        validator: (value, comparedValue) => value === comparedValue,
        errorMessage: 'Field "Confirm password" must be equal to "Password" field value',
    },
];

export default function (data) {
    const result = [];

    rules.forEach(rule => {
        const value = data[rule.field];
        let isValid;

        if (rule.field.indexOf('confirm_') === 0) {
            const confirmField = rule.field.replace('confirm_', '');
            const confirmValue = data[confirmField];
            
            isValid = rule.validator(value, confirmValue);
        } else {
            isValid = rule.validator(value);
        }

        if (!isValid) {
            result.push({
                field: rule.field,
                message: rule.errorMessage,
            });
        }
    });

    return result;
}