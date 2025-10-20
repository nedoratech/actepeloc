import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEnd } from "lucide-react"

function Login() {
  return (
    <div
      className="grid min-h-svh lg:grid-cols-2"
      style={{ background: 'linear-gradient(to right, #0059FE, #4284FF)' }}
    >
      <div className="relative hidden lg:grid font-[Inter] text-white grid-rows-3 items-center justify-items-center">
        <img
          className="align-middle"
          src="/img/logoAPL.svg"
          alt="Logo acte pe loc"
        />
        <div className="grid items-center justify-items-center grid-rows-2 max-w-[316px] gap-3">
          <img
            src="/img/resumeFolder.svg"
            alt="Logo dosar cu acte"
          />
          <div className="text-center">
            <h5 className="font-bold text-xl leading-[1.2] mb-2">
              Toate actele tale<br />într-un singur loc
            </h5>
            <p className="font-[500] text-base leading-[1.4] tracking-[0.2px]">Lorem ipsum câteva detalii despre în această pagină</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
