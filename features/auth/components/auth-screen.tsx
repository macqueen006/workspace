"use client";

import { Fragment, useState } from "react";
import { signInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<signInFlow>("signin");
  return (
    <Fragment>
      <div className="h-screen w-screen grid place-content-center bg-slack">
        <div className="md:h-auto md:w-[420px]">
          {state === "signin" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
        </div>
      </div>
    </Fragment>
  );
};
