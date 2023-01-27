import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import ProfileForm from '../../components/ProfileForm';

const ResetPassword: FC = () => {
  const router = useRouter();
  const { userId, token } = router.query;
  const [profileFormOpen, setProfileFormOpen] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      return;
    }
    setProfileFormOpen(true);
  }, [userId, token]);
  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-red-700">Reset Password</h1>
        </div>
      </div>
      <Modal open={profileFormOpen} setOpen={setProfileFormOpen}>
        {token && userId && (
          <ProfileForm
            setShowForm={setProfileFormOpen}
            type={'reset-password'}
            passwordResetToken={token as string}
            userId={userId as string}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default ResetPassword;
