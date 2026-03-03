import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/shared/ui/card";
import api from "@/shared/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("token", "fake-token-for-dev");
      
      setIsLoading(false);
      navigate("/");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-green-600">
        <CardHeader className="space-y-1 text-center">
          <div className="text-5xl mb-4">🦖</div>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Zoozavr
          </CardTitle>
          <CardDescription className="text-slate-500">
            Введите корпоративные данные для доступа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Электронная почта</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="ivanov@zoozavr.ru" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="bg-white"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold h-11" 
              disabled={isLoading}
            >
              {isLoading ? "Вход в систему..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}