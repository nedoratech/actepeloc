import { LoginForm } from "@/components/login-form";

function Login() {
  return (
    <div
      className="grid min-h-svh lg:grid-cols-2"
      style={{ background: "linear-gradient(to left, #0059FE, #4284FF)" }}
    >
      <div className="relative hidden grid-rows-3 items-center justify-items-center font-[Inter] text-white lg:grid">
        <img className="align-middle" src="/img/logoAPL.svg" alt="Logo acte pe loc" />
        <div className="grid max-w-[316px] grid-rows-2 items-center justify-items-center gap-3">
          <img src="/img/resumeFolder.svg" alt="Logo dosar cu acte" />
          <div className="text-center">
            <h5 className="mb-2 text-xl leading-[1.2] font-bold">
              Toate actele tale
              <br />
              într-un singur loc
            </h5>
            <p className="text-base leading-[1.4] font-[500] tracking-[0.2px]">
              Lorem ipsum câteva detalii despre în această pagină
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 p-6 md:p-10">
        <div className="flex w-[420px] justify-center gap-2 font-[Inter] text-base leading-[1.4] font-[400] tracking-[0.2px] text-white md:justify-start">
          <span>Nu ai încă un cont? </span>
          <a href="#" className="flex items-center gap-2 font-bold text-[#01E2FA]">
            SIGN UP
          </a>
        </div>
        <div className="w-full max-w-[420px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
