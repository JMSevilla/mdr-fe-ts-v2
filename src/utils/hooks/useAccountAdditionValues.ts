import { atom } from "jotai";
import { AccountCreation } from "@/pages/create-account";
import { loginAccount } from "@/pages/login";
import { PersonalAccountCreation } from "@/components/UserManagement/forms/PersonalDetailsForms";
import { CredentialsAccountCreation } from "@/components/UserManagement/forms/CredentialsDetailsForms";
import { EditFormUserAccount } from "@/components/UserManagement";
import { TaskInformationCreation } from "@/components/TaskManagement/forms";
import { TaskAssigneeCreation } from "@/components/TaskManagement/forms/TaskAssignee";
import { ProductManagementCreation } from "@/pages/sys-admin/product-management";
import { categoryManagementCreation } from "@/pages/sys-admin/category-manage-all";
import { MeetCreation } from "@/components/Jitsi/StartupPage";
import { EmailAccountCreation } from "@/components/ForgotPassword/forms/EmailDetailsForms";
import { VerificationAccountCreation } from "@/components/ForgotPassword/forms/VerificationDetailsForms";
import { NewCredentialsAccountCreation } from "@/components/ForgotPassword/forms/NewCredentialsForms";
import { JoinMeetingFormAccount } from "@/pages/sys-admin/digital-meet";
import { ClientAccountCreation } from "@/components/client";

type AccountCreationFormData = {
  accountCreation: AccountCreation;
};

type AccountLoginFormData = {
  accountLoginFrmData: loginAccount;
};

type AccountClientCreationFormData = {
  accountClientCreation: ClientAccountCreation;
};

export const verificationAtom = atom<VerificationAccountCreation | undefined>(
  undefined
);

export const joinMeetAtom = atom<JoinMeetingFormAccount | undefined>(undefined);

export const emailAtom = atom<EmailAccountCreation | undefined>(undefined);

export const meetAtom = atom<MeetCreation | undefined>(undefined);

export const fpIdAtom = atom(0);

export const newCredentialsAtom = atom<
  NewCredentialsAccountCreation | undefined
>(undefined);

export const categoryManagementAtom = atom<
  categoryManagementCreation | undefined
>(undefined);

export const productManagementAtom = atom<
  ProductManagementCreation | undefined
>(undefined);

export const taskAssigneeAtom = atom<TaskAssigneeCreation | undefined>(
  undefined
);

export const taskInformationAtom = atom<TaskInformationCreation | undefined>(
  undefined
);

export const personalAccountDetailsAtom = atom<
  PersonalAccountCreation | undefined
>(undefined);

export const editFormUserAccountAtom = atom<EditFormUserAccount | undefined>(
  undefined
);

export const credentialAccountDetailsAtom = atom<
  CredentialsAccountCreation | undefined
>(undefined);

export const accountCreationAtom = atom<AccountCreation | undefined>(undefined);

export const accountLoginAtom = atom<loginAccount | undefined>(undefined);
export const ClientCreationAtom = atom<ClientAccountCreation | undefined>(
  undefined
);
export const accountClientCreationAtom = atom(
  (get) => {
    const accountClientCreation = get(ClientCreationAtom);
    return {
      accountClientCreation,
    };
  },
  (_, set, { accountClientCreation }: AccountClientCreationFormData) => {
    set(ClientCreationAtom, accountClientCreation);
  }
);
export const accountAtom = atom(
  (get) => {
    const accountCreation = get(accountCreationAtom);
    return {
      accountCreation,
    };
  },
  (_, set, { accountCreation }: AccountCreationFormData) => {
    set(accountCreationAtom, accountCreation);
  }
);

export const loginAtom = atom(
  (get) => {
    const accountLoginFrmData = get(accountLoginAtom);
    return {
      accountLoginFrmData,
    };
  },
  (_, set, { accountLoginFrmData }: AccountLoginFormData) => {
    set(accountLoginAtom, accountLoginFrmData);
  }
);
