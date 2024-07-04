import { Badge } from "@mantine/core";
import { VenueCardBadgeProps } from "@/app/lib/definitions";

const VenueCardBadge = ({
   text,
   color = "green",
   variant = "light",
   icon,
}: VenueCardBadgeProps) => {
   return (
      <Badge color={color} variant={variant} leftSection={icon}>
         {text}
      </Badge>
   );
};

export default VenueCardBadge;
