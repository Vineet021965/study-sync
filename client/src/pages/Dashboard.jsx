import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import { FaSearch } from "react-icons/fa";

import {
  createAssignment,
  getAssignments,
  deleteAssignment,
  toggleAssignmentVisibility,
  updateAssignment,
} from "../services/assignmentService";

function Dashboard() {

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "",
    priority: "Medium",
  });

  // Stats
  const totalAssignments = assignments.length;

  const publicAssignments = assignments.filter(
    (a) => a.isPublic
  ).length;

  const privateAssignments = assignments.filter(
    (a) => !a.isPublic
  ).length;

  // Filter Assignments
  const filteredAssignments = assignments.filter((assignment) => {

  return assignment.subject
    .toLowerCase()
    .includes(search.toLowerCase());
});

  // Fetch Assignments
  const fetchAssignments = async () => {
    try {

      setLoading(true);

      const data = await getAssignments();

      setAssignments(data);

    } catch (error) {
      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Edit
  const handleEdit = (assignment) => {

    setEditingId(assignment._id);

    setFormData({
      title: assignment.title,
      subject: assignment.subject,
      deadline: assignment.deadline?.slice(0, 10),
      priority: assignment.priority,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await updateAssignment(editingId, formData);

        setEditingId(null);

      } else {

        await createAssignment(formData);
      }

      setFormData({
        title: "",
        subject: "",
        deadline: "",
        priority: "Medium",
      });

      fetchAssignments();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Assignment
  const handleDelete = async (id) => {
    try {

      await deleteAssignment(id);

      fetchAssignments();

    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Public/Private
  const handleToggle = async (id) => {
    try {

      await toggleAssignmentVisibility(id);

      fetchAssignments();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      {/* HEADING */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold mb-3">
          Assignment Dashboard 🚀
        </h1>

        <p className="text-zinc-400 text-lg">
          Organize, manage and track your assignments efficiently.
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">

          <h2 className="text-zinc-300 text-lg">
            Total Assignments
          </h2>

          <p className="text-5xl font-bold text-green-400 mt-3">
            {totalAssignments}
          </p>

        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">

          <h2 className="text-zinc-300 text-lg">
            Public Assignments
          </h2>

          <p className="text-5xl font-bold text-blue-400 mt-3">
            {publicAssignments}
          </p>

        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">

          <h2 className="text-zinc-300 text-lg">
            Private Assignments
          </h2>

          <p className="text-5xl font-bold text-pink-400 mt-3">
            {privateAssignments}
          </p>

        </div>

      </div>

      {/* SEARCH */}
      
      <div className="flex justify-between items-center mb-10">

        <div className="relative w-full max-w-md">

            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400" />

            <input
                type="text"
                placeholder="Search by subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 outline-none focus:border-green-400 transition"
            />

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl mb-10 grid gap-4"
      >

        <h2 className="text-2xl font-bold mb-2">
          {editingId
            ? "Update Assignment ✏️"
            : "Create Assignment ✨"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={formData.title}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition p-4 rounded-2xl font-semibold"
        >
          {editingId
            ? "Update Assignment"
            : "Create Assignment"}
        </button>

      </form>

      {/* LOADING */}

      {
        loading && (
          <div className="flex justify-center mb-10">

            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>

          </div>
        )
      }

      {/* ASSIGNMENTS */}

      <div className="grid md:grid-cols-3 gap-6">

        {filteredAssignments.length === 0 ? (

          <div className="col-span-full text-center py-20">

            <h2 className="text-3xl text-zinc-500">
              No Assignments Found 📭
            </h2>

          </div>

        ) : (

          filteredAssignments.map((assignment) => {

            const isOverdue =
              new Date(assignment.deadline) < new Date();

            return (

              <div
                key={assignment._id}
                className={`backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl transition hover:scale-105 ${
                  isOverdue
                    ? "bg-red-500/10 border-red-400"
                    : "bg-white/10"
                }`}
              >

                <h2 className="text-2xl font-bold">
                  {assignment.title}
                </h2>

                <p className="mt-3 text-zinc-300">
                  Subject: {assignment.subject}
                </p>

                <p className="text-zinc-300">
                  Priority: {assignment.priority}
                </p>

                <p className="text-zinc-300">
                  Deadline: {assignment.deadline?.slice(0, 10)}
                </p>

                {
                  isOverdue && (
                    <p className="text-red-400 font-bold mt-3">
                      Overdue ⚠️
                    </p>
                  )
                }

                <p className="mt-3">
                  Status:
                  <span
                    className={`ml-2 font-bold ${
                      assignment.isPublic
                        ? "text-green-400"
                        : "text-pink-400"
                    }`}
                  >
                    {assignment.isPublic
                      ? "Public"
                      : "Private"}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() => handleEdit(assignment)}
                    className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(assignment._id)}
                    className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleToggle(assignment._id)}
                    className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-xl"
                  >
                    Toggle
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;