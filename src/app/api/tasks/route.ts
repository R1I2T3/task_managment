import { createTaskSchema } from "@/features/tasks/schema";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  CheckProjectBelongToUser,
  CreateTasks,
} from "@/features/tasks/data-access";
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedData = createTaskSchema.safeParse(body);
    if (!parsedData.success) {
      console.log(parsedData.error);
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
    // Check if the project belongs to the user
    const isProjectBelongToUser = await CheckProjectBelongToUser(
      parsedData.data.projectId,
      session.user.id
    );
    if (!isProjectBelongToUser) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    // Create Task
    const task = await CreateTasks(parsedData.data);
    return NextResponse.json(task, {
      status: 200,
    });
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
