import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import LoadingOverlay from "../components/ui/LoadingOverlay"

import { AuthContext } from "../store/auth-context"

function SignupScreen() {
  const [isAuthencticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)
  async function signupHandler({email, password}) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "Authentication failed!", 
        "Could not create user. Please check your input or try again later"
      )
      setIsAuthenticating(false)
    }
    
    
  }

  if(isAuthencticating) {
    return <LoadingOverlay message="Creating user..."/>
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
