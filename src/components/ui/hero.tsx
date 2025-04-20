import { ReactNode } from "react";

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-card/50 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <div className="space-y-4 float-in">
          {typeof title === "string" ? (
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h1>
          ) : (
            title
          )}
          {typeof subtitle === "string" ? (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          ) : (
            subtitle
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
}
