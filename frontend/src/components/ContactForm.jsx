import React from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = ({ property, onSubmit, loading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: `Ich interessiere mich für die Wohnung in ${property.address}.`,
      subject: `Anfrage zu: ${property.title}`,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-bold mb-4">Kontaktieren Sie den Vermieter</h3>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          {...register('name', { required: 'Name ist erforderlich' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Ihr Name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          {...register('email', { 
            required: 'Email ist erforderlich',
            pattern: { value: /^[^@]+@[^@]+$/, message: 'Ungültige Email' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="ihre@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="+41 XX XXX XXXX"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Betreff
        </label>
        <input
          type="text"
          {...register('subject')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nachricht *
        </label>
        <textarea
          {...register('message', { required: 'Nachricht ist erforderlich' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Ihre Nachricht..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Wird versendet...' : 'Anfrage senden'}
      </button>
    </form>
  );
};

export default ContactForm;
