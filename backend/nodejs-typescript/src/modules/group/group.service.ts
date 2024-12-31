import { GroupDto, GroupMemberDto } from "./group.schema";
import { ValidationError } from "@/utils/response-error.util";
import Group from "@/models/group";

type AddressType = {
  id: number;
  street: string;
  city: string;
  district: string;
  subDistrict: string;
  postalCode: string;
};

type ContactType = {
  id: number;
  fullName: string;
  nickName: string | null;
  phoneNumber: string;
  email: string | null;
  addresses: AddressType[];
};

type GroupType = {
  id: number;
  name: string;
  description: string | null;
  members: ContactType[];
};

export default class GroupService {
  static async getGroups(user: Express.User) {
    const groups = await Group.query()
      .select("id", "name", "description")
      .where("user_id", user.id)
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

    return {
      message: "Groups fetched successfully",
      data: groups,
    };
  }

  static async getGroup(user: Express.User, groupId: number) {
    const group = await Group.query()
      .select("id", "name", "description")
      .where("user_id", user.id)
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

    if (!group) {
      throw new ValidationError("Group not found");
    }

    return {
      message: "Group fetched successfully",
      data: group,
    };
  }

  static async addGroup(user: Express.User, groupDto: GroupDto) {
    await Group.query().insert({
      user_id: user.id,
      name: groupDto.name,
      description: groupDto.description,
    });

    return {
      message: "Group added successfully",
    };
  }

  static async updateGroup(
    user: Express.User,
    groupId: number,
    groupDto: GroupDto,
  ) {
    const group = await Group.query()
      .where("user_id", user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ValidationError("Group not found");
    }

    await Group.query().patchAndFetchById(groupId, {
      user_id: user.id,
      name: groupDto.name,
      description: groupDto.description,
    });

    return {
      message: "Group updated successfully",
    };
  }

  static async deleteGroup(user: Express.User, groupId: number) {
    const group = await Group.query()
      .where("user_id", user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ValidationError("Group not found");
    }

    await Group.transaction(async (trx) => {
      await Group.relatedQuery("members", trx).for(group.id).unrelate();
      await Group.query(trx).where("id", group.id).delete();
    });

    return {
      message: "Group deleted successfully",
    };
  }
  static async addGroupMember(
    user: Express.User,
    groupId: number,
    groupMemberDto: GroupMemberDto,
  ) {
    const group = await Group.query()
      .where("user_id", user.id)
      .andWhere("id", groupId)
      .withGraphFetched("members")
      .modifyGraph("members", (builder) => {
        builder.select("contacts.id");
      })
      .first();

    if (!group) {
      throw new ValidationError("Group member not found");
    }

    if (
      group.members!.some((member) => member.id === groupMemberDto.contactId)
    ) {
      throw new ValidationError("Group member already exists");
    }

    await Group.relatedQuery("members")
      .for(group.id)
      .relate(groupMemberDto.contactId);

    return {
      message: "Group member added successfully",
    };
  }

  static async deleteGroupMember(
    user: Express.User,
    groupId: number,
    groupMemberDto: GroupMemberDto,
  ) {
    const group = await Group.query()
      .where("user_id", user.id)
      .andWhere("id", groupId)
      .first();

    if (!group) {
      throw new ValidationError("Group member not found");
    }

    await Group.relatedQuery("members")
      .for(group.id)
      .unrelate()
      .where("contact_id", groupMemberDto.contactId);

    return {
      message: "Group member deleted successfully",
    };
  }
}
