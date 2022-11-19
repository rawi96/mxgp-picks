import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { useShowNotification } from '../lib/utils/utils';

const useVerifyAccountMessage = () => {
  const { showNotification } = useShowNotification();
  const resendMail = async () => {
    const res = await fetch(`api/users/resend-verification-email`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });
    if (res.ok) {
      showNotification('Verification email sent', 'Success');
    } else {
      const data = await res.json();
      showNotification(data.message || 'Something went wrong!', 'Error');
    }
  };
  return resendMail;
};

const VerifyAccountMessage: FC = () => {
  const resendMail = useVerifyAccountMessage();
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">Verify your account!</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="mb-8">
              We&apos;ve sent you an email with a link to verify your account. Please check your inbox and click the link to
              verify your account.
            </p>
            <a
              onClick={() => {
                resendMail();
              }}
              className="font-medium text-gray-700 hover:text-gray-900 underline cursor-pointer block"
            >
              Resend verification email
            </a>
            <a
              onClick={() => signOut()}
              className="font-medium text-gray-700 hover:text-gray-900 underline cursor-pointer block mt-8"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountMessage;
