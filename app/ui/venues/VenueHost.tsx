"use client";

import { Card, Avatar, Text, Group } from "@mantine/core";
import { VenueOwnerProps } from "@/app/lib/definitions";

import Cookies from "js-cookie";
import Link from "next/link";
import useFetchUserByName from "@/app/lib/hooks/useFetchUserByName";

interface VenueHostProps {
   owner: VenueOwnerProps;
}

export function VenueHost({ owner }: VenueHostProps) {
   const { user } = useFetchUserByName(owner.name);
   const loggedInUser = Cookies.get("name");

   return (
      <Card padding="xl" radius="none" className="bg-white drop-shadow-sm">
         <Card.Section
            h={140}
            style={{ backgroundImage: `url(${owner.banner.url})` }}
         />
         <Avatar
            src={owner.avatar.url}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
            className="border border-white"
         />
         <Text ta="center" fz="lg" fw={500} mt="sm">
            {owner.name}
         </Text>
         <Text ta="center" fz="sm" c="dimmed">
            {owner.email}
         </Text>
         <Group mt="md" justify="center" gap={30}>
            <div>
               <Text ta="center" fz="lg" fw={500}>
                  {user?._count?.venues || 0}
               </Text>
               <Text ta="center" fz="sm" c="dimmed" lh={1}>
                  Venues
               </Text>
            </div>
            <div>
               <Text ta="center" fz="lg" fw={500}>
                  {user?._count?.bookings || 0}
               </Text>
               <Text ta="center" fz="sm" c="dimmed" lh={1}>
                  Bookings
               </Text>
            </div>
         </Group>
         {loggedInUser ? (
            <Link
               href={`/user/${owner.name}`}
               className="mt-6 w-full bg-brown px-4 py-2 text-center font-extralight uppercase tracking-widest text-white transition hover:bg-darkBrown"
            >
               profile
            </Link>
         ) : (
            <button
               className="mt-6 w-full bg-lightGrey px-4 py-2 text-center font-extralight uppercase tracking-widest text-white"
               disabled
            >
               profile
            </button>
         )}
      </Card>
   );
}
