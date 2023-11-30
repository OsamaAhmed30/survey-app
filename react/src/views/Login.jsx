import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function Login() {
  const {setCurrentUser ,currentUser, setUserToken} = useStateContext();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error , setError] = useState({__html:''});





  const onSubmit = (e)=>{
    e.preventDefault();
    setError({__html:''})
    const payload={
     
      email:emailRef.current.value,
      password:passwordRef.current.value,
     
    }
    axiosClient.post('/login',payload).then(({data})=>{
      setUserToken(data.token)
      setCurrentUser(data.user)
    }).catch((errors)=>{
      console.log(errors);
      if(errors.response){
        console.log(errors);
        const response =Object.values( errors.response.data.errors);
        const finalErrors = response.reduce((acc,current)=>[...acc,...current],[])
        setError({__html:finalErrors.join('<br>')});
        console.log(error);
      }
    })

    
  }
    return (
      <>
       
     
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error.__html&&<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>}
            <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    ref={emailRef}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    ref={passwordRef}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register Now For Free
              </a>
            </p>
          </div>
      </>
    )
  }
  
  