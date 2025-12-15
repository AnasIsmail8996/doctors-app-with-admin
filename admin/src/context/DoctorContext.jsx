import React, { createContext } from "react";

// ✅ Always name contexts in PascalCase (you did this right)
export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const value = {};

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
