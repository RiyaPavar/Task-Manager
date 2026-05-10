import { getProjectById } from "@/app/actions/projects"
import { getTasksByProjectId } from "@/app/actions/tasks"
import { TaskCard } from "@/components/tasks/task-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Layout, Search, Filter, Settings, Calendar as CalendarIcon, Briefcase, Zap, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ProjectHeaderActions } from "@/components/projects/project-header-actions"
import { ProjectTaskBoard } from "@/components/projects/project-task-board"

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)
  const tasks = await getTasksByProjectId(id)

  if (!project) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-card text-center p-12 space-y-6">
        <AlertCircle className="size-16 text-primary mx-auto" />
        <h1 className="text-3xl font-black text-white">PROJECT NOT FOUND</h1>
        <p className="text-slate-400">The project you are looking for does not exist or has been archived.</p>
        <Button className="premium-button" asChild><Link href="/projects">Return to Portfolio</Link></Button>
      </div>
    </div>
  )

  const columns = ["To Do", "In Progress", "Done"]

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Premium Project Header */}
      <header className="relative overflow-hidden rounded-[3rem] p-12 border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Briefcase className="size-64 -rotate-12" />
        </div>
        
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            <div className="size-24 rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center text-black shadow-2xl shadow-primary/30">
              <Zap className="size-10 fill-black" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-black tracking-tighter text-white uppercase">{project.title}</h1>
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                  <Star className="size-3 fill-primary" />
                  Active Hub
                </div>
              </div>
              <p className="text-xl text-slate-400 font-bold max-w-2xl leading-relaxed">{project.description}</p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {project.members?.slice(0, 5).map((m: any, i: number) => (
                    <Avatar key={i} className="size-10 ring-4 ring-background border border-white/10">
                      <AvatarImage src={m.userId.avatarUrl} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-black">{m.userId.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.members?.length > 5 && (
                    <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-black text-primary ring-4 ring-background">
                      +{project.members.length - 5}
                    </div>
                  )}
                </div>
                <div className="h-4 w-px bg-white/10" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{project.members?.length} Operatives Assigned</p>
              </div>
            </div>
          </div>
          
          <ProjectHeaderActions />
        </div>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <Tabs defaultValue="board" className="w-full">
          <ProjectTaskBoard tasks={tasks} columns={columns} />

          <TabsContent value="team" className="mt-0 focus-visible:outline-none">
            <div className="glass-card p-12 rounded-[3.5rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {project.members?.map((member: any) => (
                  <div key={member.userId._id} className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:border-primary/30 transition-all hover:bg-white/[0.04]">
                    <div className="flex items-center gap-6">
                      <Avatar className="size-20 ring-4 ring-white/5 shadow-2xl transition-transform group-hover:scale-110">
                        <AvatarImage src={member.userId.avatarUrl} />
                        <AvatarFallback className="bg-primary/20 text-primary font-black text-2xl">{member.userId.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-black text-xl text-white tracking-tight">{member.userId.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">{member.role}</p>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                      <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase text-slate-500 hover:text-white tracking-widest">Performance</Button>
                      <Button variant="ghost" size="icon" className="size-10 rounded-xl bg-white/5 hover:bg-primary/10 hover:text-primary">
                        <Mail className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AlertCircle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  )
}

function Mail(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></svg>
  )
}
// Trigger rebuild