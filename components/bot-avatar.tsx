import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { EyeIcon } from "lucide-react"

export const BotAvatar = () => {
    return(
        <Avatar className="h-8 w-8">
            <EyeIcon />
        </Avatar>
    )
}