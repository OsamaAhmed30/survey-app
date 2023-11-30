import { useRef, useState } from "react"
import axiosClient  from "../axios"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";


 export const Signup=()=> {

    const {setCurrentUser ,currentUser, setUserToken} = useStateContext();
    const navigate= useNavigate()
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [error , setError] = useState({__html:''});

    const onSubmit = (e)=>{
      e.preventDefault();
      setError({__html:''})
      const payload={
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
        password_confirmation : passwordConfirmationRef.current.value
      }
      axiosClient.post('signup',payload).then(({data})=>{
        setUserToken(data.token)
        setCurrentUser(data.user)
      }).catch((errors)=>{
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
              Signup for free
            </h2>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error.__html&&<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>}
            <form onSubmit={onSubmit} className="space-y-6"  method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                  ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    ref={nameRef}
                    id="name"
                    name="name"
                    type="text"
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
                 
                </div>
                <div className="mt-2">
                  <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                 
                </div>
                <div className="mt-2">
                  <input
                    ref={passwordConfirmationRef}
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                 onClick={onSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Have Account?{' '}
              <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log in Now 
              </a>
            </p>
          </div>
      </>
    )
  }
  