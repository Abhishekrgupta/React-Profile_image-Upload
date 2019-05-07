export function imagePost(imageOfBase64) {
  let promise = fetch("http://localhost:4000/image", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: imageOfBase64
  });
  return promise;
}
