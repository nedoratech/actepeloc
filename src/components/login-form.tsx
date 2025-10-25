import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  return (
    <div className="relative overflow-hidden rounded-3xl rounded-tr-none bg-white p-8">
      <img className="absolute top-0 right-0 z-10" src="/img/loginCorner.svg" />
      <form
        className={cn("flex flex-col gap-6 font-[Inter] leading-[1.4] tracking-[0.2px]", className)}
        {...props}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">Intră în cont</h1>
          <p className="text-base font-[500] text-gray-600">
            Lorem ipsum câteva detalii despre
            <br />
            formularul din această pagină.
          </p>
        </div>
        <div className="grid gap-6">
          <Label className="group relative flex flex-col-reverse">
            <Input
              type="email"
              name="email"
              placeholder=" "
              required
              className="peer h-[64px] bg-[#f5f5f5] px-4 py-3 pt-6 text-base leading-9 tracking-[0.2px] text-[#212121] focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] focus-visible:ring-0"
            />

            <span className="absolute left-4 -translate-y-3 transform font-[Inter] text-base leading-10 font-[600] tracking-[0.2px] text-[#AFB1B6] transition group-focus-within:-translate-y-7 group-focus-within:font-[Urbanist] group-focus-within:text-xs group-focus-within:text-[#AFB1B6] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Adresa de email
            </span>
          </Label>

          <Label className="group relative flex flex-col-reverse">
            <Input
              type="password"
              name="password"
              placeholder=" "
              required
              className="peer h-[64px] bg-[#f5f5f5] px-4 py-3 pt-6 text-base leading-9 tracking-[0.2px] text-[#212121] focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] focus-visible:ring-0"
            />

            <span className="absolute left-4 -translate-y-3 transform font-[Inter] text-base leading-10 font-[600] tracking-[0.2px] text-[#AFB1B6] transition group-focus-within:-translate-y-7 group-focus-within:font-[Urbanist] group-focus-within:text-xs group-focus-within:text-[#AFB1B6] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Parola
            </span>
          </Label>

          <p className="text-sm">
            {" "}
            Ai uitat parola?
            <a href="#" className="font-bold text-gray-900 underline-offset-4 hover:underline">
              {" "}
              RESETEAZ-O!{" "}
            </a>
          </p>

          <Button
            type="submit"
            className="text-grey-900 h-15 w-full rounded-2xl bg-[#01E2FA] text-base font-[700] tracking-[0.2px] hover:bg-[#01E2FA60] shadow-lg shadow-[#01E2FA40]"
          >
            Login
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">SAU</span>
          </div>
          <Button
            type="submit"
            className="text-grey-900 h-15 w-full rounded-2xl border border-[#EEEEEE] bg-white text-base font-[700] tracking-[0.2px] hover:bg-white"
          >
            <img src="/img/googleButton.svg" className="mr-2 inline" />
            Continuă cu Google
          </Button>
          <Button
            type="submit"
            className="text-grey-900 h-15 w-full rounded-2xl border border-[#EEEEEE] bg-white text-base font-[700] tracking-[0.2px] hover:bg-white"
          >
            <img src="/img/facebookButton.svg" className="mr-2 inline" />
            Continuă cu Facebook
          </Button>
        </div>
      </form>
    </div>
  );
}
