export const uploadToImgBB = async (file: File) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key missing! Add NEXT_PUBLIC_IMGBB_API_KEY in .env.local");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.success) {
    console.error("ImgBB Upload Failed:", data);
    throw new Error("Image upload failed!");
  }

  return data.data.url; // return uploaded image link
};
