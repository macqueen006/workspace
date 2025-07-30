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
interface SignInCardProps {
  setState: (state: signInFlow) => void;
}
export const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  const handleSignInProvider = (provider: "google" | "github") => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      })
      .finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Log in to continue</CardTitle>
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
        <form onSubmit={onPasswordSignIn} className="space-y-4">
          <div className="">
            <label htmlFor="email">
              <Input
                disabled={pending}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                type="email"
                required
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="password">
              <Input
                disabled={pending}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                value={password}
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
            onClick={() => handleSignInProvider("google")}
            variant="outline"
            size="lg"
            className="relative"
          >
            <FcGoogle size={4} className="absolute top-3 left-2.5" />
            Continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignInProvider("github")}
            variant="outline"
            size="lg"
            className="relative"
          >
            <FaGithub size={4} className="absolute top-3 left-2.5" />
            Continue with github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {`Don't have an account? `}
          <span
            onClick={() => setState("signup")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
