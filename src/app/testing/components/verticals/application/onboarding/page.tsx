"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/primitives/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Check,
  ArrowRight,
  MessageCircle,
  Github,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function OnboardingComponentsPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      id: "welcome",
      title: "Welcome",
      component: <WelcomeStep onNext={() => setCurrentStep(1)} />,
    },
    {
      id: "discord",
      title: "Join Community",
      component: <JoinDiscordStep onNext={() => setCurrentStep(2)} />,
    },
    {
      id: "interests",
      title: "Interests",
      component: <InterestsStep onNext={() => setCurrentStep(3)} />,
    },
    {
      id: "socials",
      title: "Social Links",
      component: <SocialLinksStep onNext={() => setCurrentStep(4)} />,
    },
    {
      id: "events",
      title: "Upcoming Events",
      component: <EventsStep onNext={() => setCurrentStep(5)} />,
    },
    {
      id: "referral",
      title: "Referral",
      component: <ReferralStep onNext={() => setCurrentStep(6)} />,
    },
    {
      id: "experience",
      title: "Experience",
      component: <ExperienceStep onNext={() => setCurrentStep(0)} />,
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Onboarding Components</h1>
        <p className="text-muted-foreground">
          Components for user onboarding flows and first-time user experiences
        </p>
      </div>

      {/* Complete Onboarding Flow Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">
          Complete Onboarding Flow
        </h2>
        <div className="w-full max-w-2xl mx-auto">
          <Card className="border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </CardDescription>
                </div>
                <StepIndicator
                  totalSteps={onboardingSteps.length}
                  currentStep={currentStep}
                />
              </div>
            </CardHeader>
            <CardContent>{onboardingSteps[currentStep].component}</CardContent>
          </Card>
        </div>
      </section>

      {/* Individual Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Individual Components</h2>

        {/* Welcome Screen */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">1. Welcome Screen</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 dark:bg-primary/20 p-4 inline-block rounded-full">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Welcome to Turbin3DS!</h2>
              <p className="text-muted-foreground">
                Let&apos;s set up your account in just a few steps.
              </p>
              <Button className="mt-4">Get Started</Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>A welcoming screen to start the onboarding process.</p>
          </div>
        </div>

        {/* Discord Join Button */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">2. Discord Join Button</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              <MessageCircle className="h-5 w-5 mr-2" />
              Join Our Discord Community
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              A button styled with Discord branding for joining community
              channels.
            </p>
          </div>
        </div>

        {/* Interests Selection */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">3. Interests Selection</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <InterestSelector />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>A component for selecting multiple interests or topics.</p>
          </div>
        </div>

        {/* Social Links Form */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">4. Social Links</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <SocialLinksForm />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Form fields for adding social media profiles.</p>
          </div>
        </div>

        {/* Event Selection */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">5. Event Selection</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <EventSelector />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Component for selecting events to attend or participate in.</p>
          </div>
        </div>

        {/* Referral Input */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">6. Referral Input</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ReferralInput />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Input field for adding referral codes or references.</p>
          </div>
        </div>

        {/* Experience Level Selection */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">7. Experience Level</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg">
            <ExperienceLevelSelector />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Component for selecting experience or expertise level.</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <h3 className="text-xl font-medium mb-4">8. Step Indicator</h3>
          <div className="w-full max-w-md mx-auto border p-6 rounded-lg flex justify-center">
            <StepIndicator totalSteps={7} currentStep={3} />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Visual indicator showing progress through multi-step flows.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Step Indicator Component
function StepIndicator({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index <= currentStep ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

// Onboarding Steps
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="bg-primary/10 dark:bg-primary/20 p-6 mx-auto w-24 h-24 flex items-center justify-center rounded-full">
        <Check className="h-12 w-12 text-primary" />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Welcome to Turbin3DS!</h3>
        <p className="text-muted-foreground mb-6">
          We&apos;re excited to have you join us. Let&apos;s set up your profile
          in just a few steps.
        </p>
      </div>
      <Button onClick={onNext} size="lg">
        Let&apos;s Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function JoinDiscordStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="bg-[#5865F2]/10 p-6 mx-auto w-24 h-24 flex items-center justify-center rounded-full">
        <MessageCircle className="h-12 w-12 text-[#5865F2]" />
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
        <p className="text-muted-foreground mb-6">
          Connect with other members, get support, and participate in
          discussions on our Discord server.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-full">
          <MessageCircle className="mr-2 h-5 w-5" />
          Join Discord Community
        </Button>
        <Button variant="outline" onClick={onNext}>
          Skip for now
        </Button>
      </div>
    </div>
  );
}

function InterestsStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Select Your Interests</h3>
        <p className="text-muted-foreground">
          Choose topics you&apos;re interested in to personalize your
          experience.
        </p>
      </div>
      <InterestSelector />
      <Button onClick={onNext} className="w-full">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function SocialLinksStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Add Your Social Links</h3>
        <p className="text-muted-foreground">
          Help others connect with you by adding your social profiles.
        </p>
      </div>
      <SocialLinksForm />
      <Button onClick={onNext} className="w-full">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function EventsStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
        <p className="text-muted-foreground">
          Select events you&apos;d like to attend or receive notifications
          about.
        </p>
      </div>
      <EventSelector />
      <Button onClick={onNext} className="w-full">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function ReferralStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Were You Referred?</h3>
        <p className="text-muted-foreground">
          If someone referred you, please enter their name or email.
        </p>
      </div>
      <ReferralInput />
      <Button onClick={onNext} className="w-full">
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

function ExperienceStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Your Experience Level</h3>
        <p className="text-muted-foreground">
          Help us tailor content to your experience level.
        </p>
      </div>
      <ExperienceLevelSelector />
      <Button onClick={onNext} className="w-full">
        Complete Setup
        <Check className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

// Individual Component Implementations
function InterestSelector() {
  const interests = [
    "UI Design",
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "DevOps",
    "Data Science",
    "Machine Learning",
    "Product Management",
    "UX Research",
  ];

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <Badge
              key={interest}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer text-sm py-1.5 ${
                isSelected ? "" : "hover:bg-muted"
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
              {isSelected && <Check className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>
      {selectedInterests.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedInterests.length} interest
          {selectedInterests.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

function SocialLinksForm() {
  const formSchema = z.object({
    twitter: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitter: "",
      github: "",
      linkedin: "",
      instagram: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Twitter username"
                  {...field}
                />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="GitHub username"
                  {...field}
                />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="LinkedIn username"
                  {...field}
                />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Instagram username"
                  {...field}
                />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function EventSelector() {
  const events = [
    {
      id: "event1",
      title: "Design System Workshop",
      date: "June 15, 2025",
      location: "Virtual",
    },
    {
      id: "event2",
      title: "Frontend Development Conference",
      date: "July 10, 2025",
      location: "New York, NY",
    },
    {
      id: "event3",
      title: "Product Management Meetup",
      date: "August 5, 2025",
      location: "San Francisco, CA",
    },
  ];

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className={`border p-4 rounded-md cursor-pointer transition-colors ${
            selectedEvents.includes(event.id)
              ? "border-primary bg-primary/5"
              : "hover:border-primary/30"
          }`}
          onClick={() => toggleEvent(event.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{event.date}</span>
                <span>•</span>
                <span>{event.location}</span>
              </div>
            </div>
            <Checkbox
              checked={selectedEvents.includes(event.id)}
              onCheckedChange={() => toggleEvent(event.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReferralInput() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium">Referral Code or Email</div>
        <Input
          id="referral"
          placeholder="Enter code or email address"
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-1.5">
          Optional: Enter if you were referred by another user
        </p>
      </div>
    </div>
  );
}

function ExperienceLevelSelector() {
  const [experience, setExperience] = useState("");

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Your experience level</div>
      <Select value={experience} onValueChange={setExperience}>
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Select your experience level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
          <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
          <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
          <SelectItem value="expert">Expert (5+ years)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
