import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export function GET(req: NextRequest) {
   const  secret = req.nextUrl.searchParams.get('secret')

   if (secret !== 'DatDevWeb') {
      return new NextResponse(JSON.stringify({message: "Invalid token"}), {
         status: 401,
         statusText: 'Unauthorized',
         headers: {
            'Content-Type': 'application/json'
         }
      })
   }

   const path = req.nextUrl.searchParams.get('path') || '/'

   revalidatePath(path)

   return NextResponse.json({revalidate: true})
}