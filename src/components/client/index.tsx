import { Container, Box, Typography, Grid } from "@mui/material";
import HomeFooterSection from "../Content/Home/FooterSection";
import { NormalButton } from "../Button/NormalButton";
import { CSSProperties, useEffect } from "react";
import { useRouter } from "next/router";
import UncontrolledCard from "../Cards/Card";
import ControlledGrid from "../Grid/Grid";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { requiredString } from "@/utils/formSchema";
import { ControlledTextField } from "../TextField/TextField";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { useAtom } from "jotai";
import { ControlledCheckbox } from "../Checkbox/Checkbox";

import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import { useApiCallBack } from "@/utils/hooks/useApi";
import { useMutation } from "react-query";
import { usePreviousValue } from "@/utils/hooks/usePreviousValue";
import { PasswordStrengthMeter } from "../PasswordStrengthMeter/PasswordStrengthMeter";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import {
  accountClientCreationAtom,
  ClientCreationAtom,
} from "@/utils/hooks/useAccountAdditionValues";
const clientRegistrationBaseSchema = z.object({
  firstName: requiredString("Your firstname is required."),
  lastName: requiredString("Your lastname is required"),
  email: requiredString("Your email is required.").email(),
  password: requiredString("Your password is required."),
  conpassword: requiredString("Please confirm your password."),
});

const schema = z
  .discriminatedUnion("hasNoMiddleName", [
    z
      .object({
        hasNoMiddleName: z.literal(false),
        middleName: requiredString(
          "Please provide your middlename or select i do not have a middlename"
        ),
      })
      .merge(clientRegistrationBaseSchema),
    z
      .object({
        hasNoMiddleName: z.literal(true),
      })
      .merge(clientRegistrationBaseSchema),
  ])
  .refine(
    ({ conpassword, password }) => {
      return password === conpassword;
    },
    { path: ["conpassword"], message: "Password did not match" }
  );
export type ClientAccountCreation = z.infer<typeof schema>;
const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
};
zxcvbnOptions.setOptions(options);
const SignUpForm = () => {
  const { control, watch, resetField, trigger, getValues } =
    useFormContext<ClientAccountCreation>();
  const values = getValues();
  const hasNoMiddleName = watch("hasNoMiddleName");
  const passwordWatcher = watch("password");
  const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName);
  useEffect(() => {
    resetField("middleName");
    if (hasNoMiddleNamePrevValue) {
      trigger("hasNoMiddleName");
    }
  }, [
    hasNoMiddleName,
    hasNoMiddleNamePrevValue,
    resetField,
    trigger,
    passwordWatcher,
  ]);

  const result = zxcvbn(values.password == undefined ? "" : values.password);
  return (
    <>
      <ControlledTextField
        control={control}
        required
        shouldUnregister
        name="firstName"
        label="Firstname"
      />
      <ControlledTextField
        control={control}
        required={!hasNoMiddleName}
        shouldUnregister
        name="middleName"
        label="Middlename"
        disabled={hasNoMiddleName}
      />
      <ControlledCheckbox
        control={control}
        name="hasNoMiddleName"
        label="I do not have a middlename"
      />
      <ControlledTextField
        control={control}
        required
        shouldUnregister
        name="lastName"
        label="Lastname"
      />
      <ControlledTextField
        control={control}
        required
        shouldUnregister
        name="email"
        label="Email"
      />
      <ControlledTextField
        control={control}
        required
        shouldUnregister
        name="password"
        label="Password"
        type="password"
      />
      <PasswordStrengthMeter result={result} />
      <ControlledTextField
        control={control}
        required
        shouldUnregister
        name="conpassword"
        label="Confirm Password"
        type="password"
      />
    </>
  );
};

export const SignUpAdditionalForm = () => {
  const [clientDetailsAtom, setClientDetailsAtom] = useAtom(ClientCreationAtom);
  const form = useForm<ClientAccountCreation>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: clientDetailsAtom ?? { hasNoMiddleName: false },
  });
  const {
    formState: { isValid },
    handleSubmit,
  } = form;
  const router = useRouter();
  const styled: CSSProperties = {
    position: "absolute",
    width: "45px",
    height: "19px",
    left: "51px",
    top: "27px",
    color: "black",
  };
  return (
    <>
      <NormalButton
        style={styled}
        onClick={() => router.push("/")}
        children="Home"
        variant="text"
      />
      <Container maxWidth="lg" sx={{ mt: 10, height: "100vh" }}>
        <ControlledGrid>
          <Grid item xs={6}>
            <UncontrolledCard
              style={{
                borderRadius: "21px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={"hdlogodgr.png"}
                  width={200}
                  height={200}
                  alt="dgr logo"
                  style={{ marginBottom: "30px" }}
                />
              </div>
              <Typography variant="overline">Create an account</Typography>
              <hr />
              <FormProvider {...form}>
                <Container maxWidth="xs" sx={{ mt: 3 }}>
                  <SignUpForm />
                  <button
                    disabled={!isValid}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    style={{
                      marginTop: "10px",
                      background: "#B92372",
                    }}
                  >
                    SIGN UP
                  </button>
                </Container>
              </FormProvider>
            </UncontrolledCard>
          </Grid>

          <Grid item xs={6}>
            <img
              src="clientregpic.png"
              alt="Client registration animated man"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </ControlledGrid>
      </Container>
      <HomeFooterSection />
    </>
  );
};
