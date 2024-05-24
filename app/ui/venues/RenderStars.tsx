const RenderStars = (rating: number) => {
   const stars = [];

   for (let i = 0; i < 5; i++) {
      if (i < rating) {
         stars.push(
            <span
               key={i}
               className="icon-[mdi--star] h-5 w-5 text-yellow"
            ></span>
         );
      } else {
         stars.push(
            <span
               key={i}
               className="icon-[mdi--star-outline] h-5 w-5 text-yellow"
            ></span>
         );
      }
   }
   return stars;
};

export default RenderStars;
