import React, { useEffect, useState } from "react";
import { addContact, deleteContact, getContacts, updateContact } from "../api/contactsApi";

const EMPTY_FORM = { name: "", phone: "", relationship: "", priority: 1 };

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const refreshContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
      setStatus("Failed to load contacts.");
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadInitial = async () => {
      try {
        const data = await getContacts();
        if (mounted) setContacts(data);
      } catch (error) {
        if (mounted) setStatus("Failed to load contacts.");
        console.error(error);
      }
    };
    loadInitial();
    return () => {
      mounted = false;
    };
  }, []);

  const saveContact = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateContact(editingId, form);
        setStatus("Contact updated.");
      } else {
        await addContact(form);
        setStatus("Contact added.");
      }
      setEditingId(null);
      setForm(EMPTY_FORM);
      refreshContacts();
    } catch (error) {
      setStatus("Failed to save contact.");
      console.error(error);
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setForm({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
      priority: contact.priority,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setStatus("Contact deleted.");
      refreshContacts();
    } catch (error) {
      setStatus("Delete failed.");
      console.error(error);
    }
  };

  return (
    <section className="page">
      <h2 className="page-title">Emergency Contacts</h2>
      <div className="card">
        <form className="contact-form" onSubmit={saveContact}>
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Contact name"
            required
          />
          <input
            className="input"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="Phone number"
            required
          />
          <input
            className="input"
            value={form.relationship}
            onChange={(e) => setForm((p) => ({ ...p, relationship: e.target.value }))}
            placeholder="Relationship"
            required
          />
          <input
            className="input"
            type="number"
            value={form.priority}
            onChange={(e) => setForm((p) => ({ ...p, priority: Number(e.target.value) }))}
            placeholder="Priority"
            min="1"
            required
          />
          <button className="button button-primary" type="submit">
            {editingId ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        {status && <p className="status-text">{status}</p>}
      </div>

      <div className="card">
        <h3>Saved Contacts</h3>
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-item">
              <div>
                <strong>{contact.name}</strong>
                <p>{contact.phone}</p>
                <small>
                  {contact.relationship} | Priority {contact.priority}
                </small>
              </div>
              <div className="action-row">
                <button className="button button-secondary" onClick={() => handleEdit(contact)}>
                  Edit
                </button>
                <button className="button button-danger" onClick={() => handleDelete(contact.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p>No emergency contacts saved yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
