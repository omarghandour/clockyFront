import { Client, Storage, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://appwrite.clockyeg.com/v1") // Replace with your Appwrite endpoint
  .setProject("678bc6d5000e65b1ae96") // Replace with your Project ID
  .setKey(
    "standard_4b62a8773ee976574fc1b7dea9671dc4c58a7da0f50c8cc520820b86e0bf98e8c7aaaebe7484b03413a3083f5dace7f5f0ea9342a7a506c2dc849b6af127d528e5059e62059bbcc588d51f09d8ff1f2cc38082bf2d51ea11f8632353b0edf036c8cb64fb000b5bdfa7171d5e018cbf024b98099ca6d6fade60ae28daccfe0d51"
  ); // Replace with your API key

const storage = new Storage(client);

export { client, storage, ID };
