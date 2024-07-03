"use client";

import {
   Paper,
   Center,
   TextInput,
   PasswordInput,
   Button,
   Title,
   Text,
} from "@mantine/core";
import { handleLoginSubmit } from "@/app/lib/actions";
import Link from "next/link";
import Logo from "@/app/ui/Logo";
import logoBlack from "@/public/logo-black.svg";

export default function LoginForm() {
   return (
      <form onSubmit={handleLoginSubmit}>
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
                  Login
               </Title>
               <TextInput
                  label="Email address"
                  placeholder="Enter email"
                  size="md"
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
               <Button
                  fullWidth
                  mt="xl"
                  size="md"
                  fw={400}
                  color="green.9"
                  variant="filled"
                  type="submit"
               >
                  Login
               </Button>

               <Text ta="center" mt="md">
                  Don&apos;t have an account? Register{" "}
                  <Link
                     href="/user/register"
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