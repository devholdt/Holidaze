import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method !== "POST") {
      return res.status(405).end();
   }

   const { email, password } = req.body;

   if (email === email && password === password) {
      return res.status(200).json({ message: "Login successful" });
   } else {
      return res
         .status(401)
         .json({ type: "CredentialsSignin", message: "Invalid credentials" });
   }
}
