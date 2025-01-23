import { redirect } from "next/navigation";
import { ContactType } from "../contacts/data";
import { getAuth } from "@/server/data/auth.data";
import { handleError } from "@/server/utils/error.util";
import { toJSON } from "@/util/object.util";
import Group from "@/server/models/group";

export type GroupType = {
  id: number;
  name: string;
  description: string | null;
  members: ContactType[];
};

export async function getGroups() {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const groups = await Group.query()
      .select("id", "name", "description")
      .where("user_id", auth.user.id)
      .withGraphFetched("members.addresses")
      .modifyGraph("members", (builder) => {
        builder.select(
          "contacts.id",
          "contacts.full_name as fullName",
          "contacts.nick_name as nickName",
          "contacts.phone_number as phoneNumber",
          "contacts.email",
        );
      })
      .modifyGraph("members.addresses", (builder) => {
        builder.select(
          "addresses.id",
          "addresses.street",
          "addresses.city",
          "addresses.district",
          "addresses.sub_district as subDistrict",
          "addresses.postal_code as postalCode",
        );
      })
      .castTo<GroupType[]>();

    return toJSON(groups);
  } catch (error) {
    handleError("getGroups", error);
    return [];
  }
}

export async function getGroup(groupId: number) {
  try {
    const auth = await getAuth();

    if (!auth) {
      redirect("/sign-in");
    }

    const group = await Group.query()
      .select("id", "name", "description")
      .where("user_id", auth.user.id)
      .andWhere("id", groupId)
      .withGraphFetched("members.addresses")
      .modifyGraph("members", (builder) => {
        builder.select(
          "contacts.id",
          "contacts.full_name as fullName",
          "contacts.nick_name as nickName",
          "contacts.phone_number as phoneNumber",
          "contacts.email",
        );
      })
      .modifyGraph("members.addresses", (builder) => {
        builder.select(
          "addresses.id",
          "addresses.street",
          "addresses.city",
          "addresses.district",
          "addresses.sub_district as subDistrict",
          "addresses.postal_code as postalCode",
        );
      })
      .first()
      .castTo<GroupType>();

    return toJSON(group);
  } catch (error) {
    handleError("getGroup", error);
  }
}
