import { getTasksByProjectId } from "@/app/actions/tasks"
import { getProjects } from "@/app/actions/projects"
import { TaskCard } from "@/components/tasks/task-card"
import { CheckCircle2, ListTodo, Timer, AlertCircle, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ActionModal } from "@/components/modals/action-modal"

export default async function DashboardPage() {
  const projects = await getProjects()
  const allTasksUnsorted = projects.length > 0 ? await getTasksByProjectId(projects[0]._id) : []
  const allTasks = allTasksUnsorted.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  
  const stats = [
    { label: "Todo", value: allTasks.filter((t: any) => t.status === "To Do").length, icon: ListTodo, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "On Progress", value: allTasks.filter((t: any) => t.status === "In Progress").length, icon: Timer, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Completed", value: allTasks.filter((t: any) => t.status === "Done").length, icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
  ]

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-100 uppercase">Task Manager</h1>
          <p className="text-primary font-bold mt-1 tracking-widest uppercase text-[10px]">Hello, welcome back to your workspace!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input placeholder="Search tasks..." className="pl-11 h-12 w-64 glass-panel border-none rounded-2xl focus:ring-primary/20" />
          </div>
          <ActionModal 
            type="task"
            title="Create New Task"
            description="Assign a new mission to your team members."
            trigger={
              <Button className="premium-button h-12 px-6 font-bold gap-2">
                <Plus className="size-5" />
                New Task
              </Button>
            }
          />
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card flex items-center gap-6 group">
            <div className={cn("size-16 rounded-[1.25rem] flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
              <stat.icon className={cn("size-8", stat.color)} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">Active Projects</h2>
            <Button variant="link" className="text-primary font-bold">View All</Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project: any) => (
              <div key={project._id} className="glass-card space-y-6 group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-xl text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {project.title.charAt(0)}
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((m: any, i: number) => (
                      <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={m.userId.avatarUrl} alt="" className="size-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100 mb-2">{project.title}</h3>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] font-black uppercase text-slate-400">Progress</span>
                    <span className="text-[10px] font-black text-primary">66%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Upcoming Deadlines</h2>
          <div className="glass-panel rounded-[2rem] p-6 space-y-6">
            {allTasks.slice(0, 3).map((task: any) => (
              <div key={task._id} className="flex items-center gap-4 p-2 group cursor-pointer">
                <div className="size-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 font-bold shrink-0">
                  {new Date(task.dueDate).getDate()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-100 truncate group-hover:text-primary transition-colors">{task.title}</h4>
                  <p className="text-xs text-slate-400 font-medium">Due in 2 days</p>
                </div>
                <div className="size-2 rounded-full bg-orange-500 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
