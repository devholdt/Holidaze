export const LoadingSpinner = () => {
   return (
      <div className="lds-ripple mt-8 flex justify-center text-yellow">
         <div className="bg-yellow"></div>
         <div className="bg-yellow"></div>
      </div>
   );
};

export const LoadingSkeleton = () => {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col items-center justify-center border-x border-lightGrey bg-background">
         <LoadingSpinner />
      </main>
   );
};
