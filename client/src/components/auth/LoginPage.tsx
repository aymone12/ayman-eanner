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
              className="w-full py-3 rounded-lg font-medium bg-transparent border border-gray-600 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
              data-testid="button-google-signin"
              onClick={() => {
                // TODO: Implement Google OAuth integration
                alert('Google sign-in will be available soon!');
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
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