export async function createBooking(request: Request) {
   event?.preventDefault();

   const formData = await request.formData();
   const dateFrom = formData.get("dateFrom");
   const dateTo = formData.get("dateTo");
   const guests = formData.get("guests");

   return Response.json({ dateFrom, dateTo, guests });
}
