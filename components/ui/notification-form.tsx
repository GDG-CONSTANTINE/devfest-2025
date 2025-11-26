"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Input } from "./input"
import { LiquidButton } from "../animate-ui/components/buttons/liquid"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name cannot exceed 50 characters"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name cannot exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
})

function NotificationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subsucribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' })
        form.reset()
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' })
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <div className="flex max-sm:flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First name"
                      className="w-full"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last name"
                      className="w-full"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex max-sm:flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="not-placeholder-shown:lowercase w-full"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LiquidButton type="submit" className="h-11 cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Notify Me
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </LiquidButton>
          </div>
        </form>
      </Form>
      {message && (
        <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}

export default NotificationForm
