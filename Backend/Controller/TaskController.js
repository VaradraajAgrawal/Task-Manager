import Task from "../models/Tasks.js";

export const getRequest = async (req, res) => {
  try {
    const all = await Task.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postRequest = async (req, res) => {
  const dataRec = req.body;
  if (!dataRec) {
    throw new Error("Something went wrong the provided Data!!");
  }
  const data = await Task.create(dataRec);

  res.status(201).json(data);
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("ID not mentioned!!");
  }
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404).json({ message: "Something went Wrong!!" });
  }
  res.status(200).json(deleted);
};

export const completeRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};
