import React, { useState, useEffect, useContext } from 'react'
import { ResponsiveAppBar, UncontrolledCard, ControlledGrid, ControlledBackdrop } from '@/components'
import { Container, Typography, Button, Box, Grid } from '@mui/material'
import { ControlledTextField } from '@/components/TextField/TextField'
import { useForm, FormProvider } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requiredString } from '@/utils/formSchema'
import { usePreviousValue } from '@/utils/hooks/usePreviousValue'
import { accountCreationAtom } from '@/utils/hooks/useAccountAdditionValues'
import { useSetAtom, useAtomValue } from 'jotai/react'

import { useRefreshTokenHandler } from '@/utils/hooks/useRefreshTokenHandler'

import { ControlledCheckbox } from '@/components/Checkbox/Checkbox'

import { ToastContextContinue } from '@/utils/context/base/ToastContext'
import { ToastContextSetup } from '@/utils/context'

import { useRouter } from 'next/router'
import { useApiCallBack } from '@/utils/hooks/useApi'
import { UAMCreationAdminArgs } from './api/users/types'
import { AuthenticationJwtCreateAccount } from './api/Authentication/types'
const baseSchema = z.object({
    firstName: requiredString("Your firstname is required."),
    lastName: requiredString("Your lastname is required."),
    email: requiredString("Your email is required.").email(),
    password: requiredString("Your password is required."),
    conpassword: requiredString("Please confirm your password.")
})

const schema = z.discriminatedUnion('hasNoMiddleName', [
    z.object({
        hasNoMiddleName: z.literal(false),
        middleName: requiredString(
            'Please provide your middlename or select i do not have a middlename'
        )
    }).merge(baseSchema),
    z
      .object({
        hasNoMiddleName: z.literal(true),
      })
      .merge(baseSchema),
])
.refine(
    ({ conpassword, password }) => {
        return password === conpassword
    },
    { path: ["conpassword"], message: "Password did not match"}
)

export type AccountCreation = z.infer<typeof schema>


const CreateAccount: React.FC = () => {
    useRefreshTokenHandler()
    const UAMCheckEmail = useApiCallBack(async(api, randomNum: Number) => await api.users.UAMCheckAccounts(randomNum))
    const UAMCreationOfAccount = useApiCallBack(async (api, args : UAMCreationAdminArgs) => await api.users.UAMCreateAdmin(args))
    const jwtAuthAccountCreation = useApiCallBack(async (api, args: AuthenticationJwtCreateAccount) => await api.authentication.authenticationJwtCreateAccount(args))
    const setupAccountCheckEmail = useApiCallBack((api, email: string) => api.users.SetupAccountCreationCheckEmail(email))
    const router = useRouter()
    const { 
        handleOnToast
    } = useContext(ToastContextContinue) as ToastContextSetup
    const form = useForm<AccountCreation>({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            password: "",
            hasNoMiddleName: false
        }
    })

    const {
        control,
        formState: { isValid, errors },
        watch,
        handleSubmit,
        reset,
        getValues,
        resetField,
        trigger
    } = form

    const [open, setOpen] = useState(false)
    
    const setAccountCreation = useSetAtom(accountCreationAtom)
    const baseAccountInfo = useAtomValue(accountCreationAtom)
    const hasNoMiddleName = watch("hasNoMiddleName")
    const hasNoMiddleNamePrevValue = usePreviousValue(hasNoMiddleName)

    useEffect(() => {
        UAMCheckEmail.execute(1).then((response : any) => {
          const { data } : any = response;
          if(data === "not_exist"){
            
          }else{
            router.push('/')
          }
        }).catch(error => {
            return;
        })
      }, [])

    useEffect(() => {
        resetField("middleName")
        if(hasNoMiddleNamePrevValue){
            trigger("middleName")
        }
    }, [hasNoMiddleName, hasNoMiddleNamePrevValue, resetField, trigger])

    const onSubmit = (data: any) => {
        setOpen(!open)
        setAccountCreation(data)
        const obj = {
            firstname: data.firstName,
            middlename: data.hasNoMiddleName ? "N/A" : data.middleName,
            lastname: data.lastName,
            email: data.email,
            password: data.password
        }
        setupAccountCheckEmail.execute(obj.email)
        .then((logger: any) => {
            if(logger?.data == 'email_exist'){
                setOpen(false)
                handleOnToast(
                    "This email is already taken.",
                    "top-right",
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    "dark",
                    "error"
                )
                return;
            } else{
                UAMCreationOfAccount.execute(obj).then((res: any) => {
                    const { data } : any = res
                    if(data == 'Success'){
                        jwtAuthAccountCreation.execute({
                            jwtusername : obj.email,
                            jwtpassword : obj.password,
                            isValid: "1"
                        }).then((repository: any) => {
                            if(repository?.data?.status === 'Success') {
                                setOpen(false)
                                reset({});
                                handleOnToast(
                                    "Successfully added",
                                    "top-right",
                                    false,
                                    true,
                                    true,
                                    true,
                                    undefined,
                                    "dark",
                                    "success"
                                )
                                router.push('/')
                            }
                        }).catch(error => {
                            if(error?.response?.status === 500) {
                                handleOnToast(
                                    "Your password is too weak",
                                    "top-right",
                                    false,
                                    true,
                                    true,
                                    true,
                                    undefined,
                                    "dark",
                                    "error"
                                )
                                setOpen(false)
                            } else if(error?.response?.message == 'User already exists!') {
                                handleOnToast(
                                    "User already exist",
                                    "top-right",
                                    false,
                                    true,
                                    true,
                                    true,
                                    undefined,
                                    "dark",
                                    "error"
                                )
                                setOpen(false)
                            }
                        })
                    }
                }).catch(error => {
                    setOpen(false)
                    return;
                })
            }
        })
    }


    return (
        <>
              <Container style={{marginTop: '100px'}}>
                <UncontrolledCard>
                    <Typography variant="h5" mb="2">Administrator Information</Typography>
                    <hr/>
                <FormProvider {...form}>
                            <ControlledGrid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="firstName"
                                    label="Firstname"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    disabled={hasNoMiddleName}
                                    name="middleName"
                                    required={!hasNoMiddleName}
                                    label="Middlename"
                                    shouldUnregister={true}
                                    />
                                    <ControlledCheckbox
                                                control={control}
                                                name="hasNoMiddleName"
                                                label="I do not have a middle name"
                                                />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="lastName"
                                    label="Lastname"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                            </ControlledGrid>
                            <ControlledGrid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="email"
                                    label="Email"
                                    shouldUnregister={true}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                <ControlledTextField 
                                    control={control}
                                    required
                                    name="password"
                                    label="Password"
                                    shouldUnregister={true}
                                    type="password"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <ControlledTextField 
                                    control={control}
                                    required
                                    name="conpassword"
                                    label="Confirm Password"
                                    shouldUnregister={true}
                                    type="password"
                                    />
                                </Grid>
                            </ControlledGrid>
                            <Button
                                    variant='contained'
                                    color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!isValid}
                                    style={{
                                        float: 'right',
                                        marginTop: '10px',
                                        marginBottom: '10px'
                                    }}
                                    
                                    >Submit</Button>
                       </FormProvider>
                </UncontrolledCard>
                <ControlledBackdrop open={open} />
            </Container>
        </>
    )
}

export default CreateAccount