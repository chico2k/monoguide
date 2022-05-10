import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { KeyIcon, UserCircleIcon } from '@heroicons/react/outline';
import TextInput2 from '../../../../Components/Elements/Form/TextInput_re';
import { emailValidation } from '../../../../lib/Validation';
import * as Yup from 'yup';
import useChangeEmailInit from '../../Hooks/useChangeEmailInit';
import { Form, Formik } from 'formik';
import ButtonSubmit from '../../../../Components/Elements/Form/Button';

const subNavigation = [
  { name: 'Email', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const validationSchema = () =>
  Yup.object().shape({
    email: emailValidation,
    re_email: emailValidation,
  });
const initialValues = { email: '', re_email: '' };

export default function Example() {
  const { useChangeEmailInitHandler } = useChangeEmailInit();

  return (
    <div className="relative min-h-screen">
      <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 text-orange-600 hover:bg-white'
                      : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                    'group rounded-md px-3 py-2 flex items-center text-sm font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500',
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={useChangeEmailInitHandler}
          >
            {({ handleSubmit }) => {
              return (
                <>
                  <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                    <section aria-labelledby="payment-details-heading">
                      <Form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="bg-white py-6 px-4 sm:p-6">
                            <div>
                              <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                                Email
                              </h2>
                              <p className="mt-1 text-sm text-gray-500">
                                Update your Email. Please note that have to confirm your new Email.
                              </p>
                            </div>

                            <div className="mt-6 grid grid-cols-4 gap-6">
                              <div className="col-span-4 sm:col-span-2">
                                <TextInput2 label="Email" name="email" type="email" />
                              </div>

                              <div className="col-span-4 sm:col-span-2">
                                <TextInput2 label="Email (again)" name="re_email" type="email" />
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                              <ButtonSubmit size={3}>Set your new Email</ButtonSubmit>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </section>
                  </div>
                </>
              );
            }}
          </Formik>
        </div>
      </main>
    </div>
  );
}
