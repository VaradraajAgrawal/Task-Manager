import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TaskManager from "./Pages/Task_Manager";
import Tasks from "./Pages/Tasks"; // The new My Tasks page
import AddTaskModal from "./components/AddTask";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [tasks, setTasks] = useState([]); // Shared Data
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;
  // Global fetch function
  const fetchTasks = async () => {
    const res = await fetch(`${API_BASE}/Task`);
    const data = await res.json();
    setTasks(data);
  };

  // Global save/update function
  const handleSaveTask = async (formData, id = null) => {
    const url = id ? `${API_BASE}/${id}` : `${API_BASE}/Task/`;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchTasks(); // Refresh list for all pages
      setEditingTask(null);
      setIsModalOpen(false);
    } else {
      console.log("Error Occured");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Shared Modal - Rendered once at the top level */}
          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTask(null);
            }}
            onAdd={handleSaveTask}
            isEditing={editingTask}
          />

          <Routes>
            <Route
              path="/"
              element={
                <TaskManager
                  tasks={tasks}
                  setTasks={setTasks} // For delete/toggle
                  setIsModalOpen={setIsModalOpen}
                  setEditingTask={setEditingTask}
                />
              }
            />
            <Route
              path="/Tasks"
              element={
                <Tasks
                  tasks={tasks}
                  setTasks={setTasks}
                  setIsModalOpen={setIsModalOpen}
                  setEditingTask={setEditingTask}
                  server={API_BASE}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
