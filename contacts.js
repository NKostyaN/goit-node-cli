import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (allContacts) =>
    fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find((item) => item.id === contactId);
    return contact || null;
}

export async function removeContact(contactId) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const [res] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return res;
}

export async function addContact(data) {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
}

listContacts();
