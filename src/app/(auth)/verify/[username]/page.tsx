'use client'

import { verifySchema } from "@/schemas/verifySchema"
import { apiResponse } from "@/types/apiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { FaApple, FaAndroid } from "react-icons/fa";
import Image from "next/image"



const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const params = useParams<{ username: string }>()


    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ''
        }


    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        const start = Date.now();
        setIsSubmitting(true)
        try {
            const response = await axios.post('/api/verify-code', {
                username: params.username,
                code: data.code
            })

              toast.success("Email verified successfully", {
                description: "You can now login",
            });

            const elapsed = Date.now() - start;

        

            if (elapsed < 3000) {
                await new Promise((resolve) =>
                    setTimeout(resolve, 3000 - elapsed)
                );
            }


          
            router.replace('/sign-in')

        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            toast.error(axiosError.response?.data.message || "Error signing up", {
                description: "Verification Failed",
                position: "top-right",
                duration: 5000
            })

        }
        finally {
            setIsSubmitting(false)
        }

    }


    return (
         <section className="relative text-black flex flex-col items-center w-full max-w-full lg:w-372 mx-auto rounded-t-[24px] md:rounded-t-[30px] justify-center px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 md:pt-15 pb-12 md:pb-15 bg-white max-h-screen">
            <div className="">


                <div className="">
                    <Image
                        className="Hero-nav absolute top-2 -left-2 sm:top-1 sm:-left-3 md:-top-6 md:-left-4 lg:-top-7 lg:-left-5 w-40 sm:w-40 md:w-56 lg:w-67.5 h-auto"
                        src={'/images/tellem.png'}
                        alt="Tell'em logo"
                        width={350}
                        height={300}
                    />
                </div>


                {/* APP DOWNLOAD BOX */}
                <div className="Hero-nav z-5 absolute right-2 top-7 sm:right-4 sm:top-7 md:right-10 md:top-14 md:-translate-y-1/2 flex h-9 sm:h-10 md:h-12 items-center overflow-hidden rounded-4xl bg-black ">

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

        <div className="flex items-center justify-center w-full mt-16 sm:mt-24 lg:mt-32 gap-10 px-2">

        <div className="w-full h-fit max-w-lg my-2 p-6 sm:p-10 lg:p-15 space-y-3 rounded-3xl border border-gray-200 bg-black/1">
                    <div className="text-center">
                        <h1 className="text-xl font-extrabold tracking-wide lg:text-3xl mb-6">Verify Your Account</h1>
                    </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                    <Controller
                        name="code"
                        control={form.control}
                        render={({ field }) => (

                            < Field >
                                <FieldLabel className="text-lg lg:text-lg mb-1 tracking-wider">
                                    Verification Code
                                </FieldLabel>
                                <Input
                                    className="py-5 mb-1 text-sm lg:text-md placeholder:text-gray-600 tracking-wider transition-all duration-300 focus:scale-[1.01] "
                                    placeholder="Enter Your Code"
                                    {...field}
                                />
                                <FieldDescription className="text-gray-600 text-sm mx-2">
                                    Verification code is sent to your email
                                </FieldDescription>
                            </Field>
                        )}
                    />

                        <Button type="submit" className="w-full hover:bg-pink-400 text-md p-6 gap-2 text-gray-900 bg-pink-300 rounded-2xl flex items-center justify-center" disabled={isSubmitting}>{isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            'Verify'
                        )}</Button>












                </form>
        </div>


            
        </div>
        </section>
    )
}
export default page



