"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const NotFoundPage = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-desctructive">Could not find requested page</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={handleRedirect}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
