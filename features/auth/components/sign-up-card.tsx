import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlertIcon } from "lucide-react";

interface SignUpCardProps {
  setState: (state: signInFlow) => void;
}
export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  function handleSignUpProvider(provider: "google" | "github") {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  }

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      })
      .finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlertIcon className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-4">
          <div className="">
            <label htmlFor="name">
              <Input
                id="name"
                disabled={pending}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                value={name}
                type="text"
                required
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="email">
              <Input
                id="email"
                disabled={pending}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                type="email"
                required
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="password">
              <Input
                id="password"
                disabled={pending}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
                required
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="confirm_password">
              <Input
                id="confirm_password"
                disabled={pending}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                value={confirmPassword}
                type="password"
                required
              />
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleSignUpProvider("google")}
            variant="outline"
            size="lg"
            className="relative"
          >
            <FcGoogle size={4} className="absolute top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignUpProvider("github")}
            variant="outline"
            size="lg"
            className="relative"
          >
            <FaGithub size={4} className="absolute top-3 left-2.5" />
            Continue with github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {`Already have an account? `}
          <span
            onClick={() => setState("signin")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
