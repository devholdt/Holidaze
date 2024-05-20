export default function Footer() {
   const date = new Date();
   const year = date.getFullYear();

   return (
      <footer className="flex flex-col bg-darkBrown">
         <div className="flex w-full justify-center bg-darkerBrown p-4 text-lightBrown">
            © Holidaze Resorts {year}
         </div>
      </footer>
   );
}
