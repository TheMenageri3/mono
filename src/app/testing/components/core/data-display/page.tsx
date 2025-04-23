"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BaseCard } from "@/components/patterns/BaseCard";
import { Button } from "@/components/ui/button";

export default function DataDisplayPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Display Components</h1>

      {/* Avatar Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Avatars</h2>
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Default Avatar</h3>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">With Image</h3>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Different Sizes</h3>
            <div className="flex items-center gap-4">
              <Avatar className="size-6">
                <AvatarFallback className="text-xs">XS</AvatarFallback>
              </Avatar>
              <Avatar className="size-8">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="size-16">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      {/* Card Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cards</h2>

        <div className="grid gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Simple Card</h3>
            <Card className="p-4 max-w-md">
              <h3 className="font-medium">Card Title</h3>
              <p className="text-sm text-muted-foreground">
                This is a simple card with some content.
              </p>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Base Card</h3>
            <BaseCard
              title="John Doe"
              subtitle="Software Engineer"
              status="Active"
              className="max-w-md"
              actions={
                <>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </>
              }
            >
              <p className="text-sm text-muted-foreground mt-1">
                Additional information can be placed here.
              </p>
            </BaseCard>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Base Card with Image</h3>
            <BaseCard
              title="Jane Smith"
              subtitle="Product Manager"
              status="Away"
              imageUrl="https://github.com/shadcn.png"
              className="max-w-md"
              actions={
                <Button variant="outline" size="sm">
                  Contact
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
