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
import { formatDate, formatNumber } from "@/app/lib/utils";
import { BookingCardProps } from "@/app/lib/definitions";
import Image from "next/legacy/image";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";
import backgroundReflection from "@/public/background-reflection.avif";

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
   const [imgSrc, setImgSrc] = useImageSource(booking);

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
                  alt={booking.venue.media[0]?.alt || "Venue image"}
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
               <Text fz="lg" className="max-w-[80%] truncate">
                  {booking.venue.name}
               </Text>
               <Group gap={2}>
                  <IconStar
                     style={{ width: rem(16), height: rem(16) }}
                     stroke={1.5}
                     className="text-dark"
                  />
                  <Text fz="sm">{booking.venue.rating}</Text>
               </Group>
            </Group>
            <Text fz="sm" mt="0" c="dimmed">
               {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
            </Text>
         </Card.Section>

         <Card.Section className="border-b border-lightGrey pb-4 pe-4 ps-4 pt-3">
            <Group gap={7} mt={5}>
               {booking.venue.location.country ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={
                        <IconLocation className="p-[4px]" stroke={2} />
                     }
                  >
                     {booking.venue.location.country}
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

               {booking.venue.meta.wifi ? (
                  <Badge
                     color="green"
                     variant="light"
                     leftSection={<IconWifi className="p-[2px]" stroke={2} />}
                  >
                     Wifi
                  </Badge>
               ) : null}

               {booking.venue.meta.parking ? (
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

               {booking.venue.meta.breakfast ? (
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

               {booking.venue.meta.pets ? (
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
                  £{formatNumber(booking.venue.price)}
               </Text>
               <Text span fz="sm" c="dimmed">
                  {" "}
                  / night
               </Text>
            </div>

            <Link href={`/user/bookings/${booking.id}`}>
               <Button color="brown" radius="sm">
                  Show details
               </Button>
            </Link>
         </Group>
      </Card>
   );
};

export default BookingCard;
