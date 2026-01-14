import { cn } from "@/lib/utils"
import Image from "next/image"

type Props = {
  user: {
    fullName?: string | null;
    email?: string;
    avatarUrl?: string | null;
  } | null;
  className?: string;
  size?: number;
}

export const UserAvatar = ({ user, className, size = 40 }: Props) => {
  const initial = user?.fullName
    ? user.fullName[0].toUpperCase()
    : user?.email
      ? user.email[0].toUpperCase()
      : '?';

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-bold border border-border shrink-0",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {user?.avatarUrl ? (
        <Image
          src={user.avatarUrl}
          alt="Avatar"
          fill
          className="object-cover"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  )
}