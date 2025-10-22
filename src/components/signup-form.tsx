import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <div className="relative bg-white p-8 rounded-3xl rounded-tr-none overflow-hidden">
      <img className="absolute top-0 right-0 z-10" src="/img/loginCorner.svg" />
      <form className={cn("flex flex-col gap-6 font-[Inter] leading-[1.4] tracking-[0.2px]", className)} {...props}>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold">Creează Cont</h1>
          <p className="text-base font-[500] text-gray-600">
            Lorem ipsum câteva detalii despre<br />formularul din această pagină.
          </p>
        </div>
        <div className="grid gap-6">
          <Label className="flex flex-col-reverse relative group">
            <Input
              type="text" name="nume" 
              placeholder=" "
              required
              className="peer focus-visible:ring-0 focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] bg-[#f5f5f5] h-[64px] px-4 py-3 pt-6 leading-9 text-base text-[#212121] tracking-[0.2px]"
            />

            <span className="font-[Inter] font-[600] text-[#AFB1B6] absolute text-base transform -translate-y-3 left-4 transition leading-10 tracking-[0.2px] group-focus-within:-translate-y-7 group-focus-within:text-xs group-focus-within:font-[Urbanist] group-focus-within:text-[#AFB1B6]
            peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Nume
            </span>
          </Label>
          
          <Label className="flex flex-col-reverse relative group">
            <Input
              type="text" name="prenume" 
              placeholder=" "
              required
              className="peer focus-visible:ring-0 focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] bg-[#f5f5f5] h-[64px] px-4 py-3 pt-6 leading-9 text-base text-[#212121] tracking-[0.2px]"
            />

            <span className="font-[Inter] font-[600] text-[#AFB1B6] absolute text-base transform -translate-y-3 left-4 transition leading-10 tracking-[0.2px] group-focus-within:-translate-y-7 group-focus-within:text-xs group-focus-within:font-[Urbanist] group-focus-within:text-[#AFB1B6]
            peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Prenume
            </span>
          </Label>

          <Label className="flex flex-col-reverse relative group">
            <Input
              type="email" name="email" 
              placeholder=" "
              required
              className="peer focus-visible:ring-0 focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] bg-[#f5f5f5] h-[64px] px-4 py-3 pt-6 leading-9 text-base text-[#212121] tracking-[0.2px]"
            />

            <span className="font-[Inter] font-[600] text-[#AFB1B6] absolute text-base transform -translate-y-3 left-4 transition leading-10 tracking-[0.2px] group-focus-within:-translate-y-7 group-focus-within:text-xs group-focus-within:font-[Urbanist] group-focus-within:text-[#AFB1B6]
            peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Adresa de email
            </span>
          </Label>
          
          <Label className="flex flex-col-reverse relative group">
            <Input
              type="password" name="password" 
              placeholder=" "
              required
              className="peer focus-visible:ring-0 focus-visible:border-[#0059FE] focus-visible:bg-[#f0f2ff] bg-[#f5f5f5] h-[64px] px-4 py-3 pt-6 leading-9 text-base text-[#212121] tracking-[0.2px]"
            />

            <span className="font-[Inter] font-[600] text-[#AFB1B6] absolute text-base transform -translate-y-3 left-4 transition leading-10 tracking-[0.2px] group-focus-within:-translate-y-7 group-focus-within:text-xs group-focus-within:font-[Urbanist] group-focus-within:text-[#AFB1B6]
            peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-[Urbanist] peer-[:not(:placeholder-shown)]:text-[#AFB1B6]">
              Parola
            </span>
          </Label>

          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Sunt de acord cu Termenii & Condițiile și Politica de Confidențialitate</Label>
          </div>

          <Button type="submit" className="w-full rounded-2xl bg-[#01E2FA] text-grey-900 h-15 text-base font-[700] tracking-[0.2px] hover:bg-[#01E2FA60]">
            Creează Cont
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              SAU
            </span>
          </div>
          <Button type="submit" className="w-full rounded-2xl border border-[#EEEEEE] hover:bg-white bg-white text-grey-900 h-15 text-base font-[700] tracking-[0.2px]">
            <img src="/img/googleButton.svg" className="inline mr-2" />

            Continuă cu Google
          </Button>
          <Button type="submit" className="w-full rounded-2xl border border-[#EEEEEE] hover:bg-white bg-white text-grey-900 h-15 text-base font-[700] tracking-[0.2px]">
            <img src="/img/facebookButton.svg" className="inline mr-2" />

            Continuă cu Facebook
          </Button>
        </div>
      </form>
    </div>
  )
}
