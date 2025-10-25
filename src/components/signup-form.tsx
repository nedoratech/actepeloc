import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  return (
    <div className="relative overflow-visible rounded-3xl bg-white p-8 border border-[#0059FE] md:border-white">
      <img
        className="absolute -top-[2px] -right-[2px] z-10 block md:hidden"
        src="/img/loginCornerMobile.svg"
        alt="decorative corner mobile"
      />

      <img
        className="absolute -top-[2px] -right-[1px] z-10 hidden md:block"
        src="/img/loginCorner.svg"
        alt="decorative corner"
      />
      <form
        className={cn("flex flex-col gap-6 font-[Inter] leading-[1.4] tracking-[0.2px]", className)}
        {...props}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">Creează Cont</h1>
          <p className="text-base font-[500] text-gray-600">
            Lorem ipsum câteva detalii despre
            <br />
            formularul din această pagină.
          </p>
        </div>
        <div className="grid gap-6">
          <Label className="group relative flex flex-col-reverse">
            <Input
              type="text"
              name="nume"
              placeholder=" "
              required
              className="peer h-[64px] bg-[#f5f5f5] px-4 py-3 pt-6 text-base leading-9 tracking-[0.2px] text-[#212121] focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] focus-visible:ring-0"
            />

            <span className="absolute left-4 -translate-y-3 transform font-[Inter] text-base leading-10 font-[600] tracking-[0.2px] text-[#AFB1B6] transition group-focus-within:-translate-y-7 group-focus-within:font-[Urbanist] group-focus-within:text-xs group-focus-within:text-[#AFB1B6] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Nume
            </span>
          </Label>

          <Label className="group relative flex flex-col-reverse">
            <Input
              type="text"
              name="prenume"
              placeholder=" "
              required
              className="peer h-[64px] bg-[#f5f5f5] px-4 py-3 pt-6 text-base leading-9 tracking-[0.2px] text-[#212121] focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] focus-visible:ring-0"
            />

            <span className="absolute left-4 -translate-y-3 transform font-[Inter] text-base leading-10 font-[600] tracking-[0.2px] text-[#AFB1B6] transition group-focus-within:-translate-y-7 group-focus-within:font-[Urbanist] group-focus-within:text-xs group-focus-within:text-[#AFB1B6] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Prenume
            </span>
          </Label>

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

          <div className="flex items-center gap-3">
            <Label 
              htmlFor="terms"
              className="items-start">
            <Checkbox
              id="terms"
              className="border-[#01E2FA] data-[state=checked]:bg-[#01E2FA] focus:ring-[#01E2FA] size-5" />
              <div className="text-base leading-[1.4] tracking-[0.2px] text-[#212121] font-[Inter]">
                Sunt de acord cu <strong>Termenii & Condițiile</strong> și <strong>Politica de Confidențialitate</strong>
              </div>
            </Label>
          </div>

          <Button
            type="submit"
            className="text-grey-900 h-15 justify-self-end md:w-full rounded-2xl bg-[#01E2FA] text-base font-[700] tracking-[0.2px] hover:bg-[#01E2FA60] shadow-lg shadow-[#01E2FA40]"
          >
            Creează Cont
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
