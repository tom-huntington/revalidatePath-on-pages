import { revalidatePath } from "next/cache";

export const runtime = 'edge';
export const revalidate = false;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

let dog = {
  name: "sammy",
  image: "🐕",
  breed: "dalmation",
}

export default function Home() {

  async function upDog(formData: FormData) {
    "use server";
    dog = {
      name: formData.get("title")?.toString() || "",
      image: formData.get("image")?.toString() || "",
      breed: formData.get("breed")?.toString() || "",
    }
    console.log("upDog() called")
    revalidatePath(`/`);
    
  }

  console.log("Home() called")

  return (
    <div >
      <h2>Edit {dog?.name}</h2>
      <p>{`name: ${dog.name}, image: ${dog.image}, breed: ${dog.breed}`}</p>
      <form action={upDog}>
        <label>Name</label>
        <input name="title" type="text" defaultValue={dog?.name} />
        <label>Image</label>
        <input name="image" type="text" defaultValue={dog?.image} />
        <label>Breed</label>
        <input name="breed" type="text" defaultValue={dog?.breed} />
        <button type="submit">Save and Continue</button>

      </form>
    </div>
);
}