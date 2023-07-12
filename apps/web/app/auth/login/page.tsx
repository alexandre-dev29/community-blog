import {Metadata} from "next"

import LoginForm from "@/app/auth/login/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to the application",
}

export default function LoginPage() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <LoginForm/>
    </div>
  )
}
