"use client"
import { toast } from "react-hot-toast";
import { registerApi} from 'src/lib/Register.api'
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import Icon from "src/components/shared/Icon";
import { zodResolver } from "@hookform/resolvers/zod";
import {RegisterType,registerSchema} from 'src/lib/schemas/Register.schema'
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "src/components/ui/field"
import { Input } from "src/components/ui/input"
import {  useRouter } from "src/i18n/routing";
const socials = [
  { icon: "/icons/auth/google-sm.svg", label: "Google" },
  { icon: "/icons/auth/facebook-sm.svg", label: "Facebook" },
] as const;


export default function RegisterForm() {
 const {handleSubmit,control} = useForm<RegisterType>({
  defaultValues: {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    
  },resolver:zodResolver(registerSchema)
});
 const [loading,setloading]=useState(false)
 const router =useRouter()
  const t = useTranslations("AuthPage");
 async function handleSignup(data: RegisterType) {
  setloading(true)
const response =  await registerApi(data)
console.log(response)
if(response.message == 'success'){
  toast.success('Account Created')
 setTimeout(()=>{
  router.push('/login')
 },1000)
}else{
 toast.error(response.message)
}
  setloading(false)
}
  return (
    <div className="w-full rounded-2xl bg-card px-6 py-10 shadow-lg">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-100">
          {t("registerTitle")}
        </h2>
        <p className="font-medium text-gray-700 dark:text-gray-300">{t("registerText")}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 py-8">
        {socials.map((social) => (
          <button
            key={social.label}
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <Icon src={social.icon} width={20} height={16} />
            {social.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span className="h-0.5 flex-1 bg-gray-300/30" />
        <span className="font-medium text-gray-700 dark:text-gray-300">{t("or")}</span>
        <span className="h-0.5 flex-1 bg-gray-300/30" />
      </div>

      <form  onSubmit={handleSubmit(handleSignup)}  className="space-y-7 py-2 pt-4">
            <FieldGroup>
  <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-1xl" htmlFor={field.name}>
                     Name *
                  </FieldLabel>
                  <Input
className="h-10 "
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                   placeholder="Ali"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  <FieldLabel className=" text-1xl" htmlFor={field.name}>
                     Password *
                  </FieldLabel>
                  <Input
                  className="h-10"
                  type='password'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                   placeholder="Create a strong Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
                 <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel  className=" text-1xl" htmlFor={field.name}>
                    Confirm Password *
                  </FieldLabel>
                  <Input
                  className="h-10"
                  type='password'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                   placeholder="Confirm Your Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
                     <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel  className="text-1xl" htmlFor={field.name}>
                   Phone Number *
                  </FieldLabel>
                  <Input
                  className="h-10"
                  type='tel'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                   placeholder="+1234 567 8900"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
        
            </FieldGroup>
       {loading ? <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700"
        >
          
        loading....
        </button> :  <button
          type="submit"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-green-600 font-semibold text-white transition-colors hover:bg-green-700"
        >
          <Icon src="/icons/auth/user-plus.svg" width={20} height={16} />
          {t("createMyAccount")}
        </button> }
     
      </form>

      <p className="mt-2 border-t border-gray-300/30 pt-10 text-center font-medium text-gray-700 dark:text-gray-300">
        {t("haveAccount")}{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
