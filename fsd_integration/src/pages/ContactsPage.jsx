import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { createContact, editContact, getContacts, removeContact } from "../services/api";

const EMPTY = { name: "", phone: "", email: "", relation: "" };

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const data = await getContacts();
    setContacts(data || []);
  };

  useEffect(() => {
    let mounted = true;
    const loadInitial = async () => {
      const data = await getContacts();
      if (mounted) setContacts(data || []);
    };
    loadInitial();
    return () => {
      mounted = false;
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await editContact(editingId, form);
    else await createContact(form);
    setForm(EMPTY);
    setEditingId(null);
    setMsg("Contact Saved");
    setTimeout(() => setMsg(""), 3000);
    load();
  };

  const onEdit = (c) => {
    setEditingId(c.id);
    setForm({ name: c.name, phone: c.phone, email: c.email || "", relation: c.relation });
  };

  const onDelete = async (id) => {
    await removeContact(id);
    setMsg("Contact Deleted");
    setTimeout(() => setMsg(""), 3000);
    load();
  };

  return (
    <>
      <AppHeader />
      <main className="layout-container" style={{ paddingTop: '2rem' }}>
        <div className="fade-in" style={{ marginBottom: '2.5rem' }}>
          <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>Security Network</h1>
          <p className="text-sub">Manage emergency contacts and notification protocols.</p>
        </div>

        <section className="glass-card fade-in" style={{ marginBottom: '3.5rem', padding: '4rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="heading-1" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{editingId ? "Modify Protocol" : "Authorize New Contact"}</h2>
            <p className="text-sub" style={{ fontSize: '1.1rem' }}>Designate ultra-secure endpoints for telemetry broadcasting.</p>
          </div>
          
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>Identity</label>
              <input className="input-field" placeholder="Full Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>Mobile Endpoint</label>
              <input className="input-field" placeholder="+91 XXXX XXX XXX" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>Email Routing</label>
              <input className="input-field" type="email" placeholder="contact@email.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>Relation Affinity</label>
              <input className="input-field" placeholder="e.g. Guardian" value={form.relation} onChange={(e) => setForm((p) => ({ ...p, relation: e.target.value }))} required />
            </div>
            <div style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              <button className="btn-primary" style={{ width: '100%', borderRadius: '50px', padding: '1.5rem' }}>
                {editingId ? "Update Security Protocol" : "Confirm Tactical Authorization"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(EMPTY); }} className="btn-outline" style={{ width: '100%', marginTop: '1rem', borderRadius: '50px', padding: '1.25rem' }}>
                  Abort Re-Authorization
                </button>
              )}
            </div>
          </form>
          {msg && <div className="fade-in" style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'center', fontWeight: 600 }}>{msg}</div>}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
          {contacts.map((c, index) => (
            <div key={c.id} className="glass-card slide-up" style={{ 
              animationDelay: `${index * 0.1}s`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '1.5rem 2rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.15rem', color: '#0f172a' }}>{c.name}</p>
                  <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', background: '#f1f5f9', borderRadius: '4px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{c.relation}</span>
                </div>
                <p className="text-sub" style={{ fontSize: '0.875rem' }}>{c.phone}</p>
                <p className="text-sub" style={{ fontSize: '0.875rem' }}>{c.email}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onEdit(c)} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '6px' }}>Manage</button>
                <button onClick={() => onDelete(c.id)} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '6px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.1)' }}>Revoke</button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p className="text-sub fade-in" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>No authorized security contacts detected.</p>}
        </section>
      </main>
    </>
  );
};

export default ContactsPage;
