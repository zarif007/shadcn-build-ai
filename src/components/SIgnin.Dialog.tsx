"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const SIgninDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: (value: boolean) => void;
}) => {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          window.location.origin
        }/auth/callback?redirectTo=${encodeURIComponent(window.location.href)}`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome back</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to continue to your account
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full py-4"
          >
            Sign in with Google
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SIgninDialog;
