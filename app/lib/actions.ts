export async function createBooking(request: Request) {
   event?.preventDefault();

   const formData = await request.formData();
   const dateFrom = formData.get("dateFrom");
   const dateTo = formData.get("dateTo");
   const guests = formData.get("guests");

   return Response.json({ dateFrom, dateTo, guests });
}

export const handleSubmit = (
   event: React.FormEvent<HTMLFormElement>,
   isChecked: boolean
) => {
   event.preventDefault();
   const formData = new FormData(event.currentTarget);
   const formValues = Object.fromEntries(formData.entries());
   formValues.venueManager = isChecked.toString();
   console.log(formValues);
};
