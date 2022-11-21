import { signIn } from 'next-auth/react';
import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalsContext } from '../context/modalsContext';
import { useShowNotification } from '../lib/utils/utils';
import Spinner from './Spinner';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  email: string;
  password: string;
}

const Login: FC = () => {
  const { setLoginModalOpen, setSignUpModalOpen, setSendResetPasswordMailModalOpen } = useContext(ModalsContext);
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    const { email, password } = data;
    const res: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res && res.ok) {
      setLoading(false);
      setLoginModalOpen(false);
      window.location.reload();
    } else {
      setLoading(false);
      showNotification('Email or password incorrect!', 'Error');
    }
  };

  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">Login</h2>

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
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email && 'Email is required!'}
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
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" id="password-error">
                  {errors.password && 'Password is required!'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                onClick={() => {
                  setLoginModalOpen(false);
                  setSignUpModalOpen(true);
                }}
                className="font-medium text-gray-700 hover:text-gray-900 underline cursor-pointer"
              >
                Don&#39;t have an account?
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                onClick={() => {
                  setLoginModalOpen(false);
                  setSendResetPasswordMailModalOpen(true);
                }}
                className="font-medium text-gray-700 hover:text-gray-900 underline cursor-pointer"
              >
                Forgot Password?
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
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
