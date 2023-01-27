import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import ProfileForm from '../components/ProfileForm';
const useProfileRoute = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'loading' && !session.data?.user?.id) {
      router.push('/');
    }
  }, [session, router]);

  return session;
};

const Profile: FC = () => {
  const session = useProfileRoute();
  const [formType, setFormType] = useState<'username' | 'password'>('username');
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {session.data?.user?.id ? (
        <Layout>
          <div className="flex justify-center">
            <h2 className="font-semibold text-red-700 text-2xl mb-10">Profile</h2>
          </div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-red-900">Personal Information</h3>
            </div>
            <div className="border-t border-red-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-red-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-red-500">Username</dt>
                  <dd className="mt-1 flex text-sm text-red-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">{session.data.user.username}</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          setFormType('username');
                          setShowForm(true);
                        }}
                        type="button"
                        className="rounded-md bg-white font-medium text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-red-500">Password</dt>
                  <dd className="mt-1 flex text-sm text-red-900 sm:col-span-2 sm:mt-0">
                    <span className="flex-grow">**********</span>
                    <span className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          setFormType('password');
                          setShowForm(true);
                        }}
                        type="button"
                        className="rounded-md bg-white font-medium text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                    </span>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-red-500">Email address</dt>
                  <dd className="mt-1 text-sm text-red-900 sm:col-span-2 sm:mt-0">{session.data.user.email}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-red-500">Score</dt>
                  <dd className="mt-1 text-sm text-red-900 sm:col-span-2 sm:mt-0">{session.data.user.score}</dd>
                </div>
              </dl>
            </div>
          </div>
          <Modal open={showForm} setOpen={setShowForm}>
            <ProfileForm setShowForm={setShowForm} type={formType} />
          </Modal>
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
