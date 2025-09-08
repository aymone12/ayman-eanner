import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";

const userDetails2Schema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City/Region is required"),
  howDidYouHear: z.string().min(1, "Please select an option"),
  language: z.string().min(1, "Please select a language"),
});

type UserDetails2Data = z.infer<typeof userDetails2Schema>;

interface UserDetailsPage2Props {
  onSkip: () => void;
  onComplete: () => void;
}

export function UserDetailsPage2({ onSkip, onComplete }: UserDetailsPage2Props) {
  const { toast } = useToast();

  const form = useForm<UserDetails2Data>({
    resolver: zodResolver(userDetails2Schema),
    defaultValues: {
      phoneNumber: "",
      city: "",
      howDidYouHear: "",
      language: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: UserDetails2Data) => {
      // Get all signup data from localStorage
      const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");
      
      const fullUserData = {
        ...signupData,
        phoneNumber: data.phoneNumber,
        city: data.city,
        language: data.language,
      };

      // Create the user account
      return await apiRequest("/api/auth/signup", "POST", fullUserData);
    },
    onSuccess: () => {
      // Clear localStorage
      localStorage.removeItem("signupData");
      
      toast({
        title: "Welcome to eaneer!",
        description: "Your account has been created successfully.",
      });
      
      onComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Something went wrong during signup",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UserDetails2Data) => {
    signupMutation.mutate(data);
  };

  const watchedFields = form.watch();
  const isFormValid = 
    watchedFields.phoneNumber && 
    watchedFields.city && 
    watchedFields.howDidYouHear && 
    watchedFields.language && 
    form.formState.isValid;

  const howDidYouHearOptions = [
    "Search Engine",
    "Social Media",
    "Friend/Family",
    "Advertisement",
    "News/Media",
    "Event/Conference",
    "Other"
  ];

  const languageOptions = [
    "English",
    "Arabic",
    "French",
    "Spanish",
    "German",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Be part of the switch
          </h1>
          <p className="text-gray-400 text-sm">
            From bills to smart power. Start your impact today.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Phone number*
              </label>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+212700000000"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                City / Region*
              </label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Select city/region"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-city"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                How did you hear about us?
              </label>
              <FormField
                control={form.control}
                name="howDidYouHear"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-white"
                          data-testid="select-how-hear"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1f26] border-gray-600">
                        {howDidYouHearOptions.map((option) => (
                          <SelectItem 
                            key={option} 
                            value={option}
                            className="text-white hover:bg-gray-700"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Preferred language
              </label>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-white"
                          data-testid="select-language"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1f26] border-gray-600">
                        {languageOptions.map((option) => (
                          <SelectItem 
                            key={option} 
                            value={option}
                            className="text-white hover:bg-gray-700"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || signupMutation.isPending}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isFormValid && !signupMutation.isPending
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                data-testid="button-next"
              >
                {signupMutation.isPending ? "Creating account..." : "Next"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                className="w-full py-3 rounded-lg font-medium text-white hover:bg-gray-800"
                data-testid="button-skip"
              >
                Skip
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}