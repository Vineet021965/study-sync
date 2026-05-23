import API from "./api";

// Get token
const getToken = () => {
  return localStorage.getItem("token");
};

// Create Assignment
export const createAssignment = async (assignmentData) => {

  const response = await API.post(
    "/assignments",
    assignmentData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};


// Get Assignments
export const getAssignments = async () => {

  const response = await API.get(
    "/assignments",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};


// Delete Assignment
export const deleteAssignment = async (id) => {

  const response = await API.delete(
    `/assignments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Update Assignment
export const updateAssignment = async (id, updatedData) => {

  const response = await API.put(
    `/assignments/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};


// Toggle Public/Private
export const toggleAssignmentVisibility = async (id) => {

  const response = await API.put(
    `/assignments/${id}/share`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};


// Get Public Assignments
export const getPublicAssignments = async (subject = "") => {

  const response = await API.get(
    `/assignments/public?subject=${subject}`
  );

  return response.data;
};