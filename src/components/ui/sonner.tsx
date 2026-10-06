"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon
            className="size-5 text-[#11d42e]"
            strokeWidth={2.2}
          />
        ),

        info: (
          <InfoIcon
            className="size-5 text-[#4F46E5]"
            strokeWidth={2.2}
          />
        ),

        warning: (
          <TriangleAlertIcon
            className="size-5 text-[#D89B00]"
            strokeWidth={2.2}
          />
        ),

        error: (
          <OctagonXIcon
            className="size-5 text-[#e11d1d]"
            strokeWidth={2.2}
          />
        ),

        loading: (
          <Loader2Icon
            className="size-5 animate-spin text-[#ED1C7D]"
            strokeWidth={2.2}
          />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "capitalize !px-4 !py-3.5 !text-[#0F0E42] !shadow-[0_10px_35px_rgba(15,14,66,0.12)] !w-[calc(100vw-2rem)] !max-w-[360px] !h-auto !min-h-[90px] !overflow-hidden !rounded-2xl !border !border-white/50 !bg-white/55 !px-4 !py-3.5 !text-[#0F0E42] !shadow-[0_12px_40px_rgba(15,14,66,0.16)] !backdrop-blur-xl !backdrop-saturate-200 !mt-8",
          title: "text-white font-semibold text-sm tracking-wide ",
          icon: "!flex !h-8 !w-8 !shrink-0 !items-center !justify-center !mb-3 !rounded-xl !bg-[#FFF0F7]",
          description: "text-gray-400 mt-1 capitalize",
          actionButton: "bg-indigo-300 text-gray-900 hover:bg-indigo-400 rounded-lg",
          cancelButton: "bg-neutral-800 text-gray-300 hover:bg-neutral-700 rounded-lg",
          closeButton: "bg-neutral-800 border-white/10 text-gray-400 hover:text-white",
          success: "!border-green-500/30",
          error: "!border-red-500/30",
          warning: "!border-yellow-500/30",
          info: "!border-blue-500/30",
          loading: "!border-indigo-500/30",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }