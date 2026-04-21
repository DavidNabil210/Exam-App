export const fetchDiplomas = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/diplomas?page=${pageParam}`);

  if (!res.ok) throw new Error("error");

  return res.json();
};