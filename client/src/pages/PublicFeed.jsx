import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import { getPublicAssignments } from "../services/assignmentService";

function PublicFeed() {

  const [assignments, setAssignments] = useState([]);

  const [search, setSearch] = useState("");

  const fetchAssignments = async () => {
    try {

      const data = await getPublicAssignments(search);

      setAssignments(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-5xl font-bold mb-10">
        Public Community Feed 🌍
      </h1>

      {/* SEARCH */}

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl mb-10">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search by subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 rounded-2xl bg-white/10 border border-white/20 outline-none"
          />

          <button
            onClick={fetchAssignments}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 rounded-2xl"
          >
            Search
          </button>

        </div>

      </div>

      {/* GRID */}

      <div className="grid md:grid-cols-3 gap-6">

        {assignments.map((assignment) => (

          <div
            key={assignment._id}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition"
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

            <p className="text-green-400 mt-3 font-semibold">
              Shared Publicly
            </p>

            <p className="text-zinc-400 mt-2">
              Shared By:
              {" "}
              {assignment.sharedBy?.name}
            </p>

          </div>
        ))}

      </div>

    </DashboardLayout>
  );
}

export default PublicFeed;