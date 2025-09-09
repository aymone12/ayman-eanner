import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";

const userDetails1Schema = z.object({
  joiningAs: z.string().min(1, "Please select an option"),
  company: z.string().min(1, "Company/Organization name is required"),
  role: z.string().min(1, "Role/Title is required"),
  division: z.string().min(1, "Division of interest is required"),
});

type UserDetails1Data = z.infer<typeof userDetails1Schema>;

interface UserDetailsPage1Props {
  onNextStep: () => void;
  onSkip: () => void;
}

export function UserDetailsPage1({ onNextStep, onSkip }: UserDetailsPage1Props) {
  const form = useForm<UserDetails1Data>({
    resolver: zodResolver(userDetails1Schema),
    defaultValues: {
      joiningAs: "",
      company: "",
      role: "",
      division: "",
    },
  });

  const onSubmit = (data: UserDetails1Data) => {
    // Store data in localStorage for next step
    const existingData = JSON.parse(localStorage.getItem("signupData") || "{}");
    localStorage.setItem("signupData", JSON.stringify({
      ...existingData,
      ...data,
    }));
    onNextStep();
  };

  const watchedFields = form.watch();
  const isFormValid = 
    watchedFields.joiningAs && 
    watchedFields.company && 
    watchedFields.role && 
    watchedFields.division && 
    form.formState.isValid;

  const joiningOptions = [
    "Individual",
    "Small Business",
    "Corporation",
    "Government",
    "Non-profit",
    "Educational Institution"
  ];

  const divisionOptions = [
    "Residential Solar",
    "Commercial Solar",
    "Industrial Solar",
    "Energy Storage",
    "Consulting",
    "Maintenance & Service"
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
                I'm joining as*
              </label>
              <FormField
                control={form.control}
                name="joiningAs"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-white"
                          data-testid="select-joining-as"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1f26] border-gray-600">
                        {joiningOptions.map((option) => (
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
                Company / Organization
              </label>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Type the company / organization name"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-company"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Role / Title
              </label>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Type your position name"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-role"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Division of interest*
              </label>
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-white"
                          data-testid="select-division"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a1f26] border-gray-600">
                        {divisionOptions.map((option) => (
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
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isFormValid
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                data-testid="button-next"
              >
                Next
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