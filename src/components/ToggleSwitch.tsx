import { Switch } from '@headlessui/react';
import { FC } from 'react';
import { classNames } from '../lib/utils/utils';

type Props = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

const ToggleSwitch: FC<Props> = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-red-600' : 'bg-red-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
};

export default ToggleSwitch;
