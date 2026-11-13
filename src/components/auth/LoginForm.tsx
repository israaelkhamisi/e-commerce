"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";
import BrandName from "./BrandName";
import { LoginType } from "src/lib/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "src/components/ui/field"
import { Input } from "src/components/ui/input"
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { loginSchema } from 'src/lib/schemas/login.schema';
import {  useRouter } from "src/i18n/routing";
import { loginApi } from "src/lib/schemas/login.api";
import { signIn } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";

const socials = [
  { icon: "/icons/auth/google.svg", key: "continueGoogle" },
  { icon: "/icons/auth/facebook.svg", key: "continueFacebook" },
] as const;

const badges = [
  { icon: "/icons/auth/lock-small.svg", key: "sslSecured" },
  { icon: "/icons/auth/users.svg", key: "happyUsers" },
  { icon: "/icons/auth/star-gray.svg", key: "rating" },
] as const;


export default function LoginForm() {
  const t = useTranslations("AuthPage");
   const {handleSubmit,control} = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
     
    },resolver:zodResolver(loginSchema)
  });
   const [loading,setloading]=useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const router =useRouter()
 
  async function handlelogin(data: LoginType) {
      setloading(true);
   const res = await signIn("credentials",{...data,redirect:false , callbackUrl:'/'})
console.log(res)
if (res?.ok) {
   toast.success("login success");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error('invalid email or password');
      }
 setloading(false);
    
   {/*
   
    try {
      const response = await loginApi(data );
    
      if (response.message == "success") {
        toast.success("login success");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } finally {
      setloading(false);
    }
  
    
    */}
}
  return (
    <div className="w-full rounded-2xl bg-card p-6 shadow-xl sm:p-12">
      <div className="space-y-2 text-center">
        <BrandName className="text-3xl font-bold" />
        <h1 className="pt-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("loginTitle")}
        </h1>
        <p className="font-medium text-gray-600 dark:text-gray-300">{t("loginText")}</p>
      </div>

      <div className="mt-8 space-y-3">
        {socials.map((social) => (
          <button
            key={social.key}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Icon src={social.icon} width={22.5} height={18} />
            {t(social.key)}
          </button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm font-medium uppercase text-gray-500">{t("orEmail")}</span>
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>

   <form  onSubmit={handleSubmit( handlelogin)}  className="space-y-7 py-2 pt-4">
            <FieldGroup>
  
              <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className=" text-1xl" htmlFor={field.name}>
                     Email *
                  </FieldLabel>
                  <Input
                  className="h-10"
                    {...field}
                    type ='email'
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                   placeholder="ali@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
              <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                 
                    <div className="flex items-center justify-between">
<FieldLabel className= 'text-1xl' htmlFor={field.name}>
  Password * 
  </FieldLabel>
      <Link
  className="text-sm font-medium text-green-600 hover:underline"
  href="/forgot-password"
>
  Forgot Password?
</Link>  
                    </div>
                  <div className="relative">
                    <Input
                      className="h-10 pe-10"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            <label className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200">
  
<input type="checkbox" name="remember" className="size-4 accent-green-600" />
  
{t("keepSignedIn")}

</label>

          
            </FieldGroup>
   <button
  type="submit"
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading && <Loader2 className="size-5 animate-spin" />}
  {loading ? "Signing in..." : t("signIn")}
</button>
     
      </form>
      
   

      <p className="mt-8 border-t border-gray-100 pt-6 text-center font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300">
        {t("newHere")}{" "}
        <Link href="/register" className="font-semibold text-green-600 hover:underline">
          {t("createAccount")}
        </Link>
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6">
        {badges.map((badge) => (
          <li key={badge.key} className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Icon src={badge.icon} width={15} height={12} />
            {t(badge.key)}
          </li>
        ))}
      </ul>
    </div>
  );
}


