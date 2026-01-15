'use client'

import {z} from "zod";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {registerAction} from "@/app/actions/auth.actions";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const formSchema = z.object({
  fullName: z.string().min(3, 'Minimum 3 characters').max(32, 'Maximum 32 characters').optional().or(z.literal('')),
  email: z.email({ message: 'Enter a correct email' }),
  password: z.string().min(6, 'Minimum 6 characters')
})

export type TypeRegisterSchema = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: TypeRegisterSchema)=> {

    const cleanedValues = {
      ...values,
      fullName: values.fullName?.trim() === '' ? undefined : values.fullName
    };

    startTransition(async () => {
      const res = await registerAction(cleanedValues);
      if (res?.error) {
        toast.error(res.error); // 👈 Тост
      } else {
        toast.success('Account created!');
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name (Optional)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="German Antonov" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@mail.com" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} disabled={isPending}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? 'Register...' : 'Register'}
        </Button>
      </form>
    </Form>
  )
}