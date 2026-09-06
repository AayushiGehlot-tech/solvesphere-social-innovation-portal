import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, Circle, FileText, Users, Target, Calendar, MessageSquare, Activity, Upload, Handshake, ThumbsUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const iconMap: Record<string, typeof FileText> = { FileText, Handshake, CheckCircle2, Upload, ThumbsUp };
const tabs = ['Overview', 'Team', 'Tasks', 'Milestones', 'Documents', 'Messages', 'Activity'] as const;
type Tab = typeof tabs[number];

export function ProjectWorkspacePage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const project = projects[0];

  const lifecycle = [
    { label: 'Problem Identified', status: 'done' as const },
    { label: 'Research', status: 'done' as const },
    { label: 'Prototype', status: 'done' as const },
    { label: 'Field Testing', status: 'done' as const },
    { label: 'Deployment', status: 'current' as const },
    { label: 'Impact Measurement', status: 'pending' as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/compare-proposals')} className="btn-ghost mb-6"><ArrowLeft className="h-4 w-4" /> Back</button>

        <div className="mb-6 card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2"><span className="badge badge-medium">{project.statusLabel}</span></div>
              <h1 className="text-2xl font-extrabold text-navy-900">{project.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{project.challengeTitle}</p>
            </div>
            <div className="flex flex-col items-end"><div className="text-3xl font-extrabold text-teal-600">{project.progress}%</div><div className="text-xs text-gray-400">Complete</div></div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-1000" style={{ width: `${project.progress}%` }} /></div>
          <div className="mt-4 flex flex-wrap gap-2">{project.stakeholders.map((s) => (<span key={s} className="rounded-lg bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-600">{s}</span>))}</div>
        </div>

        <div className="mb-6 card p-6">
          <h3 className="mb-4 text-sm font-bold text-navy-900">Project Lifecycle</h3>
          <div className="relative">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200" />
            <div className="absolute left-0 top-4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-1000" style={{ width: `${(lifecycle.filter((l) => l.status === 'done').length / lifecycle.length) * 100}%` }} />
            <div className="relative flex justify-between">
              {lifecycle.map((stage, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${stage.status === 'done' ? 'bg-emerald-500 text-white' : stage.status === 'current' ? 'bg-teal-500 text-white animate-pulse' : 'bg-gray-200 text-gray-400'}`}>
                    {stage.status === 'done' ? <CheckCircle2 className="h-4 w-4" /> : stage.status === 'current' ? <Clock className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </div>
                  <span className="mt-2 max-w-[80px] text-center text-[10px] font-medium text-navy-700">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-1 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 hover:bg-navy-50'}`}>{tab}</button>
          ))}
        </div>

        <div className="card p-6 animate-fade-in">
          {activeTab === 'Overview' && (
            <div>
              <h3 className="mb-3 font-bold text-navy-900">Project Objective</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">Deploy IoT-based soil moisture sensors and weather-integrated smart irrigation systems across 4 villages in Hazaribagh district. The system will help farmers make data-driven irrigation decisions, reducing crop loss and improving water efficiency.</p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-50 p-4"><Users className="mb-2 h-5 w-5 text-teal-600" /><p className="text-xs text-gray-400">Team Size</p><p className="font-bold text-navy-900">{project.team.length} members</p></div>
                <div className="rounded-xl bg-gray-50 p-4"><Target className="mb-2 h-5 w-5 text-cyan-600" /><p className="text-xs text-gray-400">Villages</p><p className="font-bold text-navy-900">4 villages</p></div>
                <div className="rounded-xl bg-gray-50 p-4"><Calendar className="mb-2 h-5 w-5 text-emerald-600" /><p className="text-xs text-gray-400">Timeline</p><p className="font-bold text-navy-900">6 months</p></div>
              </div>
            </div>
          )}
          {activeTab === 'Team' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {project.team.map((member, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">{member.name.charAt(0)}</div>
                  <div><p className="font-semibold text-navy-900">{member.name}</p><p className="text-xs text-gray-400">{member.role}</p></div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Tasks' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {(['todo', 'in-progress', 'completed'] as const).map((col) => (
                <div key={col}>
                  <div className="mb-3 flex items-center justify-between"><h4 className="text-sm font-bold capitalize text-navy-900">{col === 'in-progress' ? 'In Progress' : col === 'todo' ? 'To Do' : 'Completed'}</h4><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">{project.tasks.filter((t) => t.status === col).length}</span></div>
                  <div className="space-y-2">
                    {project.tasks.filter((t) => t.status === col).map((task) => (
                      <div key={task.id} className="rounded-xl border border-gray-100 bg-white p-3"><p className="text-sm font-medium text-navy-900">{task.title}</p><p className="mt-1 text-xs text-gray-400">{task.assignee} · {task.dueDate}</p></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Milestones' && (
            <div className="space-y-3">
              {project.milestones.map((m) => (
                <div key={m.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-4">
                  {m.completed ? <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" /> : <Circle className="h-5 w-5 flex-shrink-0 text-gray-300" />}
                  <div className="flex-1"><p className={`font-semibold ${m.completed ? 'text-navy-900' : 'text-gray-400'}`}>{m.title}</p><p className="text-xs text-gray-400">{m.date}</p></div>
                  {m.completed && <span className="badge badge-low">Done</span>}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Documents' && (
            <div className="space-y-2">
              {project.documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-navy-50/30">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50"><FileText className="h-5 w-5 text-navy-600" /></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-navy-900">{doc.name}</p><p className="text-xs text-gray-400">{doc.type} · {doc.size} · {doc.date}</p></div>
                  <button onClick={() => showToast('Document download simulated', 'info')} className="btn-ghost text-xs">Download</button>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Messages' && (
            <div className="space-y-3">
              {project.messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">{msg.user.charAt(0)}</div>
                  <div className="flex-1 rounded-xl bg-gray-50 p-3"><div className="mb-1 flex items-center justify-between"><p className="text-sm font-semibold text-navy-900">{msg.user}</p><p className="text-xs text-gray-400">{msg.date}</p></div><p className="text-sm text-gray-600">{msg.message}</p></div>
                </div>
              ))}
              <div className="flex gap-2 border-t border-gray-100 pt-3">
                <input type="text" placeholder="Type a message..." className="input-field flex-1" />
                <button onClick={() => showToast('Message sent', 'success')} className="btn-primary">Send</button>
              </div>
            </div>
          )}
          {activeTab === 'Activity' && (
            <div className="space-y-3">
              {project.activity.map((a) => {
                const Icon = iconMap[a.icon] || Activity;
                return (
                  <div key={a.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50"><Icon className="h-4 w-4 text-teal-600" /></div>
                    <div className="flex-1"><p className="text-sm text-navy-700"><span className="font-semibold">{a.user}</span> {a.action}</p><p className="text-xs text-gray-400">{a.date}</p></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button onClick={() => navigate('/compare-proposals')} className="btn-secondary"><ArrowLeft className="h-4 w-4" /> Back to Proposals</button>
          <button onClick={() => navigate('/impact')} className="btn-accent">View Impact Dashboard <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );
}
