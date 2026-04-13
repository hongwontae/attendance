export const deleteStudentApi = async (id: number) => {
  const response = await fetch(`http://localhost:3000/student/remove/${id}`, {
    credentials: "include",
    method: "DELETE",
  });


  if(!response.ok){
    throw new Error('???')
  }

  return await response.json();

};
