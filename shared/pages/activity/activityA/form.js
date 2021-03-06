import React, { PropTypes as PT, Component as C } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { pieConnect } from 'za-piehelper';

const required = value => (value ? undefined : 'Required');
const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
export const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more` : undefined);
export const minLength2 = minLength(2);
const number = value =>
  (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}` : undefined);
const minValue18 = minValue(18);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);
const tooOld = value =>
  (value && value > 65 ? 'You might be too old for this' : undefined);
const aol = value =>
  (value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined);
const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined);
export const phoneNumber = value =>
  (value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined);

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const formConf = [
  {
    name: 'username',
    type: 'text',
    label: '用户名'
  },
  {
    name: 'age',
    type: 'text',
    label: '年龄'
  }
];

const generateForm = (conf) => {
  if (!Array.isArray(conf)) return false;
  const getComponent = (str) => {
    let comp;
    switch (str) {
      case 'text':
        comp = renderField;
        break;
      default:
        comp = renderField;
    }
    return comp;
  };
  const getValidate = (str) => {
    let validate;
    switch (str) {
      case 'username':
        validate = [required, maxLength15, minLength2];
        break;
      case 'age':
        validate = [required, number, minValue18];
        break;
      default:
        validate = [];
    }
    return validate;
  };
  return conf.map((item, i) => (
    <Field
      key={`item-${i}`}
      name={item.name}
      type={item.type}
      component={getComponent(item.type)}
      label={item.label}
      validate={getValidate(item.name)}
    />
  ));
};
class FieldLevelValidationForm extends C {
  render() {
    const {
      handleSubmit, pristine, reset, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {
          generateForm(formConf)
        }
        {/* <Field
          name='username'
          type='text'
          component={renderField}
          label='Username'
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />
        <Field
          name='email'
          type='email'
          component={renderField}
          label='Email'
          validate={email}
          warn={aol}
        />
        <Field
          name='age'
          type='number'
          component={renderField}
          label='Age'
          validate={[required, number, minValue18]}
          warn={tooOld}
        />
        <Field
          name='phone'
          type='number'
          component={renderField}
          label='Phone number'
          validate={[required, phoneNumber]}
        /> */}
        <div>
          <button type='submit' disabled={submitting}>
            Submit
          </button>
          <button type='button' disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const TestFieldLevelValidationForm = reduxForm({
  form: 'activityAForm' // 识别form的唯一id
})(FieldLevelValidationForm);


const FinalFieldLevelValidationForm = pieConnect(
)(TestFieldLevelValidationForm);

export default FinalFieldLevelValidationForm;
