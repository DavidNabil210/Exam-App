import { getExams } from "./admin-exams.api";
async function getAllExamsIds(): Promise<string[]> {
  const ids:string[]=[];
  let page =1 
  while (true){
    const data =await getExams(String(page));
    const {data:exams,metadata}=data.payload;
    ids.push(...exams.map((e:{id:string})=>e.id));
      if (metadata.page >= metadata.totalPages) break;
    page++;
  }
 return ids;
}
 async function getQuestionsByExamId(examId:string){
    const res =await fetch(`api/admin/questions?examId=${examId}`,{
        cache:"no-store",
    });
    if(!res.ok) throw new Error(`failed to fetch questions for exam ${examId}`);
    return res.json()
 }
 export async function getQuestions(){
  
   
    const examsIds = await getAllExamsIds();

    const results =await Promise.all(
        examsIds.map((id)=>getQuestionsByExamId(id))

    )
      const allQuestions = results.flatMap((r) => r.payload.questions);
return {
    payload: {
      data: allQuestions,
      total: allQuestions.length,
    },
  };
 }