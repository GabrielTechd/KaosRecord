/** @format */
"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

// Defina a interface para um contato
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContacts() {
      try {
        const response = await api.get<{ message: string; contacts: Contact[] }>('/listar-contatos');
        setContacts(response.data.contacts);
      } catch (err) {
        console.error("Erro ao carregar contatos:", err);
        setError("Erro ao carregar contatos.");
      } finally {
        setLoading(false);
      }
    }

    loadContacts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      setFormError("Todos os campos são obrigatórios.");
      return;
    }
    try {
      const response = await api.post('/contatos', form);
      setContacts([...contacts, response.data.contact]);
      setForm({ name: '', email: '', phone: '', message: '' });
      setFormError(null);
    } catch (err) {
      console.error("Erro ao enviar contato:", err);
      setFormError("Erro ao enviar contato.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="bg-yellow-200 p-4">
      <h1>Formulário de Contato</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu email"
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            Telefone:
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Seu telefone"
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div>
          <label>
            Mensagem:
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Sua mensagem"
              className="border p-2 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Enviar
        </button>
        {formError && <p className="text-red-500">{formError}</p>}
      </form>
      <h2 className="mt-8">Lista de Contatos</h2>
      {contacts.length ? (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="border p-4 rounded">
              <p><strong>Nome:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Telefone:</strong> {contact.phone}</p>
              <p><strong>Mensagem:</strong> {contact.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum contato encontrado.</p>
      )}
    </div>
  );
}
