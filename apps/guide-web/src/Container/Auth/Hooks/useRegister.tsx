import { useRouter } from 'next/router';
import { useSignUp } from '@clerk/nextjs';

interface IValues {
  email: string;
  password: string;
  name: string;
}


const useRegister = () => {
  const router = useRouter();

  const { signUp , isLoaded} = useSignUp();



  const useRegisterHandler = async ({ email, password, name }: IValues) => {

    if(!isLoaded) return 

    try {
      const singUp =  await signUp.create({
        firstName: name,
        lastName: name,
        emailAddress: email,
        password
      });

      console.log("singUp", singUp)

      const resp = await signUp.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl: 'http://localhost:3002/auth/register/success'
      });

      console.log('resp', resp);

      // console.log('register', user);
      return router.push('/auth/register/success');
    } catch (error) {
      console.log('error', error.errors);
      if (error.code === 'UsernameExistsException')
        return router.push('/auth/register/success');
      return router.push('/auth/register/success');
    }
  };

  return { useRegisterHandler };
};

export default useRegister;
