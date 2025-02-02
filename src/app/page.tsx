import Link from "next/link";
import { CheckCircle, BarChart2, Calendar } from "lucide-react";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModeToggle } from "@/components/ModeToggle";
import LogoutButton from "@/components/LogoutButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">TaskMaster</span>
          </Link>
          <div className="flex items-center space-x-4">
            {session && <LogoutButton />}
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Manage Tasks with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay organized, collaborate effortlessly, and boost your
              productivity.
            </p>
            <Link
              href={session ? "/dashboard" : "/auth/login"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="h-12 w-12 text-blue-600" />}
                title="Task Management"
                description="Create, organize, and track your tasks with ease."
              />
              <FeatureCard
                icon={<BarChart2 className="h-12 w-12 text-blue-600" />}
                title="Progress Tracking"
                description="Visualize your productivity with intuitive charts and reports."
              />
              <FeatureCard
                icon={<Calendar className="h-12 w-12 text-blue-600" />}
                title="Calendar Integration"
                description="Sync your tasks with your calendar for better time management."
              />
            </div>
          </div>
        </section>

        <section className="bg-blue-600 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who have transformed their task
              management.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-background/90 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
