"use client";

import {
   Paper,
   Center,
   TextInput,
   PasswordInput,
   Checkbox,
   Tooltip,
   Button,
   Title,
   Text,
   MantineProvider,
   createTheme,
} from "@mantine/core";
import { useState } from "react";
import { handleRegisterSubmit } from "@/app/lib/actions";
import Link from "next/link";
import Logo from "@/app/ui/Logo";
import logoBlack from "@/public/logo-black.svg";

export default function RegistrationForm() {
   const [isChecked, setIsChecked] = useState(false);
   const handleChange = () => {
      setIsChecked(!isChecked);
   };

   const theme = createTheme({
      cursorType: "pointer",
   });

   return (
      <form onSubmit={(event) => handleRegisterSubmit(event, isChecked)}>
         <div
            className={`min-h-[900px] bg-[url('../../public/background-beach.avif')] bg-cover bg-top`}
         >
            <Paper
               className="min-h-[900px] max-w-full border-r border-lightGrey pt-[80px] sm:max-w-[450px]"
               radius={0}
               p={30}
            >
               <Center mt="lg" mb={48}>
                  <Logo src={logoBlack} width={250} height={40} />
               </Center>

               <Title
                  order={1}
                  ta="center"
                  mb={24}
                  fw={200}
                  fz={28}
                  className="uppercase tracking-widest"
               >
                  Register user
               </Title>
               <TextInput
                  label="Name"
                  placeholder="Enter name"
                  size="md"
                  id="name"
                  name="name"
               />
               <TextInput
                  label="Email address"
                  placeholder="Enter email"
                  size="md"
                  mt="md"
                  id="email"
                  name="email"
               />
               <PasswordInput
                  label="Password"
                  placeholder="Enter password"
                  mt="md"
                  size="md"
                  id="password"
                  name="password"
               />
               <MantineProvider theme={theme}>
                  <Tooltip
                     label="Venue Managers can create and manage their own venues"
                     refProp="rootRef"
                  >
                     <Checkbox
                        checked={isChecked}
                        onChange={handleChange}
                        label="Register as Venue Manager"
                        color="yellow.6"
                        mt="xl"
                        size="md"
                        id="venueManager"
                        name="venueManager"
                        value="venueManager"
                     />
                  </Tooltip>
               </MantineProvider>
               <Button
                  fullWidth
                  mt="xl"
                  size="md"
                  fw={400}
                  color="green.9"
                  variant="filled"
                  type="submit"
               >
                  Create account
               </Button>

               <Text ta="center" mt="md">
                  Already have an account? Login{" "}
                  <Link
                     href="/user/login"
                     className="text-blue underline hover:font-medium"
                  >
                     here
                  </Link>
               </Text>

               <div className="alert-container"></div>
            </Paper>
         </div>
      </form>
   );
}
