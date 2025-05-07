"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/primitives/separator";
import { useEffect, useState } from "react";

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skeleton</h1>
        <p className="text-muted-foreground mb-4">
          A placeholder used to indicate content is loading, helping to improve
          perceived performance.
        </p>
        <Separator />
      </div>

      {/* Basic Skeleton Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Skeletons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Default</h3>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Input</h3>
            <Skeleton variant="input" className="w-full" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Button</h3>
            <Skeleton variant="button" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Avatar</h3>
            <Skeleton variant="avatar" className="size-12" />
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Practical Examples</h2>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile Card</TabsTrigger>
            <TabsTrigger value="content">Content Block</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Loading State */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="avatar" className="size-12" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Skeleton variant="button" className="flex-1" />
                    <Skeleton variant="button" className="flex-1" />
                  </div>
                </CardFooter>
              </Card>

              {/* Loaded State */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-medium">Jane Doe</h3>
                      <p className="text-xs text-muted-foreground">
                        Product Designer
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">
                    Product designer with 5+ years experience in creating
                    user-centered digital products.
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                    <Button className="flex-1">Connect</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Loading State */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Loaded State */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-xl font-semibold">Building Great UIs</h3>
                  <p className="text-muted-foreground">
                    Learn the principles of creating effective and intuitive
                    user interfaces that engage users and improve their overall
                    experience.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <Button variant="secondary" size="sm">
                      Read More
                    </Button>
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <div className="border rounded-md divide-y">
              {/* Loading State */}
              {loading ? (
                <>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </div>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton variant="avatar" className="size-8" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-md" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Recent Users</h3>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                  </div>
                  {[
                    { name: "Alex Johnson", email: "alex@example.com" },
                    { name: "Sarah Miller", email: "sarah@example.com" },
                    { name: "James Wilson", email: "james@example.com" },
                    { name: "Emma Davis", email: "emma@example.com" },
                  ].map((user, i) => (
                    <div key={i} className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="size-8">
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={() => setLoading(!loading)}>
                {loading ? "Show Loaded State" : "Show Loading State"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <div className="p-4 bg-muted/40 rounded-md">
          <pre className="text-sm overflow-x-auto">
            {`import { Skeleton } from "@/components/ui/skeleton"\n\n// Basic usage\n<Skeleton className="w-full h-12" />\n\n// With variants\n<Skeleton variant="avatar" className="size-12" />\n<Skeleton variant="input" className="w-full" />\n<Skeleton variant="button" />`}
          </pre>
        </div>
      </section>
    </div>
  );
}
