import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Clock, Trash2, PencilLine } from "lucide-react";
import AddTaskModal from "../components/AddTask";

const Tasks = ({
  editingTask,
  setEditingTask,
  setIsModalOpen,
  tasks,
  setTasks,
}) => {
  const [filter, setFilter] = useState("all"); // all, pending, completed

  const handleDelete = async (id) => {
    const res = await fetch(`https://task-manager-3g2l.onrender.com/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.log("ERROR OCCURED");
      return;
    }
    const newData = await res.json();
    setTasks((prev) => prev.filter((item) => item._id !== newData._id));
  };
  const sortedDate = tasks
    .filter((item) => {
      return new Date(item.createdAt).setHours(0, 0, 0, 0);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Update handleUpdate to use the prop setTasks
  const handleUpdate = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    const res = await fetch(
      `https://task-manager-3g2l.onrender.com/${task._id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      },
    );
    const data = await res.json();
    // This now updates the GLOBAL state in App.jsx
    setTasks((prev) =>
      prev.map((item) => (item._id === task._id ? data : item)),
    );
  };

  const filteredTasks = sortedDate.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  return (
    <div className="flex-1 p-10">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-slate-500">
            Manage and track your daily productivity
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["all", "pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === tab
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Task List Table/Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center text-slate-400 text-sm font-semibold uppercase tracking-wider">
          <div className="flex-1">Task Name</div>
          <div className="w-32">Category</div>
          <div className="w-40">Date</div>
          <div className="w-10"></div>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="p-5 flex items-center hover:bg-slate-50/50 transition-colors group"
            >
              <div className="flex-1 flex items-center gap-4">
                <button
                  onClick={() => handleUpdate(task)}
                  className="transition-transform active:scale-90"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="text-emerald-500" size={22} />
                  ) : (
                    <Circle className="text-slate-300" size={22} />
                  )}
                </button>
                <span
                  className={`font-medium ${task.status === "completed" ? "line-through text-slate-400" : "text-slate-700"}`}
                >
                  {task.title}
                </span>
              </div>

              <div className="w-32">
                <span className="text-xs font-bold px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 uppercase">
                  {task.category}
                </span>
              </div>

              <div className="w-40 text-sm text-slate-400 flex items-center gap-5">
                <Clock size={14} />
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
              {/* Action Buttons: Edit and Delete */}
              <div className="flex items-center gap-2">
                {/* Edit Icon Button */}
                <button
                  onClick={() => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                    console.log("Working");
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Edit Task"
                >
                  <PencilLine size={18} />
                </button>

                {/* Delete Icon Button (The Plus rotated 45 degrees) */}
                <button
                  onClick={() => handleDelete(task._id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-slate-400 font-medium">
              No tasks found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
