import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  CheckTaskBelongToUser,
  DeleteTask,
  UpdateTask,
} from "@/features/tasks/data-access";
import { updateTaskSchema } from "@/features/tasks/schema";

export const GET = async (req: NextRequest) => {
  try {
    const id = await req.nextUrl.pathname.split("/").pop();
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
    const task = await CheckTaskBelongToUser(session.user.id, id);
    if (!task) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
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

export const PUT = async (req: NextRequest) => {
  try {
    const id = await req.nextUrl.pathname.split("/").pop();
    const inputData = await req.json();
    const parsedData = updateTaskSchema.safeParse(inputData);
    if (!id || !parsedData.success) {
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
    const task = await CheckTaskBelongToUser(session.user.id, id);
    if (!task) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const updateTask = await UpdateTask(parsedData.data, id);
    if (!updateTask) {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(updateTask, {
      status: 201,
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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = await req.nextUrl.pathname.split("/").pop();
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
    const task = await CheckTaskBelongToUser(session.user.id, id);
    if (!task) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const response = await DeleteTask(id);
    if (!response) {
      return NextResponse.json(
        {
          message: "Failed to delete task",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Task deleted successfully",
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
