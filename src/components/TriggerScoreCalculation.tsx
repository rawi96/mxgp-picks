import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import { useShowNotification } from '../lib/utils/utils';
import Spinner from './Spinner';

const TriggerScoreCalculation: FC = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useShowNotification();

  const triggerScoreCalculation = async () => {
    setLoading(true);
    const res = await fetch('/api/score-calculation', {
      method: 'POST',
      credentials: 'same-origin',
    });
    if (res.ok) {
      setLoading(false);
      showNotification('Successfully calculated score!', 'Success');
    } else {
      setLoading(false);
      showNotification('Something went wrong!', 'Error');
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={triggerScoreCalculation}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        {loading ? (
          <>
            <Spinner />
            Loading...
          </>
        ) : (
          <>
            <RocketLaunchIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Trigger score calculation
          </>
        )}
      </button>
    </div>
  );
};

export default TriggerScoreCalculation;
