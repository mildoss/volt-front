import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LoginForm} from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Auth | Volt Shop",
};

export default function AuthPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Volt Shop ⚡️</CardTitle>
          <CardDescription>Log in to your account or create a new one</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="registser">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm/>
            </TabsContent>
            <TabsContent value="register">

            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}