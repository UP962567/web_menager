import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: any) {
  const body = await request.json();
  const {
    defaultImage,
    imageId,
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

  let isFeaturedT = false;
  let isActivatedT = false;
  if (isFeatured === "on") {
    isFeaturedT = true;
  } else {
    isFeaturedT = false;
  }

  if (isActivated === "on") {
    isActivatedT = true;
  } else {
    isActivatedT = false;
  }

  await prisma.testProduct.create({
    data: {
      defaultImage,
      images,
      title,
      imageId,
      slogan,
      description,
      category,
      category_type,
      city,
      address,
      tags,
      rating: Number(rating),
      contact: Number(contact),
      price: Number(price),
      isFeatured: isFeaturedT,
      isActivated: isActivatedT,
    },
  });

  return NextResponse.json("User created successfully!", { status: 200 });
}
