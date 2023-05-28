import React from 'react';
import { Container, Grid, FormControlLabel } from '@mui/material';
import { NormalButton } from '@/components/Button/NormalButton';
import { ControlledTextField } from '@/components/TextField/TextField';
import { useForm, FormProvider, useFormContext } from 'react-hook-form'; 
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTypography from '@/components/Typography/Typography';
import { ControlledCheckbox } from '@/components/Checkbox/Checkbox';
import ControlledGrid from '@/components/Grid/Grid';
import { requiredString } from "@/utils/formSchema";

const schema = z.object({
  firstName: requiredString("Your firstname is required."),
  lastName: requiredString("Your lastname is required."),
  email: requiredString("Your email is required.").email(),
  message: requiredString("Message is required"),
  pos: z.boolean(),
  tms: z.boolean(),
});

const ContactForm = () => {
  const { control, handleSubmit } = useFormContext();

  const handleContinue = () => {
    handleSubmit((values) => {
      // form submission logic here
    });
    return false;
  };

  return (
    <Container style={{ marginTop: '0' }}>
      <ControlledGrid>
        <Grid item xs={12}>
          <ControlledTextField
            control={control}
            name="firstName"
            label="Firstname"
            shouldUnregister={true}
          />
        </Grid>
        <Grid item xs={12} >
          <ControlledTextField
            control={control}
            name="lastName"
            label="Lastname"
            shouldUnregister={true}
          />
        </Grid>
        <Grid item xs={12}>
          <ControlledTextField
            control={control} 
            name="email"
            label="Email"
            shouldUnregister={true}
          />
        </Grid>
        <ControlledTypography 
          variant={'inherit'} 
          text={'Let us know what system you are interested in'}
          style={{
            float: 'left',
            marginTop: '25px',
            marginLeft: '15px'
          }}
        />
        <Grid item xs={12}>
        <ControlledCheckbox
          control={control}
          color="primary"
          name={'POS'} 
          label={'POS'} 
        />
        </Grid>
        <Grid item xs={12}>
        <ControlledCheckbox
          control={control}
          color="primary" 
          name={'TMS'}     
          label="TMS"
        />
        </Grid>
        <Grid item xs={12} >
          <ControlledTextField
            control={control}
            name="message"
            label="Message"
            shouldUnregister={true}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <NormalButton
            variant="outlined"
            color="primary"
            onClick={handleContinue}
            style={{
              float: 'right',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            Submit
          </NormalButton>
        </Grid>
      </ControlledGrid>
    </Container>
  );
};

const ContactUsForm = () => {
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <ContactForm />
    </FormProvider>
  );
};

export const ContactUs = () => {
  return <ContactUsForm />;
};

export default ContactUsForm;