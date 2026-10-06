'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Form, useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schemas/signUpSchema"
import { apiResponse } from "@/types/apiResponse"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { FaApple, FaAndroid } from "react-icons/fa";
import TellemLogo from "@/components/TellemLogo"

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debounced = useDebounceCallback(setUsername, 2000)
  const router = useRouter()


  // zod implementation 

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })


  // username validation check username unique
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get<apiResponse>(`/api/check-username-unique?username=${username}`)

          setUsernameMessage(response.data.message)

        }
        catch (error) {
          const axiosError = error as AxiosError<apiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        }
        finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [username])


  const onSubmit = async (data: z.infer<typeof signupSchema>) => {

    setIsSubmitting(true)
    try {

      const response = await axios.post<apiResponse>('/api/sign-up', data)
      console.log("Signup successful");

      toast.success(response.data.message, {
        position: "top-right",
        duration: 5000
      })

      router.replace(`/verify/${username}`)
      //redirecting user to verify page after signup successfully $username is just url path parameter we send it to verify page.

      setIsSubmitting(false)

    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>
      toast.error(axiosError.response?.data.message, {
        description: "Please try again",
        position: "top-right",
        duration: 5000
      })
      setIsSubmitting(false)
    }

  }


  return (

    <section className="relative text-black flex flex-col items-center w-full max-w-full lg:w-372 mx-auto rounded-t-[24px] md:rounded-t-[30px] justify-center px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 md:pt-15 pb-12 md:pb-15 bg-white max-h-screen">
      <div className="">


        <div className="">
          {/* Logo */}
          <TellemLogo />
        </div>


        {/* APP DOWNLOAD BOX */}
        <div className="Hero-nav z-5 absolute right-2 top-8 sm:right-4 sm:top-10 md:right-10 md:top-14 md:-translate-y-1/2 flex h-9 sm:h-10 md:h-12 items-center overflow-hidden rounded-4xl bg-black ">

          {/* APPLE */}
          <button type="button" aria-label="Download on the App Store" className="flex h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 items-center justify-center text-white -mr-1 transition-colors duration-200 hover:text-[#ED1C7D] ">
            <FaApple size={18} className="sm:hidden" />
            <FaApple size={20} className="hidden sm:block md:hidden" />
            <FaApple size={27} className="hidden md:block" />
          </button>

          {/* DIVIDER */}
          <div className="h-4 sm:h-5 w-px bg-white" />


          {/* ANDROID */}
          <button type="button" aria-label="Get it on Google Play" className="flex -ml-1 h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 mt-0.5 md:mt-1 items-center justify-center text-white transition-colors duration-200 hover:text-[#ED1C7D]">
            <FaAndroid size={19} className="sm:hidden" />
            <FaAndroid size={21} className="hidden sm:block md:hidden" />
            <FaAndroid size={28} className="hidden md:block" />
          </button>

        </div>
      </div>




      {/* Main content*/}
      <div className="flex flex-col lg:flex-row items-center justify-evenly w-full mt-3 sm:mt-12 md:mt-20 lg:mt-20 gap-6 lg:gap-3 mb-5">
        <div className="relative lg:-top-30 lg:-left-6 text-center lg:text-left ">
          <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-[90px] tracking-tighter leading-none font-medium"><span className="text-[#EE1E7B]">sign up</span> &<br />continue</h1>
        </div>



        <div className="w-full h-auto lg:h-160 max-w-lg my-5 p-6 sm:p-8 lg:p-13 space-y-1 rounded-3xl border-2 border-pink-200">
          <div className="text-center">
            <h1 className="text-xl font-extrabold tracking-wide lg:text-4xl mb-6">join <span className="text-[#EE1E7B]">tell'em</span></h1>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)

          } className="space-y-6">
            <FieldSet className="w-full max-w-screen">
              <FieldGroup>

                <Controller
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="username" className="text-md lg:text-lg">
                        Username
                      </FieldLabel>
                      <Input
                        {...field}
                        className="py-5 text-sm lg:text-md placeholder:text-gray-600"
                        placeholder="Enter Username"
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                      />
                      <FieldDescription className="text-gray-600 mx-2 text-md">
                        Choose a unique username for your account.
                      </FieldDescription>
                      {isCheckingUsername && <Loader2 className="animate-spin" />}
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-m font-bold ${usernameMessage === 'Username is unique'
                            ? 'text-green-500'
                            : 'text-red-500'
                            }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                    </Field>
                  )}
                />
                <Controller

                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Field>

                      <FieldLabel htmlFor="email" className="text-md lg:text-lg">
                        Email
                      </FieldLabel>

                      <Input className="py-5 text-sm lg:text-md placeholder:text-gray-600"{...field} name="email" placeholder="Enter Email" />

                      <p className="text-gray-600 text-md mx-2">We will send you a verification code</p>

                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <Field>

                      <FieldLabel htmlFor="password" className="text-md lg:text-lg">
                        Password
                      </FieldLabel>

                      <Input className="py-5 placeholder:text-gray-600"  {...field} name="password" type="password" placeholder="••••••••" />


                    </Field>
                  )}
                />

              </FieldGroup>
            </FieldSet>

            <Button type="submit" className="w-full hover:bg-pink-400 cursor-pointer text-lg border-2 p-6 gap-2 text-gray-900 bg-pink-200 rounded-4xl flex items-center justify-center " disabled={isSubmitting}>

              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                'Create account'
              )}

            </Button>
          </form>



          <div className="text-center">
            <p className="text-lg">
              Already a member?{' '}
              <Link href="/sign-in" className="text-[#ED1C7B]">
                Sign in
              </Link>
            </p>
          </div>

        </div>


      </div>


    </section>
  )
}
export default page