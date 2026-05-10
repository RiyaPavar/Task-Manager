"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ActionModalProps {
  trigger: React.ReactNode
  title: string
  description: string
  type: "task" | "project" | "member"
}

export function ActionModal({ trigger, title, description, type }: ActionModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setOpen(false)
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Created!`,
      description: `Your new ${type} has been successfully added to the workspace.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] glass-panel border-white/10 bg-black/80 backdrop-blur-3xl p-0 overflow-hidden rounded-[2.5rem]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />
        
        <form action={async (formData) => {
          setIsSubmitting(true)
          try {
            if (type === "task") {
              const { createTask } = await import('@/app/actions/tasks');
              await createTask({
                title: formData.get('title'),
                dueDate: formData.get('dueDate'),
                projectId: 'p1', // Default to first project for demo
                assignedTo: 'u1'
              });
            } else if (type === "project") {
              const { createProject } = await import('@/app/actions/projects');
              await createProject({
                title: formData.get('title'),
                description: formData.get('category'),
              });
            } else if (type === "member") {
              const { createUser } = await import('@/app/actions/users');
              await createUser({
                email: formData.get('email'),
                role: formData.get('role'),
              });
            }
            
            toast({
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Created!`,
              description: `Your new ${type} has been successfully added to the workspace.`,
            })
            setOpen(false)
          } catch (e) {
            console.error(e)
          } finally {
            setIsSubmitting(false)
          }
        }} className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter text-white uppercase">{title}</DialogTitle>
            <p className="text-slate-400 font-bold text-sm mt-2">{description}</p>
          </DialogHeader>

          <div className="space-y-6">
            {type === "task" && (
              <>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Task Title</Label>
                  <Input name="title" placeholder="Define project scope..." required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Due Date</Label>
                    <Input name="dueDate" type="date" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Priority</Label>
                    <select name="priority" className="w-full h-14 glass-panel border-white/5 rounded-2xl px-4 bg-transparent text-white outline-none focus:ring-1 focus:ring-primary/20">
                      <option className="bg-black">High</option>
                      <option className="bg-black">Medium</option>
                      <option className="bg-black">Low</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {type === "project" && (
              <>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Project Name</Label>
                  <Input name="title" placeholder="Alpha Command Hub" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Category</Label>
                  <Input name="category" placeholder="Design System" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
                </div>
              </>
            )}

            {type === "member" && (
              <>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Member Email</Label>
                  <Input name="email" type="email" placeholder="colleague@company.com" required className="h-14 glass-panel border-white/5 rounded-2xl focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-black uppercase text-[10px] tracking-widest ml-1">Role</Label>
                  <select name="role" className="w-full h-14 glass-panel border-white/5 rounded-2xl px-4 bg-transparent text-white outline-none focus:ring-1 focus:ring-primary/20">
                    <option className="bg-black">Admin</option>
                    <option className="bg-black">Editor</option>
                    <option className="bg-black">Viewer</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] text-slate-500 hover:text-white hover:bg-white/5">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 premium-button h-14">
              {isSubmitting ? "Processing..." : `Create ${type}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
