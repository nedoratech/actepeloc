import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <div className="relative bg-white p-8 rounded-3xl rounded-tr-none overflow-hidden">
      <img className="absolute top-0 right-0 z-10" src="/img/loginCorner.svg" />
      <form className={cn("flex flex-col gap-6 font-[Inter] leading-[1.4] tracking-[0.2px]", className)} {...props}>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">Intră în cont</h1>
          <p className="text-base font-[500] text-gray-600">
            Lorem ipsum câteva detalii despre<br />formularul din această pagină.
          </p>
        </div>
        <div className="grid gap-6">
          <Label className="flex flex-col-reverse relative focus group">
            <Input
              type="email" name="email" required
              className="border border-[#0059FE] bg-[#4353FF14] h-[64px] px-4 py-3 leading-9 text-base text-[#212121] tracking-[0.2px]"
            />

            <span className="font-[Inter] absolute text-xl transform -translate-y-3 left-4 transition leading-10 tracking-[0.2px] group-focus-within:-translate-y-8 group-focus-within:text-xs group-focus-within:font-[Urbanist] group-focus-within:text-[#AFB1B6]">
              Adresa de email
            </span>
          </Label>


          {/* <Label htmlFor="Email2" className="relative">
            <Input
              type="email"
              id="Email2"
              placeholder=""
              className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            />

            <span
              className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
            >
              Email
            </span>
          </Label> */}

          <div className="relative">
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder=" "
                required
                className="peer text-2xl font-[700] rounded-xl pt-8 pb-4 pl-4 pr-4 h-auto placeholder:opacity-50 focus:ring-2 focus:ring-[#01A0FF] focus:outline-none focus:border-transparent"
              />
              <Label
                htmlFor="email"
                className="absolute left-4 top-3 translate-y-0 bg-transparent px-1 text-muted-foreground text-xs transition-all duration-150 ease-in-out pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-2xl peer-placeholder-shown:font-[700] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-1 peer-focus:z-10"
              >
                Adresa de Email
              </Label>
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder=" "
                required
                className="peer text-2xl font-[700] rounded-xl pt-8 pb-4 pl-4 pr-4 h-auto focus:ring-2 focus:ring-[#01A0FF] focus:outline-none focus:border-transparent"
              />
              <Label
                htmlFor="password"
                className="absolute left-4 top-3 translate-y-0 bg-transparent px-1 text-muted-foreground text-xs transition-all duration-150 ease-in-out pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-2xl peer-placeholder-shown:font-[700] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-1 peer-focus:z-10"
              >
                Parola
              </Label>
            </div>
          </div>
          <p className="text-sm"> Ai uitat parola? 
            <a href="#" className="font-bold text-gray-900 underline-offset-4 hover:underline"> RESETEAZ-O! </a>
          </p>
          

          <Button type="submit" className="w-full bg-[#01E2FA] text-grey-900 h-15 text-base font-[700] tracking-[0.2px] hover:bg-[#01E2FA60]">
            Login
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
    </div>
  )
}
