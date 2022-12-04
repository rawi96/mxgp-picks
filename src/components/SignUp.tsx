import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalsContext } from '../context/modalsContext';
import { useShowNotification } from '../hooks/useShowNotifications';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../lib/utils/utils';
import Spinner from './Spinner';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

  const { setSignUpModalOpen, setLoginModalOpen } = useContext(ModalsContext);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    const res = await fetch(`api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setLoading(false);
      setSignUpModalOpen(false);
      showNotification('Sign up successful', 'Success');
      setLoginModalOpen(true);
    } else {
      const data = await res.json();
      setLoading(false);
      showNotification(data.message || 'Something went wrong!', 'Error');
    }
  };
  return (
    <div data-test-id="sign-up" className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">Sign up</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                className={errors.username ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
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
              <a
                onClick={() => {
                  setSignUpModalOpen(false);
                  setLoginModalOpen(true);
                }}
                className="font-medium text-gray-700 hover:text-gray-900 underline cursor-pointer"
              >
                Already an Account?
              </a>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <Spinner />
                  ...Loading
                </>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
