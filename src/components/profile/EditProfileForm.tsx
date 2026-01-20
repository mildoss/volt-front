'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {ChangeEvent, useTransition} from "react";
import { updateProfile, uploadFile } from "@/app/actions/user.actions";
import { User } from "@/types/product";
import { useRouter } from "next/navigation";
import {toast} from "sonner";
import {UserAvatar} from "@/components/ui/user-avatar";
import {Camera} from "lucide-react";

const formSchema = z.object({
  email: z.email(),
  fullName: z.string().min(2, "Name is too short").optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  avatarUrl: z.string().optional().or(z.literal('')),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length > 0 && !data.oldPassword) {
    return false;
  }
  return true;
}, {
  message: "Enter old password to change it",
  path: ["oldPassword"]
});

type TypeEditProfileSchema = z.infer<typeof formSchema>;

export const EditProfileForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TypeEditProfileSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      fullName: user.fullName || '',
      phone: user.phone || '',
      address: user.address || '',
      avatarUrl: user.avatarUrl || '',
      password: '',
      oldPassword: ''
    }
  });

  const onSubmit = (values: TypeEditProfileSchema) => {
    const dataToSend = {
      email: values.email,
      fullName: values.fullName,
      phone: values.phone,
      address: values.address,
      avatarUrl: values.avatarUrl,
      ...(values.password ? { password: values.password, oldPassword: values.oldPassword } : {})
    };

    startTransition(async () => {
      const res = await updateProfile(dataToSend);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Profile updated successfully! ✅");
        router.refresh();
        router.push('/profile');
      }
    });
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append('media', files[0]);

    const loadingToast = toast.loading('Uploading avatar...');

    const res = await uploadFile(formData);

    toast.dismiss(loadingToast);

    if (res?.error) {
      toast.error(res.error);
    } else {
      form.setValue('avatarUrl', res.url);
      toast.success('Avatar uploaded!');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto bg-card p-6 rounded-xl border shadow-sm">

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative group">
            <UserAvatar
              user={{
                ...user,
                avatarUrl: form.watch('avatarUrl') || user.avatarUrl,
                fullName: form.watch('fullName') || user.fullName,
                email: form.watch('email') || user.email
              }}
              size={100}
              className="text-4xl border-4 border-background shadow-lg"
            />

            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-sm">
              <Camera size={16} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={isPending}
              />
            </label>
          </div>
          <p className="text-sm text-muted-foreground">Click on the icon to change avatar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
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
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+380..." {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Address</FormLabel>
                <FormControl>
                  <Input placeholder="City, Street..." {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Скрытое поле, чтобы аватарка отправлялась вместе с формой */}
        <input type="hidden" {...form.register('avatarUrl')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Required if changing" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-1/2 cursor-pointer"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-1/2 cursor-pointer" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}