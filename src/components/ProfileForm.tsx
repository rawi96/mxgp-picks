import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ModalsContext } from '../context/modalsContext';
import { REGEX_PASSWORD, useShowNotification } from '../lib/utils/utils';
import Spinner from './Spinner';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type Props = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  type: 'username' | 'password' | 'reset-password';
  passwordResetToken?: string;
  userId?: string;
};

const ProfileForm: FC<Props> = ({ setShowForm, type, passwordResetToken, userId }) => {
  const { showNotification } = useShowNotification();
  const { setLoginModalOpen } = useContext(ModalsContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    const res = await fetch(type === 'reset-password' ? '/api/users/reset-password' : '/api/users', {
      method: type === 'reset-password' ? 'POST' : 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({ ...data, passwordResetToken, userId }),
    });

    const json = await res.json();
    setLoading(false);

    if (res.ok) {
      setShowForm(false);
      showNotification(json.message || 'Successfully changed!', 'Success');
      if (type === 'reset-password') {
        router.push('/');
        setLoginModalOpen(true);
      } else {
        window.location.reload();
      }
    } else {
      showNotification(json.message || 'Something went wrong!', 'Error');
    }
  };
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">
        {type == 'reset-password' ? 'Reset Password' : `Change ${type}`}
      </h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {type === 'username' && (
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
          )}
          {type === 'password' && (
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <div className="mt-1">
                <input
                  id="oldPassword"
                  type="password"
                  className={errors.oldPassword ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                  {...register('oldPassword', { required: true })}
                />
                {errors.oldPassword && (
                  <p className="mt-2 text-sm text-red-600" id="old-password-error">
                    {errors.oldPassword && 'Old password is required!'}
                  </p>
                )}
              </div>
            </div>
          )}

          {type.includes('password') && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="newPassword"
                    type="password"
                    className={errors.newPassword ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                    {...register('newPassword', { required: true, pattern: REGEX_PASSWORD })}
                  />
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600" id="password-error">
                      {errors.newPassword?.type === 'required' && 'Password is required!'}
                      {errors.newPassword?.type === 'pattern' &&
                        'Password must contain minimum 6 and at least one numeric digit, one uppercase and one lowercase letter!'}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    type="password"
                    className={errors.confirmPassword ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                    {...register('confirmPassword', {
                      required: 'Password confirmation is required!',
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { newPassword } = getValues();
                          return newPassword === value || 'Passwords should match!';
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
            </>
          )}

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
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
