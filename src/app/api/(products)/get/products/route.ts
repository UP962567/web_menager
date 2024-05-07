import { prisma } from "@/utils/prismaDB";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const pusher = await prisma.testProduct.findMany({

        });

        return NextResponse.json(pusher);
    }
    catch (error) {
        console.log('[CAL_GET_GET_C1]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}