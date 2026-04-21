"use server"

import { loginUser } from "@/lib/api/auth/auth.api"
import { LoginRequest } from "@/lib/types/auth"
import { cookies } from "next/headers"

export async function loginAction(data:LoginRequest) {
const result = await loginUser(data);
const cookieStore =await cookies();
  cookieStore.set("token", result.payload.token); 
console.log("result:", result)
return result
}
