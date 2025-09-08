import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, type LoginData } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface LoginPageProps {
  onToggleSignup: () => void;
}

export function LoginPage({ onToggleSignup }: LoginPageProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return await apiRequest("/api/auth/login", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      // Redirect to home or dashboard
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const isFormValid = form.watch("email") && form.watch("password") && form.formState.isValid;

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-white text-xl md:text-2xl font-semibold mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Welcome back! please enter your details
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
            <div>
              <label className="text-white text-sm md:text-base font-medium mb-2 block">
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
                        className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 md:py-4 text-white placeholder:text-gray-500 focus:border-white focus:ring-0 text-sm md:text-base"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="text-white text-sm md:text-base font-medium mb-2 block">
                Password
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
                          placeholder="Enter your password"
                          className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 md:py-4 text-white placeholder:text-gray-500 focus:border-white focus:ring-0 text-sm md:text-base"
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

            <Button
              type="submit"
              disabled={!isFormValid || loginMutation.isPending}
              className={`w-full py-3 md:py-4 rounded-lg font-medium transition-all text-sm md:text-base ${
                isFormValid && !loginMutation.isPending
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
              data-testid="button-login"
            >
              {loginMutation.isPending ? "Signing in..." : "Login"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-3 rounded-lg font-medium bg-transparent border border-gray-600 text-white hover:bg-gray-800"
              data-testid="button-google-signin"
            >
              <span className="mr-2">🔍</span>
              Sign in with Google
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">
            Don't have an account?{" "}
          </span>
          <button
            onClick={onToggleSignup}
            className="text-white text-sm underline hover:no-underline"
            data-testid="link-signup"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}