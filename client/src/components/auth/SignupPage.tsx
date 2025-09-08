import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signupSchema, type SignupData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface SignupPageProps {
  onToggleLogin: () => void;
  onNextStep: () => void;
}

export function SignupPage({ onToggleLogin, onNextStep }: SignupPageProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      // Store data in localStorage for next step
      localStorage.setItem("signupData", JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        password: data.password,
      }));
      return Promise.resolve();
    },
    onSuccess: () => {
      toast({
        title: "Great!",
        description: "Let's continue with your details.",
      });
      onNextStep();
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignupData) => {
    signupMutation.mutate(data);
  };

  const watchedFields = form.watch();
  const isFormValid = 
    watchedFields.email && 
    watchedFields.firstName && 
    watchedFields.password && 
    watchedFields.confirmPassword && 
    form.formState.isValid;

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-semibold mb-2">
            Let's get started
          </h1>
          <p className="text-gray-400 text-sm">
            Join eaneer and make clean energy the default
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Email
              </label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-signup-email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Full name
              </label>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                        data-testid="input-fullname"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Create password
              </label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                          data-testid="input-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Confirm password
              </label>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Once again"
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:border-white focus:ring-0"
                          data-testid="input-confirm-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || signupMutation.isPending}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                isFormValid && !signupMutation.isPending
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              data-testid="button-get-started"
            >
              {signupMutation.isPending ? "Processing..." : "Get started"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-3 rounded-lg font-medium bg-transparent border border-gray-600 text-white hover:bg-gray-800"
              data-testid="button-google-signup"
            >
              <span className="mr-2">🔍</span>
              Sign in with Google
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">
            Already have an account?{" "}
          </span>
          <button
            onClick={onToggleLogin}
            className="text-white text-sm underline hover:no-underline"
            data-testid="link-login"
          >
            login here
          </button>
        </div>
      </div>
    </div>
  );
}