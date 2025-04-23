"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function FeedbackComponentsPage() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const runProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Feedback Components</h1>
      <Toaster position="bottom-right" />

      {/* Toast Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Toasts</h2>
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  toast("Default Toast", {
                    description: "This is a default toast notification",
                  })
                }
              >
                Show Default Toast
              </Button>

              <Button
                variant="success"
                onClick={() =>
                  toast.success("Success Toast", {
                    description: "Operation completed successfully!",
                  })
                }
              >
                Show Success Toast
              </Button>

              <Button
                variant="destructive"
                onClick={() =>
                  toast.error("Error Toast", {
                    description: "Something went wrong. Please try again.",
                  })
                }
              >
                Show Error Toast
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  toast.info("Info Toast", {
                    description:
                      "Here's some information you might find useful.",
                  })
                }
              >
                Show Info Toast
              </Button>

              <Button
                variant="warning"
                onClick={() =>
                  toast("Warning", {
                    description: "Please be aware of this important warning.",
                    icon: <AlertTriangle className="h-4 w-4" />,
                  })
                }
              >
                Show Warning Toast
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  toast("Action Required", {
                    description:
                      "Click confirm to continue or cancel to abort.",
                    action: {
                      label: "Confirm",
                      onClick: () => toast.success("Action confirmed!"),
                    },
                    cancel: {
                      label: "Cancel",
                      onClick: () => toast.error("Action cancelled"),
                    },
                  })
                }
              >
                Interactive Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alerts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
        <Card>
          <CardHeader>
            <CardTitle>Alert Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a general information alert that provides context.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action was completed successfully. You can continue.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Be careful with this action. It might have unintended
                consequences.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                An error occurred while processing your request. Please try
                again.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </section>

      {/* Dialogs Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Dialogs</h2>
        <Card>
          <CardHeader>
            <CardTitle>Modal Dialogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Basic Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Basic Dialog</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    This is a basic dialog that can be used to show information
                    or gather user input.
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Confirmation Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Are you sure you want to perform this action? This cannot be
                    undone.
                  </DialogDescription>
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          toast.success("Action confirmed!");
                        }}
                      >
                        Confirm
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Danger Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Item</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    This action will permanently delete this item. Are you
                    absolutely sure you want to continue?
                  </DialogDescription>
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          toast.error("Item deleted!");
                        }}
                      >
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Progress Indicators Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Progress Indicators</h2>
        <Card>
          <CardHeader>
            <CardTitle>Progress Bars</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Progress: {progress}%
                </span>
                <Button size="sm" onClick={runProgress}>
                  Start Progress
                </Button>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                Determinate Progress Examples
              </h3>
              <div className="space-y-3">
                <Progress value={25} className="h-2" />
                <Progress value={50} className="h-2" />
                <Progress value={75} className="h-2" />
                <Progress value={100} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Indeterminate Progress</h3>
              <Progress className="h-2 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Loading Spinners Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Loading Spinners</h2>
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin">
                  <Loader2 className="h-8 w-8" />
                </div>
                <span className="text-sm">Default Spinner</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Border Spinner</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm">Bouncing Dots</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="h-8 w-8 relative">
                  <div className="h-full w-full border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                </div>
                <span className="text-sm">Progress Spinner</span>
              </div>

              <div>
                <Button disabled={isLoading} onClick={simulateLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Click to Load"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Error Messages Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Error Messages</h2>
        <Card>
          <CardHeader>
            <CardTitle>Inline Error Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="flex flex-col space-y-1">
                <input
                  id="username"
                  className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  defaultValue="user@"
                />
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Please enter a valid email address
                </p>
              </div>
            </div>

            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 rounded-md text-red-800 dark:text-red-200">
              <div className="flex">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Form submission failed</h4>
                  <p className="text-sm">
                    Please check the fields below and try again.
                  </p>
                  <ul className="mt-2 text-sm list-disc list-inside">
                    <li>Username must be a valid email address</li>
                    <li>Password must be at least 8 characters long</li>
                    <li>Terms and conditions must be accepted</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => {
                  toast.error("Network Error", {
                    description:
                      "Could not connect to the server. Please check your internet connection.",
                  });
                }}
              >
                Simulate Network Error
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
