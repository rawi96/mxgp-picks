import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Race } from '../lib/types';
import { dateToStringForNativeInput, REGEX_DATE } from '../utils/utils';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  title: string;
  date: string;
  factor: string;
  wildcardPos: string;
}

type Props = {
  addRace: (race: Race) => void;
  editRace: (id: string, race: Race) => void;
  prefilledRace: Race | null;
};

const RaceForm: FC<Props> = ({ addRace, editRace, prefilledRace }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const race: Race = {
      id: prefilledRace?.id || uuidv4(),
      title: data.title,
      date: new Date(data.date),
      factor: Number(data.factor),
      wildcardPos: Number(data.wildcardPos),
    };

    if (prefilledRace) {
      editRace(race.id, race);
    } else {
      addRace(race);
    }
  };
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-700">Race</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="mt-1">
              <input
                id="title"
                type="text"
                className={errors.title ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRace?.title}
                {...register('title', { required: true })}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600" id="title-error">
                  {errors.title && 'Title is required!'}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1">
              <input
                id="date"
                type="date"
                className={errors.date ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRace?.date ? dateToStringForNativeInput(prefilledRace.date) : ''}
                {...register('date', { required: true, pattern: REGEX_DATE })}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600" id="date-error">
                  {errors.date?.type === 'required' ? 'Date is required!' : 'Date must have pattern dd.mm.yyyy!'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="factor" className="block text-sm font-medium text-gray-700">
              Factor
            </label>
            <div className="mt-1">
              <input
                id="factor"
                type="number"
                className={errors.factor ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRace?.factor}
                {...register('factor', { required: true })}
              />
              {errors.factor && (
                <p className="mt-2 text-sm text-red-600" id="factor-error">
                  {errors.factor && 'Factor is required!'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="wildcardPos" className="block text-sm font-medium text-gray-700">
              Wildcard Position
            </label>
            <div className="mt-1">
              <input
                id="wildcardPos"
                type="number"
                className={errors.wildcardPos ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRace?.wildcardPos}
                {...register('wildcardPos', { required: true, min: 6, max: 15 })}
              />
              {errors.wildcardPos && (
                <p className="mt-2 text-sm text-red-600" id="wildcard-error">
                  {errors.wildcardPos?.type === 'required' ? 'Wildcard is required!' : 'Wildcard must be between 6 and 15!'}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-gray-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaceForm;
