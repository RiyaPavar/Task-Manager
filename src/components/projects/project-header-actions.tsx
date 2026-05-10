"use client";

import { Button } from "@/components/ui/button"
import { Settings, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ActionModal } from "@/components/modals/action-modal"
import Link from "next/link"

export function ProjectHeaderActions() {
  const { toast } = useToast()

  const handleSettings = () => {
    toast({
      title: "Project Settings",
      description: "Opening advanced configuration options...",
    })
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="size-16 rounded-[1.75rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-400 hover:text-white" asChild>
        <Link href="/settings">
          <Settings className="size-7" />
        </Link>
      </Button>
      <ActionModal 
        type="task"
        title="Assign Mission"
        description="Create a new task and assign it to an operative."
        trigger={
          <Button className="premium-button h-16 px-10 gap-4 text-[13px]">
            <Plus className="size-6" />
            Assign Mission
          </Button>
        }
      />
    </div>
  )
}
