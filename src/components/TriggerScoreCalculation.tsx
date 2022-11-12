import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

const TriggerScoreCalculation: FC = () => {
  const triggerScoreCalculation = () => {
    fetch('/api/score-calculation', {
      method: 'POST',
      credentials: 'same-origin',
    });
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={triggerScoreCalculation}
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <RocketLaunchIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Trigger score calculation
      </button>
    </div>
  );
};

export default TriggerScoreCalculation;
