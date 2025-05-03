import React from "react";
import PromptInput from "./Prompt.Input";

const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
            What do you want to{" "}
            <span className="px-2 rounded-md animate-gradient-border bg-[length:400%_100%] bg-gradient-to-r from-rose-500 via-violet-500 to-blue-500 dark:from-rose-800 dark:via-violet-800 dark:to-blue-800">
              build
            </span>{" "}
            today
          </h1>
          <p className="text-xl text-muted-foreground">
            Develop anything with the power of{" "}
            <span className="font-bold text-[black] dark:text-[white]">
              AI + ShadCN UI
            </span>
          </p>
        </div>
        <PromptInput />
      </div>
    </div>
  );
};

export default Hero;
