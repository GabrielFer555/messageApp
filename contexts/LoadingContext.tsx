import { refEqual } from "firebase/firestore";
import React, { createContext, useState } from "react";



export const loadingContext = createContext({loading:false, setLoading:null});


const LoadingContext = ({children}) => {
    const [loading, setLoading] = useState(false)
  return (
    <loadingContext.Provider value={{loading, setLoading}}>
        {children}
    </loadingContext.Provider>
  )
}

export default LoadingContext