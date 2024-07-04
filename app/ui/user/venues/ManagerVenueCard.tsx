"use client";

import {
   IconStar,
   IconWifi,
   IconParking,
   IconToolsKitchen2,
   IconPaw,
   IconLocation,
} from "@tabler/icons-react";
import { Card, Text, Group, rem } from "@mantine/core";
import { ManagerVenueCardProps } from "@/app/lib/definitions";
import { formatNumber } from "@/app/lib/utils";
import { LinkButton } from "@/app/ui/ButtonComponents";
import Image from "next/legacy/image";
import backgroundReflection from "@/public/background-reflection.avif";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";
import VenueCardBadge from "@/app/ui/venues/VenueCardBadge";

const ManagerVenueCard: React.FC<ManagerVenueCardProps> = ({ venue, user }) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

   const isOwner = user && venue.owner && user.name === venue.owner.name;
   const redirectLink = isOwner
      ? `/user/venues/${venue.id}`
      : `/venues/${venue.id}`;

   return (
      <Card
         withBorder
         radius="md"
         padding="md"
         className="flex bg-white drop-shadow-sm"
      >
         <Card.Section>
            <div className="relative h-[160px]">
               <Image
                  src={imgSrc}
                  alt={
                     venue.media && venue.media.length > 0
                        ? venue.media[0].alt
                        : "Venue image"
                  }
                  onError={() => setImgSrc(backgroundReflection)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
               />
            </div>
         </Card.Section>

         <Card.Section
            className="basis-1/2 border-b border-lightGrey pb-4 pe-4 ps-4"
            mt="md"
         >
            <Group justify="space-between">
               <Text fz="lg" className="truncate">
                  {venue.name}
               </Text>
               <Group gap={5}>
                  <IconStar
                     style={{ width: rem(16), height: rem(16) }}
                     stroke={1.5}
                     className="text-dark"
                  />
                  <Text fz="sm">{venue.rating}</Text>
               </Group>
            </Group>
            <Text fz="sm" mt="xs">
               <p className="h-[40px] overflow-y-hidden whitespace-pre-wrap break-words">
                  {venue.description || "No description available"}
               </p>
               <Link
                  href={redirectLink}
                  className="flex justify-end text-blue hover:underline"
               >
                  ...see more
               </Link>
            </Text>
         </Card.Section>

         <Card.Section className="border-b border-lightGrey pb-4 pe-4 ps-4 pt-3">
            <Group gap={7} mt={5}>
               {venue.location.city ? (
                  <VenueCardBadge
                     text={venue.location.city}
                     icon={<IconLocation className="p-[4px]" stroke={2} />}
                  />
               ) : venue.location.country ? (
                  <VenueCardBadge
                     text={venue.location.country}
                     icon={<IconLocation className="p-[4px]" stroke={2} />}
                  />
               ) : venue.location.continent ? (
                  <VenueCardBadge
                     text={venue.location.continent}
                     icon={<IconLocation className="p-[4px]" stroke={2} />}
                  />
               ) : null}

               {venue.meta.wifi ? (
                  <VenueCardBadge
                     text="Wifi"
                     icon={<IconWifi className="p-[2px]" stroke={2} />}
                  />
               ) : null}

               {venue.meta.parking ? (
                  <VenueCardBadge
                     text="Parking"
                     icon={<IconParking className="p-[2px]" stroke={2} />}
                  />
               ) : null}

               {venue.meta.breakfast ? (
                  <VenueCardBadge
                     text="Breakfast"
                     icon={<IconToolsKitchen2 className="p-[2px]" stroke={2} />}
                  />
               ) : null}

               {venue.meta.pets ? (
                  <VenueCardBadge
                     text="Pets allowed"
                     icon={<IconPaw className="p-[2px]" stroke={2} />}
                  />
               ) : null}
            </Group>
         </Card.Section>

         <Group mt="md" justify="space-between">
            <div>
               <Text fz="xl" span fw={500} className="text-dark">
                  £{formatNumber(venue.price)}
               </Text>
               <Text span fz="sm" c="dimmed">
                  {" "}
                  / night
               </Text>
            </div>

            <LinkButton
               targetHref={redirectLink}
               styles="px-2 py-1 rounded-sm tracking-wide"
               fontSize="sm"
               text="Show details"
            />
         </Group>
      </Card>
   );
};

export default ManagerVenueCard;
