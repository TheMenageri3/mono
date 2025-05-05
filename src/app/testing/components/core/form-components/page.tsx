"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { TimePicker } from "@/components/ui/time-picker";
import { KeyValueField } from "@/components/ui/keyvaluefield";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  country: z.string().min(1, "Please select a country"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  subscription: z.enum(["free", "basic", "premium"], {
    required_error: "Please select a subscription plan",
  }),
  notifications: z.boolean().default(false).optional(),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
  meetingTime: z.string().min(1, "Please select a meeting time"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FileType = {
  name: string;
  type: string;
  size: number;
  url?: string;
};

export default function FormComponentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Sigma",
  ]);

  // Form with all component types
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      country: "",
      interests: [],
      subscription: undefined,
      notifications: false, // Explicitly set notifications
      acceptTerms: false,
      meetingTime: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }));

      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    if (newFiles[index].url) URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Form Components</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* Text Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Text Inputs</CardTitle>
              <CardDescription>
                Different types of text input fields
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Regular Text Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Your full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your email address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number Input Example */}
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  min="0"
                  max="120"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your current age in years.
                </p>
              </div>

              {/* Search Input */}
              <div className="space-y-4">
                <Label>Search Box</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                {searchTerm && (
                  <div className="border rounded-md p-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Results:
                    </p>
                    <div className="space-y-1">
                      {searchResults
                        .filter((item) =>
                          item.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((result, i) => (
                          <div
                            key={i}
                            className="text-sm p-2 hover:bg-accent rounded cursor-pointer"
                          >
                            {result}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>Text Area</CardTitle>
              <CardDescription>Multi-line text input field</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message here..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter additional details or questions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Dropdowns */}
          <Card>
            <CardHeader>
              <CardTitle>Select Components</CardTitle>
              <CardDescription>
                Single and multi-select dropdowns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Simple Select Dropdown */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="jp">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your country of residence.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Multi-select Example */}
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Interests</FormLabel>
                      <FormDescription>
                        Select topics you&apos;re interested in.
                      </FormDescription>
                    </div>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("tech")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, "tech"])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "tech"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Technology
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("sports")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          "sports",
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "sports"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sports
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes("music")}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          "music",
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== "music"
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Music
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Radio and Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Buttons, Checkboxes & Toggles</CardTitle>
              <CardDescription>Selection controls for forms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Radio Group */}
              <FormField
                control={form.control}
                name="subscription"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Subscription Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="free" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Free - Basic features
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="basic" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Basic - $9.99/month
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="premium" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Premium - $19.99/month
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Toggle/Switch */}
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive emails about account activity and updates.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Checkbox with validation */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accept terms and conditions</FormLabel>
                      <FormDescription>
                        You agree to our Terms of Service and Privacy Policy.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Date and Time Pickers */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Time Pickers</CardTitle>
              <CardDescription>
                Components for selecting dates and times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Picker */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <DatePicker date={field.value} onSelect={field.onChange} />
                    <FormDescription>
                      Select your date of birth.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Picker */}
              <FormField
                control={form.control}
                name="meetingTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Meeting Time</FormLabel>
                    <TimePicker value={field.value} onChange={field.onChange} />
                    <FormDescription>
                      Select your preferred time for meetings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>Upload and manage files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="file">Upload Documents</Label>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer border-2 border-dashed rounded-md px-3 py-2 flex items-center gap-2 hover:bg-accent"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choose files</span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload relevant documents (PDF, DOC, JPG)
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="border rounded-md p-3">
                  <p className="text-sm font-medium mb-2">Uploaded files:</p>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-accent/30 rounded-md p-2"
                      >
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Validation States */}
          <Card>
            <CardHeader>
              <CardTitle>Form Validation Examples</CardTitle>
              <CardDescription>
                Different validation states for form inputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Valid Input Example */}
              <div className="space-y-2">
                <Label htmlFor="valid-input">Valid Input</Label>
                <div className="relative">
                  <Input
                    id="valid-input"
                    className="border-green-500 focus-visible:ring-green-300"
                    value="valid@example.com"
                    readOnly
                  />
                  <Badge className="absolute right-2 top-2 bg-green-500 text-white">
                    Valid
                  </Badge>
                </div>
                <p className="text-sm text-green-600">Email format is valid.</p>
              </div>

              {/* Error Input Example */}
              <div className="space-y-2">
                <Label htmlFor="error-input">Error Input</Label>
                <div className="relative">
                  <Input
                    id="error-input"
                    className="border-red-500 focus-visible:ring-red-300"
                    value="invalid-email"
                    readOnly
                  />
                  <Badge className="absolute right-2 top-2 bg-red-500 text-white">
                    Error
                  </Badge>
                </div>
                <p className="text-sm text-red-500">
                  Please enter a valid email address.
                </p>
              </div>

              {/* Loading State Example */}
              <div className="space-y-2">
                <Label htmlFor="loading-input">Loading State</Label>
                <div className="relative">
                  <Input
                    id="loading-input"
                    value="checking..."
                    className="pr-10"
                    readOnly
                  />
                  <div className="absolute right-3 top-3 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Verifying input...
                </p>
              </div>
            </CardContent>
          </Card>
          {/* Key-Value Field */}
          <Card>
            <CardHeader>
              <CardTitle>JSON Key-Value Builder</CardTitle>
              <CardDescription>
                Dynamic object builder using key-value pairs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KeyValueField
                label="Custom Settings"
                description="Add dynamic settings as key-value pairs."
                onChange={(json) => console.log("Custom JSON:", json)}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="w-full sm:w-auto">
              Submit Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
