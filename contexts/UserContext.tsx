import { User } from "firebase/auth";
import { createContext, useContext, useState } from "react";


interface UserContextType {
    user?:User | null,
    setUser: Function
  }
  
  // Create the context with initial value of type UserContextType
  export const userContext = createContext<UserContextType>({
    user: null,
    setUser: null
  });



const UserContext = ({children}) => {
    const [user, setUser]= useState<User>(null)



  return (
    <userContext.Provider value={{user:user, setUser }}>
        {children}
    </userContext.Provider>
  )
}

export default UserContext