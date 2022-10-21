import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Rider } from '../lib/types';
import Alert from './Alert';

const INPUT_VALID_CLASSES =
  'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm';
const INPUT_INVALID_CLASSES =
  'block w-full rounded-md border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm';

interface FormInput {
  firstname: string;
  lastname: string;
  numberplate: string;
}

type Props = {
  addRider: (rider: Rider) => void;
  editRider: (id: string, rider: Rider) => void;
  prefilledRider: Rider | null;
};

const AddRider: FC<Props> = ({ addRider, editRider, prefilledRider }) => {
  const [alert, setAlert] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const rider: Rider = {
      id: prefilledRider?.id || uuidv4(),
      firstname: data.firstname,
      lastname: data.lastname,
      numberplate: Number(data.numberplate),
    };

    if (prefilledRider) {
      editRider(rider.id, rider);
    } else {
      addRider(rider);
    }
  };
  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">Rider</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {alert && <Alert text={alert} />}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <div className="mt-1">
              <input
                id="firstname"
                type="text"
                className={errors.firstname ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRider?.firstname}
                {...register('firstname', { required: true })}
              />
              {errors.firstname && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.firstname && 'Firstname is required!'}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <div className="mt-1">
              <input
                id="lastname"
                type="text"
                className={errors.lastname ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRider?.lastname}
                {...register('lastname', { required: true })}
              />
              {errors.lastname && (
                <p className="mt-2 text-sm text-red-600" id="username-error">
                  {errors.lastname && 'Lastname is required!'}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="numberplate" className="block text-sm font-medium text-gray-700">
              Numberplate
            </label>
            <div className="mt-1">
              <input
                id="numberplate"
                type="number"
                className={errors.numberplate ? INPUT_INVALID_CLASSES : INPUT_VALID_CLASSES}
                defaultValue={prefilledRider?.numberplate}
                {...register('numberplate', { required: true })}
              />
              {errors.numberplate && (
                <p className="mt-2 text-sm text-red-600" id="username-error">
                  {errors.numberplate && 'Numberplate is required!'}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRider;
