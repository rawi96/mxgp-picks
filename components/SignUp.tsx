import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../utils/utils';
import Alert from './Alert';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  firstname: String;
  lastname: String;
  email: String;
  username: String;
  password: String;
  confirmPassword: String;
}

const SignUp: FC = () => {
  const [alert, setAlert] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await fetch(`api/sign-up`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log('Success');
    } else {
      const data = await res.json();
      setAlert(data.message || 'Something went wrong');
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up to mxgp-picks</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {alert && <Alert text={alert} />}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text"
                  autoComplete="email"
                  className={errors.email ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                  {...register('email', { required: true, pattern: REGEX_EMAIL })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors.email?.type === 'required' && 'Email is required!'}
                    {errors.email?.type === 'pattern' && 'Email has invalid format!'}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className={errors.email ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                  {...register('username', { required: true })}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600" id="username-error">
                    {errors.username && 'Username is required!'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={errors.password ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                  {...register('password', { required: true, pattern: REGEX_PASSWORD })}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600" id="password-error">
                    {errors.password?.type === 'required' && 'Password is required!'}
                    {errors.password?.type === 'pattern' &&
                      'Password must contain minimum 6 and at least one numeric digit, one uppercase and one lowercase letter!'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  className={errors.password ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                  {...register('confirmPassword', {
                    required: 'Password confirmation is required!',
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return password === value || 'Passwords should match!';
                      },
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600" id="confirmPassword-error">
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Already an Account?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;