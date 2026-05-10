"use client"

import { Task, User } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MoreHorizontal, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TaskCardProps {
  task: Task
  assignee?: User
}

const statusColors = {
  "To Do": "text-blue-400 bg-blue-500/10",
  "In Progress": "text-orange-400 bg-orange-500/10",
  "Done": "text-primary bg-primary/10",
}

export function TaskCard({ task, assignee }: TaskCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card group border-white/[0.03] hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-6">
        <Badge variant="outline" className={cn("rounded-xl border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]", statusColors[task.status as keyof typeof statusColors])}>
          {task.status}
        </Badge>
        <button className="text-slate-500 hover:text-white transition-colors">
          <MoreHorizontal className="size-5" />
        </button>
      </div>
      
      <h4 className="text-xl font-black text-slate-100 mb-4 group-hover:text-primary transition-colors leading-tight">
        {task.title}
      </h4>
      
      <p className="text-sm text-slate-400 font-medium line-clamp-3 mb-8 leading-relaxed">
        {task.description}
      </p>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
          <span>Completion</span>
          <span className="text-primary">85%</span>
        </div>
        <div className="w-full h-2 bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            className="h-full bg-gradient-to-r from-primary to-orange-300 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.3)]" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.05]">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-xs font-black text-slate-500 uppercase tracking-widest">
            <Clock className="size-4 mr-2 text-primary/60" />
            {format(new Date(task.dueDate), "MMM d")}
          </div>
        </div>
        
        {assignee && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:inline">Assignee</span>
            <Avatar className="size-10 ring-4 ring-white/5 shadow-2xl">
              <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-black text-xs">{assignee.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </motion.div>
  )
}