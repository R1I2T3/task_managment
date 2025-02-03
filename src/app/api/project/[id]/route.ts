import { ProjectUpdateSchema } from "@/features/project/schema";
import { NextResponse, NextRequest } from "next/server";
import {
  DeleteProject,
  GetProjectWithTask,
  UpdateProjectSchema,
} from "@/features/project/data-access";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const GET = async (request: NextRequest) => {
  try {
    const id = await request.nextUrl.pathname.split("/").pop();
    if (!id) {
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
    const data = await GetProjectWithTask(session.user.id, id);
    return NextResponse.json(
      {
        data,
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

export const PUT = async (request: NextRequest) => {
  try {
    const res = await request.json();
    const id = await request.nextUrl.pathname.split("/").pop();
    const parsedData = ProjectUpdateSchema.safeParse(res);
    if (!parsedData.success || !id) {
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
    await UpdateProjectSchema(session.user.id, id, parsedData.data);
    return NextResponse.json(
      {
        message: "Project Updated",
      },
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

export const DELETE = async (request: NextRequest) => {
  try {
    const id = await request.nextUrl.pathname.split("/").pop();
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
    if (!id) {
      return NextResponse.json(
        {
          message: "Invalid ID",
        },
        {
          status: 400,
        }
      );
    }
    await DeleteProject(session.user.id, id);
    return NextResponse.json(
      {
        message: "Project Deleted",
      },
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
