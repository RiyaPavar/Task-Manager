"use client";

import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function TeamCardActions({ userName, userEmail }: { userName: string, userEmail?: string }) {
  const { toast } = useToast()

  const handleEmail = () => {
    if (userEmail) {
      window.open(`mailto:${userEmail}`, '_blank');
    } else {
      toast({
        title: "Email Client Opened",
        description: `Drafting email to ${userName}...`,
      })
    }
  }

  const handleChat = () => {
    toast({
      title: "Direct Message",
      description: `Opened secure channel with ${userName}.`,
    })
  }

  const handleOptions = () => {
    toast({
      title: "Options",
      description: `Viewing advanced options for ${userName}.`,
    })
  }

  return (
    <div className="pt-4 flex items-center justify-center gap-4">
      <Button variant="ghost" size="icon" onClick={handleEmail} className="size-12 rounded-2xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
        <Mail className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleChat} className="size-12 rounded-2xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
        <MessageSquare className="size-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleOptions} className="size-12 rounded-2xl bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
        <MoreHorizontal className="size-5" />
      </Button>
    </div>
  )
}
