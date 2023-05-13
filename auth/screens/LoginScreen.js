import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay"

import { login } from '../util/auth';
import { Alert } from 'react-native';

import { useContext, useState } from 'react';
import { AuthContext } from "../store/auth-context"


function LoginScreen() {
  const [isAuthencticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)

  async function loginHandler({email, password}) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "Authentication failed!", 
        "Could not log you in. Please check your credentials or try again later"
      )
      setIsAuthenticating(false)
    }
    
  }

  if(isAuthencticating) {
    return <LoadingOverlay message="Logging you in..."/>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
