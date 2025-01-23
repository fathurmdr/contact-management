"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { groupMemberSchema, groupSchema } from "@/schemas/group.schema";
import { getAuth } from "@/server/data/auth.data";
import Contact from "@/server/models/contact";
import Group from "@/server/models/group";
import { ActionError, handleError } from "@/server/utils/error.util";

export async function addGroup(payload: any) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const groupDto = groupSchema.parse(payload);

    await Group.query().insert({
      user_id: auth.user.id,
      name: groupDto.name,
      description: groupDto.description,
    });
  } catch (error) {
    return handleError("addGroup", error);
  }
}

export async function updateGroup(payload: any, groupId?: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const groupDto = groupSchema.parse(payload);

    if (!groupId) {
      throw new ActionError("Group id is required");
    }

    const group = await Group.query()
      .where("user_id", auth.user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ActionError("Group not found");
    }

    await Group.query().patchAndFetchById(groupId, {
      user_id: auth.user.id,
      name: groupDto.name,
      description: groupDto.description,
    });
  } catch (error) {
    return handleError("updateGroup", error);
  }
}

export async function deleteGroup(groupId: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const group = await Group.query()
      .where("user_id", auth.user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ActionError("Group not found");
    }

    await Group.transaction(async (trx) => {
      await Group.relatedQuery("members", trx).for(group.id).unrelate();
      await Group.query(trx).where("id", group.id).delete();
    });
  } catch (error) {
    return handleError("deleteGroup", error);
  }
}

export async function addGroupMember(payload: any, groupId?: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const groupMemberDto = groupMemberSchema.parse(payload);

    if (!groupId) {
      throw new ActionError("Group id is required");
    }

    const group = await Group.query()
      .where("user_id", auth.user.id)
      .andWhere("id", groupId)
      .withGraphFetched("members")
      .modifyGraph("members", (builder) => {
        builder.select("contacts.id");
      })
      .first();

    if (!group) {
      throw new ActionError("Group not found");
    }

    if (
      group.members!.some((member) => member.id === groupMemberDto.contactId)
    ) {
      throw new ActionError("Group member already exists");
    }

    const contact = await Contact.query()
      .where("user_id", auth.user.id)
      .andWhere("id", groupMemberDto.contactId)
      .first();

    if (!contact) {
      throw new ActionError("Contact not found");
    }

    await Group.relatedQuery("members")
      .for(group.id)
      .relate(groupMemberDto.contactId);
  } catch (error) {
    return handleError("updateGroup", error);
  }
}

export async function deleteGroupMember(payload: any, groupId: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const groupMemberDto = groupMemberSchema.parse(payload);

    if (!groupId) {
      throw new ActionError("Group id is required");
    }

    const group = await Group.query()
      .where("user_id", auth.user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ActionError("Group not found");
    }

    await Group.relatedQuery("members")
      .for(group.id)
      .unrelate()
      .where("contact_id", groupMemberDto.contactId);
  } catch (error) {
    return handleError("deleteGroup", error);
  }

  revalidatePath("/groups");
}
