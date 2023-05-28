import React from 'react';
import { useRouter } from 'next/router';
import { requiredString } from '@/utils/formSchema';
import { z } from 'zod';
import ContactUsForm from './ContactForm';

const schema = z.object({
  firstName: requiredString('Your firstname is required.'),
  lastName: requiredString('Your lastname is required.'),
  email: requiredString('Your email is required.').email(),
  message: requiredString('Message is required'),
  pos: z.boolean(),
  tms: z.boolean(),
});

const ContactUs = () => {
  const Router = useRouter();
  return (
    <div className="mx-4">
      <div className="px-4 pt-8">
        <h2 className="cursor-pointer text-black-400">
          <a onClick={() => Router.push('/')}>
            <span aria-hidden="true">&larr;</span> Home
          </a>
        </h2>
      </div>
      <div className="flex justify-center items-center h-0 w-full p-0">
        <img
          className="w-200px items-center md:w-[305px] pt-16 md:pt-11 top-1"
          src="drlogo.png"
          alt="Digital Resolve logo"
        />
      </div>
      <div className="flex gap-6 py-1  mt-0  md:mt-[90px] flex-col md:flex-row md:py-20">
        <div className="container mx-auto mt-5">
          <div className="w-full md:w-3/5 m-3 p-2 md:p-4 pt-16">
            <h2 className="flex-none w-full md:w-[553px] h-[50px]  tracking-tight text-gray-900 text-3xl font-bold">
              Let’s talk. We’re here to help.
            </h2>
            <p className="w-full md:w-[767px] h-15 md:h-[426px] text-black-300 text-xl d:text-center py-8 md:py-4">
              If you have any questions or comments feel free to contact us by
              filling out this form. You can also follow us on our facebook page
              Digital resolve for new updates. We look forward to hearing from
              you!
            </p>
          </div>
        </div>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUs;
