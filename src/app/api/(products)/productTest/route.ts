import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: any) {
  const body = await request.json();
  const {
    defaultImage,
    images,
    title,
    slogan,
    description,
    category,
    category_type,
    city,
    address,
    tags,
    rating,
    contact,
    price,
    isFeatured,
    isActivated,
  } = body;

  // if (!defaultImage || !images || !title || !slogan || !description || !category || !category_type || !city || !address || !tags || !rating || !contact || !price || !isFeatured || !isActivated) {
  //   return NextResponse.json("Missing Fields", { status: 400 });
  // }


  await prisma.testProduct.create({
    data: {
      defaultImage,
      images,
      title,
      slogan,
      description,
      category,
      category_type,
      city,
      address,
      tags,
      rating,
      contact,
      price,
      isFeatured,
      isActivated,
    },
  });

  return NextResponse.json("User created successfully!", { status: 200 });
}
