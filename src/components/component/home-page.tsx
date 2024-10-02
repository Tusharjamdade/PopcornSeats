import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container flex items-center justify-between py-4 px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Acme Blog</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Blog
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-8 px-4 md:px-6 grid md:grid-cols-[3fr_1fr] gap-8">
        <div className="space-y-8">
          <Link href={"/movie?name=Tushar+Jamdade&time=10:30&date=12/12/2024"}>
            <Card className="flex flex-col md:flex-row gap-4">
              <img
                src="/placeholder.svg"
                width={400}
                height={300}
                alt="Blog Post"
                className="rounded-lg  object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="flex-1 space-y-2">
                <div className="text-sm text-muted-foreground">
                  By{" "}
                  <Link href="#" className="font-medium hover:underline" prefetch={false}>
                    John Doe
                  </Link>{" "}
                  on <time dateTime="2023-04-15">April 15, 2023</time>
                </div>
                <h2 className="text-2xl font-bold">
                  <Link href="#" className="hover:underline" prefetch={false}>
                    The Future of Web Development
                  </Link>
                </h2>
                <p className="text-muted-foreground">
                  Explore the latest trends and technologies shaping the future of web development.
                </p>
              </div>
            </Card>
          </Link>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Categories</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                    Programming
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
                    Productivity
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-muted border-t">
        <div className="container flex items-center justify-between py-4 px-4 md:px-6">
          <div className="text-xs text-muted-foreground">&copy; 2024 Acme Blog. All rights reserved.</div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-xs hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs hover:underline" prefetch={false}>
              Contact Us
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

// Define props type for MenuIcon and MountainIcon using React.SVGProps
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
