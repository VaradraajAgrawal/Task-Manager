import React, { useEffect, useState } from "react";
import { Plus, CheckCircle2, Circle, ListTodo, Clock } from "lucide-react";
import AddTaskModal from "../components/AddTask";

const TaskManager = ({
  editingTask,
  setEditingTask,
  tasks,
  setTasks,
  setIsModalOpen,
}) => {
  const todayDate = tasks
    .filter((item) => {
      const createdDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      return createdDate === today;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    /* Removed 'w-screen' and 'flex' here because Sidebar is handled by App.jsx */
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, Alex
          </h1>
          <p className="text-slate-500 mt-1">
            You have{" "}
            <span className="font-semibold text-indigo-600">
              {tasks.filter((t) => t.status === "pending").length}
            </span>{" "}
            pending tasks for today.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-100 group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          <span className="font-medium">New Task</span>
        </button>
      </header>

      {/* Stats Cards (Bonus: Makes Overview look professional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard
          label="Total Tasks"
          count={tasks.length}
          color="bg-blue-500"
        />
        <StatsCard
          label="Pending"
          count={tasks.filter((t) => t.status === "pending").length}
          color="bg-amber-500"
        />
        <StatsCard
          label="Completed"
          count={tasks.filter((t) => t.status === "completed").length}
          color="bg-emerald-500"
        />
      </div>

      {/* Task List Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-bold text-lg text-slate-800">Today's Focus</h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {todayDate.length > 0 ? (
            todayDate.map((task) => (
              <div
                key={task._id}
                className="p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="text-slate-300 group-hover:text-indigo-500 transition-all active:scale-90"
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="text-emerald-500" size={22} />
                    ) : (
                      <Circle size={22} />
                    )}
                  </button>

                  <div>
                    <p
                      className={`font-semibold transition-all ${
                        task.status === "completed"
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                        {task.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(task.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Avatar / Delete Button Placeholder */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                    AL
                  </div>
                  {/* Hidden delete button that shows on hover */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Plus size={18} className="rotate-45" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ListTodo className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">
                No tasks scheduled for today!
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Take a break or add a new goal. ☕
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Internal Helper Component for Overview Stats
const StatsCard = ({ label, count, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`w-2 h-10 ${color} rounded-full`} />
    <div>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{count}</p>
    </div>
  </div>
);

export default TaskManager;
