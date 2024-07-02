"use client";

import {
   IconStar,
   IconWifi,
   IconParking,
   IconToolsKitchen2,
   IconPaw,
   IconLocation,
} from "@tabler/icons-react";
import { Card, Text, Group, Badge, Button, rem } from "@mantine/core";
import Image from "next/legacy/image";
import { formatNumber } from "@/app/lib/utils";
import useImageSource from "@/app/lib/hooks/useImageSource";
import backgroundReflection from "@/public/background-reflection.avif";
import { VenueProps } from "@/app/lib/definitions";

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
               <Text fz="lg" fw={500}>
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
            <Text fz="sm" mt="xs" className="h-[64px] overflow-y-hidden">
               {venue.description}
            </Text>
         </Card.Section>

         <Card.Section className="border-b border-lightGrey pb-4 pe-4 ps-4 pt-3">
            <Group gap={7} mt={5}>
               {venue.location.country ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={
                        <IconLocation className="p-[4px]" stroke={2} />
                     }
                  >
                     {venue.location.country}
                  </Badge>
               ) : (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={
                        <IconLocation className="p-[4px]" stroke={2} />
                     }
                  >
                     Country
                  </Badge>
               )}

               {venue.meta.wifi ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={<IconWifi className="p-[2px]" stroke={2} />}
                  >
                     Wifi
                  </Badge>
               ) : null}

               {venue.meta.parking ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={
                        <IconParking className="p-[2px]" stroke={2} />
                     }
                  >
                     Parking
                  </Badge>
               ) : null}

               {venue.meta.breakfast ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={
                        <IconToolsKitchen2 className="p-[2px]" stroke={2} />
                     }
                  >
                     Breakfast
                  </Badge>
               ) : null}

               {venue.meta.pets ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={<IconPaw className="p-[2px]" stroke={2} />}
                  >
                     Pets allowed
                  </Badge>
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
