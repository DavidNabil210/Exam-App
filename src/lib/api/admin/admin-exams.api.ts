async function getAllDiplomaIds(): Promise<string[]> {
  const ids: string[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(`/api/diplomas?page=${page}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch diplomas");

    const data = await res.json();
    const { data: diplomas, metadata } = data.payload;

    ids.push(...diplomas.map((d: { id: string }) => d.id));

    if (metadata.page >= metadata.totalPages) break;
    page++;
  }

  return ids;
}

async function getExamsByDiploma(diplomaId: string, page: string) {
  const params = new URLSearchParams({ page, limit: "10", diplomaId });
  const res = await fetch(`/api/admin/exams?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch exams for diploma ${diplomaId}`);
  return res.json();
}

export async function getExams(page: string) {
  const diplomaIds = await getAllDiplomaIds();

  const results = await Promise.all(
    diplomaIds.map((id) => getExamsByDiploma(id, page))
  );

  const allExams = results.flatMap((r) => r.payload.data);
  const total = results.reduce((sum, r) => sum + r.payload.metadata.total, 0);

  return {
    payload: {
      data: allExams,
      metadata: {
        page: Number(page),
        totalPages: Math.max(...results.map((r) => r.payload.metadata.totalPages)),
        total,
      },
    },
  };
}