"use client";

import {
   IconStar,
   IconWifi,
   IconParking,
   IconToolsKitchen2,
   IconPaw,
   IconLocation,
} from "@tabler/icons-react";
import { Card, Text, Group, Button, rem } from "@mantine/core";
import Image from "next/legacy/image";
import Link from "next/link";
import { formatNumber } from "@/app/lib/utils";
import useImageSource from "@/app/lib/hooks/useImageSource";
import backgroundReflection from "@/public/background-reflection.avif";
import { VenueProps } from "@/app/lib/definitions";

import VenueCardBadge from "@/app/ui/venues/VenueCardBadge";

const VenueCard: React.FC<{ venue: VenueProps; onClick: () => void }> = ({
   venue,
   onClick,
}) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

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
            <div>
               <Text
                  fz="sm"
                  mt="xs"
                  className="h-[40px] overflow-y-hidden whitespace-pre-wrap break-words"
               >
                  {venue.description || "No description available"}
               </Text>
               <Link
                  href={`/venues/${venue.id}`}
                  className="flex justify-end text-blue hover:underline"
               >
                  ...see more
               </Link>
            </div>
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

            <Button color="brown" radius="sm" onClick={onClick}>
               Show details
            </Button>
         </Group>
      </Card>
   );
};

export default VenueCard;
