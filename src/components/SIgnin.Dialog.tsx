import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SIgninDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: (value: boolean) => void;
}) => {
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
            onClick={() =>
              signIn("google", { callbackUrl: window.location.href })
            }
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
