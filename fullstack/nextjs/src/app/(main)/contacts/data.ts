import { redirect } from "next/navigation";
import { getAuth } from "@/server/data/auth.data";
import Contact from "@/server/models/contact";
import { handleError } from "@/server/utils/error.util";
import { toJSON } from "@/util/object.util";

export type AddressType = {
  id: number;
  street: string;
  city: string;
  district: string;
  subDistrict: string;
  postalCode: string;
};

export type ContactType = {
  id: number;
  contactId: number;
  fullName: string;
  nickName: string | null;
  phoneNumber: string;
  email: string | null;
  addresses: AddressType[];
};

export async function getContacts() {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const contacts = await Contact.query()
      .select(
        "id",
        "full_name as fullName",
        "nick_name as nickName",
        "phone_number as phoneNumber",
        "email",
      )
      .where("user_id", auth.user.id)
      .withGraphFetched("addresses")
      .modifyGraph("addresses", (builder) => {
        builder.select(
          "id",
          "contact_id as contactId",
          "street",
          "city",
          "district",
          "sub_district as subDistrict",
          "postal_code as postalCode",
        );
      })
      .orderBy("full_name", "asc")
      .castTo<ContactType[]>();

    return toJSON(contacts);
  } catch (error) {
    handleError("getContacts", error);
    return [];
  }
}

export async function getContact(contactId: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const contact = await Contact.query()
      .select(
        "id",
        "full_name as fullName",
        "nick_name as nickName",
        "phone_number as phoneNumber",
        "email",
      )
      .where("user_id", auth.user.id)
      .andWhere("id", contactId)
      .withGraphFetched("addresses")
      .modifyGraph("addresses", (builder) => {
        builder.select(
          "id",
          "contact_id as contactId",
          "street",
          "city",
          "district",
          "sub_district as subDistrict",
          "postal_code as postalCode",
        );
      })
      .first()
      .castTo<ContactType | undefined>();

    return toJSON(contact);
  } catch (error) {
    handleError("getContact", error);
  }
}
