export interface Theme {
  colors?: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    tertiary: string;
  };
}

export const theme: Theme = {
  colors: {
    primary: '#32AF9F',
    primaryLight: '#EEF7F1',
    primaryDark: '#19574F',
    secondary: '#E66641',
    secondaryLight: '#FCEFEC',
    tertiary: '#3F4545',
  },
};

const primaryButton = `
  cursor-pointer
  inline-flex
  items-center
  border
  border-transparent
  font-medium
  shadow-sm
  text-white
  w-full
  flex 
  justify-center


  bg-green-600
  hover:bg-green-700
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-green-500
`;

const secondaryButton = `
  cursor-pointer
  inline-flex 
  items-center 
  border 
  font-medium 
  shadow-sm 
  w-full
  flex 
  justify-center
  
  text-gray-700 
  border-gray-500 
  bg-white 

  hover:bg-gray-50
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  focus:ring-gray-500

  `;

const size1 = `
  px-2.5 py-1.5 text-xs rounded
  `;

const size2 = `
  px-3 py-2 text-sm leading-4  rounded-md
  `;

const size3 = `
  px-4 
  py-2 
  text-sm 
  rounded-md
  `;
const size4 = `
  px-4 py-2 text-base rounded-md 
  `;
const size5 = `
  px-6 py-3 text-base rounded-md
  `;

export const customButton = {
  primary: primaryButton,
  secondary: secondaryButton,

  size: {
    one: size1,
    two: size2,
    three: size3,
    four: size4,
    five: size5,
  },
};

export const joinClassNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};
