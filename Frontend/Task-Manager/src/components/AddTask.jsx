import React, { useState, useEffect } from "react";
import { X, Plus, Tag, AlignLeft, Calendar } from "lucide-react";

const AddTaskModal = ({ isOpen, onClose, onAdd, isEditing }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    details: "",
  });

  useEffect(() => {
    if (isEditing && Object.keys(isEditing).length > 0) {
      setFormData({
        title: isEditing.title || "",
        category: isEditing.category || "Development",
        details: isEditing.details || "",
      });
    } else {
      setFormData({ title: "", category: "Development", details: "" });
    }
  }, [isEditing, isOpen]);

  // 2. NOW you can do the conditional return
  if (!isOpen) return null;

  // 3. Then your handleSubmit and JSX
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData, isEditing?._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-50 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">Create New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Task Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Design Landing Page"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Tag size={14} /> Category
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-no-repeat bg-[right_1rem_center]"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Personal</option>
            </select>
          </div>

          {/* Details Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <AlignLeft size={14} /> Details (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Add some notes..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> {isEditing ? "Edit" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
