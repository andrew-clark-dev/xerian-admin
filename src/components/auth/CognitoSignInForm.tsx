"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";

import { signIn, confirmResetPassword, resetPassword } from "aws-amplify/auth"


export default function CognitoSignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  // const [resetPassword, setResetPassword] = useState(false);
  const [confirmWithCode, setConfirmWithCode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Form submitted:" + email + " " + password);

    try {
      if (confirmWithCode) {
        await confirmResetPassword({
          username: email,
          confirmationCode: confirmationCode,
          newPassword: newPassword,
        });

        toast.success('Password udated');

        router.push("/"); // Redirect to home

      } else {
        const { nextStep, isSignedIn } = await signIn({ username: email, password: password });
        console.log(`Next step : ${nextStep.signInStep}`);

        switch (nextStep.signInStep) {
          case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
            const { nextStep: resetStep } = await resetPassword({ username: email });
            switch (resetStep.resetPasswordStep) {
              case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
                const codeDeliveryDetails = resetStep.codeDeliveryDetails;
                toast.success(`Confirmation code was sent to ${codeDeliveryDetails.destination} via ${codeDeliveryDetails.deliveryMedium}`);
                setConfirmWithCode(true);
                break;
              default:
                console.log(`Next step : ${nextStep}`);
                toast.error(`Could not reset password please contact your administrator`);
            }
            break;
          default:
            if (isSignedIn) {
              toast.success(`Sign in successful`);
              router.push("/"); // Redirect to home
            } else {
              toast.error(`Could not sign in please contact your administrator (step: ${nextStep.signInStep})`);
            }
        }
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Form error:" + err.message);
        toast.error(err.message || 'Sign In failed. Please try again.');

      } else {
        toast.error('Sign In failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">

      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {confirmWithCode ? (
                  <div>
                    <div>
                      <Label>
                        New Password <span className="text-error-500">*</span>{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>
                        Confirmation Code <span className="text-error-500">*</span>{" "}
                      </Label>
                      <Input onChange={(e) => setConfirmationCode(e.target.value)} />
                    </div>
                  </div>
                ) : null}
                < div className="flex items-center justify-between">
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" disabled={loading}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div >
    </div >
  );
}
