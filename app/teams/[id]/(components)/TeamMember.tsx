import { User as Member } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TeamMember: React.FC<Member> = ({
  avatarUrl,
  username,
  email,
}) => {
  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg bg-muted">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback className="bg-white">
          {username
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none">{username}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};
