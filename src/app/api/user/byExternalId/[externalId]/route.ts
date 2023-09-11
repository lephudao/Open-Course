import { connectToDB } from "@/lib/connectToMongoose";
import User from "@/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface PageParams {
  params: {
    externalId: string;
  };
}

export const GET = async (
  req: NextApiRequest,
  { params }: PageParams,
  res: NextApiResponse
) => {
  const externalId = params.externalId;
  connectToDB();

  const user = await User.findOne({ externalId });

  return NextResponse.json({ data: user });
};
