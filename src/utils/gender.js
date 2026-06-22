// Maps a shopper's gender to the product genders they should be recommended /
// shown by default. Unisex is always included. An unset/"unspecified" gender
// imposes no restriction (returns null = "allow everything").

export const allowedProductGenders = (userGender) => {
  if (userGender === "male") return ["men", "unisex"];
  if (userGender === "female") return ["women", "unisex"];
  return null;
};

// Does this product belong in `userGender`'s recommendations?
export const productMatchesUserGender = (product, userGender) => {
  const allowed = allowedProductGenders(userGender);
  if (!allowed) return true;
  return allowed.includes(product?.gender || "unisex");
};
