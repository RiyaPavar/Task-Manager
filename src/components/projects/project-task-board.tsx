"use client";

import { useState } from "react";
import { TaskCard } from "@/components/tasks/task-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Layout, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export function ProjectTaskBoard({ tasks, columns }: { tasks: any[], columns: string[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignee = showOnlyMine ? (task.assignedTo?.id === 'u1' || task.assignedTo === 'u1') : true;
    return matchesSearch && matchesAssignee;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <TabsList className="glass-panel p-2 rounded-[2rem] bg-white/[0.02] border-white/[0.05]">
          <TabsTrigger value="board" className="rounded-[1.5rem] px-10 py-4 font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-black transition-all">
            <Layout className="size-4 mr-3" />
            Mission Board
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-[1.5rem] px-10 py-4 font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-primary data-[state=active]:text-black transition-all">
            <Users className="size-4 mr-3" />
            Operatives
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search missions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-16 w-80 glass-panel border-none rounded-[1.75rem] font-bold text-white placeholder:text-slate-600 focus:ring-primary/20" 
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-16 rounded-[1.75rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <Filter className="size-6 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-card border-white/10 bg-black/90 p-2 rounded-2xl">
              <DropdownMenuLabel className="font-black uppercase tracking-widest text-[10px] text-slate-400">Filter Missions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuCheckboxItem 
                checked={showOnlyMine}
                onCheckedChange={setShowOnlyMine}
                className="font-bold cursor-pointer rounded-xl focus:bg-primary/20 focus:text-primary"
              >
                Assigned to Me
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                disabled
                className="font-bold cursor-pointer rounded-xl opacity-50"
              >
                High Priority
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent value="board" className="mt-0 focus-visible:outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {columns.map(status => {
            const columnTasks = filteredTasks.filter((t: any) => t.status === status)
            return (
              <div key={status} className="space-y-10 group">
                <div className="flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "size-3 rounded-full shadow-[0_0_10px_currentColor]",
                      status === "To Do" ? "text-blue-400 bg-blue-400" : 
                      status === "In Progress" ? "text-orange-400 bg-orange-400" : 
                      "text-primary bg-primary"
                    )} />
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] text-white">{status}</h3>
                    <span className="bg-white/5 border border-white/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black">
                      {columnTasks.length}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="size-10 rounded-xl bg-white/[0.02] border border-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 hover:text-primary">
                    <Plus className="size-5" />
                  </Button>
                </div>
                
                <div className="space-y-8 min-h-[800px] p-6 rounded-[3.5rem] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.03] transition-colors hover:border-white/10">
                  {columnTasks.map((task: any) => (
                    <TaskCard 
                      key={task._id} 
                      task={{...task, id: task._id}} 
                      assignee={task.assignedTo} 
                    />
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 text-center space-y-4 opacity-20">
                      <Layout className="size-12" />
                      <p className="font-black uppercase tracking-widest text-[10px]">No active missions</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </TabsContent>
    </>
  );
}
