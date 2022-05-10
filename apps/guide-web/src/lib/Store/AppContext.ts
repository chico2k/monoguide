import { State } from './types';
import React, { useContext } from 'react';

// Create Context
export const Context = React.createContext<any>(null);

// Create Helper Function to use Context in Components
// Needed for jest mock
// https://medium.com/7shifts-engineering-blog/testing-usecontext-react-hook-with-enzyme-shallow-da062140fc83
/* istanbul ignore file */
export const useAppContext = (): { state: State; dispatch: any } => useContext(Context);
