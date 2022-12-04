import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import { ModalsContext } from '../../context/modalsContext';
import { useShowNotification } from '../../hooks/useShowNotifications';

const useVerifyAccount = () => {
  const router = useRouter();
  const { showNotification } = useShowNotification();
  const { setLoginModalOpen } = useContext(ModalsContext);
  const { userId, token } = router.query;
  const session = useSession();

  useEffect(() => {
    if (!userId || !token) {
      return;
    }
    const verifyAccount = async () => {
      const response = await fetch(`/api/users/verify-account/${userId}?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        router.push('/');
        showNotification('Your account has been successfully verified.', 'Success');
        if (session.status !== 'loading' && !session.data?.user?.id) {
          setLoginModalOpen(true);
        }
      } else {
        showNotification('Something went wrong', 'Error');
      }
    };
    verifyAccount();
  }, [userId, token, session, setLoginModalOpen, showNotification, router]);
};

const VerifyAccount: FC = () => {
  useVerifyAccount();
  return (
    <Layout hideVerifyAccountMessage={true}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-700">Verify Account</h1>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyAccount;

//secure your API routes is verified
