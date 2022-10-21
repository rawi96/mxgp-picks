import { signIn } from 'next-auth/react';
import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalsContext } from '../context/ModalsContext';
import Alert from './Alert';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [alert, setAlert] = useState('');
  const { setLoginModalOpen } = useContext(ModalsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { email, password } = data;
    const res: any = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res && res.ok) {
      setLoginModalOpen(false);
    } else {
      setAlert('Wrong email or password!');
    }
  };
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">Login</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
              <a href="javascript:;" className="font-medium text-indigo-600 hover:text-indigo-500">
                Dont have an Account
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="javascript:;" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot Password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
