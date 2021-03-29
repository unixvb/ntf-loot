import { createContext } from 'react';

interface Interface {
  hatIndex: number,
  mouthIndex: number
}

export const ActiveModelState = createContext<Interface>({ hatIndex: 0, mouthIndex: 0 });

