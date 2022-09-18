import React from "react";
export const Context = React.createContext();
export function ContextWrapper({ children }) {
  let context = {/* whatever you want */}

  return (
    <Context.Provider value={[context, setContext]}>
      {children}
    </Context.Provider>
  );
}
