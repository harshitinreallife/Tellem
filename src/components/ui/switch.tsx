"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-3xl transition-all duration-300 ease-out outline-none",
        "border border-pink-200",
        "shadow-[0_2px_10px_rgba(237,28,125,0.08)]",
        "focus-visible:ring-4 focus-visible:ring-pink-200/10",

        // Size
        "data-[size=default]:h-4 data-[size=default]:w-7",
        "data-[size=sm]:h-5 data-[size=sm]:w-9",

        // Checked
        "data-checked:bg-[#ED1C7D]",

        // Unchecked
        "data-unchecked:bg-[#f4cade]",

        // Disabled
        "data-disabled:cursor-not-allowed data-disabled:opacity-60",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-3 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground ml-0.5 "
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
