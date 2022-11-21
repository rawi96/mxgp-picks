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
}

const SendResetPasswordMailForm: FC = () => {
  const { showNotification } = useShowNotification();
  const { setSendResetPasswordMailModalOpen } = useContext(ModalsContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true);
    const res = await fetch(`api/users/send-reset-password-mail`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setLoading(false);

    if (res.ok) {
      setSendResetPasswordMailModalOpen(false);
      showNotification(json.message || 'Reset Password Email sent.', 'Success');
    } else {
      showNotification(json.message || 'Something went wrong!', 'Error');
    }
  };
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">Reset Password</h2>

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
                'Send Reset Email'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendResetPasswordMailForm;
