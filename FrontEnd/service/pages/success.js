import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Countdown timer effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        clearInterval(intervalId);
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-black mb-4">
        Payment Successful!
      </h1>
      <p className="text-black text-lg mb-4">
        You will be redirected to the home page in {countdown} seconds...
      </p>
    </div>
  );
}

export default Success;
