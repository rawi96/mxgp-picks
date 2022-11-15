import { useRouter } from 'next/router';
import { FC, useContext, useEffect } from 'react';
import Layout from '../../components/Layout';
import { ModalsContext } from '../../context/modalsContext';
import { useShowNotification } from '../../lib/utils/utils';

const useConfirmUser = () => {
  const router = useRouter();
  const { showNotification } = useShowNotification();
  const { setLoginModalOpen } = useContext(ModalsContext);
  const { userId, token } = router.query;

  useEffect(() => {
    if (!userId || !token) {
      return;
    }
    const confirmUser = async () => {
      const response = await fetch(`/api/users/confirm-user/${userId}?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        showNotification('Your email has been confirmed. You can now log in.', 'Success');
        setLoginModalOpen(true);
        router.push('/');
      } else {
        showNotification('Something went wrong', 'Error');
      }
    };
    confirmUser();
  }, [userId, token]);
};

const FilteredRankingPage: FC = () => {
  useConfirmUser();
  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-700">Confirm User</h1>
        </div>
      </div>
    </Layout>
  );
};

export default FilteredRankingPage;
