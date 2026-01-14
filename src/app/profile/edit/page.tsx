import { getProfile } from "@/app/actions/auth.actions";
import { redirect } from "next/navigation";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Volt Shop",
};

export default async function EditProfilePage() {
  const user = await getProfile();

  if (!user) redirect('/auth');

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>
      <EditProfileForm user={user} />
    </div>
  )
}