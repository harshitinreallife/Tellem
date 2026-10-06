'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Form, useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Circle, Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { FaApple, FaAndroid } from "react-icons/fa";
import TellemLogo from "@/components/TellemLogo"

const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()


    // zod implementation 

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })




    const onSubmit = async (data: z.infer<typeof signInSchema>) => {

        setIsSubmitting(true)
        const start = Date.now();



        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,

        })

        if (response?.error) {
            setIsSubmitting(false);
            if (response.error === "CredentialsSignin") {

                toast.error(response?.error, {
                    description: "Login Failed,Incorrect credentials",
                    position: "top-right",
                    duration: 5000
                })
            }
            else {
                toast.error(response?.error, {
                    description: "Something went wrong,Please try again",
                    position: "top-right",
                    duration: 5000
                })
            }
        }
        if (response?.url) {

            const elapsed = Date.now() - start;
            if (elapsed < 3000) {
                await new Promise((resolve) =>
                    setTimeout(resolve, 3000 - elapsed)
                );
            }
            router.replace('/tells')
            toast.success("Login successful", {
                description: "You can now recieve anonymous tells",
            })


        }

    }


    return (
        <div className="h-screen bg-[#F6F6F6] ">

            <section className="relative text-black flex flex-col items-center w-full mx-auto justify-center px-4 sm:px-6 md:px-20 sm:pt-32 md:pt-15 pb-12  overflow-x-hidden h-full">
                <div className="">


                    <div className="">
                        {/* Logo */}
                        <TellemLogo />
                    </div>


                    {/* APP DOWNLOAD BOX */}
                    <div className="Hero-nav z-5 absolute right-2 top-9 sm:right-4 sm:top-10 md:right-10 md:top-14 md:-translate-y-1/2 flex h-9 sm:h-10 md:h-12 items-center overflow-hidden rounded-4xl bg-black ">

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







                <div className="flex flex-col lg:flex-row items-center justify-evenly w-full sm:mt-12 md:-mt-20 lg:mt-20 gap-6 lg:gap-10">

                    <div className="hidden lg:flex justify-center w-full lg:w-120">
                        <Image
                            className="relative lg:top-0 lg:-left-10 lg:ml-20 w-72"
                            src="/images/Iphone.png"
                            alt="logo"
                            width={300}
                            height={300}
                        />
                    </div>

                    <div className="w-full h-auto lg:h-130 max-w-lg my-2 p-6 sm:p-8 lg:p-13 space-y-3 rounded-3xl border-2 border-pink-200 bg-white">
                        <div className="text-center">
                            <h1 className="text-xl font-extrabold tracking-wide lg:text-3xl mb-6">sign in to send <span className="text-[#EE1E7B]">anonymous message</span></h1>
                        </div>



                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field }) => (

                                    < Field >
                                        <FieldLabel className="text-md lg:text-lg mb-1">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            className="py-5 mb-1 text-sm lg:text-md placeholder:text-gray-600 tracking-wider transition-all duration-300 focus:scale-[1.01] "
                                            placeholder="Enter Your Email"
                                            {...field}
                                        />

                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field }) => (

                                    < Field >
                                        <FieldLabel className="text-lg lg:text-lg mb-1 tracking-wider">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            className="py-5 mb-1 text-sm lg:text-md placeholder:text-gray-600 transition-all duration-300 focus:scale-[1.01] "
                                            {...field}
                                            type="password" placeholder="•••••••••••"
                                        />

                                    </Field>
                                )}
                            />

                            <Button type="submit" className="w-full hover:bg-pink-400 text-lg p-6 gap-2 text-gray-900 bg-pink-200 rounded-2xl flex items-center justify-center tracking-wider" disabled={isSubmitting}>{isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Sign In'
                            )}</Button>


                        </form>

                        <div className="text-center mt-4">
                            <p className="text-md sm:text-md">
                                Don't have an account ?
                                <Link href="/sign-up" className="text-[#ED1C7B]">
                                    {'  '}Sign up
                                </Link>
                            </p>
                        </div>


                    </div>
                </div>
            </section >
        </div>

    )
}
export default page