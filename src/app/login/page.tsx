import LoginForm from "@/components/login & otp/LoginForm";

export default function LoginPage() {
  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <LoginForm />
          </div>
        </div>
      </div>
      
      {/* Background SVG - same as original component */}
      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG content from the original component */}
        </svg>
      </div>
    </section>
  );
}