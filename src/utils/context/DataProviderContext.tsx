import { createContext } from 'react';
import type {
  ContextType1, ContextType2, ContextType3, ContextType4, ContextType5
} from '@utils/dataProcessing/types';
import { 
  skeleton_context1,
  skeleton_context2,
  skeleton_context3,
  skeleton_context4,
  skeleton_context5,
} from '@utils/dataProcessing/types'; 


const TheContextEG1 = createContext<ContextType1>( // For Entry Group1 (EG1)
  skeleton_context1
);
const TheContextEG2 = createContext<ContextType2>( // For Entry Group2 (EG2)
  skeleton_context2
);
const TheContextEG3 = createContext<ContextType3>( // For Entry Group3 (EG3)
  skeleton_context3
);
const TheContextEG4 = createContext<ContextType4>( // For Entry Group4 (EG4)
  skeleton_context4
);
const TheContextEG5 = createContext<ContextType5>( // For Entry Group5 (EG5)
  skeleton_context5
);

// ...
export function TheContextEG1Provider({ value, children }: {
  value: ContextType1;
  children: React.ReactNode;
}) {
  return (
    <TheContextEG1.Provider value={value}>
      {children}
    </TheContextEG1.Provider>
  );
}

// ...
export function TheContextEG2Provider({ value, children }: {
  value: ContextType2;
  children: React.ReactNode;
}) {
  return (
    <TheContextEG2.Provider value={value}>
      {children}
    </TheContextEG2.Provider>
  );
}

// ...
export function TheContextEG3Provider({ value, children }: {
  value: ContextType3;
  children: React.ReactNode;
}) {
  return (
    <TheContextEG3.Provider value={value}>
      {children}
    </TheContextEG3.Provider>
  );
}

// ...
export function TheContextEG4Provider({ value, children }: {
  value: ContextType4;
  children: React.ReactNode;
}) {
  return (
    <TheContextEG4.Provider value={value}>
      {children}
    </TheContextEG4.Provider>
  );
}

// ...
export function TheContextEG5Provider({ value, children }: {
  value: ContextType5;
  children: React.ReactNode;
}) {
  return (
    <TheContextEG5.Provider value={value}>
      {children}
    </TheContextEG5.Provider>
  );
}