import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="bg-background-panel p-10 w-max m-auto rounded-lg flex flex-col gap-5">
      <h1 className="text-center">Войдите в Инстанс</h1>
      <div className="flex flex-col gap-3">
        <Input />
        <Input />
        <Button>Войти</Button>
      </div>
    </div>
  );
}
