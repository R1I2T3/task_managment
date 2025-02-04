import { NextResponse } from "next/server";
import { ProjectCreationSchema } from "@/features/project/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CreateProject, GetMyProjects } from "@/features/project/data-access";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const res = await GetMyProjects(session.user.id);
    return NextResponse.json(
      {
        data: res,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const res = await request.json();
    const parsedData = ProjectCreationSchema.safeParse(res);
    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Invalid Data",
        },
        {
          status: 400,
        }
      );
    }
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    await CreateProject(parsedData.data, session.user.id);
    return NextResponse.json(
      { message: "Success" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
