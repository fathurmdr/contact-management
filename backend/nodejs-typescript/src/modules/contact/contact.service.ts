import { ContactDto } from "./contact.schema";
import Contact from "@/models/contact";

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

export default class ContactService {
  static async getContacts(user: Express.User) {
    const contacts = await Contact.query()
      .select(
        "id",
        "full_name as fullName",
        "nick_name as nickName",
        "phone_number as phoneNumber",
        "email",
      )
      .where("user_id", user.id)
      .withGraphFetched("addresses")
      .modifyGraph("addresses", (builder) => {
        builder.select(
          "id",
          "street",
          "city",
          "district",
          "sub_district as subDistrict",
          "postal_code as postalCode",
        );
      })
      .castTo<ContactType[]>();

    return {
      message: "Contacts fetched successfully",
      data: contacts,
    };
  }

  static async getContact(user: Express.User, contactId: number) {
    const contact = await Contact.query()
      .select(
        "id",
        "full_name as fullName",
        "nick_name as nickName",
        "phone_number as phoneNumber",
        "email",
      )
      .where("user_id", user.id)
      .andWhere("id", contactId)
      .withGraphFetched("addresses")
      .modifyGraph("addresses", (builder) => {
        builder.select(
          "id",
          "street",
          "city",
          "district",
          "sub_district as subDistrict",
          "postal_code as postalCode",
        );
      })
      .first()
      .castTo<ContactType>();

    if (!contact) {
      throw new Error("Contact not found");
    }

    return {
      message: "Contact fetched successfully",
      data: contact,
    };
  }

  static async addContact(user: Express.User, contactDto: ContactDto) {
    await Contact.query().insertGraph({
      user_id: user.id,
      full_name: contactDto.fullName,
      nick_name: contactDto.nickName,
      phone_number: contactDto.phoneNumber,
      email: contactDto.email,
      addresses: contactDto.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        district: address.district,
        sub_district: address.subDistrict,
        postal_code: address.postalCode,
      })),
    });

    return {
      message: "Contact added successfully",
    };
  }

  static async updateContact(
    user: Express.User,
    contactId: number,
    contactDto: ContactDto,
  ) {
    const contact = await Contact.query()
      .where("user_id", user.id)
      .andWhere("id", contactId)
      .first();

    if (!contact) {
      throw new Error("Contact not found");
    }

    await Contact.query().upsertGraph({
      id: contact.id,
      user_id: user.id,
      full_name: contactDto.fullName,
      nick_name: contactDto.nickName,
      phone_number: contactDto.phoneNumber,
      email: contactDto.email,
      addresses: contactDto.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        district: address.district,
        sub_district: address.subDistrict,
        postal_code: address.postalCode,
      })),
    });

    return {
      message: "Contact updated successfully",
    };
  }

  static async deleteContact(user: Express.User, contactId: number) {
    const contact = await Contact.query()
      .where("user_id", user.id)
      .andWhere("id", contactId)
      .first();

    if (!contact) {
      throw new Error("Contact not found");
    }

    await Contact.transaction(async (trx) => {
      await Contact.relatedQuery("addresses", trx).for(contact.id).delete();
      await Contact.relatedQuery("groups", trx).for(contact.id).delete();
      await Contact.query(trx).where("id", contact.id).delete();
    });

    return {
      message: "Contact deleted successfully",
    };
  }
}
