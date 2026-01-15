'use client'

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {loginAction} from "@/app/actions/auth.actions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

const formSchema = z.object({
  email: z.email({ message: 'Enter a correct email' }),
  password: z.string().min(6, 'Minimum 6 characters')
})

export type TypeLoginSchema = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: TypeLoginSchema)=> {
    startTransition(async () => {
      const res = await loginAction(values);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Welcome back!');
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
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
          {isPending ? 'Login...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}